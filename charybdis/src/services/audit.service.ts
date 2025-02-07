import path from "path";
import { parse } from "csv-parse";
import fs from "fs";
import { DOWNLOADS_PATH } from "../storage-paths";

/**
 *
 * @returns the path to the folder based on the folder name at the top of the list of the audit_log.csv file.
 */
export async function getMostRecentDownloadFolder(): Promise<string> {
  return new Promise((resolve, reject) => {
    console.log("Getting most recent download folder...");
    const auditLogPath = path.resolve(`${DOWNLOADS_PATH}/audit_log.csv`);
    console.log(`Reading audit log from: ${auditLogPath}`);
    const auditLogStream = fs.createReadStream(auditLogPath).pipe(parse({}));

    let lineCount = 0;

    console.log("Reading audit log...");
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
