import { nanoid } from "nanoid";
import type { ImageGenerationJob, ImageGenerationOptions, ImageGenerationProvider } from "@/types/capit";

export class PlaceholderProvider implements ImageGenerationProvider {
  async generateImage(prompt: string, options: ImageGenerationOptions): Promise<ImageGenerationJob> {
    const style = options.style ?? "registry";
    const encodedPrompt = encodeURIComponent(prompt.slice(0, 160));
    return {
      provider: "placeholder",
      jobId: `placeholder_${nanoid()}`,
      status: "succeeded",
      imageUrl: `https://placehold.co/1200x1200/08111f/7dd3fc.png?text=CAPIT+${style.toUpperCase()}+NFT&prompt=${encodedPrompt}`
    };
  }

  async getStatus(jobId: string): Promise<ImageGenerationJob> {
    return { provider: "placeholder", jobId, status: "succeeded" };
  }

  async downloadImage(): Promise<ArrayBuffer> {
    return new TextEncoder().encode("placeholder image bytes").buffer;
  }
}

export class ManualBatchProvider implements ImageGenerationProvider {
  async generateImage(prompt: string, options: ImageGenerationOptions): Promise<ImageGenerationJob> {
    return {
      provider: "manual_batch",
      jobId: `manual_${nanoid()}`,
      status: "queued",
      imageUrl: options.metadata?.manualImageUrl ? String(options.metadata.manualImageUrl) : undefined,
      errorMessage: `Prompt queued for manual Ideogram batch export: ${prompt.slice(0, 80)}`
    };
  }

  async getStatus(jobId: string): Promise<ImageGenerationJob> {
    return { provider: "manual_batch", jobId, status: "queued" };
  }

  async downloadImage(result: ImageGenerationJob): Promise<ArrayBuffer> {
    if (!result.imageUrl) return new ArrayBuffer(0);
    const response = await fetch(result.imageUrl);
    return response.arrayBuffer();
  }
}

export class IdeogramProvider implements ImageGenerationProvider {
  constructor(private readonly apiKey: string, private readonly endpoint = "https://api.ideogram.ai/generate") {}

  async generateImage(prompt: string, options: ImageGenerationOptions): Promise<ImageGenerationJob> {
    const response = await fetch(this.endpoint, {
      method: "POST",
      headers: {
        "Api-Key": this.apiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        image_request: {
          prompt,
          aspect_ratio: options.aspectRatio ?? "1:1",
          model: "V_2",
          magic_prompt_option: "AUTO",
          negative_prompt: options.negativePrompt
        }
      })
    });
    const data = await response.json() as { request_id?: string; data?: Array<{ url?: string }> };
    return {
      provider: "ideogram",
      jobId: data.request_id ?? `ideogram_${nanoid()}`,
      status: data.data?.[0]?.url ? "succeeded" : "queued",
      imageUrl: data.data?.[0]?.url
    };
  }

  async getStatus(jobId: string): Promise<ImageGenerationJob> {
    return { provider: "ideogram", jobId, status: "queued" };
  }

  async downloadImage(result: ImageGenerationJob): Promise<ArrayBuffer> {
    if (!result.imageUrl) return new ArrayBuffer(0);
    const response = await fetch(result.imageUrl);
    return response.arrayBuffer();
  }
}
