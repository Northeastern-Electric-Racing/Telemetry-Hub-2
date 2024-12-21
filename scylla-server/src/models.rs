use chrono::{DateTime, Utc};
use diesel::prelude::*;
use serde::Serialize;

#[derive(Queryable, Debug, Identifiable, Insertable, Selectable, Serialize, AsChangeset)]
#[diesel(table_name = crate::schema::data)]
#[diesel(belongs_to(DataType, foreign_key = dataTypeName))]
#[diesel(check_for_backend(diesel::pg::Pg))]
#[diesel(primary_key(dataTypeName, time))]
pub struct Data {
    pub values: Option<Vec<Option<f64>>>,
    pub dataTypeName: String,
    pub time: DateTime<Utc>,
    pub runId: i32,
}

#[derive(Queryable, Debug, Identifiable, Insertable, Selectable, Serialize, AsChangeset)]
#[diesel(table_name = crate::schema::dataType)]
#[diesel(primary_key(name))]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct DataType {
    pub name: String,
    pub unit: String,
    pub nodeName: String,
}

#[derive(Queryable, Debug, Identifiable, Insertable, Selectable, Serialize, AsChangeset)]
#[diesel(table_name = crate::schema::run)]
#[diesel(primary_key(id))]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct Run {
    pub id: i32,
    pub locationName: Option<String>,
    pub latitude: Option<f64>,
    pub longitude: Option<f64>,
    pub driverName: Option<String>,
    pub notes: String,
    pub time: DateTime<Utc>,
}
