import { prisma as cloudPrisma } from "../cloud-prisma/prisma";
import { LocalDataType } from "../types/local.types";
import { CloudData, CloudDataType, CloudRun } from "../types/cloud.types";
import { CsvDataRow, CsvDataTypeRow, CsvRunRow } from "../types/csv.types";
import { readCsvFile } from "../utils/csv.utils";
import { csvToCloudData } from "../transformers/csv.transformer";
import { getMostRecentDownloadFolderPath } from "./audit.service";
import { processCsvInBatches } from "../utils/csv.utils";
import {
  DataTypeUploadError,
  RunsUploadError,
  CouldNotConnectToCloudDB,
} from "../errors/upload.errors";

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
    await cloudPrisma.$connect();
  } catch (error) {
    throw new CouldNotConnectToCloudDB();
  }
}

export async function uploadToCloud() {
  // ensure we can actually connect to the database
  console.info("Checking database connection...");
  await checkDbConnection();

  try {
    console.info("Opening most recent download folder...");
    let dumpFolderPath = await getMostRecentDownloadFolderPath();

    console.info("Processing data types...");
    try {
      console.log("calling processDataType with: ", dumpFolderPath);
      await processDataType(dumpFolderPath);
    } catch (error) {
      throw new DataTypeUploadError(error.message);
    }

    console.info("Startin Run uploads...");
    try {
      await processRunsWithData(dumpFolderPath);
    } catch (error) {
      throw new RunsUploadError(error.message);
    }

    console.log("Inserted all data entries");
    console.log("CSV to Cloud transfer complete.");
  } catch (error) {
    throw error;
  } finally {
    await cloudPrisma.$disconnect();
  }
}

export async function processDataType(
  dumpFolderPath: string,
  batchSize: number = DATATYPE_BATCH_SIZE
) {
  console.log("Processing data types...");
  const dataTypeCsvPath = csvNames.data_type(dumpFolderPath);
  console.log(`Processing data types from: ${dataTypeCsvPath}`);
  await processCsvInBatches<LocalDataType>(
    dataTypeCsvPath,
    async (batch: CsvDataTypeRow[]) => {
      const cloudDataTypes: CloudDataType[] = batch.map((localDataType) => ({
        name: localDataType.name,
        unit: localDataType.unit,
        nodeName: localDataType.nodeName,
      }));

      await cloudPrisma.data_type.createMany({
        data: cloudDataTypes,
        skipDuplicates: true,
      });
      console.log(`Inserted ${cloudDataTypes.length} data_type entries`);
    },
    batchSize
  );
}

export async function processRunsWithData(
  dumpFolderPath: string,
  batchSize: number = RUN_BATCH_SIZE
) {
  const runsCsvPath = csvNames.run(dumpFolderPath);
  const runs: CsvRunRow[] = await readCsvFile<CsvRunRow>(runsCsvPath);
  // console.log("Header found: " + header);
  // console.log("Content found: " + runs);

  for (const run of runs) {
    let cloudRun: CloudRun = {
      id: run.uuid,
      runId: Number(run.runId),
      driverName: run.driverName,
      notes: run.notes,
      time: new Date(run.time),
    };

    try {
      await cloudPrisma.run.create({
        data: cloudRun,
      });
    } catch (error) {
      throw new RunsUploadError(error.message);
    }

    let dataForRun = await processCsvDataFile(
      cloudRun.id,
      cloudRun.runId,
      dumpFolderPath
    );
  }
}

export async function processCsvDataFile(
  uuid: string,
  runId: number,
  dumpFolderPath: string,
  batchSize: number = DATA_BATCH_SIZE
): Promise<number> {
  let dataForRun = 0;
  let csvDataPath = csvNames.data(dumpFolderPath, runId);
  await processCsvInBatches<CsvDataRow>(
    csvDataPath,
    async (batch) => {
      try {
        const cloudData: CloudData[] = batch.map((localData: CsvDataRow) =>
          csvToCloudData(localData, uuid)
        );

        let numOfData = cloudData.length;
        await cloudPrisma.data.createMany({
          data: cloudData,
          skipDuplicates: true,
        });

        dataForRun += numOfData;

        console.log(`Inserted ${numOfData} data entries`);
      } catch (error) {
        console.error("Error inserting data:", error);
        process.exit(1);
      }
    },
    batchSize
  );

  console.log(`Total data uploaded for RUN ${runId}: ${dataForRun}`);
  return dataForRun;
}
