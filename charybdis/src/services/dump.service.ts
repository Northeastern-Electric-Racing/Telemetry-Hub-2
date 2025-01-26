import { Parser } from "json2csv";
import * as fs from "fs";
import { PrismaClient as LocalPrisma } from "../../local-prisma/prisma";

const localDb = new LocalPrisma();

async function fetchAndWriteTable(tableName: string, chunkSize = 5000) {
  let skip = 0;
  let hasMore = true;

  while (hasMore) {
    const records = await (
      localDb[tableName as keyof typeof localDb] as any
    ).findMany({
      skip,
      take: chunkSize,
    });

    if (records.length === 0) {
      hasMore = false;
    } else {
      appendToCsv(records, `${tableName}.csv`);
      console.log(`Fetched ${records.length} records from ${tableName}`);
      skip += chunkSize;
    }
  }
}

function appendToCsv<T>(records: T[], filename: string) {
  const parser = new Parser({ header: fs.existsSync(filename) ? false : true });
  const csv = parser.parse(records);
  fs.appendFileSync(filename, csv + "\n", { encoding: "utf8" });
}

async function main() {
  try {
    console.log("Starting data export...");

    await fetchAndWriteTable("run", 2000);
    await fetchAndWriteTable("data_type", 1000);
    await fetchAndWriteTable("data", 5000);

    console.log("Data export completed successfully.");
  } catch (error) {
    console.error("Error exporting data to CSV:", error);
  } finally {
    await localDb.$disconnect();
  }
}

main();
