use axum::{extract::State, Json};

use crate::{
    error::ScyllaError, services::data_type_service,
    transformers::data_type_transformer::PublicDataType, PoolHandle,
};

/// Get a list of data types
pub async fn get_all_data_types(
    State(pool): State<PoolHandle>,
) -> Result<Json<Vec<PublicDataType>>, ScyllaError> {
    let mut db = pool.get()?;
    let data_types = data_type_service::get_all_data_types(&mut db).await?;

    let transformed_data_types: Vec<PublicDataType> =
        data_types.into_iter().map(PublicDataType::from).collect();

    Ok(Json::from(transformed_data_types))
}
