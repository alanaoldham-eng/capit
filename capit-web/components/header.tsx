import Image from "next/image"
import Link from "next/link"
import type { SiteContent } from "@/lib/types"
import { getBuyCapitUrl } from "@/lib/config/cta"

interface HeaderProps {
  content: SiteContent
}

export function Header({ content }: HeaderProps) {
  const logoSrc = content.logo.src || "/images/CAPIT-LOGO-SQUARE-TEXT-Transparent.png"

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-white/88 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4 lg:px-12 xl:px-16">
        <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-90">
          <Image
            src={logoSrc}
            alt={content.logo.alt}
            width={170}
            height={52}
            className="h-auto w-[148px] sm:w-[170px]"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {content.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative text-sm font-semibold text-foreground transition-colors hover:text-primary"
            >
              {item.label}
              <span
                className="absolute -bottom-2 left-0 h-0.5 w-0 bg-secondary transition-all duration-300 group-hover:w-full"
                aria-hidden="true"
              />
            </Link>
          ))}
        </nav>

        <a
          href={getBuyCapitUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-2xl border border-[#D39E1F] bg-secondary px-5 py-3 text-sm font-bold text-primary shadow-[0_8px_20px_rgba(210,167,39,0.22)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-secondary/95 hover:shadow-[0_12px_28px_rgba(210,167,39,0.28)]"
          aria-label="Buy CAPIT on Uniswap in a new tab"
        >
          Buy CAPIT
        </a>
      </div>
    </header>
  )
}
