import { environment } from 'src/environment/environment';

const baseURL = (environment as any).url || 'http://localhost:8000';

/* Nodes */
const getAllNodes = () => `${baseURL}/nodes`;

/* Nodes with Data */
const getSingleNodeWithData = (nodeName: string, timeToQueryFrom: number) =>
  `${baseURL}/nodesWithData/singleNode/${nodeName}/${timeToQueryFrom}`;

/* Systems */
const getAllSystems = () => `${baseURL}/systems`;

/* Data */
const getDataByDataTypeNameAndRunId = (dataTypeName: string, runId: number) => `${baseURL}/data/${dataTypeName}/${runId}`;
const getDataByDatetime = (dateTime: string) => `${baseURL}/dataByDatetime/${dateTime}`;

/* Runs */
const getRunById = (id: number) => `${baseURL}/runs/${id}`;
const getAllRuns = () => `${baseURL}/runs`;
const startNewRun = () => `${baseURL}/runs/new`;

export const urls = {
  getAllNodes,
  getSingleNodeWithData,

  getAllSystems,

  getDataByDataTypeNameAndRunId,
  getDataByDatetime,

  getAllRuns,
  getRunById,
  startNewRun
};
