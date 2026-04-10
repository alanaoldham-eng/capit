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
      {/* Quote section - refined */}
      <div className="py-12 lg:py-16 px-6 lg:px-12 xl:px-20 bg-gradient-to-br from-muted/50 to-muted/30">
        <p className="text-center text-lg md:text-xl lg:text-2xl font-semibold max-w-4xl mx-auto text-foreground leading-relaxed">
          {`"${content.quote}"`}
        </p>
      </div>

      {/* Footer - better contrast and spacing */}
      <div className="py-10 lg:py-12 px-6 lg:px-12 xl:px-20 bg-gradient-to-br from-primary via-primary to-[hsl(152,38%,20%)]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-secondary rounded-full flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-5 h-5 text-primary"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="7" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M12 6v12M8 10l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-xl font-bold text-primary-foreground tracking-tight">{site.name}</span>
            </div>

            {/* Navigation */}
            <nav aria-label="Footer navigation">
              <ul className="flex items-center gap-6 lg:gap-8">
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
            <div className="flex items-center gap-3">
              {content.socialLinks.map((social) => {
                const Icon = socialIcons[social.platform]
                return (
                  <Link
                    key={social.platform}
                    href={social.href}
                    className="w-8 h-8 flex items-center justify-center text-primary-foreground/80 hover:text-secondary transition-colors"
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
              className="px-6 py-2.5 bg-secondary text-primary font-semibold rounded-full hover:bg-secondary/90 transition-all duration-200 flex items-center gap-2 text-sm hover:shadow-lg"
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
            <div className="flex items-center gap-4 lg:gap-6">
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
