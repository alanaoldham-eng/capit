import Link from "next/link"
import type { HomeContent } from "@/lib/types"

interface MethodologyStripProps { content?: HomeContent["methodologyStrip"] }

export function MethodologyStrip({ content }: MethodologyStripProps) {
  if (!content) return null
  return (
    <section className="bg-background px-6 pb-20 lg:px-12 xl:px-20">
      <div className="mx-auto max-w-7xl rounded-3xl border border-primary/10 bg-white p-8 shadow-lg shadow-primary/5 md:flex md:items-center md:justify-between md:gap-8">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-primary md:text-3xl">{content.heading}</h2>
          <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">{content.body}</p>
        </div>
        <Link href={content.href} className="mt-6 inline-flex shrink-0 rounded-xl bg-secondary px-6 py-3 text-sm font-black text-primary shadow-md md:mt-0">{content.label}</Link>
      </div>
    </section>
  )
}
