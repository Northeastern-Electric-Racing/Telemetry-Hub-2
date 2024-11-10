use diesel::prelude::*;
use std::vec;

use chrono::{DateTime, Utc};

use crate::{models::Run, schema::run, Database};

/// Gets all runs
/// * `db` - The prisma client to make the call to
///   returns: A result containing the data or the QueryError propogated by the db
pub async fn get_all_runs(db: &mut Database) -> Result<Vec<Run>, diesel::result::Error> {
    run::table.load(db)
}

/// Gets a single run by its id
/// * `db` - The prisma client to make the call to
/// * `run_id` - The id of the run to search for
///   returns: A result containing the data (or None if the `run_id` was not a valid run) or the QueryError propogated by the db
pub async fn get_run_by_id(
    db: &mut Database,
    run_id: i32,
) -> Result<Option<Run>, diesel::result::Error> {
    run::table.find(run_id).first(db)
}

/// Creates a run
/// * `db` - The prisma client to make the call to
/// * `timestamp` - time when the run starts
///   returns: A result containing the data or the QueryError propogated by the db
pub async fn create_run(
    db: &mut Database,
    timestamp: DateTime<Utc>,
) -> Result<Run, diesel::result::Error> {
    db.run()
        .create(timestamp.fixed_offset(), vec![])
        .select(public_run::select())
        .exec()
        .await
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
    db.run()
        .create(timestamp.fixed_offset(), vec![prisma::run::id::set(run_id)])
        .select(public_run::select())
        .exec()
        .await
}
