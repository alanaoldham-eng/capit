import { createHash } from "node:crypto";
import type { PluggedWellRecord } from "@/types/capit";

export function sha256Hex(value: string): string {
  return `0x${createHash("sha256").update(value).digest("hex")}`;
}

export function canonicalWellPayload(well: PluggedWellRecord): string {
  return JSON.stringify({
    apiNumber: well.apiNumber.trim(),
    state: well.state.trim().toUpperCase(),
    county: well.county.trim(),
    operator: well.operator.trim(),
    plugDate: well.plugDate,
    sourceUrl: well.sourceUrl,
    latitude: well.latitude ?? null,
    longitude: well.longitude ?? null,
    pluggingCostEstimateUsd: well.pluggingCostEstimateUsd ?? null,
    methaneReductionEstimateTonsCo2e: well.methaneReductionEstimateTonsCo2e ?? null
  });
}

export function buildWellHashes(well: PluggedWellRecord) {
  const canonicalPayload = canonicalWellPayload(well);
  return {
    apiNumberHash: sha256Hex(well.apiNumber.trim()),
    wellIdHash: sha256Hex(`${well.state.toUpperCase()}:${well.apiNumber.trim()}:${well.plugDate}`),
    proofHash: sha256Hex(canonicalPayload)
  };
}
