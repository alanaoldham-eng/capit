import Image from "next/image"
import Link from "next/link"
import type { SiteContent } from "@/lib/types"

interface HeaderProps {
  content: SiteContent
}

export function Header({ content }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/90 px-4 py-4 backdrop-blur-md sm:px-8 lg:px-16 xl:px-20">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        
        {/* Logo Placement Area matching Charles' precise container constraints */}
        <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="CAPIT homepage">
          {content.logo?.src ? (
            <Image 
              src={content.logo.src} 
              alt={content.logo.alt || "CAPIT Logo"} 
              width={105} 
              height={34} 
              className="h-8.5 w-auto object-contain" 
              priority 
            />
          ) : (
            <span className="text-lg font-black tracking-tight text-slate-900">{content.name}</span>
          )}
        </Link>

        {/* Dynamic Navigation Tracks */}
        <nav className="hidden items-center gap-8 md:flex font-bold text-slate-500 text-sm">
          {content.navigation?.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-slate-900">
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Bounded internal hash anchor swap selection node */}
        <Link 
          href="/#swap-section" 
          className="rounded-xl bg-[#FABE3C] hover:bg-[#E5AF30] px-5 py-2.5 text-xs font-black text-slate-900 shadow-sm transition-all duration-150 active:scale-95"
        >
          {content.ctaButton?.label || "Buy CAPIT"}
        </Link>
      </div>
    </header>
  )
}