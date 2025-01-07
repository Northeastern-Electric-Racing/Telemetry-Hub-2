use diesel::prelude::*;

use crate::{
    models::{Data, DataInsert},
    schema::data::dsl::*,
    ClientData, Database,
};

use super::DbError;

/// Get datapoints that mach criteria
/// * `db` - The database connection to use
/// * `data_type_name` - The data type name to filter the data by
/// * `run_id` - The run id to filter the data
///   returns: A result containing the data or the error propogated by the db
pub async fn get_data(
    db: Database,
    data_type_name: String,
    run_id: i32,
) -> Result<Vec<Data>, DbError> {
    Ok(db
        .interact(move |conn| {
            data.filter(runId.eq(run_id).and(dataTypeName.eq(data_type_name)))
                .load::<Data>(conn)
        })
        .await??)
}

/// Adds a datapoint
/// * `db` - The database connection to use
/// * `serverdata` - The protobuf message to parse, note the unit is ignored!
/// * `unix_time` - The time im miliseconds since unix epoch of the message
/// * `data_type_name` - The name of the data type, note this data type must already exist!
/// * `rin_id` - The run id to assign the data point to, note this run must already exist!
///   returns: A result containing the data or the QueryError propogated by the db
pub async fn add_data(db: Database, client_data: ClientData) -> Result<Data, DbError> {
    Ok(db
        .interact(move |conn| {
            diesel::insert_into(data)
                .values(Into::<DataInsert>::into(client_data))
                .get_result(conn)
        })
        .await??)
}

pub async fn add_many(db: Database, client_data: Vec<ClientData>) -> Result<usize, DbError> {
    Ok(db
        .interact(move |conn| {
            diesel::insert_into(data)
                .values(
                    client_data
                        .into_iter()
                        .map(Into::<DataInsert>::into)
                        .collect::<Vec<DataInsert>>(),
                )
                .on_conflict_do_nothing()
                .execute(conn)
        })
        .await??)
}

pub async fn copy_many(db: Database, client_data: Vec<ClientData>) -> Result<usize, DbError> {
    Ok(db
        .interact(move |conn| {
            diesel::copy_from(data)
                .from_insertable(
                    client_data
                        .into_iter()
                        .map(Into::<DataInsert>::into)
                        .collect::<Vec<DataInsert>>(),
                )
                .execute(conn)
        })
        .await??)
}
