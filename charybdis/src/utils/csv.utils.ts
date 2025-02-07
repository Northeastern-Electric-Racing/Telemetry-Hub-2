import * as fs from "fs";
import { AsyncParser, Transform } from "@json2csv/node";
import { parse } from "csv-parse";
import { promisify } from "util";
import { pipeline } from "stream/promises";
import { CsvRunRow } from "../types/csv.types";
import path from "path";

export async function processCsvInBatches<T>(
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
        try {
          await processBatch(records);
        } catch (error) {
          reject(error);
        }
      }
      console.log(`Finished processing ${csv_path}`);
      resolve();
    });

    readStream.on("error", (err) => {
      reject(`Error reading ${csv_path}: ${err.message}`);
    });
  });
}

export async function appendToCsv<T>(
  filePath: string,
  records: T[]
): Promise<void> {
  let needsHeader = true;
  try {
    const stats = await fs.promises.stat(filePath);
    // for simplicity, we consider a file with size 0 as empty
    // POSSIBLE IMPROVEMENT: check if the the headers match the given records
    needsHeader = stats.size === 0;
  } catch (err) {
    if (err.code !== "ENOENT") throw err;
  }

  let writeStream = fs.createWriteStream(filePath, { flags: "a" });

  const opts = { header: needsHeader };
  const asyncParser = new AsyncParser(opts);
  const csv = await asyncParser.parse(records).promise();

  if (!needsHeader && csv.length > 0) {
    // add leading newline if appending to non-empty file
    await writeStream.write("\n" + csv);
  } else {
    await writeStream.write(csv);
  }
}

export async function prependToCsv<T>(
  filePath: string,
  records: T[]
): Promise<void> {
  let noContent = true;
  try {
    const stats = await fs.promises.stat(filePath);
    // for simplicity, we consider a file with size 0 as empty
    // POSSIBLE IMPROVEMENT: check if the the headers match the given records
    noContent = stats.size === 0;
  } catch (err) {
    if (err.code !== "ENOENT") throw err;
  }

  const opts = { header: noContent };
  const asyncParser = new AsyncParser(opts);
  const csv = await asyncParser.parse(records).promise();

  const writeStream = fs.createWriteStream(filePath, { flags: "w" });

  // get the prior contents of the file
  if (!noContent) {
    const priorFileData = (await fs.readFileSync(filePath, "utf8")).split("\n");
    const header = priorFileData[0];
    console.log("Header found: " + header);
    const content = priorFileData.slice(1).join("\n");
    console.log("Content found: " + content);

    // write the new records to the file below the header and prior to main contents
    await writeStream.write(header + "\n" + csv + "\n" + content);
  } else {
    await writeStream.write(csv);
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

    fileStream.on("data", (row: CsvRunRow) => {
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
