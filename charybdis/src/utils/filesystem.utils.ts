import * as fs from "fs";

export async function createFolder(folderPath: string) {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
    console.info(`Folder created at: ${folderPath}`);
  } else {
    console.info(`Folder already exists at: ${folderPath}`);
  }
}

export function createMeaningfulFileName(name: string, date: Date): string {
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
