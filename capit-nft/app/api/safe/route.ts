import { NextResponse } from "next/server";
import { prepareOracleMinterSafeTransaction } from "@/lib/blockchain/safe";

export async function POST(request: Request) {
  const payload = await request.json() as { encodedMintCallData: string };
  const oracleMinter = process.env.ORACLE_MINTER_ADDRESS ?? "0x0000000000000000000000000000000000000000";
  return NextResponse.json(prepareOracleMinterSafeTransaction(oracleMinter, payload.encodedMintCallData));
}
