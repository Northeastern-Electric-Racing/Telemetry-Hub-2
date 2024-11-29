use std::{sync::atomic::Ordering, time::Duration};

use serde::Serialize;
use socketioxide::SocketIo;
use tokio::sync::broadcast;
use tokio_util::sync::CancellationToken;
use tracing::{debug, trace, warn};

use crate::ClientData;

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
                send_socket_msg(data, &mut upload_counter, upload_ratio, &io);
            }
        }
    }
}

pub async fn socket_handler_with_metadata(
    cancel_token: CancellationToken,
    mut data_channel: broadcast::Receiver<ClientData>,
    upload_ratio: u8,
    io: SocketIo,
) {
    let mut upload_counter = 0u8;

    // INTERVAL TIMERS for periodic things to be sent
    let mut view_interval = tokio::time::interval(Duration::from_secs(3));

    loop {
        // each function in this select returns one or more client_data objects
        let send_items: Vec<ClientData> = tokio::select! {
            _ = cancel_token.cancelled() => {
                debug!("Shutting down socket handler!");
                break;
            },
            Ok(data) = data_channel.recv() => {
                vec![data]
            }
            _ = view_interval.tick() => {
                    trace!("Updating viewership data!");
                    let sockets = io.sockets();
                    let sockets_cnt = match sockets {
                        Ok(s) => s.len() as f32,
                        Err(_) => -1f32,
                    };
                    vec![ClientData {
                        name: "Viewers".to_string(),
                        node: "Internal".to_string(),
                        unit: "".to_string(),
                        run_id: crate::RUN_ID.load(Ordering::Relaxed),
                        timestamp: chrono::offset::Utc::now(),
                        values: vec![sockets_cnt]
                    }]
            }
        };
        for item in send_items {
            send_socket_msg(item, &mut upload_counter, upload_ratio, &io);
        }
    }
}

/// Sends a message to the socket, printing and IGNORING any error that may occur
/// * `client_data` - The client data to send over the broadcast
/// * `upload_counter` - The counter of data that has been uploaded, for basic rate limiting
/// * `upload-ratio` - The rate limit ratio
/// * `io` - The socket to upload to
fn send_socket_msg<T>(client_data: T, upload_counter: &mut u8, upload_ratio: u8, io: &SocketIo)
where
    T: Serialize,
{
    *upload_counter = upload_counter.wrapping_add(1);
    if *upload_counter >= upload_ratio {
        match io.emit(
            "message",
            serde_json::to_string(&client_data).expect("Could not serialize ClientData"),
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
