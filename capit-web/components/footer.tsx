"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Mail, MessageCircle } from "lucide-react";
import type { FooterContent, SiteContent, SocialLink } from "@/lib/types";
import { useInjectedWallet } from "@/lib/wallet/useInjectedWallet";

interface FooterProps {
  site: SiteContent;
  content: FooterContent;
}

function isX(link: SocialLink) {
  return link.platform === "twitter";
}

function isLinkedIn(link: SocialLink) {
  const value = `${link.href} ${link.ariaLabel}`.toLowerCase();
  return value.includes("linkedin");
}

function shouldShowSocial(link: SocialLink) {
  return isX(link) || isLinkedIn(link);
}

function SocialIcon({ link }: { link: SocialLink }) {
  if (isLinkedIn(link)) {
    return (
      <span
        className="inline-flex h-4 w-4 items-center justify-center text-[9px] font-bold leading-none"
        aria-hidden="true"
      >
        in
      </span>
    );
  }

  if (isX(link)) {
    return (
      <span
        className="inline-flex h-4 w-4 items-center justify-center text-[11px] font-bold leading-none"
        aria-hidden="true"
      >
        X
      </span>
    );
  }

  if (link.platform === "email") {
    return <Mail className="h-4 w-4" aria-hidden="true" />;
  }

  return <MessageCircle className="h-4 w-4" aria-hidden="true" />;
}

function socialLabel(link: SocialLink) {
  if (isX(link)) return "X";
  if (isLinkedIn(link)) return "LinkedIn";
  return link.ariaLabel || link.platform;
}

function isExternal(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

export default function Footer({ site, content }: FooterProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const socialLinks = (content.socialLinks ?? []).filter(shouldShowSocial);

  const {
    addressLabel,
    error,
    hasInjectedWallet,
    isConnected,
    isConnecting,
    connectWallet,
  } = useInjectedWallet();

  const walletButtonLabel = !mounted
    ? (content.walletButton?.label || "Connect Wallet")
    : isConnected
    ? addressLabel
    : isConnecting
    ? "Connecting..."
    : (content.walletButton?.label || "Connect Wallet");

  return (
    <footer className="border-t border-neutral-800 mt-16 bg-neutral-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="space-y-3 max-w-2xl">
            <p className="text-sm font-semibold tracking-wide uppercase text-neutral-400">
              {site.name}
            </p>
            <p className="text-base md:text-lg font-semibold text-white">{content.quote}</p>
          </div>

          <div className="flex flex-col items-start gap-4">
            <button
              type="button"
              onClick={mounted ? connectWallet : undefined}
              disabled={!mounted || isConnecting}
              className="inline-flex items-center justify-center rounded-full bg-secondary px-5 py-3 text-sm font-semibold text-primary hover:bg-secondary/90 disabled:opacity-60 disabled:cursor-not-allowed shadow-sm min-w-[160px]"
            >
              {walletButtonLabel}
            </button>

            {mounted && !hasInjectedWallet ? (
              <a
                href="https://metamask.io/download/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-neutral-300 underline underline-offset-4 hover:text-white"
              >
                Install Wallet
              </a>
            ) : null}

            {mounted && error ? (
              <p className="text-xs text-red-300 max-w-xs" role="status" aria-live="polite">
                {error}
              </p>
            ) : null}

            <div className="flex flex-wrap items-center gap-3">
              {socialLinks.map((link, index) => {
                const href = link.href;
                const external = isExternal(href);

                return (
                  <Link
                    key={`${link.platform}-${href}-${index}`}
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    aria-label={link.ariaLabel}
                    className="inline-flex items-center gap-2 rounded-md border border-neutral-700 px-3 py-2 text-sm text-neutral-200 hover:border-neutral-500 hover:text-white"
                  >
                    <SocialIcon link={link} />
                    <span>{socialLabel(link)}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {content.navigation?.length ? (
          <nav className="mt-6 flex flex-wrap gap-4 text-sm text-neutral-400">
            {content.navigation.map((item) => (
              <Link key={`${item.label}-${item.href}`} href={item.href} className="hover:text-white">
                {item.label}
              </Link>
            ))}
          </nav>
        ) : null}

        {content.legalLinks?.length ? (
          <div className="mt-6 flex flex-wrap gap-4 text-xs text-neutral-500">
            {content.legalLinks.map((item) => (
              <Link key={`${item.label}-${item.href}`} href={item.href} className="hover:text-neutral-300">
                {item.label}
              </Link>
            ))}
          </div>
        ) : null}

        <div className="mt-6 text-xs text-neutral-500">{content.copyright}</div>
      </div>
    </footer>
  );
}