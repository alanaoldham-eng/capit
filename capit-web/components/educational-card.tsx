import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { EducationalCardContent } from "@/lib/types"

export function EducationalCard({ title, description, imageSrc, imageAlt, linkHref, linkLabel }: EducationalCardContent) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-lg shadow-primary/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10">
      <div className="relative h-56 w-full overflow-hidden bg-gradient-to-b from-white to-muted/40 p-3">
        <Image src={imageSrc} alt={imageAlt} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 420px" className="object-contain" />
      </div>
      <div className="flex flex-grow flex-col p-6">
        <h3 className="text-2xl font-black leading-tight tracking-tight text-primary">{title}</h3>
        <p className="mt-4 flex-grow text-sm leading-7 text-muted-foreground">{description}</p>
        <Link href={linkHref} className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-primary-foreground transition hover:bg-primary/90">
          {linkLabel}<ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  )
}
