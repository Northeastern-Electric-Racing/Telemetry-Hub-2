import { describe, test, expect } from 'vitest';
import { getDataByDataTypeName } from '../src/services/data.services';

/**
 * Unit Test for Get All Data by DataType Name
 * Checks that given datatype name, functionr returns expected data
 * Currently no data in database
 */
describe('Data', () => {
  test('Get All Data by DataType Name', async () => {
    const expected = [];
    const data = JSON.parse('{"dataTypeName": "test"}');
    const result = await getDataByDataTypeName(data);

    // Parse result to a JavaScript object from the JSON string
    const parsedResult = JSON.parse(result);

    // Use toEqual to compare parsedResult with the expected array
    expect(parsedResult).toEqual(expected);
  });
});