use std::collections::HashSet;

use tokio::sync::mpsc::Receiver;

use tokio::{sync::mpsc::Sender, time::Duration};

use tokio_util::sync::CancellationToken;
use tracing::{debug, info, instrument, trace, warn, Level};

use crate::services::{data_service, data_type_service, run_service};
use crate::{ClientData, PoolHandle, RUN_ID};

/// A few threads to manage the processing and inserting of special types,
/// upserting of metadata for data, and batch uploading the database
pub struct DbHandler {
    /// The list of data types seen by this instance, used for when to upsert
    datatype_list: HashSet<String>,
    /// The broadcast channel which provides serial datapoints for processing
    receiver: Receiver<ClientData>,
    /// The database pool handle
    pool: PoolHandle,
    /// the queue of data
    data_queue: Vec<ClientData>,
    /// upload interval
    upload_interval: u64,
}

/// Chunks a vec into roughly equal vectors all under size `max_chunk_size`
/// This precomputes vec capacity but does however call to_vec(), reallocating the slices
fn chunk_vec<T: Clone>(input: Vec<T>, max_chunk_size: usize) -> Vec<Vec<T>> {
    if max_chunk_size == 0 {
        panic!("Maximum chunk size must be greater than zero");
    }

    let len = input.len();
    if len == 0 {
        return Vec::new();
    }

    // Calculate the number of chunks
    let num_chunks = (len + max_chunk_size - 1) / max_chunk_size;

    // Recompute a balanced chunk size
    let chunk_size = usize::max(1, (len + num_chunks - 1) / num_chunks);

    let mut result = Vec::with_capacity(num_chunks);
    let mut start = 0;

    while start < len {
        let end = usize::min(start + chunk_size, len);
        result.push(input[start..end].to_vec());
        start = end;
    }
    result
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
            datatype_list: HashSet::new(),
            receiver,
            pool,
            data_queue: vec![],
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
                    let Ok(mut database) = pool.get().await else {
                        warn!("Could not get connection for cleanup");
                        break;
                    };
                    // cleanup all remaining messages if batches start backing up
                    while let Some(final_msgs) = batch_queue.recv().await {
                        info!("{} batches remaining!", batch_queue.len()+1);
                        // do not spawn new tasks in this mode, see below comment for chunk_size math
                        if final_msgs.is_empty() {
                            debug!("A batch of zero messages was sent!");
                            continue;
                        }
                        let chunk_size = final_msgs.len() / ((final_msgs.len() / 8190) + 1);
                        let chunks = chunk_vec(final_msgs, chunk_size);
                        debug!("Batch uploading {} chunks in sequence", chunks.len());
                        for chunk in chunks {
                            info!(
                                "A cleanup chunk uploaded: {:?}",
                                data_service::add_many(&mut database, chunk).await
                        );
                        }
                    }
                    info!("No more messages to cleanup.");
                    break;
                },
                Some(msgs) = batch_queue.recv() => {
                    // libpq has max 65535 params, therefore batch
                    // max for batch is 65535/4 params per message, hence the below, rounded down with a margin for safety
                    // TODO avoid this code batch uploading the remainder messages as a new batch, combine it with another safely
                    if msgs.is_empty() {
                        debug!("A batch of zero messages was sent!");
                        continue;
                    }
                    let chunk_size = msgs.len() / ((msgs.len() / 8190) + 1);
                    let chunks = chunk_vec(msgs, chunk_size);
                    debug!("Batch uploading {} chunks in parrallel", chunks.len());
                    for chunk in chunks {
                       tokio::spawn(DbHandler::batch_upload(chunk, pool.clone()));
                    }
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

    #[instrument(level = Level::DEBUG, skip(msg, pool))]
    async fn batch_upload(msg: Vec<ClientData>, pool: PoolHandle) {
        let Ok(mut database) = pool.get().await else {
            warn!("Could not get connection for batch upload!");
            return;
        };
        match data_service::add_many(&mut database, msg).await {
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
        let mut batch_interval = tokio::time::interval(Duration::from_millis(self.upload_interval));
        // the match batch size to reasonably expect
        let mut max_batch_size = 2usize;
        loop {
            tokio::select! {
                _ = cancel_token.cancelled() => {
                    debug!("Pushing final messages to queue");
                    data_channel.send(self.data_queue).await.expect("Could not comm data to db thread, shutdown");
                    break;
                },
                Some(msg) = self.receiver.recv() => {
                    self.handle_msg(msg, &data_channel).await;
                }
                _ = batch_interval.tick() => {
                    if !self.data_queue.is_empty() {
                        // set a new max if this batch is larger
                        max_batch_size = usize::max(max_batch_size, self.data_queue.len());
                        // mem::take allows us to assign the value of data queue vec::new() while maintaining the memory for data_channel ownership
                        data_channel
                            .send(self.data_queue)
                            .await
                            .expect("Could not comm data to db thread");
                        self.data_queue = Vec::with_capacity((max_batch_size as f32 * 1.05) as usize);
                    }
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

        if !self.datatype_list.contains(&msg.name) {
            let Ok(mut database) = self.pool.get().await else {
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
            self.datatype_list.insert(msg.name.clone());
        }

        // Check for GPS points, insert them into current run if available
        if msg.name == "TPU/GPS/Location" {
            debug!("Upserting run with location points!");
            let Ok(mut database) = self.pool.get().await else {
                warn!("Could not get connection for db points update");
                return;
            };
            // ensure lat AND long present in message, just a sanity check
            if msg.values.len() < 2 {
                warn!("GPS message found without both lat and long!");
            } else if let Err(err) = run_service::update_run_with_coords(
                &mut database,
                RUN_ID.load(std::sync::atomic::Ordering::Relaxed),
                msg.values[0].into(),
                msg.values[1].into(),
            )
            .await
            {
                warn!("DB error run gps points upsert: {:?}", err);
            }
        }

        // no matter what, batch upload the message
        trace!("Pushing msg to queue: {:?}", msg);
        self.data_queue.push(msg);
    }
}
