export type NftTier = "registry_only" | "premium_candidate" | "genesis_candidate";
export type MintStatus = "draft" | "validated" | "dry_run_passed" | "safe_prepared" | "minted" | "failed";
export type ArtStatus = "not_required" | "pending" | "manual_exported" | "generating" | "ready" | "failed";
export type ImageProviderName = "ideogram" | "manual_batch" | "placeholder";

export interface PluggedWellRecord {
  apiNumber: string;
  state: string;
  county: string;
  operator: string;
  plugDate: string;
  sourceUrl: string;
  latitude?: number;
  longitude?: number;
  pluggingCostEstimateUsd?: number;
  methaneReductionEstimateTonsCo2e?: number;
  depthFeet?: number;
  isOffshore?: boolean;
  isLaunchBatch?: boolean;
  notes?: string;
}

export interface HashedWellRecord extends PluggedWellRecord {
  apiNumberHash: string;
  wellIdHash: string;
  proofHash: string;
  nftTier: NftTier;
  metadataUri?: string;
  imageUri?: string;
  tokenId?: string;
  mintStatus: MintStatus;
  artStatus: ArtStatus;
}

export interface TierAssignmentContext {
  methanePremiumThresholdTonsCo2e: number;
  knownFirstPluggedWellByState: Record<string, string>;
  launchBatchGenesisLimit: number;
}

export interface NftAttribute {
  trait_type: string;
  value: string | number | boolean;
  display_type?: "number" | "date" | "boost_number" | "boost_percentage";
}

export interface OpenSeaMetadata {
  name: string;
  description: string;
  image: string;
  external_url?: string;
  animation_url?: string;
  attributes: NftAttribute[];
  background_color?: string;
}

export interface ImageGenerationOptions {
  aspectRatio?: "1:1" | "16:9" | "9:16";
  style?: "registry" | "premium" | "genesis";
  seed?: number;
  negativePrompt?: string;
  metadata?: Record<string, string | number | boolean | undefined>;
}

export interface ImageGenerationJob {
  provider: ImageProviderName;
  jobId: string;
  status: "queued" | "running" | "succeeded" | "failed";
  imageUrl?: string;
  errorMessage?: string;
}

export interface ImageGenerationProvider {
  generateImage(prompt: string, options: ImageGenerationOptions): Promise<ImageGenerationJob>;
  getStatus(jobId: string): Promise<ImageGenerationJob>;
  downloadImage(result: ImageGenerationJob): Promise<ArrayBuffer>;
}

export interface MintBatchSummary {
  id: string;
  name: string;
  status: MintStatus;
  recordCount: number;
  registryCount: number;
  premiumCandidateCount: number;
  genesisCandidateCount: number;
  createdBy: string;
  createdAt: string;
}
