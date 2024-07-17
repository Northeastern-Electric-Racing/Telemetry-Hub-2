use core::fmt;
use std::time::Duration;

use prisma_client_rust::{chrono, serde_json};
use protobuf::Message;
use rumqttc::v5::{
    mqttbytes::v5::{LastWill, Packet, Publish},
    AsyncClient, Event, EventLoop, MqttOptions,
};
use socketioxide::SocketIo;
use tokio::sync::mpsc::Sender;
use tracing::{debug, instrument, trace, warn, Level};

use crate::{serverdata, services::run_service, Database};

use super::ClientData;
use std::borrow::Cow;

pub struct MqttProcessor {
    channel: Sender<ClientData>,
    curr_run: i32,
    io: SocketIo,
}

impl MqttProcessor {
    /// Creates a new mqtt receiver and socketio and db sender
    /// * `channel` - The mpsc channel to send the database data to
    /// * `mqtt_path` - The mqtt URI, including port, (without the mqtt://) to subscribe to
    /// * `db` - The database to store the data in
    /// * `io` - The socketio layer to send the data to
    ///
    /// This is async as it creates the initial run and gets the ID, as well as connecting to and subbing Siren
    /// Returns the instance and the event loop, which can be passed into the process_mqtt func to begin recieiving
    pub async fn new(
        channel: Sender<ClientData>,
        mqtt_path: String,
        db: Database,
        io: SocketIo,
    ) -> (MqttProcessor, EventLoop) {
        // create the mqtt client and configure it
        let mut create_opts = MqttOptions::new(
            "ScyllaServer",
            mqtt_path.split_once(':').expect("Invalid Siren URL").0,
            mqtt_path
                .split_once(':')
                .unwrap()
                .1
                .parse::<u16>()
                .expect("Invalid Siren port"),
        );
        create_opts.set_keep_alive(Duration::from_secs(20));
        create_opts.set_last_will(LastWill::new(
            "Scylla/Status",
            "Scylla has disconnected!",
            rumqttc::v5::mqttbytes::QoS::ExactlyOnce,
            true,
            None,
        ));
        create_opts.set_clean_start(false);

        // creates the initial run
        let curr_run = run_service::create_run(&db, chrono::offset::Utc::now().timestamp_millis())
            .await
            .expect("Could not create initial run!");
        debug!("Configuring current run: {:?}", curr_run);

        // TODO mess with incoming message cap if db, etc. cannot keep up
        let (client, connect) = AsyncClient::new(create_opts, 1000);

        debug!("Subscribing to siren");
        client
            .try_subscribe("#", rumqttc::v5::mqttbytes::QoS::ExactlyOnce)
            .expect("Could not subscribe to Siren");

        (
            MqttProcessor {
                channel,
                curr_run: curr_run.id,
                io,
            },
            connect,
        )
    }

    /// This handles the reception of mqtt messages, will not return
    /// * `connect` - The eventloop returned by ::new to connect to
    pub async fn process_mqtt(self, mut connect: EventLoop) {
        let mut spec_interval = tokio::time::interval(Duration::from_secs(3));
        // process over messages, non blocking
        loop {
            tokio::select! {
                    Ok(msg) = connect.poll() => {
                        // safe parse the message
                        if let Event::Incoming(Packet::Publish(msg)) = msg {
                            trace!("Received mqtt message: {:?}", msg);
                            // parse the message into the data and the node name it falls under
                            let msg = match self.parse_msg(msg) {
                                Ok(msg) => msg,
                                Err(err) => {
                                    warn!("Message parse error: {:?}", err);
                                    continue;
                                }
                            };
                            self.send_db_msg(msg.clone()).await;
                            self.send_socket_msg(msg).await;
                        }

            },
                    _ = spec_interval.tick() => {
                        trace!("Updating viewership data!");
                        if let Ok(sockets) = self.io.sockets() {
                        let client_data = ClientData {
                            name: "Viewers".to_string(),
                            node: "Internal".to_string(),
                            unit: "".to_string(),
                            run_id: self.curr_run,
                            timestamp: chrono::offset::Utc::now().timestamp_millis(),
                            values: vec![sockets.len().to_string()]
                        };
                        self.send_socket_msg(client_data).await;

                    } else {
                        warn!("Could not fetch socket count");
                    }
                    }

                }
        }
    }

    /// Parse the message
    /// * `msg` - The mqtt message to parse
    /// returns the ClientData, or the Err of something that can be debug printed
    #[instrument(skip(self), level = Level::TRACE)]
    fn parse_msg(&self, msg: Publish) -> Result<ClientData, impl fmt::Debug> {
        let data = serverdata::ServerData::parse_from_bytes(&msg.payload)
            .map_err(|f| format!("Could not parse message topic:{:?} error: {}", msg.topic, f))?;

        let split = std::str::from_utf8(&msg.topic)
            .unwrap_or_else(|_| panic!("Could not parse topic: {:?}", msg.topic))
            .split_once('/')
            .ok_or(&format!("Could not parse nesting: {:?}", msg.topic))?;

        let node = split.0;

        let data_type = split.1.replace('/', "-");

        // extract the unix time, returning the current time instead if needed
        // note the Cow magic involves the return from the map is a borrow, but the unwrap cannot as we dont own it
        let unix_time = msg
            .properties
            .unwrap_or_default()
            .user_properties
            .iter()
            .map(Cow::Borrowed)
            .find(|f| f.0 == "ts")
            .unwrap_or_else(|| {
                debug!("Could not find timestamp in mqtt, using current time");
                Cow::Owned((
                    "ts".to_string(),
                    chrono::offset::Utc::now().timestamp_millis().to_string(),
                ))
            })
            .into_owned();

        // parse time, if time isnt present use sys time (see above)
        let Ok(time_clean) = unix_time.1.parse::<i64>() else {
            return Err(format!("Invalid timestamp: {}", unix_time.1));
        };
        // ts check for bad sources of time which may return 1970
        if time_clean < 963014966000 {
            return Err(format!("Timestamp before year 2000: {}", unix_time.1));
        }

        Ok(ClientData {
            run_id: self.curr_run,
            name: data_type,
            unit: data.unit,
            values: data.value,
            timestamp: time_clean,
            node: node.to_string(),
        })
    }

    /// Send a message to the channel, printing and IGNORING any error that may occur
    /// * `client_data` - The client data to send over the broadcast
    async fn send_db_msg(&self, client_data: ClientData) {
        if let Err(err) = self.channel.send(client_data.clone()).await {
            warn!("Error sending through channel: {:?}", err)
        }
    }

    /// Sends a message to the socket, printing and IGNORING any error that may occur
    /// * `client_data` - The client data to send over the broadcast
    async fn send_socket_msg(&self, client_data: ClientData) {
        match self.io.emit(
            "message",
            serde_json::to_string(&client_data).expect("Could not serialize ClientData"),
        ) {
            Ok(_) => (),
            Err(err) => warn!("Socket: Broadcast error: {}", err),
        }
    }
}
