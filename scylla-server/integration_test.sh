#!/bin/sh
echo "Starting db"
cd ../compose
docker compose up -d odyssey-timescale

cd ../scylla-server
echo "Migrating DB"
diesel migration run

echo "Running tests"
DATABASE_URL=postgresql://postgres:password@127.0.0.1:5432/postgres cargo test -- --test-threads=1

echo "Exiting"
cd ../compose
docker compose down