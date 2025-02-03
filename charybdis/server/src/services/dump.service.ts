import { Parser } from "json2csv";
import * as fs from "fs";
import { prisma as localPrisma, prisma } from "../../../local-prisma/prisma";
import { v4 as uuidV4 } from "uuid";
import { LocalData, LocalDataType, LocalRun } from "../types/local.types";
import { AuditRow, CsvRunRow } from "../types/csv.types";
import { parse } from "csv-parse";
import * as path from "path";
import { DOWNLOADS_PATH } from "../storage-paths";
import { WriteStream } from "fs";

async function createFolder(folderPath: string) {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
    console.info(`Folder created at: ${folderPath}`);
  } else {
    console.info(`Folder already exists at: ${folderPath}`);
  }
}

function createMeaningfulFileName(name: string, date: Date): string {
  // Format the date as "yyyy_month_day-hr_minute_ms"
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");
  const milliseconds = String(date.getUTCMilliseconds()).padStart(3, "0");

  const formattedDate = `${year}-${month}-${day}__${hours}-${minutes}-${seconds}-${milliseconds}`;

  // Combine the sanitized file name with the formatted date
  return `${name}_${formattedDate}`;
}

/**
 * The interface describing our CSV writer, parameterized by a generic type T.
 *
 * - `appendRecords(records: T[]): void`
 *    Appends an array of T records to the CSV.
 * - `close(): void`
 *    Closes the underlying file stream.
 */
export interface CsvStreamWriter<T> {
  appendRecords(records: T[]): void;
  prependRecord(record: T): void;
  close(): void;
}

/**
 * Creates a writer object that can append records to a CSV file in batches.
 *
 * @param filename The path to the CSV file.
 * @returns A typed object (`CsvStreamWriter<T>`) with `appendRecords` and `close` methods.
 */
export function createCsvStreamWriter<T>(filename: string): CsvStreamWriter<T> {
  // Check if the file already exists (to determine whether to write headers).
  const fileExists = fs.existsSync(filename);

  // Create a write stream in append mode.
  const writeStream: WriteStream = fs.createWriteStream(filename, {
    flags: "a",
  });

  // Create a JSON2CSV parser. If the file doesn't exist, enable headers. Otherwise, skip them.
  // Adjust parser options as needed (e.g., flatten, transforms, etc.)
  const parser = new Parser<T>({
    header: !fileExists, // Write headers only if file doesn't exist
  });

  return {
    /**
     * Appends the given records of type T to the CSV file.
     *
     * @param records Array of T objects to append.
     */
    appendRecords(records: T[]): void {
      if (!records || records.length === 0) {
        return;
      }

      const csv = parser.parse(records);
      const filePath = writeStream.path as string; // Get file path from stream

      // Check if the file already has content (i.e., a header)
      if (fs.existsSync(filePath) && fs.statSync(filePath).size > 0) {
        // ✅ File already has a header, append only data
        const lines = csv.split("\n").slice(1).join("\n"); // Remove first line (header)
        writeStream.write(lines + "\n");
      } else {
        // ✅ File is new, write full CSV including header
        writeStream.write(csv + "\n");
      }
    },

    /**
     * Adds the record to the beginning of the file, under the header.
     */
    prependRecord(record: T): void {
      if (!record) {
        return;
      }

      const filePath = writeStream.path as string; // Get file path from stream
      const newCsv = parser.parse([record]); // Convert record to CSV format

      if (!fs.existsSync(filePath) || fs.statSync(filePath).size === 0) {
        // ✅ File does not exist or is empty, write full CSV including header
        fs.writeFileSync(filePath, newCsv + "\n", "utf8");
        return;
      }

      // ✅ File exists and has content, read existing content
      const existingContent = fs.readFileSync(filePath, "utf8").trim();
      const lines = existingContent.split("\n");

      if (lines.length > 1) {
        // ✅ File has a header and data, insert under header
        const header = lines[0];
        console.log("Header:", header);
        const data = lines.slice(1); // Keep only the existing data rows
        console.log("Existing data:", data);
        console.log("New data:", newCsv);
        const updatedContent = [header, ...newCsv.split("\n"), ...data].join(
          "\n"
        );
        console.info(
          "Audit log update with new record at the top: ",
          updatedContent
        );
        fs.writeFileSync(filePath, updatedContent + "\n", "utf8");
      } else {
        // ✅ File only has a header, add the new record as the first data entry
        fs.writeFileSync(
          filePath,
          existingContent + "\n" + newCsv.split("\n")[1] + "\n",
          "utf8"
        );
      }
    },

    /**
     * Closes the underlying file stream.
     * Make sure to call this after finishing all appends!
     */
    close(): void {
      writeStream.end();
    },
  };
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

      csvWriter.appendRecords(csvDataRow);
      console.log(`Inserted ${csvDataRow.length} to run.csv`);
    }
  }
}

/**
 * Extracts the runids linked to there new uuid's from the run.csv file
 * @param filePath
 * @returns
 */
export async function extractRunIds(
  filePath: string
): Promise<Map<string, number>> {
  return new Promise((resolve, reject) => {
    console.info("Extracting runIds from run.csv");
    const runIdMap = new Map<string, number>();
    const parser = parse({ columns: true });
    const fileStream = fs.createReadStream(filePath).pipe(parser);

    fileStream.on("data", (row) => {
      runIdMap.set(row.uuid, parseInt(row.runId, 10));
    });

    fileStream.on("end", () => {
      resolve(runIdMap);
    });

    fileStream.on("error", (error) => {
      reject(error);
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
  for (const runId of downloadedRunIds.values()) {
    await dumpDataByRun(runId, 50000, dataFolder);
  }
}

async function dumpDataByRun(
  runId: number,
  batchSize: number,
  storagePath: string
) {
  let moreData = true;
  let offset = 0;
  let csvWriter = createCsvStreamWriter<LocalData>(
    `${storagePath}/run-${runId}-data.csv`
  );

  while (moreData) {
    // Fetch batched data using `findMany`
    const dataChunk = await localPrisma.data.findMany({
      where: { runId },
      take: batchSize,
      skip: offset, // ✅ Efficiently skip processed data
      orderBy: [{ time: "asc" }, { dataTypeName: "asc" }],
    });

    if (dataChunk.length === 0) {
      moreData = false;
    } else {
      offset += dataChunk.length; // ✅ Move offset forward
      csvWriter.appendRecords(dataChunk);
      console.log(`Inserted ${dataChunk.length} rows to run-${runId}-data.csv`);
    }
  }
}

export class CouldNotConnectToDB extends Error {
  constructor(message = "Could not connect to database") {
    super(message);
  }
}

export async function dumpLocalDb(): Promise<void> {
  // check that we can actually connect to the database
  try {
    await prisma.$connect();
  } catch (error) {
    throw new CouldNotConnectToDB("Could not connect to database");
  }
  try {
    console.log("Starting data export...");
    const auditLogFile = `${DOWNLOADS_PATH}/audit_log.csv`;
    const currentDumpName = createMeaningfulFileName("dump", new Date());
    const dumpFolderPath = `${DOWNLOADS_PATH}/${currentDumpName}`;
    await createFolder(dumpFolderPath);

    try {
      // data type goes first because it is not dependent on any other table
      await dumpDataTypeToCsv(1000, dumpFolderPath);

      // run goes second because it is not dependent on any other table
      await dumpRunToCsv(1000, dumpFolderPath);

      // data goes last because it is dependent on the run and data type tables
      await dumpAllDataByRuns(10000, dumpFolderPath);

      createCsvStreamWriter<AuditRow>(auditLogFile).prependRecord({
        status: "Success",
        dumpFolderName: currentDumpName,
        timeTrigger: new Date(),
      });
    } catch (error) {
      console.error("Error dumping data:", error);
      createCsvStreamWriter<AuditRow>(auditLogFile).prependRecord({
        status: "Failed",
        dumpFolderName: currentDumpName,
        timeTrigger: new Date(),
      });
    }

    console.log("Data export completed successfully.");
  } catch (error) {
    console.error("Error exporting data to CSV:", error);
  }
}
