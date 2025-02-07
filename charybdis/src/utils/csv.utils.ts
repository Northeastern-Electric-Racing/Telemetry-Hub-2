import * as fs from "fs";
import { AsyncParser, Transform } from "@json2csv/node";
import { parse } from "csv-parse";
import { promisify } from "util";
import { pipeline } from "stream/promises";

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
