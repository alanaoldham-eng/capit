import { getBadges, getClaims, saveBadges, saveClaims } from "./localStorage";
import type { Campaign, ClaimRecord } from "./types";

export function recordLocalClaim(campaign: Campaign, email: string, walletAddress?: string): ClaimRecord {
  const claim: ClaimRecord = {
    id: crypto.randomUUID(),
    campaignSlug: campaign.slug,
    email,
    walletAddress,
    claimedAt: new Date().toISOString(),
    status: "local-record",
  };

  saveClaims([claim, ...getClaims()]);
  const existingBadges = getBadges();
  if (!existingBadges.some((badge) => badge.campaignSlug === campaign.slug)) {
    saveBadges([
      {
        id: claim.id,
        title: campaign.title,
        description: campaign.description,
        campaignSlug: campaign.slug,
        acquiredAt: claim.claimedAt,
      },
      ...existingBadges,
    ]);
  }
  return claim;
}
