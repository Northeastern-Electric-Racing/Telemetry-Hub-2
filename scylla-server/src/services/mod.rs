pub mod data_service;
pub mod data_type_service;
pub mod run_service;

#[derive(Debug)]
pub enum DbError {
    DieselError(diesel::result::Error),
    ClosureError(deadpool_diesel::InteractError),
}

impl From<diesel::result::Error> for DbError {
    fn from(error: diesel::result::Error) -> Self {
        DbError::DieselError(error)
    }
}

impl From<deadpool_diesel::InteractError> for DbError {
    fn from(error: deadpool_diesel::InteractError) -> Self {
        DbError::ClosureError(error)
    }
}
