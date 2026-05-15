import { NextResponse } from "next/server";
import { getMockSponsorQuote } from "@/lib/sponsorService";

export function GET() {
  return NextResponse.json(getMockSponsorQuote());
}
