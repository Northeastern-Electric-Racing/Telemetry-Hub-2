-- CreateTable
CREATE TABLE "run" (
    "id" SERIAL NOT NULL,
    "locationName" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "radius" DOUBLE PRECISION,
    "driverName" TEXT,
    "notes" TEXT NOT NULL,
    "time" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "run_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "data" (
    "id" TEXT NOT NULL,
    "values" DOUBLE PRECISION[],
    "dataTypeName" TEXT NOT NULL,
    "time" TIMESTAMPTZ NOT NULL,
    "runId" INTEGER NOT NULL,

    CONSTRAINT "data_pkey" PRIMARY KEY ("id")
);

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
CREATE UNIQUE INDEX "data_id_time_key" ON "data"("id", "time");

-- CreateIndex
CREATE UNIQUE INDEX "dataType_name_key" ON "dataType"("name");

-- AddForeignKey
ALTER TABLE "data" ADD CONSTRAINT "data_dataTypeName_fkey" FOREIGN KEY ("dataTypeName") REFERENCES "dataType"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "data" ADD CONSTRAINT "data_runId_fkey" FOREIGN KEY ("runId") REFERENCES "run"("id") ON DELETE RESTRICT ON UPDATE CASCADE;