import Link from "next/link"
import type { SiteContent } from "@/lib/types"

interface HeaderProps {
  content: SiteContent
}

export function Header({ content }: HeaderProps) {
  return (
    <header className="w-full py-4 px-6 lg:px-12 bg-background">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
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
          <span className="text-2xl font-bold text-primary">{content.name}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {content.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href={content.ctaButton.href}
          className="px-6 py-2.5 bg-secondary text-secondary-foreground font-semibold rounded-full hover:opacity-90 transition-opacity"
        >
          {content.ctaButton.label}
        </Link>
      </div>
    </header>
  )
}
