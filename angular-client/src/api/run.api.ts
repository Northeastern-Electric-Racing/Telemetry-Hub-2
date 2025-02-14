import { urls } from './urls';

/**
 * Fetches all runs from the server
 * @returns A promise containing the response from the server
 */
export const getAllRuns = (): Promise<Response> => {
  return fetch(urls.getAllRuns());
};

/**
 * Fetches the latest run from the server (highest id)
 *
 * @returns A promise containing the response from the server
 */
export const getLatestRun = (): Promise<Response> => {
  return fetch(urls.getLatestRun());
};

/**
 * Fetches the run with the given id
 * @param id The id of the run to request
 * @returns The requested run
 */
export const getRunById = (id: number): Promise<Response> => {
  return fetch(urls.getRunById(id));
};

export const startNewRun = () => {
  return fetch(urls.startNewRun(), { method: 'POST' });
};
