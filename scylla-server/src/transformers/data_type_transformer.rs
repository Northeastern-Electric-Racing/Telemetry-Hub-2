use serde::Serialize;

use crate::services::{data_service, data_type_service, node_service};

/// The struct defining the data type format sent to the client
#[derive(Serialize, Debug, PartialEq, Eq, Hash, Clone)]
pub struct PublicDataType {
    pub name: String,
    pub unit: String,
}

impl From<&data_type_service::public_datatype::Data> for PublicDataType {
    fn from(value: &data_type_service::public_datatype::Data) -> Self {
        PublicDataType {
            name: value.name.clone(),
            unit: value.unit.clone(),
        }
    }
}

impl From<&node_service::public_node::data_types::Data> for PublicDataType {
    fn from(value: &node_service::public_node::data_types::Data) -> Self {
        PublicDataType {
            name: value.name.clone(),
            unit: value.unit.clone(),
        }
    }
}

impl From<&data_service::public_data_with_data_type::Data> for PublicDataType {
    fn from(value: &data_service::public_data_with_data_type::Data) -> Self {
        PublicDataType {
            name: value.data_type_name.clone(),
            unit: value.data_type.unit.clone(),
        }
    }
}
