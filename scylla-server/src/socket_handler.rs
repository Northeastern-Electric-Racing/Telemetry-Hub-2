use std::{collections::HashMap, sync::atomic::Ordering, time::Duration};

use chrono::{DateTime, Utc};
use regex::Regex;
use ringbuffer::AllocRingBuffer;
use serde::Serialize;
use socketioxide::SocketIo;
use tokio::sync::broadcast;
use tokio_util::sync::CancellationToken;
use tracing::{debug, trace, warn};

use crate::ClientData;

const DATA_SOCKET_KEY: &str = "data";

pub async fn socket_handler(
    cancel_token: CancellationToken,
    mut data_channel: broadcast::Receiver<ClientData>,
    upload_ratio: u8,
    io: SocketIo,
) {
    let mut upload_counter = 0u8;
    loop {
        tokio::select! {
            _ = cancel_token.cancelled() => {
                debug!("Shutting down socket handler!");
                break;
            },
            Ok(data) = data_channel.recv() => {
                send_socket_msg(&data, &mut upload_counter, upload_ratio, &io, DATA_SOCKET_KEY);
            }
        }
    }
}
#[derive(Serialize)]
struct TimerData {
    pub topic: &'static str,
    pub last_change: DateTime<Utc>,
    pub last_value: f32,
}
const TIMER_SOCKET_KEY: &str = "timers";
const TIMERS_TOPICS: &[&str] = &[
    "BMS/Status/Balancing",
    "BMS/Status/State",
    "BMS/Charging/Control",
];

#[derive(Serialize)]
struct FaultData {
    pub topic: &'static str,
    pub name: String,
    pub occured_at: DateTime<Utc>,
}
const FAULT_SOCKET_KEY: &str = "faults";

pub async fn socket_handler_with_metadata(
    cancel_token: CancellationToken,
    mut data_channel: broadcast::Receiver<ClientData>,
    upload_ratio: u8,
    io: SocketIo,
) {
    let mut upload_counter = 0u8;

    // INTERVAL TIMERS for periodic things to be sent
    let mut view_interval = tokio::time::interval(Duration::from_secs(3));
    let mut timers_interval = tokio::time::interval(Duration::from_secs(3));

    // init timers
    let mut timer_map: HashMap<String, TimerData> = HashMap::new();
    for item in TIMERS_TOPICS {
        timer_map.insert(
            item.to_string(),
            TimerData {
                topic: item,
                last_change: DateTime::UNIX_EPOCH,
                last_value: 0.0f32,
            },
        );
    }

    // init faults
    let fault_regex: Regex = Regex::new(r"(BMS/Status/F/*|Charger/Box/F_*|MPU/Fault/F_*")
        .expect("Could not compile regex!");
    const FAULT_BINS: &[&str] = &["DTI/Fault/FaultCode"];
    let mut fault_ringbuffer = AllocRingBuffer::<FaultData>::new(25);

    loop {
        tokio::select! {
            _ = cancel_token.cancelled() => {
                debug!("Shutting down socket handler!");
                break;
            },
            Ok(data) = data_channel.recv() => {
                send_socket_msg(
                    &data,
                    &mut upload_counter,
                    upload_ratio,
                    &io,
                    DATA_SOCKET_KEY,
                );

                // check to see if we fit a timer case, and then act upon it
                if let Some(time) = timer_map.get_mut(&data.name) {
                    let new_val = *data.values.first().unwrap_or(&-1f32);
                    if time.last_value != new_val {
                        time.last_value = new_val;
                        time.last_change = Utc::now();
                    }
                    continue;
                }

                if fault_regex.is_match(&data.name) {
                    //fault_ringbuffer.push()
                } else {

                }

            }
            _ = timers_interval.tick() => {
                trace!("Sending Timers Intervals!");
                for item in timer_map.values() {
                    send_socket_msg(item, &mut upload_counter, upload_ratio, &io, TIMER_SOCKET_KEY);
                }

            },
            _ = view_interval.tick() => {
                    trace!("Updating viewership data!");
                    let sockets = io.sockets();
                    let sockets_cnt = match sockets {
                        Ok(s) => s.len() as f32,
                        Err(_) => -1f32,
                    };
                    let item = ClientData {
                        name: "Argos/Viewers".to_string(),
                        node: "Internal".to_string(),
                        unit: "".to_string(),
                        run_id: crate::RUN_ID.load(Ordering::Relaxed),
                        timestamp: chrono::offset::Utc::now(),
                        values: vec![sockets_cnt]
                    };
                    send_socket_msg(
                        &item,
                        &mut upload_counter,
                        upload_ratio,
                        &io,
                        DATA_SOCKET_KEY,
                    );
            }
        }
    }
}

/// Sends a message to the socket, printing and IGNORING any error that may occur
/// * `client_data` - The client data to send over the broadcast
/// * `upload_counter` - The counter of data that has been uploaded, for basic rate limiting
/// * `upload-ratio` - The rate limit ratio
/// * `io` - The socket to upload to
/// * `socket_key` - The socket key to send to
fn send_socket_msg<T>(
    client_data: &T,
    upload_counter: &mut u8,
    upload_ratio: u8,
    io: &SocketIo,
    socket_key: &'static str,
) where
    T: Serialize,
{
    *upload_counter = upload_counter.wrapping_add(1);
    if *upload_counter >= upload_ratio {
        match io.emit(
            socket_key,
            serde_json::to_string(client_data).expect("Could not serialize ClientData"),
        ) {
            Ok(_) => (),
            Err(err) => match err {
                socketioxide::BroadcastError::Socket(e) => {
                    trace!("Socket: Transmit error: {:?}", e);
                }
                socketioxide::BroadcastError::Serialize(_) => {
                    warn!("Socket: Serialize error: {}", err)
                }
                socketioxide::BroadcastError::Adapter(_) => {
                    warn!("Socket: Adapter error: {}", err)
                }
            },
        }
    } else {
        trace!("Discarding message!");
    }
}
