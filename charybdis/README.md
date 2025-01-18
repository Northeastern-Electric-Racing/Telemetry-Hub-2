# Charybdis

make sure you [install yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) if you don't have it already.

and install prisma globally... it's just easier that way(if you have trouble just follow this: [prisma install instructions](https://www.prisma.io/docs/orm/tools/prisma-cli)).

To initialize the databases run `yarn database:setup` (if this command fails, you should run `yarn database:teardown` before running again.)

You can also individually teardown and bringup the databases by running `yarn database:cloud:setup` or `yarn database:local:setup` and `yarn database:cloud:teardown` or `yarn database:local:teardown`.

To teardown all the databases run `yarn database:teardown`

When updating the local database schema, _Delete the existing migrations files in local-prisma_ and then run `yarn prisma:local:migrate:dev`. Ensure to name the file `init`. This will create the migration file, then run a script to enforce NOT NULL constraints that prisma gurantees put refuses to support in migration sql, copy it to scylla and rerun the diesel migration onto the database to ensure consistency between the two projects, it will also update the diesel schema.rs file according to the new migration (this should be checked to ensure it is based on the expected types, made in your prisma schema).

IMPORTANT: the above will fail if you have more than the two expect migration folder in /scylla-server/migrations : _00000000000000_diesel_initial_setup_, and the working migration folder: _2024-11-10-031516_create_all_ <--- this will we be where the diesel migration file that is getting updated.

When updating the cloud schema, only run `yarn prisma:migrate:cloud:dev` and name it appropriately to whatever changes were made. Ensure that when deploying migrations to the cloud you only run `yarn prisma:migrate:cloud`. You will also have to change the cloud database url in your .env file to point to the cloud database

To access the prisma client for each respective database ensure that you use the proper prisma client from the cloud-prisma and local-prisma prisma files respectively. AKA to access the cloud prisma ensure you are importing `prisma` from `cloud-prisma/prisma.ts`. To access local prisma ensure you are importing `prisma` from `local-prisma/prisma.ts`.
