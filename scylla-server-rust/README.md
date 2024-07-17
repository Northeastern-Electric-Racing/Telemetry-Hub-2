# Scylla Server (Rust)


### Generate prisma

```
cargo prisma generate
```

### Run the app

```
# in argos proper
docker compose up odyssey-timescale
```

```
# in this directory
SOURCE_DATABASE_URL=postgresql://postgres:password@127.0.0.1:5432/timescaledb cargo run
```

### Test this app


#### Integration tests

Since this app uses the database for testing, you must follow these steps, or run `./integration_test.sh`:
```
docker volume rm argos_db-data
docker compose up odyssey-timescale
cargo prisma migrate deploy
SOURCE_DATABASE_URL=postgresql://postgres:password@127.0.0.1:5432/timescaledb cargo test -- --test-threads=1
```

#### Test it yourself!

You can send your own messages to the app running in production mode, and test how the client, database, etc. reacts!

Follow this confluence doc: https://nerdocs.atlassian.net/wiki/spaces/NER/pages/473727054/How+to+run+data+through+Argos+without+the+car

#### Debug logging

#### Activate logs
Modify the RUST_LOG env variable.  Usually you dont want third party crate logs, so `RUST_LOG=none,scylla_server_rust=trace`.  You can replace both none and trace with the levels you want.  The levels are:
- none: not a darn thing
- trace: very verbose, could print on every message, which would flood the log especially if run on a server receiving millions of the cars messages
- debug: helpful info not constantly printed in high load situations, good for periodic task info or init/end status checks
- info: user-facing info that is optional, usually to notify of a setting change or whatnot
- warn: info the user should take note of as an error may have occured
- error: a critical byt survivable issue in the application

#### Develop with logs

When developing, take advantage of easy logging.  Use `debug!`, `trace!` etc macros. with anything you may need, but be sure to abide by the conventions above when making a final PR.

Have an async function that takes time and is somewhat important for performance?  Use tracing::instrument macro on the function definition to capture performance data.



### Deploy this app

Use the docker compose above to build & deploy.  Note the CI prebuilds arm64 and amd64 images upon request in the actions tab of this repository's github page.
```
docker compose build
docker compose up # use -d to fork to background
```
A database migration is triggered upon every bootup.