import { PrismaClient as CloudPrisma } from "../../../cloud-prisma/prisma";
import { LocalDataType } from "../types/local.types";
import { CloudData, CloudDataType, CloudRun } from "../types/cloud.types";
import { CsvDataRow, CsvDataTypeRow, CsvRunRow } from "../types/csv.types";
import { extractRunIds } from "./dump.service";
import { csvToCloudData } from "../transformers/csv.transformer";
import { getMostRecentDownloadFolder } from "./audit.service";
import { processCsvInBatches } from "../utils/csv.utils";

const cloudDb = new CloudPrisma();

const DATATYPE_BATCH_SIZE = 1000;
const RUN_BATCH_SIZE = 1000;
const DATA_BATCH_SIZE = 4960;

const csvNames = {
  run: (path: string) => `${path}/run.csv`,
  data: (path: string, runId: number) => `${path}/data/run-${runId}-data.csv`,
  data_type: (path: string) => `${path}/data_type.csv`,
};

export async function uploadToCloud() {
  try {
    console.info("Starting CSV to Cloud DB transfer...");

    await processDataType(async (batch) => {
      console.info("Processing data types");
      const cloudDataTypes: CloudDataType[] = batch.map((localDataType) => ({
        name: localDataType.name,
        unit: localDataType.unit,
        nodeName: localDataType.nodeName,
      }));

      await cloudDb.data_type.createMany({
        data: cloudDataTypes,
        skipDuplicates: true,
      });
      console.log(`Inserted ${cloudDataTypes.length} data_type entries`);
    });

    await processRuns(async (batch) => {
      const cloudRuns: CloudRun[] = batch.map((csvRun: CsvRunRow) => ({
        id: csvRun.uuid,
        runId: Number(csvRun.runId),
        driverName: csvRun.driverName,
        notes: csvRun.notes,
        time: new Date(csvRun.time),
      }));

      console.info(`inserting run batch of: ${cloudRuns.length}`);
      try {
        await cloudDb.run.createMany({
          data: cloudRuns,
          skipDuplicates: true,
        });
        console.info("inserted all runs succesfully");
      } catch (error) {
        console.error("Error inserting runs:", error);
        process.exit(1);
      }
    });

    console.info("Inserted all runs");

    await processData();

    console.log("Inserted all data entries");
    console.log("CSV to Cloud transfer complete.");
  } catch (error) {
    console.error("Error processing CSV files:", error);
    process.exit(1);
  } finally {
    await cloudDb.$disconnect();
  }
}

export async function processDataType(
  processDataTypeBatch: (batch: CsvDataTypeRow[]) => Promise<void>,
  batchSize: number = DATATYPE_BATCH_SIZE
) {
  await processCsvInBatches<LocalDataType>(
    csvNames.data_type(await getMostRecentDownloadFolder()),
    processDataTypeBatch,
    batchSize
  );
}

export async function processRuns(
  processRunBatch: (batch: CsvRunRow[]) => Promise<void>,
  batchSize: number = RUN_BATCH_SIZE
) {
  await processCsvInBatches<CsvRunRow>(
    csvNames.run(await getMostRecentDownloadFolder()),
    processRunBatch,
    RUN_BATCH_SIZE
  );
}

export async function processData(batchSize: number = DATA_BATCH_SIZE) {
  const uuidToRunId = await extractRunIds(
    csvNames.run(await getMostRecentDownloadFolder())
  );

  for (const run of uuidToRunId) {
    await processCsvInBatches<CsvDataRow>(
      csvNames.data(await getMostRecentDownloadFolder(), run[1]),
      async (batch) => {
        try {
          const cloudData: CloudData[] = batch.map((localData: CsvDataRow) =>
            csvToCloudData(localData, run[0])
          );

          await cloudDb.data.createMany({
            data: cloudData,
            skipDuplicates: true,
          });
          console.log(`Inserted ${cloudData.length} data entries`);
        } catch (error) {
          console.error("Error inserting data:", error);
          process.exit(1);
        }
      },
      batchSize
    );
  }
}
