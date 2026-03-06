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
    <footer className="w-full bg-primary text-primary-foreground">
      {/* Quote Banner */}
      <div className="py-8 px-6 lg:px-12 border-b border-primary-foreground/20">
        <p className="text-center text-lg md:text-xl italic max-w-4xl mx-auto">
          {`"${content.quote}"`}
        </p>
      </div>

      {/* Main Footer Content */}
      <div className="py-8 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-6 h-6 text-primary"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v12M6 12h12" />
                </svg>
              </div>
              <span className="text-2xl font-bold">{site.name}</span>
            </div>

            {/* Navigation Links */}
            <nav aria-label="Footer navigation">
              <ul className="flex items-center gap-8">
                {content.navigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="hover:text-secondary transition-colors font-medium"
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
                    className="hover:text-secondary transition-colors"
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
              className="px-6 py-2 bg-secondary text-secondary-foreground font-semibold rounded-full hover:opacity-90 transition-opacity flex items-center gap-2"
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
          <div className="mt-8 pt-6 border-t border-primary-foreground/20 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/70">
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
