import Link from "next/link"
import type { SiteContent } from "@/lib/types"

interface HeaderProps {
  content: SiteContent
}

export function Header({ content }: HeaderProps) {
  return (
    <header className="w-full py-5 px-6 lg:px-16 bg-background">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center shadow-sm">
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
          <span className="text-2xl font-bold text-primary tracking-tight">{content.name}</span>
        </Link>

        {/* Centered Navigation */}
        <nav className="hidden md:flex items-center gap-12">
          {content.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-foreground/80 hover:text-primary transition-colors font-medium"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <Link
          href={content.ctaButton.href}
          className="px-6 py-2.5 bg-secondary text-primary font-semibold rounded-full hover:bg-secondary/90 transition-colors shadow-sm border border-secondary"
        >
          {content.ctaButton.label}
        </Link>
      </div>
    </header>
  )
}
