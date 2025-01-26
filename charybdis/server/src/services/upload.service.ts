import * as fs from "fs";
import * as path from "path";
import { parse } from "csv-parse";
import { PrismaClient as CloudPrisma } from "../../../cloud-prisma/prisma";
import { v4 as uuidv4 } from "uuid";

// Initialize the cloud DB client
const cloudDb = new CloudPrisma();

// Define batch size to avoid memory overload
const BATCH_SIZE = 1000; // Process records in chunks of 1000

/**
 * Stream CSV data in batches to avoid memory overload.
 */
async function processCsvInBatches<T>(
  filename: string,
  processBatch: (batch: T[]) => Promise<void>
): Promise<void> {
  return new Promise((resolve, reject) => {
    const records: T[] = [];
    const readStream = fs
      .createReadStream(path.resolve(filename))
      .pipe(parse({ columns: true, skip_empty_lines: true }));

    readStream.on("data", (row) => {
      records.push(row);

      if (records.length >= BATCH_SIZE) {
        readStream.pause(); // Pause stream to process batch
        processBatch(records.splice(0, BATCH_SIZE))
          .then(() => readStream.resume()) // Resume stream after batch processing
          .catch(reject);
      }
    });

    readStream.on("end", async () => {
      if (records.length > 0) {
        await processBatch(records);
      }
      console.log(`Finished processing ${filename}`);
      resolve();
    });

    readStream.on("error", (err) => {
      reject(`Error reading ${filename}: ${err.message}`);
    });
  });
}

export async function uploadToCloud() {
  try {
    console.log("Starting CSV to Cloud DB transfer...");

    // Store a map of localRunId -> newCloudRunId (UUID)
    const runIdMap: Record<number, string> = {};

    // 1. Insert runs in batches
    await processCsvInBatches<any>("run.csv", async (batch) => {
      const newRuns = batch.map((r) => {
        const newId = uuidv4();
        runIdMap[r.runId] = newId;

        return {
          runId: Number(r.runId),
          driverName: r.driverName,
          notes: r.notes
            ? `${r.notes} (location: ${r.locationName || ""})`
            : `(location: ${r.locationName || ""})`,
          time: new Date(r.time),
        };
      });

      await cloudDb.run.createMany({ data: newRuns, skipDuplicates: true });
      console.log(`Inserted ${newRuns.length} runs`);
    });

    console.log("Inserted all runs");

    // 2. Insert data_type in batches
    await processCsvInBatches<any>("data_type.csv", async (batch) => {
      const newDataTypes = batch.map((dt) => ({
        name: dt.name,
        unit: dt.unit,
        nodeName: dt.nodeName,
      }));

      await cloudDb.data_type.createMany({
        data: newDataTypes,
        skipDuplicates: true,
      });
      console.log(`Inserted ${newDataTypes.length} data_type entries`);
    });

    console.log("Inserted all data_type entries");

    // 3. Insert data in batches
    await processCsvInBatches<any>("data.csv", async (batch) => {
      const newData = batch.map((d, index) => {
        const values = parseFloatArray(d.values);

        if (values.length === 0) {
          console.warn(
            `Warning: Row ${index + 1} has empty values for dataType ${
              d.dataTypeName
            }`
          );
        }

        return {
          time: new Date(d.time),
          dataTypeName: d.dataTypeName,
          runId: runIdMap[d.runId], // Convert local runId(Int) to new run ID(String)
          values,
        };
      });

      await cloudDb.data.createMany({ data: newData, skipDuplicates: true });
      console.log(`Inserted ${newData.length} data entries`);
    });

    console.log("Inserted all data entries");
    console.log("CSV to Cloud transfer complete.");
  } catch (error) {
    console.error("Error processing CSV files:", error);
    process.exit(1);
  } finally {
    await cloudDb.$disconnect();
  }
}

/**
 * Helper to parse a string representation of array floats into an actual Float[].
 *
 * For example, if the CSV has "1,2,3", or "{1,2,3}", you'd want to split on commas.
 */
function parseFloatArray(maybeArrayString: string): number[] {
  if (!maybeArrayString || maybeArrayString.trim() === "") {
    console.warn(
      "Warning: Encountered empty values field, setting an empty array."
    );
    return []; // Return an empty array instead of null
  }

  // Remove brackets [] and whitespace
  const cleaned = maybeArrayString.replace(/[\[\]{}]/g, "").trim();

  // Check if the cleaned string is empty after removing brackets
  if (cleaned.length === 0) {
    console.warn(
      `Warning: Empty values array after parsing for input: "${maybeArrayString}"`
    );
    return [];
  }

  // Split the cleaned string by commas, map to float values
  const parsedArray = cleaned.split(",").map((val) => {
    const parsed = parseFloat(val.trim());

    if (isNaN(parsed)) {
      console.warn(
        `Warning: Encountered NaN value in input: "${maybeArrayString}"`
      );
      return null; // Replace NaN with null to remove it later
    }
    return parsed;
  });

  // Filter out null values caused by parsing errors
  const validNumbers = parsedArray.filter((val) => val !== null);

  if (validNumbers.length === 0) {
    console.warn(
      `Warning: Empty values array after parsing for input: "${maybeArrayString}"`
    );
  }

  return validNumbers;
}
