use crate::{models::Run, schema::run::dsl::*, Database, LocationData};
use chrono::{DateTime, Utc};
use diesel::prelude::*;

/// Gets all runs
/// * `db` - The prisma client to make the call to
///   returns: A result containing the data or the QueryError propogated by the db
pub async fn get_all_runs(db: &mut Database) -> Result<Vec<Run>, diesel::result::Error> {
    run.load(db)
}

/// Gets a single run by its id
/// * `db` - The prisma client to make the call to
/// * `run_id` - The id of the run to search for
///   returns: A result containing the data (or None if the `run_id` was not a valid run) or the QueryError propogated by the db
pub async fn get_run_by_id(
    db: &mut Database,
    run_id: i32,
) -> Result<Option<Run>, diesel::result::Error> {
    run.find(run_id).first(db).optional()
}

/// Creates a run
/// * `db` - The prisma client to make the call to
/// * `timestamp` - time when the run starts
///   returns: A result containing the data or the QueryError propogated by the db
pub async fn create_run(
    db: &mut Database,
    timestamp: DateTime<Utc>,
) -> Result<Run, diesel::result::Error> {
    diesel::insert_into(run)
        .values((time.eq(timestamp), notes.eq("A")))
        .get_result(db)
}

/// Creates a run with a given id
/// * `db` - The prisma client to make the call to
/// * `timestamp` - time when the run starts
/// * `run_id` - The id of the run to create, must not already be in use!
///   returns: A result containing the data or the QueryError propogated by the db
pub async fn create_run_with_id(
    db: &mut Database,
    timestamp: DateTime<Utc>,
    run_id: i32,
) -> Result<Run, diesel::result::Error> {
    diesel::insert_into(run)
        .values((time.eq(timestamp), id.eq(run_id), notes.eq("A")))
        .get_result(db)
}
