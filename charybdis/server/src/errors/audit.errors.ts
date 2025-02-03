export class FailedWriteAuditLog extends Error {
  constructor(error: string) {
    super(`Failed to write to audit log: ${error}`);
  }
}
