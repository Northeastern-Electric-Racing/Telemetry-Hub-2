use crate::{models::DataType, schema::dataType, Database};
use diesel::{associations::HasTable, prelude::*};

/// Gets all datatypes
/// * `d ` - The connection to the database
///   returns: A result containing the data or the QueryError propogated by the db
pub async fn get_all_data_types(db: &mut Database) -> Result<Vec<DataType>, diesel::result::Error> {
    dataType::table.load(db)
}

/// Upserts a datatype, either creating or updating one depending on its existence
/// * `db` - The database connection to use
/// * `data_type_name` - The data type name to upsert
/// * `unit` - The unit of the data
/// * `node_name` - The name of the node linked to the data type, must already exist!
///   returns: A result containing the data or the QueryError propogated by the db
pub async fn upsert_data_type(
    db: &mut Database,
    data_type_name: String,
    unit: String,
    node_name: String,
) -> Result<DataType, diesel::result::Error> {
    let val = DataType {
        name: data_type_name,
        unit,
        nodeName: node_name,
    };
    diesel::insert_into(dataType::table)
        .values(&val)
        .on_conflict(dataType::name)
        .do_update()
        .set(&val)
        .returning(DataType::as_returning())
        .get_result(db)
}
