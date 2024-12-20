use axum::{
    extract::{Multipart, State},
    Extension,
};
use axum_macros::debug_handler;
use chrono::DateTime;
use protobuf::CodedInputStream;
use rangemap::RangeInclusiveMap;
use tokio::sync::mpsc;
use tokio_util::bytes::Buf;
use tracing::{debug, info, trace, warn};

use crate::{error::ScyllaError, playback_data, services::run_service, ClientData, PoolHandle};

/// Inserts a file using http multipart
/// This file is parsed and clientdata values are extracted, the run ID of each variable is inferred, and then data is batch uploaded
// super cool: adding this tag tells you what variable is misbehaving in cases of axum Send+Sync Handler fails
#[debug_handler]
pub async fn insert_file(
    State(pool): State<PoolHandle>,
    Extension(batcher): Extension<mpsc::Sender<Vec<ClientData>>>,
    mut multipart: Multipart,
) -> Result<String, ScyllaError> {
    // create a run ID cache
    let mut db = pool.get()?;
    debug!("Warming up run ID map!");
    let mut run_iter = run_service::get_all_runs(&mut db)
        .await?
        .into_iter()
        .map(|f| (f.id, f.time.timestamp_micros() as u64))
        .peekable();
    let mut run_rng: RangeInclusiveMap<u64, i32> = RangeInclusiveMap::new();
    // this actual formulates the list, where keys are ranges of times (us) and the values are the run IDs
    while let Some(it) = run_iter.next() {
        match run_iter.peek() {
            Some(next) => {
                run_rng.insert(it.1..=next.1, it.0);
            }
            // if this is the last item in the list
            None => {
                run_rng.insert(it.1..=u64::MAX, it.0);
                continue;
            }
        }
    }

    // iterate through all files
    while let Some(field) = multipart.next_field().await.unwrap() {
        // round up all of the protobuf segments as a giant list
        let mut data = field.bytes().await.unwrap().reader();
        let mut insertable_data: Vec<playback_data::PlaybackData> = vec![];
        {
            // this cannot be used across an await, hence scoped
            let mut stream = CodedInputStream::new(&mut data);
            loop {
                match stream.read_message::<playback_data::PlaybackData>() {
                    Ok(a) => {
                        trace!("Decoded file msg: {}", a);
                        insertable_data.push(a);
                    }
                    Err(e) => {
                        trace!("Exiting from read loop {}", e);
                        break;
                    }
                }
            }
        }

        let size_before_filter = insertable_data.len();
        debug!("Mapping data to ClientData type, with inferred run IDs!");
        let insertable_data: Vec<ClientData> = insertable_data
            .into_iter()
            .filter_map(|f| match run_rng.get(&f.time_us) {
                Some(a) => Some(ClientData {
                    run_id: *a,
                    name: f.topic.clone(),
                    unit: f.unit,
                    values: f.values,
                    timestamp: DateTime::from_timestamp_micros(f.time_us as i64).unwrap(),
                    node: f.topic.split_once('/').unwrap_or_default().0.to_owned(),
                }),
                None => None,
            })
            .collect();
        info!(
            "Inserting {} points. {} points could not be assigned IDs.",
            insertable_data.len(),
            size_before_filter - insertable_data.len()
        );
        if let Err(err) = batcher.send(insertable_data).await {
            warn!("Error sending file insert data to batcher! {}", err);
        };
    }
    Ok("Successfully sent all to batcher!".to_string())
}