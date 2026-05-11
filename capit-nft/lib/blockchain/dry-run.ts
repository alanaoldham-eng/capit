import type { HashedWellRecord } from "@/types/capit";

export interface DryRunResult {
  network: "base-sepolia";
  canExecute: boolean;
  duplicateApiHashes: string[];
  estimatedCapitToMint: number;
  warnings: string[];
}

export function simulateBaseSepoliaMint(records: HashedWellRecord[], previouslyMintedHashes: Set<string> = new Set()): DryRunResult {
  const duplicateApiHashes = records.filter((record) => previouslyMintedHashes.has(record.apiNumberHash)).map((record) => record.apiNumberHash);
  return {
    network: "base-sepolia",
    canExecute: duplicateApiHashes.length === 0,
    duplicateApiHashes,
    estimatedCapitToMint: records.length,
    warnings: records.length === 0 ? ["No wells supplied; one plugged well must map to exactly one CAPIT token."] : []
  };
}
