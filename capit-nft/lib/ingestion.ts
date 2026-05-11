import { readFileSync } from "node:fs";
import type { HashedWellRecord, PluggedWellRecord } from "@/types/capit";
import { pluggedWellSchema } from "@/lib/validation";
import { buildWellHashes } from "@/lib/metadata/hashing";
import { assignNftTier } from "@/lib/tiers/assignment";

function parseCsvLine(line: string): string[] {
  const values: string[] = [];
  let current = "";
  let quoted = false;
  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    const next = line[i + 1];
    if (char === '"' && quoted && next === '"') {
      current += '"';
      i += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      values.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  values.push(current.trim());
  return values;
}

export function readWellCsv(filePath: string): PluggedWellRecord[] {
  const [headerLine, ...lines] = readFileSync(filePath, "utf8").trim().split(/\r?\n/);
  const headers = parseCsvLine(headerLine);
  return lines.filter(Boolean).map((line) => {
    const values = parseCsvLine(line);
    const row = Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""]));
    return pluggedWellSchema.parse({
      apiNumber: row.api_number,
      state: row.state,
      county: row.county,
      operator: row.operator,
      plugDate: row.plug_date,
      sourceUrl: row.source_url,
      latitude: row.latitude || undefined,
      longitude: row.longitude || undefined,
      pluggingCostEstimateUsd: row.plugging_cost_estimate_usd || undefined,
      methaneReductionEstimateTonsCo2e: row.methane_reduction_estimate_tons_co2e || undefined,
      depthFeet: row.depth_feet || undefined,
      isOffshore: row.is_offshore || undefined,
      isLaunchBatch: row.is_launch_batch || undefined,
      notes: row.notes || undefined
    });
  });
}

export function enrichWells(wells: PluggedWellRecord[]): HashedWellRecord[] {
  return wells.map((well, index) => {
    const nftTier = assignNftTier(well, undefined, index);
    return {
      ...well,
      ...buildWellHashes(well),
      nftTier,
      mintStatus: "validated",
      artStatus: nftTier === "registry_only" ? "not_required" : "pending"
    };
  });
}
