import * as fs from "fs";
import { WriteStream } from "fs";
import { Parser } from "json2csv";
import { parse } from "csv-parse";
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
