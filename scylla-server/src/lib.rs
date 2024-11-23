use chrono::serde::ts_milliseconds;

pub mod controllers;
pub mod error;
pub mod services;

pub mod db_handler;
pub mod mqtt_processor;

#[allow(non_snake_case)]
pub mod models;
#[allow(non_snake_case)]
pub mod schema;

pub mod command_data;
pub mod serverdata;
pub mod playback_data;

pub mod transformers;

/// The type descriptor of the database passed to the middlelayer through axum state
pub type Database = diesel::PgConnection;

pub type PoolHandle = diesel::r2d2::Pool<diesel::r2d2::ConnectionManager<diesel::PgConnection>>;

#[derive(clap::ValueEnum, Debug, PartialEq, Copy, Clone, Default)]
#[clap(rename_all = "kebab_case")]
pub enum RateLimitMode {
    /// static rate limiting based on a set value
    Static,
    /// no rate limiting
    #[default]
    None,
}

// Atomic to keep track the current run id across EVERYTHING (very scary)
pub static RUN_ID: std::sync::atomic::AtomicI32 = std::sync::atomic::AtomicI32::new(-1);

/// Represents the client data
/// This has the dual purposes of
/// * - representing the packet sent over the socket for live data
/// * - representing the struct for the service layer to unpack for insertion
///     Note: node name is only considered for database storage and convenience, it is not serialized in a socket packet
#[derive(serde::Serialize, Clone, Debug)]
pub struct ClientData {
    #[serde(rename = "runId")]
    pub run_id: i32,
    pub name: String,
    pub unit: String,
    pub values: Vec<f32>,
    /// Client expects time in milliseconds, so serialize as such
    #[serde(with = "ts_milliseconds")]
    pub timestamp: chrono::DateTime<chrono::Utc>,

    /// client doesnt parse node
    #[serde(skip_serializing)]
    pub node: String,
}
