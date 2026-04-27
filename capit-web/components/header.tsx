import Image from "next/image"
import Link from "next/link"
import type { SiteContent } from "@/lib/types"
import { getBuyCapitUrl } from "@/lib/config/cta"

interface HeaderProps {
  content: SiteContent
}

export function Header({ content }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/92 px-4 py-3 backdrop-blur-md sm:px-6 lg:px-12 xl:px-20">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 sm:gap-8">
        <Link href="/" className="flex items-center gap-3" aria-label="CAPIT homepage">
          {content.logo?.src ? (
            <Image src={content.logo.src} alt={content.logo.alt} width={150} height={60} className="h-12 w-auto object-contain sm:h-14" priority />
          ) : (
            <span className="text-2xl font-black tracking-tight text-primary">{content.name}</span>
          )}
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {content.navigation.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-semibold text-primary/80 transition-colors hover:text-primary">
              {item.label}
            </Link>
          ))}
        </nav>

        <a href={getBuyCapitUrl()} target="_blank" rel="noopener noreferrer" className="rounded-xl bg-secondary px-4 py-2.5 text-xs font-black text-primary shadow-lg shadow-secondary/25 transition hover:-translate-y-0.5 hover:bg-secondary/90 sm:px-6 sm:py-3 sm:text-sm">
          {content.ctaButton?.label || "Buy CAPIT"}
        </a>
      </div>
    </header>
  )
}
