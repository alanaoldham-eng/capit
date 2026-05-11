import type { NftTier, PluggedWellRecord, TierAssignmentContext } from "@/types/capit";

export const DEFAULT_TIER_CONTEXT: TierAssignmentContext = {
  methanePremiumThresholdTonsCo2e: 500,
  knownFirstPluggedWellByState: {},
  launchBatchGenesisLimit: 50
};

export function assignNftTier(
  well: PluggedWellRecord,
  context: TierAssignmentContext = DEFAULT_TIER_CONTEXT,
  batchIndex = 0,
  override?: NftTier
): NftTier {
  if (override) return override;

  if (well.isLaunchBatch && batchIndex < context.launchBatchGenesisLimit) {
    return "genesis_candidate";
  }

  const firstWellApi = context.knownFirstPluggedWellByState[well.state.toUpperCase()];
  if (firstWellApi && firstWellApi === well.apiNumber) {
    return "premium_candidate";
  }

  if ((well.methaneReductionEstimateTonsCo2e ?? 0) >= context.methanePremiumThresholdTonsCo2e) {
    return "premium_candidate";
  }

  if (well.isOffshore || (well.depthFeet ?? 0) >= 15000) {
    return "premium_candidate";
  }

  return "registry_only";
}
