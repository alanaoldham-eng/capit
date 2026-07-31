import React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import Footer from "@/components/footer"
import { getFooterContent, getSiteContent } from "@/lib/content"

// 1. Direct import of the Tina CMS template from the new directory
import templateData from "@/content/pages/state-detail-template.json"

const stateNames: Record<string, string> = {
  texas: "Texas",
  pennsylvania: "Pennsylvania",
  oklahoma: "Oklahoma",
}

interface PageProps {
  params: { state: string }
}

export function generateStaticParams() {
  return Object.keys(stateNames).map((state) => ({ state }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const stateName = stateNames[params.state] ?? params.state.replace(/-/g, " ")
  
  // Dynamically inject the state name into Charles's Tina CMS SEO fields
  const title = templateData.title 
    ? templateData.title.replace(/\[State Name\]/g, stateName) 
    : `${stateName} Well Plugging Tracker | CAPIT`
  
  const description = templateData.description
    ? templateData.description.replace(/\[State Name\]/g, stateName)
    : `Review ${stateName} well-plugging records, source definitions, recent activity, and CAPIT publication notes.`

  return { title, description }
}

export default function StateDetailPage({ params }: PageProps) {
  const site = getSiteContent()
  const footer = getFooterContent()
  
  // 2. Format the state name (e.g., "texas" -> "Texas")
  const stateName = stateNames[params.state] ?? params.state.replace(/-/g, " ")
  
  // 3. Deep-replace the "[State Name]" placeholder across Charles's entire Tina CMS payload
  const pageData = JSON.parse(
    JSON.stringify(templateData).replace(/\[State Name\]/g, stateName)
  )

  return (
    <main className="min-h-screen bg-[#fbfaf6]">
      <Header content={site} />
      
      <section className="px-6 py-20 lg:px-12 xl:px-20">
        <div className="mx-auto max-w-4xl rounded-2xl border border-border/70 bg-white p-8 shadow-sm md:p-12">
          
          <Link href="/states" className="mb-8 block text-sm font-semibold text-primary hover:underline">
            ← Back to States
          </Link>

          {/* Tina CMS: Eyebrow (if provided) */}
          {pageData.eyebrow && (
            <span className="mb-2 block text-sm font-bold uppercase tracking-wider text-slate-500">
              {pageData.eyebrow}
            </span>
          )}
          
          {/* Tina CMS: Main Headline */}
          <h1 className="mb-6 mt-8 text-4xl font-extrabold tracking-[-0.04em] text-primary md:text-6xl">
            {pageData.headline || pageData.title}
          </h1>

          {/* Tina CMS: Hero Image (if provided) */}
          {pageData.heroImage && (
            <div className="my-8">
              <Image 
                src={pageData.heroImage} 
                alt={pageData.headline || "Hero Image"} 
                width={800} 
                height={400} 
                className="w-full rounded-xl border border-slate-100 object-cover shadow-sm"
              />
            </div>
          )}

          {/* Tina CMS: Main Body Text */}
          <div className="mt-8 whitespace-pre-wrap text-lg leading-8 text-[#31564e]">
            {pageData.body}
          </div>

          {/* Tina CMS: Dynamic Sections Loop */}
          {pageData.sections && pageData.sections.length > 0 && (
            <div className="mt-16 space-y-12">
              {pageData.sections.map((section: any, idx: number) => (
                <div key={idx} className="border-t border-slate-100 pt-10">
                  
                  <h2 className="mb-4 text-2xl font-bold text-primary">
                    {section.heading}
                  </h2>
                  
                  {section.image && (
                    <div className="mb-6">
                      <Image 
                        src={section.image} 
                        alt={section.heading || "Section Image"} 
                        width={800} 
                        height={400} 
                        className="w-full rounded-xl border border-slate-100 object-cover shadow-sm"
                      />
                    </div>
                  )}
                  
                  <p className="mb-4 whitespace-pre-wrap text-base leading-relaxed text-[#31564e]">
                    {section.body}
                  </p>
                  
                  {/* Map Bullet Points if added in Tina */}
                  {section.bullets && section.bullets.length > 0 && (
                    <ul className="mt-4 list-disc space-y-2 pl-5 text-[#31564e]">
                      {section.bullets.map((bullet: string, bIdx: number) => (
                        <li key={bIdx}>{bullet}</li>
                      ))}
                    </ul>
                  )}

                </div>
              ))}
            </div>
          )}

        </div>
      </section>
      
      <Footer site={site} content={footer} />
    </main>
  )
}