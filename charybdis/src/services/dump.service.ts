import { prisma as localPrisma } from "../local-prisma/prisma";
import * as fs from "fs/promises";
import * as path from "path";
import { v4 as uuidV4 } from "uuid";
import { LocalData, LocalDataType, LocalRun } from "../types/local.types";
import { AuditRow, CsvRunRow } from "../types/csv.types";
import { DOWNLOADS_PATH } from "../storage-paths";
import {
  CouldNotConnectToLocalDB,
  DataTypeDumpFailed,
  RunDumpFailed,
  DataDumpFailed,
} from "../errors/dump.errors";
import { createCsvStreamWriter, extractRunIds } from "../utils/csv.utils";
import {
  createFolder,
  createMeaningfulFileName,
} from "../utils/filesystem.utils";
import { FailedWriteAuditLog } from "../errors/audit.errors";

async function checkDbConnection() {
  try {
    await localPrisma.$connect();
  } catch (error) {
    throw new CouldNotConnectToLocalDB("Could not connect to database");
  }
}

export async function dumpLocalDb(): Promise<void> {
  console.log("Checking database connection...");
  // check that we can actually connect to the database
  await checkDbConnection(); // throws if prisma cannot connect to local

  console.log("Acquiring dump file paths...");
  const auditLogFile = `${DOWNLOADS_PATH}/audit_log.csv`;
  const currentDumpName = createMeaningfulFileName("dump", new Date());
  const dumpFolderPath = `${DOWNLOADS_PATH}/${currentDumpName}`;
  await createFolder(DOWNLOADS_PATH);
  await createFolder(dumpFolderPath);

  console.log("Starting dump process...");
  try {
    try {
      console.log("Data Types dump...");
      // data type goes first because it is not dependent on any other table
      await dumpDataTypeToCsv(1000, dumpFolderPath);
    } catch (error) {
      throw new DataTypeDumpFailed(error.message);
    }

    try {
      console.log("Run dump...");
      // run goes second because it is not dependent on any other table
      await dumpRunToCsv(1000, dumpFolderPath);
    } catch (error) {
      throw new RunDumpFailed(error.message);
    }

    try {
      console.log("Data dump...");
      // data goes last because it is dependent on the run and data type tables
      await dumpAllDataByRuns(10000, dumpFolderPath);
    } catch (error) {
      throw new DataDumpFailed(error.message);
    }
  } catch (error) {
    try {
      createCsvStreamWriter<AuditRow>(auditLogFile).prependRecord({
        status: "Failed",
        dumpFolderName: currentDumpName,
        timeTrigger: new Date(),
      });
    } catch (error) {
      throw new FailedWriteAuditLog(error.message);
    }

    throw error;
  }

  try {
    // if we made here we should have avoided all the errors...
    // if not that's cool, it still looks like we succeeded
    createCsvStreamWriter<AuditRow>(auditLogFile).prependRecord({
      status: "Success",
      dumpFolderName: currentDumpName,
      timeTrigger: new Date(),
    });
  } catch (error) {
    console.error("Failed to update audit log:", error);
    throw error;
  }
}

async function dumpDataTypeToCsv(batchSize: number, storagePath: string) {
  let moreData = true;
  let cursor: { name: string } | undefined;
  let csvWriter = createCsvStreamWriter<LocalDataType>(
    `${storagePath}/data_type.csv`
  );

  while (moreData) {
    const dataTypes = await localPrisma.data_type.findMany({
      // order by is important to ensure we don't grab the same data
      // twice while batch querying.
      orderBy: {
        name: "asc",
      },
      cursor,
      skip: cursor ? 1 : 0, // skip the cursor itself if we already have one
      take: batchSize,
    });

    if (dataTypes.length === 0) {
      moreData = false;
    } else {
      // Update cursor
      cursor = {
        name: dataTypes[dataTypes.length - 1].name,
      };
      csvWriter.appendRecords(dataTypes);
      console.log(`Fetched ${dataTypes.length} Data Types`);
    }
  }
}

async function dumpRunToCsv(batchSize: number, storagePath: string) {
  let moreRuns = true;
  let cursor: { runId: number } | undefined;
  let csvWriter = createCsvStreamWriter<CsvRunRow>(`${storagePath}/run.csv`);
  let totalDataFetched = 0;

  while (moreRuns) {
    const runs: LocalRun[] = await localPrisma.run.findMany({
      orderBy: {
        runId: `asc`,
      },
      cursor,
      skip: cursor ? 1 : 0, // skip the cursor which we have already got last loop
      take: batchSize,
    });

    if (runs.length === 0) {
      moreRuns = false;
    } else {
      // Update cursor, this is where we will start of next loop
      cursor = {
        runId: runs[runs.length - 1].runId,
      };

      // convert to the csv type before inserting (allowing us to create a uuid)
      const csvRunRow: CsvRunRow[] = runs.map((localRun) => {
        return {
          uuid: uuidV4(),
          runId: localRun.runId.toString(),
          driverName: localRun.driverName,
          locationName: localRun.locationName,
          notes: localRun.notes,
          time: localRun.time.toISOString(),
        };
      });

      csvWriter.appendRecords(csvRunRow);
      totalDataFetched += csvRunRow.length;
      console.log(`Inserted ${csvRunRow.length} to run.csv`);
    }
  }

  console.log(`Total runs fetched: ${totalDataFetched}`);
}

async function dumpAllDataByRuns(batchSize: number, currentDumpPath: string) {
  // check our current download folder to ensure that we are only using runs that we have downloaded
  // and query the runId column for all the runIds using a parser

  // TODO: whether or not we want to cross refrence this with the run table is TBD
  // (or at least give a warning if there are more runIds in the data table than the run table)
  let downloadedRunIds = await extractRunIds(`${currentDumpPath}/run.csv`);

  const dataFolder = `${currentDumpPath}/data`;
  await createFolder(dataFolder);

  let allDataFetched = 0;
  // TODO: if there is ever some sort of restart, we should have some way of resuming where we left off.
  for (const runId of downloadedRunIds.values()) {
    allDataFetched += await dumpDataByRun(runId, 50000, dataFolder);
  }
  console.log(`Total of ALL DATA fetched: ${allDataFetched}`);
}

async function dumpDataByRun(
  runId: number,
  batchSize: number,
  storagePath: string
): Promise<number> {
  let moreData = true;
  let offset = 0;
  let csvWriter = createCsvStreamWriter<LocalData>(
    `${storagePath}/run-${runId}-data.csv`
  );
  let totalDataFetched = 0;

  while (moreData) {
    // Fetch batched data using `findMany`
    const dataChunk = await localPrisma.data.findMany({
      where: { runId },
      take: batchSize,
      skip: offset, // skip the previously seen data
      orderBy: [{ time: "asc" }, { dataTypeName: "asc" }],
    });

    if (dataChunk.length === 0) {
      moreData = false;
    } else {
      offset += dataChunk.length; // move offset by the amount of data we just read
      csvWriter.appendRecords(dataChunk);
      totalDataFetched += dataChunk.length;
      console.log(`Inserted ${dataChunk.length} rows to run-${runId}-data.csv`);
    }
  }

  console.log(`Total data fetched for run ${runId}: ${totalDataFetched}`);
  return totalDataFetched;
}

export async function deleteAllDownloads(): Promise<void> {
  try {
    // Read all entries in the downloads folder
    const entries = await fs.readdir(DOWNLOADS_PATH, { withFileTypes: true });

    // Iterate over each entry and remove it
    for (const entry of entries) {
      const fullPath = path.join(DOWNLOADS_PATH, entry.name);
      if (entry.isDirectory()) {
        // Recursively remove the directory and its contents
        await fs.rm(fullPath, { recursive: true, force: true });
      } else {
        // Remove the file
        await fs.unlink(fullPath);
      }
    }
    console.log("All downloads have been deleted.");
  } catch (error) {
    console.error("Error deleting downloads:", error);
    throw error;
  }
}
