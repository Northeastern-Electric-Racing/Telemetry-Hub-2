import { urls } from './urls';

/**
 * Fetches all nodes from the server
 * @returns A promise containing the response from the server
 */
export const getAllNodes = (): Promise<Response> => {
  return fetch(urls.getAllNodes());
};

/**
 * Fetches all nodes with their associated data.
 * @param toTime the most recent time you want data for all nodes (in milliseconds since midnight, January 1, 1970 UTC.)
 * @param fromTime the time to begin querying from (in milliseconds since midnight, January 1, 1970 UTC.)
 * @returns a list of full nodes with data from between from_time and to_time
 */
export const getSingleNodeWithData = (nodeName: string, timeToQueryFrom: number): Promise<Response> => {
  return fetch(urls.getSingleNodeWithData(nodeName, timeToQueryFrom));
};
