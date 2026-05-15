export type UserProfile = {
  id: string;
  email: string;
  displayName?: string;
  createdAt: string;
};

export type Campaign = {
  slug: string;
  name: string;
  title: string;
  description: string;
  network: string;
  sponsorMode: string;
  assetType: string;
  sponsorFees?: boolean;
  createdAt?: string;
};

export type ClaimRecord = {
  id: string;
  campaignSlug: string;
  email: string;
  walletAddress?: string;
  claimedAt: string;
  status: "local-record" | "submitted";
};

export type SponsorQuote = {
  sponsored: boolean;
  estimatedFeeAda: string;
  minUtxoAda: string;
  mode: "mock" | "preprod" | "production";
  note: string;
};

export type WalletConnectionState = {
  connected: boolean;
  walletName?: string;
  address?: string;
  rewardAddress?: string;
  error?: string;
};

export type Badge = {
  id: string;
  title: string;
  description: string;
  campaignSlug: string;
  acquiredAt: string;
};
