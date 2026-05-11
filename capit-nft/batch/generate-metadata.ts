import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { readWellCsv, enrichWells } from "@/lib/ingestion";
import { generateGenesisMetadata, generatePremiumMetadata, generateRegistryMetadata } from "@/lib/metadata/generator";

const input = process.argv[2] ?? "sample-data/sample-well-batch.csv";
const outputDir = process.argv[3] ?? "dist/metadata";
mkdirSync(outputDir, { recursive: true });

const records = enrichWells(readWellCsv(input));
for (const record of records) {
  const metadata = record.nftTier === "genesis_candidate"
    ? generateGenesisMetadata(record, record.imageUri ?? "ipfs://pending-genesis-art")
    : record.nftTier === "premium_candidate"
      ? generatePremiumMetadata(record, record.imageUri ?? "ipfs://pending-premium-art")
      : generateRegistryMetadata(record);
  writeFileSync(join(outputDir, `${record.apiNumber}.json`), JSON.stringify(metadata, null, 2));
}
console.log(`Generated ${records.length} metadata files in ${outputDir}`);
