use serde::Serialize;

/// The struct defining the run format sent to the client
#[derive(Serialize, Debug, PartialEq)]
pub struct PublicRun {
    pub id: i32,
    #[serde(rename = "locationName")]
    pub location_name: String,
    #[serde(rename = "driverName")]
    pub driver_name: String,
    #[serde(rename = "systemName")]
    pub system_name: String,
    #[serde(rename = "time")]
    pub time_ms: i64,
}

impl From<crate::models::Run> for PublicRun {
    fn from(value: crate::models::Run) -> Self {
        PublicRun {
            id: value.id,
            location_name: value.locationName.unwrap_or_default(),
            driver_name: value.driverName.clone().unwrap_or_default(),
            system_name: value.driverName.unwrap_or_default(), // TODO no system name
            time_ms: value.time.timestamp_millis(),
        }
    }
}
