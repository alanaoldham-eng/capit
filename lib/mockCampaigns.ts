import type { Campaign } from "./types";

export const mockCampaigns: Campaign[] = [
  {
    slug: "founders-badge",
    name: "Founders Badge Drop",
    title: "Cardano OnboardKit Founders Badge",
    description: "A v001 demo badge for early testers.",
    network: "Cardano Preprod Demo",
    sponsorMode: "Platform sponsored UX demo",
    assetType: "Native Cardano Badge Concept",
    sponsorFees: true,
    createdAt: "2026-05-15T00:00:00.000Z",
  },
  {
    slug: "passport-starter",
    name: "Passport Starter Pass",
    title: "Cardano Passport Starter Pass",
    description: "A local-only pass that helps new users understand wallet connection and claims.",
    network: "Cardano Preprod Demo",
    sponsorMode: "Mock sponsor quote",
    assetType: "Native Cardano Pass Concept",
    sponsorFees: true,
    createdAt: "2026-05-15T00:00:00.000Z",
  },
];

export function getMockCampaign(slug: string) {
  return mockCampaigns.find((campaign) => campaign.slug === slug);
}
