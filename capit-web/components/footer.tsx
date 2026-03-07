import Link from "next/link"
import { Twitter, Facebook, MessageCircle, Mail } from "lucide-react"
import type { FooterContent, SiteContent, SocialLink } from "@/lib/types"

interface FooterProps {
  content: FooterContent
  site: SiteContent
}

const socialIcons: Record<SocialLink["platform"], React.ComponentType<{ className?: string }>> = {
  twitter: Twitter,
  facebook: Facebook,
  discord: MessageCircle,
  email: Mail,
}

export function Footer({ content, site }: FooterProps) {
  return (
    <footer className="w-full">
      {/* Quote Banner - Light cream background */}
      <div className="py-10 px-6 lg:px-16 bg-muted/60">
        <p className="text-center text-lg md:text-xl lg:text-2xl italic max-w-4xl mx-auto text-foreground font-medium leading-relaxed">
          {`"${content.quote}"`}
        </p>
      </div>

      {/* Main Footer - Dark green gradient */}
      <div className="py-8 px-6 lg:px-16 bg-gradient-to-b from-primary to-primary/90">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-secondary rounded-full flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-5 h-5 text-primary"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="8" />
                  <path d="M12 8v8M8 12h8" />
                </svg>
              </div>
              <span className="text-xl font-bold text-primary-foreground tracking-tight">{site.name}</span>
            </div>

            {/* Navigation */}
            <nav aria-label="Footer navigation">
              <ul className="flex items-center gap-8">
                {content.navigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-primary-foreground/90 hover:text-secondary transition-colors font-medium text-sm"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              {content.socialLinks.map((social) => {
                const Icon = socialIcons[social.platform]
                return (
                  <Link
                    key={social.platform}
                    href={social.href}
                    className="text-primary-foreground/80 hover:text-secondary transition-colors"
                    aria-label={social.ariaLabel}
                  >
                    <Icon className="w-5 h-5" />
                  </Link>
                )
              })}
            </div>

            {/* Connect Wallet Button */}
            <button
              type="button"
              className="px-5 py-2.5 bg-secondary text-primary font-semibold rounded-full hover:bg-secondary/90 transition-colors flex items-center gap-2 text-sm"
            >
              {content.walletButton.label}
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>

          {/* Bottom Row */}
          <div className="mt-6 pt-5 border-t border-primary-foreground/20 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-primary-foreground/60">
            <p>{content.copyright}</p>
            <div className="flex items-center gap-6">
              {content.legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-primary-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
