import React from "react"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import Footer from "@/components/footer"
import { getFullPageContent } from "@/lib/content"

// 1. Import the Tina CMS JSON payload Charles is editing
import pageData from "@/content/pages/why-plugging-wells-matter.json"

export default function Page() {
  // Retain your existing global site/footer content fetcher
  const { site, footer } = getFullPageContent()

  return (
    <main className="min-h-screen bg-[#fbfaf6]">
      <Header content={site} />
      
      <section className="px-6 py-20 lg:px-12 xl:px-20">
        <div className="mx-auto max-w-4xl rounded-2xl border border-border/70 bg-white p-8 shadow-sm md:p-12">
          
          <Link href="/" className="text-sm font-semibold text-primary hover:underline mb-8 block">
            ← Back to home
          </Link>

          {/* Tina CMS: Eyebrow & Headline */}
          {pageData.eyebrow && (
            <span className="text-sm font-bold text-slate-500 uppercase tracking-wider block mb-2">
              {pageData.eyebrow}
            </span>
          )}
          <h1 className="text-4xl font-extrabold tracking-[-0.04em] text-primary md:text-6xl mb-6">
            {pageData.headline || pageData.title}
          </h1>

          {/* Tina CMS: Hero Image */}
          {pageData.heroImage && (
            <div className="my-8">
              <Image 
                src={pageData.heroImage} 
                alt={pageData.headline || "Hero Image"} 
                width={800} 
                height={400} 
                className="rounded-xl object-cover w-full border border-slate-100 shadow-sm"
              />
            </div>
          )}

          {/* Tina CMS: Main Body */}
          <div className="mt-8 text-lg leading-8 text-[#31564e] whitespace-pre-wrap">
            {pageData.body}
          </div>

          {/* Tina CMS: Dynamic Sections Loop */}
          {pageData.sections && pageData.sections.length > 0 && (
            <div className="mt-16 space-y-12">
              {pageData.sections.map((section, idx) => (
                <div key={idx} className="border-t border-slate-100 pt-10">
                  
                  <h2 className="text-2xl font-bold text-primary mb-4">
                    {section.heading}
                  </h2>
                  
                  {section.image && (
                    <div className="mb-6">
                      <Image 
                        src={section.image} 
                        alt={section.heading || "Section Image"} 
                        width={800} 
                        height={400} 
                        className="rounded-xl object-cover w-full border border-slate-100 shadow-sm"
                      />
                    </div>
                  )}
                  
                  <p className="text-base text-[#31564e] leading-relaxed mb-4 whitespace-pre-wrap">
                    {section.body}
                  </p>
                  
                  {/* Map Bullet Points if Charles adds them */}
                  {section.bullets && section.bullets.length > 0 && (
                    <ul className="list-disc pl-5 space-y-2 text-[#31564e] mt-4">
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