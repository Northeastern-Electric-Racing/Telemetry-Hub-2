import { CsvDataRow, CsvDataTypeRow, CsvRunRow } from "../types/csv.types";
import { LocalData, LocalDataType, LocalRun } from "../types/local.types";

/**
 * Converts the CSV run row, which has fields all as they
 * are stored in the CSV (as strings), to a local run.
 *
 * @param csvRunRow The CSV run row to convert.
 * @returns a typed version of run as it is stored in the Local database.
 */
export const csvToLocalRun = (csvRunRow: CsvRunRow): LocalRun => {
  const runId = parseInt(csvRunRow.runId);
  if (isNaN(runId) || runId < 0) {
    console.log("Invalid runId found in CSV:", csvRunRow.runId);
    throw new Error("Invalid runId");
  }

  const time = new Date(csvRunRow.time);
  if (isNaN(time.getTime())) {
    console.log("Invalid time found in CSV:", csvRunRow.time);
    throw new Error("Invalid time format in CSV");
  }

  return {
    runId,
    driverName: csvRunRow.driverName,
    locationName: csvRunRow.locationName,
    notes: csvRunRow.notes,
    time,
  };
};

/**
 * Converts the CSV data type row, which has fields all as they
 * are stored in the CSV (as strings), to a local data type.
 *
 * @param csvDataTypeRow The CSV data type row to convert.
 * @returns a typed version of data type as it is stored in the Local database.
 */
export const csvToLocalDataType = (
  csvDataTypeRow: CsvDataTypeRow
): LocalDataType => {
  return {
    name: csvDataTypeRow.name,
    unit: csvDataTypeRow.unit,
    nodeName: csvDataTypeRow.nodeName,
  };
};

/**
 * Converts the CSV data row, which has fields all as they
 * are stored in the CSV (as strings), to a local data.
 *
 * @param csvDataRow The CSV data row to convert.
 * @returns the typed version of data as it is stored in the Local database.
 */
export const csvToLocalData = (csvDataRow: CsvDataRow): LocalData => {
  const time = new Date(csvDataRow.time);
  if (isNaN(time.getTime())) {
    console.log("Invalid time found in CSV:", csvDataRow.time);
    throw new Error("Invalid time format in CSV");
  }

  const values = parseFloatArray(csvDataRow.values);

  return {
    values,
    time,
    runId: csvDataRow.runId,
    dataTypeName: csvDataRow.dataTypeName,
  };
};

/**
 * Parses a string representation of an array of floats in the format "[1,2,3]".
 * Throws an error if NaN values are encountered.
 */
function parseFloatArray(maybeArrayString: string): number[] {
  if (!maybeArrayString || maybeArrayString.trim() === "") {
    console.log("Empty values field found in CSV:", maybeArrayString);
    throw new Error(
      "Error: Encountered empty values field, expected format '[1,2,3]'."
    );
  }

  // Ensure string starts and ends with square brackets
  if (!/^\[.*\]$/.test(maybeArrayString.trim())) {
    console.log("Invalid format found in CSV:", maybeArrayString);
    throw new Error(
      `Error: Invalid format, expected "[...]", received: "${maybeArrayString}"`
    );
  }

  // Remove brackets and whitespace
  const cleaned = maybeArrayString.trim().slice(1, -1).trim();

  if (cleaned.length === 0) {
    console.log("Empty values array found in CSV:", maybeArrayString);
    throw new Error(
      `Error: Empty values array after parsing for input: "${maybeArrayString}"`
    );
  }

  // Split values by comma, trim whitespace, and parse to float
  const parsedArray = cleaned.split(",").map((val) => {
    const parsed = parseFloat(val.trim());

    if (isNaN(parsed)) {
      console.log("Invalid value found in CSV:", val.trim());
      throw new Error(
        `Error: Encountered NaN value in input: "${maybeArrayString}" at "${val.trim()}"`
      );
    }

    // each returned value builds the array of values
    return parsed;
  });

  return parsedArray;
}
