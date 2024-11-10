use std::cmp::{Eq, Ordering};
use std::hash::Hash;

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

#[derive(Serialize, Debug)]
pub struct PublicDataWithDataType {
    #[serde(rename = "time")]
    pub time: i64,
    pub values: Vec<f64>,
    pub data_type_name: String,
}

// custom impls to avoid comparing values and time fields
// (used for sorting)
impl Ord for PublicDataWithDataType {
    fn cmp(&self, other: &Self) -> Ordering {
        self.data_type_name.cmp(&other.data_type_name)
    }
}

impl PartialOrd for PublicDataWithDataType {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        Some(self.cmp(other))
    }
}

impl PartialEq for PublicDataWithDataType {
    fn eq(&self, other: &Self) -> bool {
        self.data_type_name == other.data_type_name
    }
}

impl Hash for PublicDataWithDataType {
    fn hash<H: std::hash::Hasher>(&self, state: &mut H) {
        self.time.hash(state);
        self.data_type_name.hash(state);
    }

    fn hash_slice<H: std::hash::Hasher>(data: &[Self], state: &mut H)
    where
        Self: Sized,
    {
        for piece in data {
            piece.hash(state)
        }
    }
}

impl Eq for PublicDataWithDataType {}

/// convert the prisma type to the client type for JSON encoding
impl From<&data_service::public_data::Data> for PublicData {
    fn from(value: &data_service::public_data::Data) -> Self {
        PublicData {
            values: value.values.clone(),
            time_ms: value.time.timestamp_millis(),
        }
    }
}

/// For converting just the data relavent to PublicData from the prisma query type
/// convert the prisma type to the client type for JSON encoding
impl From<&data_service::public_data_with_data_type::Data> for PublicData {
    fn from(value: &data_service::public_data_with_data_type::Data) -> Self {
        PublicData {
            values: value.values.clone(),
            time_ms: value.time.timestamp_millis(),
        }
    }
}

/// convert the prisma type to the client type for JSON encoding
impl From<&data_service::public_data_with_data_type::Data> for PublicDataWithDataType {
    fn from(value: &data_service::public_data_with_data_type::Data) -> Self {
        PublicDataWithDataType {
            values: value.values.clone(),
            time: value.time.timestamp_millis(),
            data_type_name: value.data_type_name.clone(),
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
