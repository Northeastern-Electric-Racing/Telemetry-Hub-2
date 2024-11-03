use std::collections::HashMap;

use serde::Serialize;

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
#[derive(Serialize, PartialEq)]
pub struct PublicNodeWithData {
    name: String,
    #[serde(rename = "dataOverTime")]
    data_over_time: HashMap<PublicDataType, Vec<PublicData>>,
}

impl From<(String, Vec<data_service::public_data_with_data_type::Data>)> for PublicNodeWithData {
    fn from(value: (String, Vec<data_service::public_data_with_data_type::Data>)) -> Self {
        let node_name = value.0;
        let data = value.1;

        let mut condensed_data_types: HashMap<PublicDataType, Vec<PublicData>> = HashMap::new();

        let mut recent_data_type: Option<PublicDataType> = None;
        for data_with_data_type in data.iter() {
            if let Some(ref recent_data_type_ref) = recent_data_type {
                if data_with_data_type.data_type_name == recent_data_type_ref.name {
                    condensed_data_types
                        .entry(recent_data_type_ref.clone())
                        .and_modify(|public_data_vec| {
                            public_data_vec.push(PublicData::from(data_with_data_type))
                        });
                    continue;
                }
            }

            // If recent_data_type is None or a new data type is found
            let public_data_type = PublicDataType::from(data_with_data_type);
            let mut data_list = Vec::new();
            data_list.push(PublicData::from(data_with_data_type));

            condensed_data_types.insert(public_data_type.clone(), data_list);
            recent_data_type = Some(public_data_type.clone());
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
