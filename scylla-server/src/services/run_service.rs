use crate::{models::Run, schema::run::dsl::*, Database};
use chrono::{DateTime, Utc};
use diesel::prelude::*;

use super::DbError;

/// Gets all runs
/// * `db` - The prisma client to make the call to
///   returns: A result containing the data or the QueryError propogated by the db
pub async fn get_all_runs(db: Database) -> Result<Vec<Run>, DbError> {
    Ok(db
        .interact(move |conn| run.order(id.asc()).get_results(conn))
        .await??)
}

/// Gets a single run by its id
/// * `db` - The prisma client to make the call to
/// * `run_id` - The id of the run to search for
///   returns: A result containing the data (or None if the `run_id` was not a valid run) or the QueryError propogated by the db
pub async fn get_run_by_id(db: Database, run_id: i32) -> Result<Option<Run>, DbError> {
    Ok(Ok(db
        .interact(move |conn| run.find(run_id).first::<Run>(conn))
        .await??)
    .optional()?)
}

/// Creates a run
/// * `db` - The prisma client to make the call to
/// * `timestamp` - time when the run starts
///   returns: A result containing the data or the QueryError propogated by the db
pub async fn create_run(db: Database, timestamp: DateTime<Utc>) -> Result<Run, DbError> {
    Ok(db
        .interact(move |conn| {
            diesel::insert_into(run)
                .values(time.eq(timestamp))
                .get_result(conn)
        })
        .await??)
}

/// Creates a run with a given id
/// * `db` - The prisma client to make the call to
/// * `timestamp` - time when the run starts
/// * `run_id` - The id of the run to create, must not already be in use!
///   returns: A result containing the data or the QueryError propogated by the db
pub async fn create_run_with_id(
    db: Database,
    timestamp: DateTime<Utc>,
    run_id: i32,
) -> Result<Run, DbError> {
    Ok(db
        .interact(move |conn| {
            diesel::insert_into(run)
                .values((time.eq(timestamp), id.eq(run_id)))
                .get_result(conn)
        })
        .await??)
}

/// Updates a run with GPS points
/// * `db` - The prisma client to make the call to
/// * `run_id` - The run id to upsert
/// * `lat` - The latitude
/// * `long` - The longitude
pub async fn update_run_with_coords(
    db: Database,
    run_id: i32,
    lat: f64,
    long: f64,
) -> Result<Run, DbError> {
    Ok(db
        .interact(move |conn| {
            diesel::update(run.filter(id.eq(run_id)))
                .set((latitude.eq(lat), longitude.eq(long)))
                .get_result(conn)
        })
        .await??)
}
