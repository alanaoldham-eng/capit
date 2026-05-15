import type { Badge, Campaign, ClaimRecord, UserProfile, WalletConnectionState } from "./types";

const keys = {
  profile: "cardano-passport-profile",
  wallet: "cardano-passport-wallet",
  claims: "cardano-passport-claims",
  badges: "cardano-passport-badges",
  campaigns: "cardano-onboardkit-campaigns",
};

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function readJson<T>(key: string, fallback: T): T {
  if (!canUseStorage()) return fallback;
  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeJson<T>(key: string, value: T) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export const storageKeys = keys;
export const getProfile = () => readJson<UserProfile | null>(keys.profile, null);
export const saveProfile = (profile: UserProfile) => writeJson(keys.profile, profile);
export const getWalletState = () => readJson<WalletConnectionState | null>(keys.wallet, null);
export const saveWalletState = (wallet: WalletConnectionState) => writeJson(keys.wallet, wallet);
export const getClaims = () => readJson<ClaimRecord[]>(keys.claims, []);
export const saveClaims = (claims: ClaimRecord[]) => writeJson(keys.claims, claims);
export const getBadges = () => readJson<Badge[]>(keys.badges, []);
export const saveBadges = (badges: Badge[]) => writeJson(keys.badges, badges);
export const getCustomCampaigns = () => readJson<Campaign[]>(keys.campaigns, []);
export const saveCustomCampaigns = (campaigns: Campaign[]) => writeJson(keys.campaigns, campaigns);
