#!/bin/sh

prisma-cli migrate deploy && exec /usr/local/bin/scylla-server