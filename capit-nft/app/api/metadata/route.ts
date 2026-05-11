import { NextResponse } from "next/server";
import { buildWellHashes } from "@/lib/metadata/hashing";
import { generateGenesisMetadata, generatePremiumMetadata, generateRegistryMetadata } from "@/lib/metadata/generator";
import { assignNftTier } from "@/lib/tiers/assignment";
import { pluggedWellSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const payload = await request.json();
  const well = pluggedWellSchema.parse(payload.well);
  const record = { ...well, ...buildWellHashes(well), nftTier: assignNftTier(well), mintStatus: "validated" as const, artStatus: "pending" as const, imageUri: payload.imageUri as string | undefined };
  const metadata = record.nftTier === "genesis_candidate" ? generateGenesisMetadata(record, record.imageUri ?? "ipfs://pending-genesis-art") : record.nftTier === "premium_candidate" ? generatePremiumMetadata(record, record.imageUri ?? "ipfs://pending-premium-art") : generateRegistryMetadata(record);
  return NextResponse.json(metadata);
}
