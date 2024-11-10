FROM rust:latest AS builder

WORKDIR /usr/src/myapp

COPY . . 
RUN cargo prisma generate
RUN cargo install --path . --locked --profile release

FROM debian:bullseye-slim
COPY --from=builder /usr/local/cargo/bin/scylla-server /usr/local/bin/scylla-server
ENTRYPOINT ["./docker_run.sh"]
