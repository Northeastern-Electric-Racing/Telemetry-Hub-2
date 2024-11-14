use tokio::sync::mpsc::Receiver;

use tokio::{sync::mpsc::Sender, time::Duration};

use tokio_util::sync::CancellationToken;
use tracing::{debug, info, instrument, trace, warn, Level};

use crate::{
    services::{data_service, data_type_service},
    Database,
};
use crate::{ClientData, LocationData, PoolHandle};

/// A struct defining an in progress location packet
struct LocLock {
    location_name: Option<String>,
    points: Option<(f32, f32)>,
    radius: Option<f32>,
}

impl LocLock {
    pub fn new() -> LocLock {
        LocLock {
            location_name: None,
            points: None,
            radius: None,
        }
    }

    /// Add the location name to the packet
    pub fn add_loc_name(&mut self, loc_name: String) {
        self.location_name = Some(loc_name);
    }

    /// Add points to the packet
    pub fn add_points(&mut self, lat: f32, long: f32) {
        self.points = Some((lat, long));
    }

    /// Add a radius to the packet
    pub fn add_radius(&mut self, radius: f32) {
        self.radius = Some(radius);
    }

    /// Attempt to finalize the packet, returning a location data and clearing this object or None if still in progress
    pub fn finalize(&mut self) -> Option<LocationData> {
        if self.location_name.is_some() && self.points.is_some() && self.radius.is_some() {
            self.clear();
            return Some(LocationData {
                location_name: self.location_name.clone().unwrap(),
                lat: self.points.unwrap().0,
                long: self.points.unwrap().1,
                radius: self.radius.unwrap(),
            });
        }
        None
    }

    /// Clear the internal state
    fn clear(&mut self) {
        self.location_name = None;
        self.points = None;
        self.radius = None;
    }
}

/// A few threads to manage the processing and inserting of special types,
/// upserting of metadata for data, and batch uploading the database
pub struct DbHandler {
    /// The list of data types seen by this instance, used for when to upsert
    datatype_list: Vec<String>,
    /// The broadcast channel which provides serial datapoints for processing
    receiver: Receiver<ClientData>,
    /// The database pool handle
    pool: PoolHandle,
    /// An internal state of an in progress location packet
    location_lock: LocLock,
    /// Whether the location has been modified this loop
    is_location: bool,
    /// the queue of data
    data_queue: Vec<ClientData>,
    /// the time since last batch
    last_time: tokio::time::Instant,
    /// upload interval
    upload_interval: u64,
}

impl DbHandler {
    /// Make a new db handler
    /// * `recv` - the broadcast reciver of which clientdata will be sent
    pub fn new(
        receiver: Receiver<ClientData>,
        pool: PoolHandle,
        upload_interval: u64,
    ) -> DbHandler {
        DbHandler {
            datatype_list: vec![],
            receiver,
            pool,
            location_lock: LocLock::new(),
            is_location: false,
            data_queue: vec![],
            last_time: tokio::time::Instant::now(),
            upload_interval,
        }
    }

    /// This loop handles batch uploading, and has no internal state or requirements
    /// It uses the queue from data queue to insert to the database specified
    /// On cancellation, will await one final queue message to cleanup anything remaining in the channel
    pub async fn batching_loop(
        mut batch_queue: Receiver<Vec<ClientData>>,
        pool: PoolHandle,
        cancel_token: CancellationToken,
    ) {
        loop {
            tokio::select! {
                _ = cancel_token.cancelled() => {
                    let Ok(mut database) = pool.get() else {
                        warn!("Could not get connection for cleanup");
                        break;
                    };
                    // cleanup all remaining messages if batches start backing up
                    while let Some(final_msgs) = batch_queue.recv().await {
                        info!("{} batches remaining!", batch_queue.len()+1);
                    info!(
                        "A cleanup batch uploaded: {:?}",
                        data_service::add_many(&mut database, final_msgs).await
                    );
                    }
                    info!("No more messages to cleanup.");
                    break;
                },
                Some(msgs) = batch_queue.recv() => {
                    let Ok(mut database) = pool.get() else {
                        warn!("Could not get connection for batch upload!");
                        continue;
                    };
                    Self::batch_upload(msgs, &mut database).await;
                    debug!(
                        "DB send: {} of {}",
                        batch_queue.len(),
                        batch_queue.max_capacity()
                    );
                }
            }
        }
    }

    /// A batching loop that consumes messages but does not upload anything
    pub async fn fake_batching_loop(
        mut batch_queue: Receiver<Vec<ClientData>>,
        cancel_token: CancellationToken,
    ) {
        loop {
            tokio::select! {
                _ = cancel_token.cancelled() => {
                    warn!("Cancelling fake upload with {} batches left in queue!", batch_queue.len());
                    break;
                },
                Some(msgs) = batch_queue.recv() => {
                    warn!("NOT UPLOADING {} MESSAGES", msgs.len());
                },
            }
        }
    }

    #[instrument(level = Level::DEBUG, skip(msg, db))]
    async fn batch_upload(msg: Vec<ClientData>, db: &mut Database) {
        match data_service::add_many(db, msg).await {
            Ok(count) => info!("Batch uploaded: {:?}", count),
            Err(err) => warn!("Error in batch upload: {:?}", err),
        }
    }

    /// A loop which uses self and a sender channel to process data
    /// If the data is special, i.e. coordinates, driver, etc. it will store it in its special location of the db immediately
    /// For all data points it will add the to the data_channel for batch uploading logic when a certain time has elapsed
    /// Before this time the data is stored in an internal queue.
    /// On cancellation, the messages currently in the queue will be sent as a final flush of any remaining messages received before cancellation
    pub async fn handling_loop(
        mut self,
        data_channel: Sender<Vec<ClientData>>,
        cancel_token: CancellationToken,
    ) {
        loop {
            tokio::select! {
                _ = cancel_token.cancelled() => {
                    debug!("Pushing final messages to queue");
                    data_channel.send(self.data_queue.clone()).await.expect("Could not comm data to db thread, shutdown");
                    self.data_queue.clear();
                    break;
                },
                Some(msg) = self.receiver.recv() => {
                    self.handle_msg(msg, &data_channel).await;
                }
            }
        }
    }

    #[instrument(skip(self), level = Level::TRACE)]
    async fn handle_msg(&mut self, msg: ClientData, data_channel: &Sender<Vec<ClientData>>) {
        trace!(
            "Mqtt dispatcher: {} of {}",
            self.receiver.len(),
            self.receiver.max_capacity()
        );

        // If the time is greater than upload interval, push to batch upload thread and clear queue
        if tokio::time::Instant::now().duration_since(self.last_time)
            > Duration::from_millis(self.upload_interval)
            && !self.data_queue.is_empty()
        {
            data_channel
                .send(self.data_queue.clone())
                .await
                .expect("Could not comm data to db thread");
            self.data_queue.clear();
            self.last_time = tokio::time::Instant::now();
        }

        if !self.datatype_list.contains(&msg.name) {
            let Ok(mut database) = self.pool.get() else {
                warn!("Could not get connection for dataType upsert");
                return;
            };
            info!("Upserting data type: {}", msg.name);
            if let Err(msg) = data_type_service::upsert_data_type(
                &mut database,
                msg.name.clone(),
                msg.unit.clone(),
                msg.node.clone(),
            )
            .await
            {
                warn!("DB error datatype upsert: {:?}", msg);
            }
            self.datatype_list.push(msg.name.clone());
        }

        // no matter what, batch upload the message
        trace!("Pushing msg to queue: {:?}", msg);
        self.data_queue.push(msg);
    }
}
