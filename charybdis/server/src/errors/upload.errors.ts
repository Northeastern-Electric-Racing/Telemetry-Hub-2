export class CouldNotConnectToCloudDB extends Error {
  constructor(message = "Could not connect to database") {
    super(message);
  }
}

export class DataTypeUploadError extends Error {
  constructor(error: string) {
    super("Failed to upload data types: " + error);
  }
}

export class RunsUploadError extends Error {
  constructor(error: string) {
    super("Failed to upload runs: " + error);
  }
}

export class DataUploadError extends Error {
  constructor(error: string) {
    super("Failed to upload data: " + error);
  }
}
