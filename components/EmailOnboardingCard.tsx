"use client";

import { useEffect, useState } from "react";
import { saveProfile, getProfile } from "@/lib/localStorage";
import type { UserProfile } from "@/lib/types";

export default function EmailOnboardingCard({ onProfile }: { onProfile?: (profile: UserProfile) => void }) {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const stored = getProfile();
    if (stored) {
      setProfile(stored);
      setEmail(stored.email);
      setDisplayName(stored.displayName || "");
      onProfile?.(stored);
    }
  }, [onProfile]);

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const nextProfile: UserProfile = {
      id: profile?.id || crypto.randomUUID(),
      email,
      displayName,
      createdAt: profile?.createdAt || new Date().toISOString(),
    };
    saveProfile(nextProfile);
    setProfile(nextProfile);
    onProfile?.(nextProfile);
  }

  return (
    <section className="card p-6">
      <p className="text-sm font-semibold text-cardano-600">Email onboarding</p>
      <h2 className="mt-2 text-2xl font-bold text-navy-950">Create your Passport profile</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">Your email is a simple login identity for this demo. It is not a cryptographic wallet identity.</p>
      <form onSubmit={submit} className="mt-6 grid gap-4">
        <label className="grid gap-2"><span className="label">Email address</span><input className="input" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" /></label>
        <label className="grid gap-2"><span className="label">Display name</span><input className="input" value={displayName} onChange={(event) => setDisplayName(event.target.value)} placeholder="Ada Builder" /></label>
        <button className="button-primary" type="submit">Save Passport profile</button>
      </form>
      {profile && <p className="mt-4 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-800">Profile saved locally for {profile.email}.</p>}
    </section>
  );
}
