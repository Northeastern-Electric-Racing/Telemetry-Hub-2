# Argos

## Local Development

Go through the local development sections of client and scylla-server:

[Angular Client](./angular-client/README.md)\
[Scylla Server](./scylla-server/README.md)

Once you've sucessfully setup Scylla and the Client, you can either run them separately, or follow the docker commands below to run them together.

## Production

Please see [Compose Profiles](./compose/README.md) to get started with building and testing using compose.

## Codegen Protobuf Types (client only)

Server protobuf generation is automatic. See below for client protobuf generation.

##### Mac

`brew install protobuf@3`
`brew link --overwrite protobuf@3`

#### Codegen

`npm run build:proto`

## Siren

The configuration for the Mosquitto MQTT server on the router is in the siren-base folder.
Note that the configuration is used in the docker compose file, but the configuration on the TPU is stored in [Odysseus.](https://github.com/Northeastern-Electric-Racing/Odysseus/tree/cb12fb3240d5fd58adfeae26262e158ad6dd889b/odysseus_tree/overlays/rootfs_overlay_tpu/etc/mosquitto)
