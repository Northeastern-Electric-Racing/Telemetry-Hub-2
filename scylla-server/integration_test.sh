#!/bin/sh
echo "Starting db"
cd ../compose
docker compose up -d odyssey-timescale
cd ..

cd ./scylla-server
echo "Running tests"
DATABASE_URL=postgresql://postgres:password@127.0.0.1:5432/postgres cargo test -- --test-threads=1

cd ..
docker compose down