import Link from "next/link"
import { Twitter, Facebook, MessageCircle, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full bg-primary text-primary-foreground">
      {/* Quote Banner */}
      <div className="py-8 px-6 lg:px-12 border-b border-primary-foreground/20">
        <p className="text-center text-lg md:text-xl italic max-w-4xl mx-auto">
          {'"The first meme token whose supply grows only when real U.S. wells are plugged."'}
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
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v12M6 12h12" />
                </svg>
              </div>
              <span className="text-2xl font-bold">CAPIT</span>
            </div>

            {/* Navigation Links */}
            <nav className="flex items-center gap-8">
              <Link
                href="#dashboard"
                className="hover:text-secondary transition-colors font-medium"
              >
                Dashboard
              </Link>
              <Link
                href="#about"
                className="hover:text-secondary transition-colors font-medium"
              >
                About
              </Link>
              <Link
                href="#faqs"
                className="hover:text-secondary transition-colors font-medium"
              >
                FAQs
              </Link>
            </nav>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <Link
                href="#"
                className="hover:text-secondary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="hover:text-secondary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="hover:text-secondary transition-colors"
                aria-label="Discord"
              >
                <MessageCircle className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="hover:text-secondary transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </Link>
            </div>

            {/* Connect Wallet Button */}
            <button className="px-6 py-2 bg-secondary text-secondary-foreground font-semibold rounded-full hover:opacity-90 transition-opacity flex items-center gap-2">
              Connect Wallet
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Bottom Row */}
          <div className="mt-8 pt-6 border-t border-primary-foreground/20 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/70">
            <p>&copy; 2024 CAPIT. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="#" className="hover:text-primary-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-primary-foreground transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
