import { Parser } from "json2csv";
import * as fs from "fs";
import { prisma as localPrisma } from "../../../local-prisma/prisma";
import { v4 as uuidV4 } from "uuid";
import { LocalData, LocalRun } from "../types/local.types";
import { CsvDataRow, CsvRunRow } from "../types/csv.types";
import { parse } from "csv-parse";
import path from "path";
import { DOWNLOADS_PATH } from "../storage-paths";

async function createFolder(folderPath: string) {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
    console.log(`Folder created at: ${folderPath}`);
  } else {
    console.log(`Folder already exists at: ${folderPath}`);
  }
}

function createMeaningfulFileName(name: string, date: Date): string {
  // Format the date as "yyyy_month_day-hr_minute_ms"
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const milliseconds = String(date.getMilliseconds()).padStart(3, "0");

  const formattedDate = `${year}_${month}_${day}-${hours}_${minutes}_${seconds}_${milliseconds}`;

  // Combine the sanitized file name with the formatted date
  return `${name}-${formattedDate}`;
}

/**
 * Appends the records given to the csv file specified by the filename.
 *
 * @param records
 * @param filename
 */
function appendToCsv<T>(records: T[], filename: string) {
  // TODO: throw error if headers do not match existing headers (or create wrapper)
  const parser = new Parser({ header: fs.existsSync(filename) ? false : true });
  const csv = parser.parse(records);
  fs.appendFileSync(filename, csv + "\n", { encoding: "utf8" });
}

async function dumpDataTypeToCsv(batchSize: number, storagePath: string) {
  let moreData = true;
  let cursor: { name: string } | undefined;

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
      appendToCsv(dataTypes, `${storagePath}/data_type.csv`);
      console.log(`Fetched ${dataTypes.length} Data Types`);
    }
  }
}

async function dumpRunToCsv(batchSize: number, storagePath: string) {
  let moreRuns = true;
  let cursor: { runId: number } | undefined;

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
      const csvDataRow: CsvRunRow[] = runs.map((localRun) => {
        return {
          uuid: uuidV4(),
          runId: localRun.runId.toString(),
          driverName: localRun.driverName,
          locationName: localRun.locationName,
          notes: localRun.notes,
          time: localRun.time.toISOString(),
        };
      });

      appendToCsv(csvDataRow, `${storagePath}/run.csv`);
      console.log(`Inserted ${csvDataRow.length} to run.csv`);
    }
  }
}

async function extractRunIds(filePath: string): Promise<number[]> {
  return new Promise((resolve, reject) => {
    const runIds: number[] = [];

    const readStream = fs.createReadStream(path.resolve(filePath));
    const parser = parse({ columns: true, skip_empty_lines: true }); // `columns: true` parses rows into objects

    readStream
      .pipe(parser)
      .on("data", (row: CsvRunRow) => {
        if (row.runId) {
          // get the runId from the row
          let runId = parseInt(row.runId);
          // and save it to the runIds array
          runIds.push(runId);
        }
      })
      .on("end", () => {
        console.log("Extracted runIds:", runIds);
        return resolve(runIds);
      })
      .on("error", (err) => {
        console.error("Error reading CSV:", err);
        reject(err);
      });
  });
}

async function dumpAllDataByRuns(batchSize: number, currentDumpPath: string) {
  // check our current download folder to ensure that we are only using runs that we have downloaded
  // and query the runId column for all the runIds using a parser

  // TODO: whether or not we want to cross refrence this with the run table is TBD
  // (or at least give a warning if there are more runIds in the data table than the run table)
  let downloadedRunIds = await extractRunIds(`${currentDumpPath}/run.csv`);

  const dataFolder = `${currentDumpPath}/data`;
  await createFolder(dataFolder);

  // TODO: if there is ever some sort of restart, we should have some way of resuming where we left off.
  for (const runId of downloadedRunIds) {
    await dumpDataByRun(runId, 39000, dataFolder);
  }
}

async function dumpDataByRun(
  runId: number,
  batchSize: number,
  storagePath: string
) {
  let offset = 0;
  let moreData = true;

  while (moreData) {
    const dataChunk = await localPrisma.data.findMany({
      where: { runId },
      skip: offset, // skip the already fetched rows
      take: batchSize,
      orderBy: [{ time: "asc" }, { dataTypeName: "asc" }], // keep ordering consistent
    });

    if (dataChunk.length === 0) {
      moreData = false; // stop fetching when there's no more data
    } else {
      // Increase the offset for the next batch
      offset += dataChunk.length;

      // Append to CSV
      appendToCsv(dataChunk, `${storagePath}/run-${runId}-data.csv`);
      console.log(`Inserted ${dataChunk.length} rows to run-${runId}-data.csv`);
    }
  }
}

export async function dumpLocalDb() {
  try {
    console.log("Starting data export...");
    const currentDumpName = createMeaningfulFileName("dump", new Date());
    const dumpFolderPath = `${DOWNLOADS_PATH}/${currentDumpName}`;
    await createFolder(dumpFolderPath);

    // data type goes first because it is not dependent on any other table
    await dumpDataTypeToCsv(1000, dumpFolderPath);

    // run goes second because it is not dependent on any other table
    await dumpRunToCsv(1000, dumpFolderPath);

    // data goes last because it is dependent on the run and data type tables
    await dumpAllDataByRuns(10000, dumpFolderPath);

    console.log("Data export completed successfully.");
  } catch (error) {
    console.error("Error exporting data to CSV:", error);
  }
}
