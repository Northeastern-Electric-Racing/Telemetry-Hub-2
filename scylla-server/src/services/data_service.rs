use crate::{
    models::Data,
    schema::{self, data, run},
    ClientData, Database,
};
use diesel::{dsl::insert_into, prelude::*};

/// Get datapoints that mach criteria
/// * `db` - The database connection to use
/// * `data_type_name` - The data type name to filter the data by
/// * `run_id` - The run id to filter the data
///   returns: A result containing the data or the error propogated by the db
pub async fn get_data(
    db: &mut Database,
    data_type_name: String,
    run_id: i32,
) -> Result<Vec<Data>, diesel::result::Error> {
    data::table
        .filter(
            data::runId
                .eq(run_id)
                .and(data::dataTypeName.eq(data_type_name)),
        )
        .load(db)
}

/// Adds a datapoint
/// * `db` - The database connection to use
/// * `serverdata` - The protobuf message to parse, note the unit is ignored!
/// * `unix_time` - The time im miliseconds since unix epoch of the message
/// * `data_type_name` - The name of the data type, note this data type must already exist!
/// * `rin_id` - The run id to assign the data point to, note this run must already exist!
///   returns: A result containing the data or the QueryError propogated by the db
pub async fn add_data(
    db: &mut Datab``ase,
    client_data: ClientData,
) -> Result<Data, diesel::result::Error> {
    use schema::data::dsl::*;
    insert_into(data)
        .values((
            dataTypeName.eq(client_data.name),
            time.eq(client_data.timestamp),
            runId.eq(client_data.run_id),
            values.eq(client_data
                .values
                .iter()
                .map(|v| Some(*v as f64))
                .collect::<Vec<_>>()),
        ))
        .get_result(db)
}

/// Adds many datapoints via a batch insert
/// * `db` - The database connection to use
/// * `client_data` - A list of data to batch insert
///   returns: A result containing the number of rows inserted or the QueryError propogated by the db
pub async fn add_many(
    db: &mut Database,
    client_data: Vec<ClientData>,
) -> Result<Vec<Data>, diesel::result::Error> {
    use schema::data::dsl::*;

    insert_into(data)
        .values(
            client_data
                .iter()
                .map(|single_client_data| {
                    (
                        dataTypeName.eq(single_client_data.name.clone()),
                        time.eq(single_client_data.timestamp),
                        runId.eq(single_client_data.run_id),
                        values.eq(single_client_data
                            .values
                            .iter()
                            .map(|v| Some(*v as f64))
                            .collect::<Vec<_>>()),
                    )
                })
                .collect::<Vec<_>>(),
        )
        .get_results(db)
}
