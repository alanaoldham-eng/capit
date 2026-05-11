import { NextResponse } from "next/server";
import { buildWellHashes } from "@/lib/metadata/hashing";
import { assignNftTier } from "@/lib/tiers/assignment";
import { mintBatchSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const payload = await request.json();
  const wells = mintBatchSchema.parse(payload.wells);
  const records = wells.map((well, index) => ({ ...well, ...buildWellHashes(well), nftTier: assignNftTier(well, undefined, index) }));
  return NextResponse.json({ status: "validated", recordCount: records.length, records });
}
