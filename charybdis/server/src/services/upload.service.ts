import * as fs from "fs";
import * as path from "path";
import { parse } from "csv-parse";
import { Request, Response } from "express";
import { PrismaClient as CloudPrisma } from "../../../cloud-prisma/prisma";
import { LocalData, LocalDataType, LocalRun } from "../types/local.types";
import { CloudData, CloudDataType, CloudRun } from "../types/cloud.types";
import { CsvDataRow, CsvDataTypeRow, CsvRunRow } from "../types/csv.types";
import { DOWNLOADS_PATH } from "../storage-paths";
import { extractRunIds } from "./dump.service";
import { get } from "http";
import { csvToCloudData } from "../transformers/csv.transformer";

const localTables = {
  run: "run",
  data: "data",
  data_type: "data_type",
};

const csvNames = {
  run: (path: string) => `${path}/run.csv`,
  data: (path: string, runId: number) => `${path}/data/run-${runId}-data.csv`,
  data_type: (path: string) => `${path}/data_type.csv`,
};
export async function processRuns(
  processRunBatch: (batch: CsvRunRow[]) => Promise<void>
) {
  await processCsvInBatches<CsvRunRow>(
    csvNames.run(await getMostRecentDownloadFolder()),
    processRunBatch,
    1000
  );
}

export async function processDataType(
  processDataTypeBatch: (batch: CsvDataTypeRow[]) => Promise<void>
) {
  await processCsvInBatches<LocalDataType>(
    csvNames.data_type(await getMostRecentDownloadFolder()),
    processDataTypeBatch,
    1000
  );
}

export async function processData() {
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
      4960
    );
  }
}

const cloudDb = new CloudPrisma();

const BATCH_SIZE = 1000;

async function processCsvInBatches<T>(
  csv_path: string,
  processBatch: (batch: T[]) => Promise<void>,
  batchSize: number
): Promise<void> {
  return new Promise((resolve, reject) => {
    const records: any[] = [];
    const readStream = fs
      .createReadStream(path.resolve(csv_path))
      .pipe(parse({ columns: true, skip_empty_lines: true, cast: true }));

    readStream.on("data", (row) => {
      records.push(row);

      if (records.length >= batchSize) {
        readStream.pause();
        processBatch(records.splice(0, batchSize))
          .then(() => readStream.resume())
          .catch(reject);
      }
    });

    readStream.on("end", async () => {
      if (records.length > 0) {
        await processBatch(records);
      }
      console.log(`Finished processing ${csv_path}`);
      resolve();
    });

    readStream.on("error", (err) => {
      reject(`Error reading ${csv_path}: ${err.message}`);
    });
  });
}

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

function getFirstLexicographicalFolder(directoryPath: string): string | null {
  try {
    const items = fs.readdirSync(directoryPath, { withFileTypes: true });
    const folders = items
      .filter((item) => item.isDirectory())
      .map((folder) => folder.name);

    if (folders.length === 0) {
      console.log("No folders found in the directory.");
      return null;
    }

    const sortedFolders = folders.sort();
    return sortedFolders[0];
  } catch (error) {
    console.error("Error reading directory:", error);
    return null;
  }
}

/**
 *
 * @returns the path to the folder based on the folder name at the top of the list of the audit_log.csv file.
 */
async function getMostRecentDownloadFolder(): Promise<string> {
  return new Promise((resolve, reject) => {
    console.log("Getting most recent download folder...");
    const auditLogPath = path.resolve(`${DOWNLOADS_PATH}/audit_log.csv`);
    const auditLogStream = fs.createReadStream(auditLogPath).pipe(parse({}));

    let lineCount = 0;

    auditLogStream.on("data", (row) => {
      lineCount += 1;
      if (lineCount === 2) {
        const folderName = row[1]; // Get the second column of the second row
        console.log(`Found folder: ${folderName}`);
        resolve(`${DOWNLOADS_PATH}/${folderName}`);
      }
    });

    auditLogStream.on("error", (err) => {
      reject(err);
    });

    auditLogStream.on("end", () => {
      if (lineCount < 2) {
        reject(new Error("No second row found in audit log."));
      }
    });
  });
}
