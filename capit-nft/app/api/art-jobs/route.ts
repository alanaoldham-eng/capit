import { NextResponse } from "next/server";
import { PlaceholderProvider, IdeogramProvider, ManualBatchProvider } from "@/lib/art/providers";

export async function POST(request: Request) {
  const payload = await request.json() as { provider?: string; prompt: string; style?: "registry" | "premium" | "genesis" };
  const provider = payload.provider === "ideogram" && process.env.IDEOGRAM_API_KEY
    ? new IdeogramProvider(process.env.IDEOGRAM_API_KEY)
    : payload.provider === "manual_batch"
      ? new ManualBatchProvider()
      : new PlaceholderProvider();
  const job = await provider.generateImage(payload.prompt, { style: payload.style ?? "registry", aspectRatio: "1:1" });
  return NextResponse.json(job);
}
