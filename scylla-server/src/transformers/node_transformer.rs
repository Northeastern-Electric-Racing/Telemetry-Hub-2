use std::collections::HashMap;

use serde::Serialize;
use serde_with::serde_as;

use crate::services::{data_service, node_service};

use super::{data_transformer::PublicData, data_type_transformer::PublicDataType};

/// The struct defining the node format sent to the client
#[derive(Serialize, PartialEq)]
pub struct PublicNode {
    name: String,
    #[serde(rename = "dataTypes")]
    data_types: Vec<PublicDataType>,
}
/// The struct defining the node format sent to the client
#[serde_as]
#[derive(Serialize, PartialEq)]
pub struct PublicNodeWithData {
    name: String,
    #[serde(rename = "dataOverTime")]
    #[serde_as(as = "Vec<(_, _)>")]
    data_over_time: HashMap<PublicDataType, Vec<PublicData>>,
}

impl From<(String, Vec<data_service::public_data_with_data_type::Data>)> for PublicNodeWithData {
    fn from(value: (String, Vec<data_service::public_data_with_data_type::Data>)) -> Self {
        let node_name = value.0;
        let data = value.1;

        let mut condensed_data_types: HashMap<PublicDataType, Vec<PublicData>> = HashMap::new();

        for data_with_data_type in data.iter() {
            let public_data_type = PublicDataType::from(data_with_data_type);

            // Check if `public_data_type` already exists in the map
            condensed_data_types
                .entry(public_data_type.clone())
                .or_insert_with(Vec::new) // Initialize an empty vector if entry doesn't exist
                .push(PublicData::from(data_with_data_type));
        }

        PublicNodeWithData {
            name: node_name,
            data_over_time: condensed_data_types,
        }
    }
}

impl From<&node_service::public_node::Data> for PublicNode {
    fn from(value: &node_service::public_node::Data) -> Self {
        PublicNode {
            name: value.name.clone(),
            data_types: value
                .data_types
                .clone()
                .iter()
                .map(PublicDataType::from)
                .collect(),
        }
    }
}
