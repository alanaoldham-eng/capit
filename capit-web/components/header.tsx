import Image from "next/image"
import Link from "next/link"
import type { SiteContent } from "@/lib/types"
import { getBuyCapitUrl } from "@/lib/config/cta"

interface HeaderProps {
  content: SiteContent
}

export function Header({ content }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/90 px-6 py-3 backdrop-blur-md lg:px-12 xl:px-20">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8">
        <Link href="/" className="flex items-center gap-3" aria-label="CAPIT homepage">
          {content.logo?.src ? (
            <Image src={content.logo.src} alt={content.logo.alt} width={150} height={60} className="h-14 w-auto object-contain" priority />
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

        <a href={getBuyCapitUrl()} target="_blank" rel="noopener noreferrer" className="rounded-xl bg-secondary px-6 py-3 text-sm font-black text-primary shadow-lg shadow-secondary/25 transition hover:-translate-y-0.5 hover:bg-secondary/90">
          {content.ctaButton?.label || "Buy CAPIT"}
        </a>
      </div>
    </header>
  )
}
