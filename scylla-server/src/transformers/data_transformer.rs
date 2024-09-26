use std::cmp::Ordering;

use serde::Serialize;

use crate::{processors::ClientData, services::data_service};

/// The struct defining the data format sent to the client
#[derive(Serialize, Debug)]
pub struct PublicData {
    #[serde(rename = "time")]
    pub time_ms: i64,
    pub values: Vec<f64>,
}
// custom impls to avoid comparing values fields
impl Ord for PublicData {
    fn cmp(&self, other: &Self) -> Ordering {
        self.time_ms.cmp(&other.time_ms)
    }
}

impl PartialOrd for PublicData {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        Some(self.cmp(other))
    }
}

impl PartialEq for PublicData {
    fn eq(&self, other: &Self) -> bool {
        self.time_ms == other.time_ms
    }
}

impl Eq for PublicData {}

#[derive(Serialize, Debug, PartialEq, Eq, PartialOrd, Ord)]
pub struct PublicDataWithDataType {
    pub time: i64,
    pub values: Vec<String>,
    pub dataTypeName: String,
}

#[derive(Serialize, Debug, PartialEq, Eq, PartialOrd, Ord)]
pub struct PublicDataWithDataType {
    pub time: i64,
    pub values: Vec<String>,
    pub dataTypeName: String,
}

/// convert the prisma type to the client type for JSON encoding
impl From<&data_service::public_data::Data> for PublicData {
    fn from(value: &data_service::public_data::Data) -> Self {
        PublicData {
            values: value.values.clone(),
            time_ms: value.time.timestamp_millis(),
        }
    }
}

/// convert the prisma type to the client type for JSON encoding
impl From<&data_service::public_data_with_dataType::Data> for PublicDataWithDataType {
    fn from(value: &data_service::public_data_with_dataType::Data) -> Self {
        PublicDataWithDataType {
            values: value.values.iter().map(f64::to_string).collect(),
            time: value.time.timestamp_millis(),
            dataTypeName: value.data_type_name.clone(),
        }
    }
}

/// convert the prisma type to the client type for JSON encoding
impl From<&data_service::public_data_with_dataType::Data> for PublicDataWithDataType {
    fn from(value: &data_service::public_data_with_dataType::Data) -> Self {
        PublicDataWithDataType {
            values: value.values.iter().map(f64::to_string).collect(),
            time: value.time.timestamp_millis(),
            dataTypeName: value.data_type_name.clone(),
        }
    }
}

/// convert from the client (socket) type to the client type, for debugging and testing only probably
impl From<ClientData> for PublicData {
    fn from(value: ClientData) -> Self {
        PublicData {
            time_ms: value.timestamp.timestamp_millis(),
            values: value.values.iter().map(|f| *f as f64).collect(),
        }
    }
}
