# Charybdis

To initialize the databases run `yarn database:setup`

You can also individually teardown and bringup the databases by running `yarn database:cloud:setup` or `yarn: database:local:setup` and `yarn database:cloud:teardown` or `yarn database:local:teardown`. 

To teardown all the databases run `yarn database:teardown`

When updating the local database schema, *Delete the existing migrations files in local-prisma* and then run `yarn prisma:migrate:local:dev`. Ensure to name the file `init`. This will create the migration file, copy it to scylla and rerun the diesel migration onto the database to ensure consistency between the two projects.

You will have to manually add `NOT NULL` after the values Real[] since prisma and diesel interpret these values in different ways. 

When updating the cloud schema, only run `yarn prisma:migrate:cloud:dev` and name it appropriately to whatever changes were made. Ensure that when deploying migrations to the cloud you only run `yarn prisma:migrate:cloud`. You will also have to change the cloud database url in your .env file to point to the cloud database

To access the prisma client for each respective database ensure that you use the proper prisma client from the cloud-prisma and local-prisma prisma files respectively. AKA to access the cloud prisma ensure you are importing `prisma` from `cloud-prisma/prisma.ts`. To access local prisma ensure you are importing `prisma` from `local-prisma/prisma.ts`.
