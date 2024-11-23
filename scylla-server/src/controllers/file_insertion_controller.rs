use axum::extract::{Multipart, State};
use axum_macros::debug_handler;
use chrono::DateTime;
use protobuf::CodedInputStream;
use rangemap::RangeInclusiveMap;
use tokio_util::bytes::Buf;
use tracing::{debug, info, trace};

use crate::{
    error::ScyllaError,
    playback_data,
    services::{data_service, run_service},
    ClientData, PoolHandle,
};

// super cool: adding this tag tells you what variable is misbehaving in cases of axum Send+Sync Handler fails
#[debug_handler]
pub async fn insert_file(
    State(pool): State<PoolHandle>,
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

        debug!("Mapping data to ClientData type, with inferred run IDs!");
        let new_data: Vec<ClientData> = insertable_data
            .into_iter()
            .map(|f| match run_rng.get(&f.time_us) {
                Some(a) => ClientData {
                    run_id: *a,
                    name: f.topic.clone(),
                    unit: f.unit,
                    values: f.values,
                    timestamp: DateTime::from_timestamp_micros(f.time_us as i64).unwrap(),
                    node: f.topic.split_once('/').unwrap_or_default().0.to_owned(),
                },
                None => ClientData {
                    run_id: -1,
                    name: f.topic.clone(),
                    unit: f.unit,
                    values: f.values,
                    timestamp: DateTime::from_timestamp_micros(f.time_us as i64).unwrap(),
                    node: f.topic.split_once('/').unwrap_or_default().0.to_owned(),
                },
            })
            .collect();
        info!(
            "Inserting {} points, {} of which have no run ID (-1).",
            new_data.len(),
            new_data
                .iter()
                .filter(|x| x.run_id == -1)
                .collect::<Vec<_>>()
                .len()
        );
        data_service::add_many(&mut db, new_data).await?;
    }
    Ok("Successfully inserted all!".to_string())
}
