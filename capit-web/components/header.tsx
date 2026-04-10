import Link from "next/link"
import type { SiteContent } from "@/lib/types"

interface HeaderProps {
  content: SiteContent
}

export function Header({ content }: HeaderProps) {
  return (
    <header className="w-full py-4 px-6 lg:px-12 xl:px-20 bg-white border-b border-border/50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-6 h-6 text-primary"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="7" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" />
              <path d="M12 6v12M8 10l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-2xl font-bold text-primary tracking-tight">{content.name}</span>
        </Link>

        {/* Centered Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          {content.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-foreground hover:text-primary transition-colors font-medium text-sm group relative"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full" aria-hidden="true" />
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <Link
          href={content.ctaButton.href}
          className="px-6 py-2 bg-secondary/10 text-secondary font-semibold rounded-full hover:bg-secondary/20 transition-all duration-200 border border-secondary/30 text-sm hover:border-secondary/50"
        >
          {content.ctaButton.label}
        </Link>
      </div>
    </header>
  )
}
