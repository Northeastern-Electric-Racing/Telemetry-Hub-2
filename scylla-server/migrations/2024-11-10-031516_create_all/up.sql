CREATE EXTENSION IF NOT EXISTS timescaledb CASCADE;

-- CreateTable
CREATE TABLE "run" (
    "id" SERIAL NOT NULL,
    "locationName" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "driverName" TEXT,
    "notes" TEXT NOT NULL DEFAULT '',
    "time" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "run_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "data" (
    "values" REAL [] NOT NULL check ("values" <> '{}' AND array_position("values", NULL) IS NULL),
    "dataTypeName" TEXT NOT NULL,
    "time" TIMESTAMPTZ NOT NULL,
    "runId" INTEGER NOT NULL,

    PRIMARY KEY("time", "dataTypeName")
);
-- SELECT * FROM create_hypertable("data", by_range("time"));
-- SELECT * FROM add_dimension("data", by_hash("dataTypeNmae", 4));


-- CreateTable
CREATE TABLE "dataType" (
    "name" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "nodeName" TEXT NOT NULL,

    CONSTRAINT "dataType_pkey" PRIMARY KEY ("name")
);

-- CreateIndex
CREATE UNIQUE INDEX "run_id_key" ON "run"("id");

-- CreateIndex
CREATE UNIQUE INDEX "dataType_name_key" ON "dataType"("name");

-- AddForeignKey
ALTER TABLE "data" ADD CONSTRAINT "data_dataTypeName_fkey" FOREIGN KEY ("dataTypeName") REFERENCES "dataType"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "data" ADD CONSTRAINT "data_runId_fkey" FOREIGN KEY ("runId") REFERENCES "run"("id") ON DELETE RESTRICT ON UPDATE CASCADE;