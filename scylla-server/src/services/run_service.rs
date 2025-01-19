use crate::{models::Run, schema::run::dsl::*, Database};
use chrono::{DateTime, Utc};
use clap::builder::Str;
use diesel::prelude::*;
use diesel_async::RunQueryDsl;

/// Gets all runs
/// * `db` - The prisma client to make the call to
///   returns: A result containing the data or the QueryError propogated by the db
pub async fn get_all_runs(db: &mut Database<'_>) -> Result<Vec<Run>, diesel::result::Error> {
    run.order(id.asc()).get_results(db).await
}

/// Gets a single run by its id
/// * `db` - The prisma client to make the call to
/// * `run_id` - The id of the run to search for
///   returns: A result containing the data (or None if the `run_id` was not a valid run) or the QueryError propogated by the db
pub async fn get_run_by_id(
    db: &mut Database<'_>,
    run_id: i32,
) -> Result<Option<Run>, diesel::result::Error> {
    run.find(run_id).first::<Run>(db).await.optional()
}

/// Creates a run
/// * `db` - The prisma client to make the call to
/// * `timestamp` - time when the run starts
///   returns: A result containing the data or the QueryError propogated by the db
pub async fn create_run(
    db: &mut Database<'_>,
    timestamp: DateTime<Utc>,
) -> Result<Run, diesel::result::Error> {
    diesel::insert_into(run)
        .values(time.eq(timestamp))
        .get_result(db)
        .await
}

/// Creates a run with a given id
/// * `db` - The prisma client to make the call to
/// * `timestamp` - time when the run starts
/// * `run_id` - The id of the run to create, must not already be in use!
///   returns: A result containing the data or the QueryError propogated by the db
pub async fn create_run_with_id(
    db: &mut Database<'_>,
    timestamp: DateTime<Utc>,
    run_id: i32,
) -> Result<Run, diesel::result::Error> {
    diesel::insert_into(run)
        .values((time.eq(timestamp), id.eq(run_id)))
        .get_result(db)
        .await
}

/// Updates a run with GPS points
/// * `db` - The prisma client to make the call to
/// * `run_id` - The run id to upsert
/// * `lat` - The latitude
/// * `long` - The longitude
pub async fn update_run_with_coords(
    db: &mut Database<'_>,
    run_id: i32,
    lat: f64,
    long: f64,
) -> Result<Run, diesel::result::Error> {
    diesel::update(run.filter(id.eq(run_id)))
        .set((latitude.eq(lat), longitude.eq(long)))
        .get_result(db)
        .await
}

/// Creates a run with a run note
/// * `db` - The prisma client to make the call to
/// * `run_id` - The id of the run to search for
/// * `run_note` - The updated run note
pub async fn create_run_with_note(
    db: &mut Database<'_>,
    timestamp: DateTime<Utc>,
    run_note: String,
) -> Result<Run, diesel::result::Error> {
    diesel::insert_into(run)
        .values((time.eq(timestamp), notes.eq(run_note)))
        .get_result(db)
        .await
}

/// Updates a run note with a given run id
/// * `db` - The prisma client to make the call to
/// * `run_id` - The id of the run to search for
/// * `run_note` - The updated run note
pub async fn update_run_note_with_run_id(
    db: &mut Database<'_>,
    run_id: i32,
    run_note: String,
) -> Result<Run, diesel::result::Error> {
    diesel::update(run.filter(id.eq(run_id)))
        .set(notes.eq(run_note))
        .get_result(db)
        .await
}
