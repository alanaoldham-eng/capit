import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    ok: true,
    service: "cardano-onboardkit-v001",
    network: process.env.NEXT_PUBLIC_CARDANO_NETWORK || "preprod-demo",
  });
}
