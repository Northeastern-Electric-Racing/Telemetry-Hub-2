import { urls } from './urls';

/**
 * Fetches all nodes from the server
 * @returns A promise containing the response from the server
 */
export const getAllDatatypes = (): Promise<Response> => {
  return fetch(urls.getAllDatatypes());
};
