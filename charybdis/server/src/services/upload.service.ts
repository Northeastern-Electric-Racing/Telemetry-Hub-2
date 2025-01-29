// import * as fs from "fs";
// import * as path from "path";
// import { parse } from "csv-parse";
// import { PrismaClient as CloudPrisma } from "../../../cloud-prisma/prisma";
// import { LocalData, LocalDataType, LocalRun } from "../types/local.types";
// import { CloudData, CloudDataType, CloudRun } from "../types/cloud.types";
// import { CsvRunRow } from "../types/csv.types";
// import { DOWNLOADS_PATH } from "../storage-paths";

// const localTables = {
//   run: "run",
//   data: "data",
//   data_type: "data_type",
// };

// export async function processRuns(
//   processRunBatch: (batch: CsvRunRow[]) => Promise<void>
// ) {
//   await processCsvInBatches<CsvRunRow>(
//     `${localTables.run}.csv`,
//     processRunBatch,
//     1000
//   );
// }

// export async function processDataType(
//   processDataTypeBatch: (batch: LocalDataType[]) => Promise<void>
// ) {
//   await processCsvInBatches<LocalDataType>(
//     `${localTables.data_type}.csv`,
//     processDataTypeBatch,
//     1000
//   );
// }

// export async function processData(
//   processDataBatch: (batch: LocalData[]) => Promise<void>
// ) {
//   await processCsvInBatches<LocalData>(
//     `${localTables.data}.csv`,
//     processDataBatch,
//     5000
//   );
// }

// // Initialize the cloud DB client
// const cloudDb = new CloudPrisma();

// // Define batch size to avoid memory overload
// const BATCH_SIZE = 1000; // Process records in chunks of 1000

// /**
//  * Stream CSV data in batches to avoid memory overload.
//  */
// async function processCsvInBatches<T>(
//   filename: string,
//   processBatch: (batch: T[]) => Promise<void>,
//   batchSize: number
// ): Promise<void> {
//   return new Promise((resolve, reject) => {
//     const records: any[] = [];
//     const readStream = fs
//       .createReadStream(path.resolve(filename))
//       .pipe(parse({ columns: true, skip_empty_lines: true, cast: true }));

//     // this data has
//     readStream.on("data", (row) => {
//       records.push(row);

//       if (records.length >= batchSize) {
//         readStream.pause(); // Pause stream to process batch
//         processBatch(records.splice(0, batchSize))
//           .then(() => readStream.resume()) // Resume stream after batch processing
//           .catch(reject);
//       }
//     });

//     readStream.on("end", async () => {
//       if (records.length > 0) {
//         await processBatch(records);
//       }
//       console.log(`Finished processing ${filename}`);
//       resolve();
//     });

//     readStream.on("error", (err) => {
//       reject(`Error reading ${filename}: ${err.message}`);
//     });
//   });
// }

// export async function uploadToCloud() {
//   try {
//     console.log("Starting CSV to Cloud DB transfer...");

//     const mostRecentFolder = getFirstLexicographicalFolder(DOWNLOADS_PATH);
//     if (!mostRecentFolder) {
//       console.error("No folders found in downloads directory.");
//       process.exit(1);
//     }

//     // Upsert data types into the cloud database
//     await processDataType(async (batch) => {
//       const cloudDataTypes: CloudDataType[] = batch.map((localDataType) => ({
//         name: localDataType.name,
//         unit: localDataType.unit,
//         nodeName: localDataType.nodeName,
//       }));

//       await cloudDb.data_type.createMany({
//         data: cloudDataTypes,
//         skipDuplicates: true,
//       });
//       console.log(`Inserted ${cloudDataTypes.length} data_type entries`);
//     });

//     // Insert each run and it's data in batches
//     await processRunsAndData(mostRecentFolder);

//     console.log("Inserted all runs");

//     // 2. Insert data_type in batches
//     await processCsvInBatches<LocalDataType>("data_type.csv", async (batch) => {
//       const cloudDataTypes: CloudDataType[] = batch.map((localDataType) => ({
//         name: localDataType.name,
//         unit: localDataType.unit,
//         nodeName: localDataType.nodeName,
//       }));

//       await cloudDb.data_type.createMany({
//         data: cloudDataTypes,
//         skipDuplicates: true,
//       });
//       console.log(`Inserted ${cloudDataTypes.length} data_type entries`);
//     });

//     console.log("Inserted all data_type entries");

//     // 3. Insert data in batches
//     await processCsvInBatches<LocalData>("data.csv", async (batch) => {
//       const newData: CloudData[] = batch.map((localData, index) => {
//         // const values = parseFloatArray(localData.values);

//         if (localData.values.length === 0) {
//           console.warn(
//             `Warning: Row ${index + 1} has empty values for dataType ${
//               localData.dataTypeName
//             }`
//           );
//         }

//         return {
//           time: new Date(localData.time),
//           dataTypeName: localData.dataTypeName,
//           runId: runIdMap[localData.runId], // Convert local runId(Int) to new run ID(String)
//           values: localData.values,
//         };
//       });

//       await cloudDb.data.createMany({ data: newData, skipDuplicates: true });
//       console.log(`Inserted ${newData.length} data entries`);
//     });

//     console.log("Inserted all data entries");
//     console.log("CSV to Cloud transfer complete.");
//   } catch (error) {
//     console.error("Error processing CSV files:", error);
//     process.exit(1);
//   } finally {
//     await cloudDb.$disconnect();
//   }
// }

// /**
//  * Get the lexically first folder in the specified directory.
//  *
//  * @param directoryPath The path to the directory to search.
//  * @returns The name of the first folder found, or null if no folders are found.
//  */
// function getFirstLexicographicalFolder(directoryPath: string): string | null {
//   try {
//     // Read all items in the directory
//     const items = fs.readdirSync(directoryPath, { withFileTypes: true });

//     // Filter items to include only directories
//     const folders = items
//       .filter((item) => item.isDirectory())
//       .map((folder) => folder.name);

//     if (folders.length === 0) {
//       console.log("No folders found in the directory.");
//       return null;
//     }

//     // Sort folders by name (assumes timestamped names)
//     const sortedFolders = folders.sort();

//     // Return the last folder name (most recent)
//     return sortedFolders[0];
//   } catch (error) {
//     console.error("Error reading directory:", error);
//     return null;
//   }
// }
