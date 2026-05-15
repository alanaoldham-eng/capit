"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import EmailOnboardingCard from "@/components/EmailOnboardingCard";
import PassportCard from "@/components/PassportCard";
import QuestChecklist from "@/components/QuestChecklist";
import SponsorGasPanel from "@/components/SponsorGasPanel";
import WalletConnectPanel from "@/components/WalletConnectPanel";
import { getBadges, getProfile, getWalletState } from "@/lib/localStorage";
import type { Badge, UserProfile, WalletConnectionState } from "@/lib/types";

export default function PassportPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [wallet, setWallet] = useState<WalletConnectionState | null>(null);
  const [badges, setBadges] = useState<Badge[]>([]);

  useEffect(() => {
    setProfile(getProfile());
    setWallet(getWalletState());
    setBadges(getBadges());
  }, []);

  const quests = [
    { label: "Create Passport profile", complete: Boolean(profile), helper: "Save an email profile in this browser." },
    { label: "Connect Cardano wallet", complete: Boolean(wallet?.connected), helper: "Use a CIP-30 compatible Cardano browser wallet." },
    { label: "Claim first demo badge", complete: badges.length > 0, helper: "Visit the Founders Badge claim page." },
    { label: "Learn what sponsored transactions mean", complete: true, helper: "v001 shows fee support as a mock quote only." },
  ];

  return (
    <div className="container-page py-12">
      <div className="mb-10 max-w-3xl"><p className="text-sm font-semibold text-cardano-600">Consumer demo app</p><h1 className="mt-3 text-4xl font-bold text-navy-950">Cardano Passport</h1><p className="mt-3 text-slate-600">A friendly onboarding flow that starts with email, explains wallets gently, and stores demo badges locally.</p></div>
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]"><div className="grid gap-6"><EmailOnboardingCard onProfile={setProfile} /><WalletConnectPanel onWallet={setWallet} /><SponsorGasPanel /></div><div className="grid gap-6"><PassportCard profile={profile} wallet={wallet} badges={badges} /><QuestChecklist quests={quests} /><Link href="/claim/founders-badge" className="button-primary">Claim first demo badge</Link></div></div>
    </div>
  );
}
