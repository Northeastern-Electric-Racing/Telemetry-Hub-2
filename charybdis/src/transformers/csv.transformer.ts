import { CloudData } from "../types/cloud.types";
import { CsvDataRow, CsvDataTypeRow, CsvRunRow } from "../types/csv.types";
import { LocalData, LocalDataType, LocalRun } from "../types/local.types";

export const csvToCloudData = (
  csvDataRow: CsvDataRow,
  uuid: string
): CloudData => {
  const time = BigInt(csvDataRow.time);

  const values = parseFloatArray(csvDataRow.values);

  return {
    runId: uuid,
    dataTypeName: csvDataRow.dataTypeName,
    time,
    values,
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
