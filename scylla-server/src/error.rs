use axum::{
    http::StatusCode,
    response::{IntoResponse, Response},
};
use tracing::warn;

use crate::services;

pub enum ScyllaError {
    /// Deseil error
    DbError(services::DbError),
    /// Diesel db connection error,
    ConnError(deadpool_diesel::PoolError),
    /// An instruction was not encodable
    InvalidEncoding(String),
    /// Could not communicate to car
    CommFailure(String),
    /// A query turned up empty that should not have
    EmptyResult,
}

impl From<services::DbError> for ScyllaError {
    fn from(error: services::DbError) -> Self {
        ScyllaError::DbError(error)
    }
}

impl From<deadpool_diesel::PoolError> for ScyllaError {
    fn from(error: deadpool_diesel::PoolError) -> Self {
        ScyllaError::ConnError(error)
    }
}

// This centralizes all different errors from our app in one place
impl IntoResponse for ScyllaError {
    fn into_response(self) -> Response {
        let (status, reason) = match self {
            ScyllaError::ConnError(error) => (
                StatusCode::INTERNAL_SERVER_ERROR,
                format!("Could not connect to db: {}", error),
            ),
            ScyllaError::DbError(error) => (
                StatusCode::BAD_REQUEST,
                format!("Misc query error: {:?}", error),
            ),
            ScyllaError::InvalidEncoding(reason) => (StatusCode::UNPROCESSABLE_ENTITY, reason),
            ScyllaError::CommFailure(reason) => (StatusCode::BAD_GATEWAY, reason),
            ScyllaError::EmptyResult => (
                StatusCode::NOT_FOUND,
                "Fetched an empty result that should not be!".to_string(),
            ),
        };

        warn!("Routing error: {}: {}", status, reason);

        (status, reason).into_response()
    }
}
