use crate::{models::DataType, schema::dataType::dsl::*, Database};
use diesel::prelude::*;

use super::DbError;

/// Gets all datatypes
/// * `d ` - The connection to the database
///   returns: A result containing the data or the QueryError propogated by the db
pub async fn get_all_data_types(db: Database) -> Result<Vec<DataType>, DbError> {
    Ok(db.interact(move |conn| dataType.load(conn)).await??)
}

/// Upserts a datatype, either creating or updating one depending on its existence
/// * `db` - The database connection to use
/// * `data_type_name` - The data type name to upsert
/// * `unit` - The unit of the data
/// * `node_name` - The name of the node linked to the data type, must already exist!
///   returns: A result containing the data or the QueryError propogated by the db
pub async fn upsert_data_type(
    db: Database,
    data_type_name: String,
    new_unit: String,
    node_name: String,
) -> Result<DataType, DbError> {
    let val = DataType {
        name: data_type_name,
        unit: new_unit,
        nodeName: node_name,
    };
    Ok(db
        .interact(move |conn| {
            diesel::insert_into(dataType)
                .values(&val)
                .on_conflict(name)
                .do_update() // actually allows for the upsert ability
                .set(&val)
                .returning(DataType::as_returning())
                .get_result(conn)
        })
        .await??)
}
