import { describe, test, expect, afterEach } from 'vitest';
import { getAllDrivers, upsertDriver } from '../src/services/driver.services';
import prisma from '../src/prisma/prisma-client';

/**
 * Tests for CRUD Service functions
 */
describe('CRUD Driver', () => {
  afterEach(async () => {
    try {
      await prisma.driver.delete({
        where: {
          username: 'test'
        }
      });
    } catch (err) {}
  });

  /**
   * unit test for get all drivers
   */
  test('Get All Data Types Works', async () => {
    const expected = [];
    const data = {} as JSON
    const result = await getAllDrivers(data);

    // Parse result to a JavaScript object from the JSON string
    const parsedResult = JSON.parse(result);

    // Use toEqual to compare parsedResult with the expected array
    expect(parsedResult).toEqual(expected);
  });

  /**
   * Unit testing for upsert driver
   * test driver creation if the name doesn't already exist
   * */
  test('Upsert Driver Creates', async () => {
    const expected = [{ username: 'test' }];
    await upsertDriver('test');
    const data = {} as JSON
    const result = JSON.parse(await getAllDrivers(data));

    expect(result).toEqual(expected);
  });
});