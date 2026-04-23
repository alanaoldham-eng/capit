"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Mail } from "lucide-react";
import type { FooterContent, SiteContent, SocialLink } from "@/lib/types";
import { useInjectedWallet } from "@/lib/wallet/useInjectedWallet";

interface FooterProps {
  site: SiteContent;
  content: FooterContent;
}

function isExternal(href: string) {
  return href.startsWith("http://") || href.startsWith("https://") || href.startsWith("mailto:");
}

function socialLabel(link: SocialLink) {
  if (link.platform === "twitter") return "X";
  if (link.platform === "email") return "Email";
  return link.ariaLabel || link.platform;
}

function SocialIcon({ link }: { link: SocialLink }) {
  if (link.platform === "twitter") {
    return <span className="text-sm font-black leading-none" aria-hidden="true">X</span>;
  }

  return <Mail className="h-4 w-4" aria-hidden="true" />;
}

export default function Footer({ site, content }: FooterProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { addressLabel, error, hasInjectedWallet, isConnected, isConnecting, connectWallet } = useInjectedWallet();

  const walletLabel = !mounted
    ? content.walletButton?.label || "Connect Wallet"
    : isConnected
      ? addressLabel
      : isConnecting
        ? "Connecting..."
        : content.walletButton?.label || "Connect Wallet";

  const logoSrc = site.logo.src || "/images/CAPIT-LOGO-SQUARE-TEXT-Transparent.png";

  return (
    <footer className="mt-16 bg-[#0D4F43] text-white">
      <div className="border-t border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_34%),linear-gradient(135deg,#0E5A4B_0%,#0A3F36_100%)]">
        <div className="mx-auto max-w-[1440px] px-6 py-8 text-center lg:px-12 xl:px-16">
          <p className="text-2xl font-semibold tracking-[-0.02em] text-white/95 md:text-3xl">
            “{content.quote}”
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1440px] gap-10 px-6 py-10 lg:grid-cols-[1.1fr_1fr_auto] lg:items-start lg:px-12 xl:px-16">
        <div className="space-y-4">
          <Image src={logoSrc} alt={site.logo.alt} width={182} height={60} className="h-auto w-[182px]" />
          <p className="max-w-xl text-sm leading-7 text-white/82">
            Not just the first meme token whose supply grows only when real U.S. wells are plugged. CAPIT supply equals the number of oil and gas wells in the United States that have been plugged.
          </p>
        </div>

        <div className="space-y-5 lg:pt-4">
          <nav className="flex flex-wrap items-center gap-5 text-sm font-medium text-white/85">
            {content.navigation.map((item) => (
              <Link key={`${item.label}-${item.href}`} href={item.href} className="transition-colors hover:text-white">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-wrap items-center gap-3">
            {content.socialLinks.map((link, index) => {
              const external = isExternal(link.href);
              return (
                <Link
                  key={`${link.platform}-${index}`}
                  href={link.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  aria-label={link.ariaLabel}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-white/18 px-4 text-sm text-white/90 transition-all hover:border-white/35 hover:bg-white/10 hover:text-white"
                >
                  <SocialIcon link={link} />
                  <span>{socialLabel(link)}</span>
                </Link>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-white/60">
            {content.legalLinks.map((item) => (
              <Link key={`${item.label}-${item.href}`} href={item.href} className="transition-colors hover:text-white/85">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-start gap-3 lg:justify-self-end lg:pt-2">
          <button
            type="button"
            onClick={mounted ? connectWallet : undefined}
            disabled={!mounted || isConnecting}
            className="inline-flex min-w-[180px] items-center justify-center rounded-2xl border border-[#D39E1F] bg-secondary px-5 py-3 text-sm font-black text-primary shadow-[0_10px_24px_rgba(210,167,39,0.24)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-secondary/95 hover:shadow-[0_14px_30px_rgba(210,167,39,0.3)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {walletLabel}
          </button>

          {mounted && !hasInjectedWallet ? (
            <a
              href="https://metamask.io/download/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-white/75 underline underline-offset-4 transition-colors hover:text-white"
            >
              Install Wallet
            </a>
          ) : null}

          {mounted && error ? (
            <p className="max-w-[240px] text-xs leading-5 text-red-200" role="status" aria-live="polite">
              {error}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-6 pb-8 text-xs text-white/55 lg:px-12 xl:px-16">
        {content.copyright}
      </div>
    </footer>
  );
}
