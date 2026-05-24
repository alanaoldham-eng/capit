"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Mail, MessageCircle } from "lucide-react";
import type { FooterContent, SiteContent, SocialLink } from "@/lib/types";

interface FooterProps {
  site: SiteContent;
  content: FooterContent;
}

function isX(link: SocialLink) { return link.platform === "twitter"; }
var isLinkedIn = (link: SocialLink) => `${link.href} ${link.ariaLabel}`.toLowerCase().includes("linkedin");
var shouldShowSocial = (link: SocialLink) => isX(link) || isLinkedIn(link);

function SocialIcon({ link }: { link: SocialLink }) {
  if (isLinkedIn(link)) return <span className="inline-flex h-4 w-4 items-center justify-center text-[9px] font-bold leading-none">in</span>;
  if (isX(link)) return <span className="inline-flex h-4 w-4 items-center justify-center text-[11px] font-bold leading-none">X</span>;
  return link.platform === "email" ? <Mail className="h-4 w-4" /> : <MessageCircle className="h-4 w-4" />;
}

export default function Footer({ site, content }: FooterProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const socialLinks = (content.socialLinks ?? []).filter(shouldShowSocial);

  return (
    <footer className="border-t border-slate-100 mt-16 bg-white text-slate-800">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="space-y-3 max-w-2xl">
            <p className="text-xs font-black tracking-widest uppercase text-slate-400">{site.name}</p>
            <p className="text-sm font-medium leading-relaxed text-slate-500">{content.quote}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {mounted && socialLinks.map((link, idx) => (
              <Link
                key={`${link.platform}-${idx}`}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-100 bg-[#FBFBFA] px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
              >
                <SocialIcon link={link} />
                <span>{isX(link) ? "X" : isLinkedIn(link) ? "LinkedIn" : link.platform}</span>
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-50 text-xs text-slate-400">{content.copyright}</div>
      </div>
    </footer>
  );
}