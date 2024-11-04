use axum::{
    extract::{Path, State},
    Json,
};
use chrono::DateTime;

use crate::{
    error::ScyllaError,
    services::{data_service, node_service},
    transformers::node_transformer::{PublicNode, PublicNodeWithData},
    Database,
};

/// get a list of nodes
pub async fn get_all_nodes(
    State(db): State<Database>,
) -> Result<Json<Vec<PublicNode>>, ScyllaError> {
    let node_data = node_service::get_all_nodes(&db).await?;

    let transformed_node_data: Vec<PublicNode> = node_data.iter().map(PublicNode::from).collect();

    Ok(Json::from(transformed_node_data))
}

/// get a list of all the data for the given node, within the time period specified
/// returns a datatype (with an actual list of data inside it) (not the weird)
pub async fn get_full_nodes_within_range(
    State(db): State<Database>,
    Path((node_name, datetime)): Path<(String, String)>,
) -> Result<Json<Vec<PublicNodeWithData>>, ScyllaError> {
    let mut tranformed_data: Vec<PublicNodeWithData> = Vec::new();

    // Get the data for each node_name, and clean it up for return to the route.
    // for node_name in node_names.iter() {
    // Get the all data for the given node name (list of data with data type names and unit)
    let data =
        data_service::get_data_for_node_name_within_range(&db, node_name.clone(), datetime).await?;

    let one_node_transformed_data = PublicNodeWithData::from((node_name.clone(), data));

    tranformed_data.push(one_node_transformed_data);

    Ok(Json::from(tranformed_data))
}
