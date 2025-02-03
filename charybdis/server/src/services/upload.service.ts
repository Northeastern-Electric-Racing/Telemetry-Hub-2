import { PrismaClient as CloudPrisma } from "../../../cloud-prisma/prisma";
import { LocalDataType } from "../types/local.types";
import { CloudData, CloudDataType, CloudRun } from "../types/cloud.types";
import { CsvDataRow, CsvDataTypeRow, CsvRunRow } from "../types/csv.types";
import { extractRunIds } from "./dump.service";
import { csvToCloudData } from "../transformers/csv.transformer";
import { getMostRecentDownloadFolder } from "./audit.service";
import { processCsvInBatches } from "../utils/csv.utils";
import {
  DataTypeUploadError,
  RunsUploadError,
  DataUploadError,
  CouldNotConnectToCloudDB,
} from "../errors/upload.errors";

const cloudDb = new CloudPrisma();

const DATATYPE_BATCH_SIZE = 1000;
const RUN_BATCH_SIZE = 1000;
const DATA_BATCH_SIZE = 4960;

const csvNames = {
  run: (path: string) => `${path}/run.csv`,
  data: (path: string, runId: number) => `${path}/data/run-${runId}-data.csv`,
  data_type: (path: string) => `${path}/data_type.csv`,
};

async function checkDbConnection() {
  try {
    await cloudDb.$connect();
  } catch (error) {
    throw new CouldNotConnectToCloudDB();
  }
}

export async function uploadToCloud() {
  // ensure we can actually connect to the database
  await checkDbConnection();

  try {
    console.info("Starting CSV to Cloud DB transfer...");
    let dumpFolderPath = await getMostRecentDownloadFolder();

    try {
      await processDataType(dumpFolderPath);
    } catch (error) {
      throw new DataTypeUploadError(error.message);
    }

    try {
      await processRuns(dumpFolderPath);
    } catch (error) {
      throw new RunsUploadError(error.message);
    }

    console.info("Inserted all runs");

    try {
      await processData(dumpFolderPath);
    } catch (error) {
      throw new DataUploadError(error.message);
    }

    console.log("Inserted all data entries");
    console.log("CSV to Cloud transfer complete.");
  } catch (error) {
    throw error;
  } finally {
    await cloudDb.$disconnect();
  }
}

export async function processDataType(
  dumpFolderPath: string,
  batchSize: number = DATATYPE_BATCH_SIZE
) {
  const dataTypeCsvPath = csvNames.data_type(dumpFolderPath);

  await processCsvInBatches<LocalDataType>(
    dataTypeCsvPath,
    async (batch: CsvDataTypeRow[]) => {
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
    },
    batchSize
  );
}

export async function processRuns(
  dumpFolderPath: string,
  batchSize: number = RUN_BATCH_SIZE
) {
  const runsCsvPath = csvNames.run(dumpFolderPath);

  await processCsvInBatches<CsvRunRow>(
    runsCsvPath,
    async (batch: CsvRunRow[]) => {
      const cloudRuns: CloudRun[] = batch.map((csvRun: CsvRunRow) => ({
        id: csvRun.uuid,
        runId: Number(csvRun.runId),
        driverName: csvRun.driverName,
        notes: csvRun.notes,
        time: new Date(csvRun.time),
      }));

      console.info(`Inserting run batch of: ${cloudRuns.length}`);
      try {
        await cloudDb.run.createMany({
          data: cloudRuns,
          skipDuplicates: true,
        });
        console.info("Inserted all runs successfully");
      } catch (error) {
        console.error("Error inserting runs:", error);
        process.exit(1);
      }
    },
    batchSize
  );
}

export async function processData(
  dumpFolderPath: string,
  batchSize: number = DATA_BATCH_SIZE
) {
  const runsCsvPath = csvNames.run(dumpFolderPath);
  const dataCsvPath = csvNames.data(dumpFolderPath, 0);
  const uuidToRunId = await extractRunIds(runsCsvPath);

  for (const run of uuidToRunId) {
    await processCsvInBatches<CsvDataRow>(
      dataCsvPath,
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
