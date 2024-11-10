use std::sync::atomic::AtomicI32;

use chrono::{DateTime, Utc, serde::ts_milliseconds};
use diesel::PgConnection;

pub mod controllers;
pub mod error;
pub mod services;

pub mod db_handler;
pub mod mqtt_processor;

pub mod models;
pub mod schema;

pub mod command_data;
pub mod serverdata;

/// The type descriptor of the database passed to the middlelayer through axum state
pub type Database = PgConnection;

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
pub static RUN_ID: AtomicI32 = AtomicI32::new(-1);


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
    pub timestamp: DateTime<Utc>,

    /// client doesnt parse node
    #[serde(skip_serializing)]
    pub node: String,
}

/// A final location packet
/// This has the purpose of representing the struct for the service layer to unpack for insertion, and therefore is not serialized
#[derive(Debug)]
struct LocationData {
    location_name: String,
    lat: f32,
    long: f32,
    radius: f32,
}
