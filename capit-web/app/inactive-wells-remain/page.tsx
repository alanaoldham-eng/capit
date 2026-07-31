import React from "react"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import Footer from "@/components/footer"
import { getFullPageContent } from "@/lib/content"

// Correct Tina CMS payload for Inactive Wells
import pageData from "@/content/pages/inactive-wells-remain.json"

export default function Page() {
  const { site, footer } = getFullPageContent()

  return (
    <main className="min-h-screen bg-[#fbfaf6]">
      <Header content={site} />
      
      <section className="px-6 py-20 lg:px-12 xl:px-20">
        <div className="mx-auto max-w-4xl rounded-2xl border border-border/70 bg-white p-8 shadow-sm md:p-12">
          
          <Link href="/" className="mb-8 block text-sm font-semibold text-primary hover:underline">
            ← Back to home
          </Link>

          {pageData.eyebrow && (
            <span className="mb-2 block text-sm font-bold uppercase tracking-wider text-slate-500">
              {pageData.eyebrow}
            </span>
          )}
          
          <h1 className="mb-6 mt-8 text-4xl font-extrabold tracking-[-0.04em] text-primary md:text-6xl">
            {pageData.headline || pageData.title}
          </h1>

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

          <div className="mt-8 whitespace-pre-wrap text-lg leading-8 text-[#31564e]">
            {pageData.body}
          </div>

          {pageData.sections && pageData.sections.length > 0 && (
            <div className="mt-16 space-y-12">
              {pageData.sections.map((section, idx) => (
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
                  
                  {section.bullets && section.bullets.length > 0 && (
                    <ul className="mt-4 list-disc space-y-2 pl-5 text-[#31564e]">
                      {section.bullets.map((bullet, bIdx) => (
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