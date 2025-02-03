export class CouldNotConnectToDB extends Error {
  constructor(message = "Could not connect to database") {
    super(message);
  }
}

export class DataTypeDumpFailed extends Error {
  constructor(error: string) {
    super(`Failed to dump data types: ${error}`);
  }
}

export class RunDumpFailed extends Error {
  constructor(error: string) {
    super(`Failed to dump runs: ${error}`);
  }
}

export class DataDumpFailed extends Error {
  constructor(error: string) {
    super(`Failed to dump data: ${error}`);
  }
}

export class FailedWriteAuditLog extends Error {
  constructor(error: string) {
    super(`Failed to write to audit log: ${error}`);
  }
}
