use diesel::prelude::*;
use dotenvy::dotenv;
use scylla_server::{
    schema::{data, dataType, run},
    Database,
};

pub async fn cleanup_and_prepare() -> Result<Database, diesel::result::Error> {
    dotenv().ok();

    let database_url = std::env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    let mut client = PgConnection::establish(&database_url)
        .unwrap_or_else(|_| panic!("Error connecting to {}", database_url));

    diesel::delete(data::table).execute(&mut client)?;

    diesel::delete(dataType::table).execute(&mut client)?;

    diesel::delete(run::table).execute(&mut client)?;

    Ok(client)
}
