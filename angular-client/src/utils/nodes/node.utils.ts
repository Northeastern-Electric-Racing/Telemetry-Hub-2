import APIService from 'src/services/api.service';
import { Node } from '../types.utils';
import { getAllNodes } from 'src/api/node.api';

/**
 * Queries the nodes from the server.
 */
export const queryNodes = (serverService: APIService): Node[] => {
  const nodeQueryResponse = serverService.query<Node[]>(getAllNodes);
  nodeQueryResponse.isLoading.subscribe((isLoading: boolean) => {
    // this.nodesIsLoading = isLoading;
  });
  nodeQueryResponse.error.subscribe((error: Error) => {
    // let nodesIsError = true;
    // nodesError = error;
    throw Error('error recieving response.');
  });
  nodeQueryResponse.data.subscribe((data: Node[]) => {
    return data;
  });

  return [];
};
