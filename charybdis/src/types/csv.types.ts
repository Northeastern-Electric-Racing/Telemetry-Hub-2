/* these all match the local database types, except the are the format we expect our csv local csv to hold them in */

export interface CsvRunRow {
  /* 
  we store uuid locally in order to fully ensure 
  that when a run upload fails, and we will be able to maintain access 
  and knowledge of the uuid mapping to our local runId.
  */
  uuid: string;
  runId: string;
  driverName: string;
  locationName: string;
  notes: string;
  time: string;
}

export interface CsvDataRow {
  values: string;
  time: string;
  runId: string;
  dataTypeName: string;
}

export interface CsvDataTypeRow {
  name: string;
  unit: string;
  nodeName: string;
}

export interface AuditRow {
  status: string;
  dumpFolderName: string;
  timeTrigger: Date;
  error?: string;
}
