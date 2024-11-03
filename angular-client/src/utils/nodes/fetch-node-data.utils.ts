import APIService from 'src/services/api.service';
import { NodeWithData } from '../types.utils';
import { getNodesWithData } from 'src/api/node.api';

export const fetchNodeDataOverPeriod = (
  nodeNames: String[],
  toTime: number,
  fromTime: number,
  serverService: APIService
): NodeWithData[] => {
  let nodeDataIsLoading;
  let nodeDataError!: Error;
  let isNodeDataError!: boolean;
  let nodesWithData: NodeWithData[] = [];

  const allNodesAt30Seconds = serverService.query<NodeWithData[]>(() => getNodesWithData(toTime, fromTime));
  allNodesAt30Seconds.isLoading.subscribe((isLoading: boolean) => {
    nodeDataIsLoading = isLoading;
  });
  allNodesAt30Seconds.error.subscribe((error: Error) => {
    nodeDataError = error;
    isNodeDataError = true;
  });
  allNodesAt30Seconds.data.subscribe((data: NodeWithData[]) => {
    console.log(data);
    nodesWithData = data;
  });

  if (nodeDataIsLoading) {
    console.log('Data loading... for node fetch');
  }

  if (isNodeDataError) {
    console.log('Node fetch failed with: %s', nodeDataError.message);
    throw nodeDataError;
  }

  return nodesWithData;
};

/*
  let faultSpecifcNodeIsLoading!: boolean;
  let faultNodeError!: Error;
  let isFaultNodeError!: boolean;
  // query the specific node for this fault, at 60 seconds
  const faulSpecifcNode = this.serverService.query<NodeWithData>(() =>
    getSingleNodeWithData('BMS', this.timeTriggered.getTime(), this.timeTriggered.getTime() - 60 * 1000)
  );
  faulSpecifcNode.isLoading.subscribe((isLoading: boolean) => {
    faultSpecifcNodeIsLoading = isLoading;
  });
  faulSpecifcNode.error.subscribe((error: Error) => {
    faultNodeError = error;
    isFaultNodeError = true;
  });
  faulSpecifcNode.data.subscribe((data: NodeWithData) => {
    console.log(data);
    // replace the original 30 second query for this faults specific node
    // with this 60 second query
    this.relvantNodesWithData.map((nodeWithData) => {
      if (nodeWithData.name === data.name) {
        return data;
      }
      return nodeWithData;
    });
  });

  if (faultSpecifcNodeIsLoading) {
    // TODO: what do I add here
  }

  if (isFaultNodeError) {
    throw faultNodeError;
  }

*/
