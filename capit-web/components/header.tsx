import Link from "next/link"
import type { SiteContent } from "@/lib/types"

interface HeaderProps {
  content: SiteContent
}

export function Header({ content }: HeaderProps) {
  return (
    <header className="w-full py-4 px-6 lg:px-12 xl:px-20 bg-white">
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
              className="text-foreground hover:text-primary transition-colors font-medium text-sm"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <Link
          href={content.ctaButton.href}
          className="px-5 py-2 bg-transparent text-primary font-semibold rounded-full hover:bg-secondary/10 transition-colors border-2 border-secondary text-sm"
        >
          {content.ctaButton.label}
        </Link>
      </div>
    </header>
  )
}
