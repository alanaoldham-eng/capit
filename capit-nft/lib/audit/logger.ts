import { createHash } from "node:crypto";

export interface AuditEventInput {
  actor: string;
  action: string;
  entityType: string;
  entityId: string;
  payload: unknown;
  previousHash?: string;
}

export function createAuditEvent(input: AuditEventInput) {
  const createdAt = new Date().toISOString();
  const eventPayload = JSON.stringify({ ...input, createdAt });
  const eventHash = `0x${createHash("sha256").update(eventPayload).digest("hex")}`;
  return { ...input, createdAt, eventHash };
}
