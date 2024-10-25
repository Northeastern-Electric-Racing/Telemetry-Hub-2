use std::sync::atomic::Ordering;

use axum::{
    extract::{Path, State},
    Json,
};

use crate::{
    error::ScyllaError, services::run_service, transformers::run_transformer::PublicRun, Database,
};

/// get a list of runs
pub async fn get_all_runs(State(db): State<Database>) -> Result<Json<Vec<PublicRun>>, ScyllaError> {
    let run_data = run_service::get_all_runs(&db).await?;

    let transformed_run_data: Vec<PublicRun> = run_data.iter().map(PublicRun::from).collect();

    Ok(Json::from(transformed_run_data))
}

/// get a run given its ID
pub async fn get_run_by_id(
    State(db): State<Database>,
    Path(run_id): Path<i32>,
) -> Result<Json<PublicRun>, ScyllaError> {
    let run_data = run_service::get_run_by_id(&db, run_id).await?;

    if run_data.is_none() {
        return Err(ScyllaError::EmptyResult);
    }

    let run_data_safe = run_data.unwrap();

    let transformed_run_data = PublicRun::from(&run_data_safe);

    Ok(Json::from(transformed_run_data))
}

/// create a new run with an auto-incremented ID
/// note the new run must be updated so the channel passed in notifies the data processor to use the new run
pub async fn new_run(State(db): State<Database>) -> Result<Json<PublicRun>, ScyllaError> {
    let run_data = run_service::create_run(&db, chrono::offset::Utc::now()).await?;

    crate::RUN_ID.store(run_data.id, Ordering::Relaxed);

    Ok(Json::from(PublicRun::from(&run_data)))
}
