'use client'

import React from "react"
import Link from "next/link"
import type { HomeContent, MethodologyStripContent } from "@/lib/types"

interface MethodologyStripProps {
  content?: MethodologyStripContent | HomeContent["methodologyStrip"]
}

export function MethodologyStrip({ content }: MethodologyStripProps) {
  if (!content) return null

  const heading = content.heading || content.title || "Source-linked. Time-stamped. Revision-aware."
  const body = content.body || content.description || "Every CAPIT summary points back to source logic, verification status, and last-updated timestamps."
  const href = content.href || content.primaryCtaLink || "/about"
  const label = (typeof content.label === "string" ? content.label : null) || content.primaryCtaText || "Read Methodology"

  return (
    <section className="bg-background px-6 pb-20 lg:px-12 xl:px-20">
      <div className="mx-auto max-w-7xl rounded-3xl border border-primary/10 bg-white p-8 shadow-lg shadow-primary/5 md:flex md:items-center md:justify-between md:gap-8">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-primary md:text-3xl">{heading}</h2>
          <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">{body}</p>
        </div>
        <Link 
          href={href} 
          className="mt-6 inline-flex shrink-0 rounded-xl bg-secondary px-6 py-3 text-sm font-black text-primary shadow-md md:mt-0 hover:bg-secondary/90 transition-colors"
        >
          {label}
        </Link>
      </div>
    </section>
  )
}

export default MethodologyStrip