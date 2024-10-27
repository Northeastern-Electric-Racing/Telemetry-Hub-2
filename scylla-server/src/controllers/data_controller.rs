use axum::{
    extract::{Path, State},
    Json,
};

use crate::{
    error::ScyllaError,
    prisma::data_type::node,
    services::data_service::{self, public_data},
    transformers::data_transformer::{PublicData, PublicDataWithDataType},
    Database,
};

/// Get all of the data points of a certain data type name and run ID
pub async fn get_data(
    State(db): State<Database>,
    Path((data_type_name, run_id)): Path<(String, i32)>,
) -> Result<Json<Vec<PublicData>>, ScyllaError> {
    let data = data_service::get_data(&db, data_type_name, run_id).await?;

    // map data to frontend data types according to the From func of the client struct
    let mut transformed_data: Vec<PublicData> = data.iter().map(PublicData::from).collect();
    transformed_data.sort();

    Ok(Json::from(transformed_data))
}

/// Get all of the data points of a certain data type name and run ID
pub async fn get_data_by_datetime(
    State(db): State<Database>,
    Path(datetime): Path<String>,
) -> Result<Json<Vec<PublicDataWithDataType>>, ScyllaError> {
    let data = data_service::get_data_by_datetime(&db, datetime).await?;

    // map data to frontend data types according to the From func of the client struct
    let mut transformed_data: Vec<PublicDataWithDataType> =
        data.iter().map(PublicDataWithDataType::from).collect();
    transformed_data.sort();

    Ok(Json::from(transformed_data))
}

/// get a list of all the data for the given node, within the time period specified
/// returns a datatype (with an actual list of data inside it) (not the weird)
pub async fn get_full_data_types_within_range(
    State(db): State<Database>,
    Path((node_names, from_time, to_time)): Path<(Vec<String>, i64, i64)>,
) -> Result<Json<Vec<PublicData>>, ScyllaError> {
    let data =
        data_service::get_data_for_datatype_name_within_range(&db, node_names, from_time, to_time)
            .await?;

    // map data to frontend data types according to the From func of the client struct
    let mut transformed_data: Vec<PublicData> = data.iter().map(PublicData::from).collect();
    transformed_data.sort();

    Ok(Json::from(transformed_data))
}
