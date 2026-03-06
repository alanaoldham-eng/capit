"use client"

import Link from "next/link"

export function Header() {
  return (
    <header className="w-full py-4 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-6 h-6 text-primary"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v12M6 12h12" />
            </svg>
          </div>
          <span className="text-2xl font-bold text-primary">CAPIT</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="#dashboard"
            className="text-foreground hover:text-primary transition-colors font-medium"
          >
            Dashboard
          </Link>
          <Link
            href="#about"
            className="text-foreground hover:text-primary transition-colors font-medium"
          >
            About
          </Link>
          <Link
            href="#faqs"
            className="text-foreground hover:text-primary transition-colors font-medium"
          >
            FAQs
          </Link>
        </nav>

        <button className="px-6 py-2 border-2 border-secondary text-primary font-semibold rounded-full hover:bg-secondary hover:text-primary-foreground transition-colors">
          Buy CAPIT
        </button>
      </div>
    </header>
  )
}
