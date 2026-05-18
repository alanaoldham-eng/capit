import Link from "next/link"
import { Header } from "@/components/header"
import Footer from "@/components/footer"
import { getFullPageContent, getPageContent } from "@/lib/content"

export default function Page() {
  // 1. Get the layout content (Header/Footer)
  const layoutContent = getFullPageContent()
  const site = layoutContent?.site
  const footer = layoutContent?.footer

  // 2. Dynamically load the specific "faqs.json" page file
  const faqs = getPageContent("faqs")

  // 3. Extract the sections array safely
  const FAQSections = (faqs as any)?.sections || []
  const pageBody = (faqs as any)?.body

  return (
    <main className="min-h-screen bg-[#fbfaf6]">
      <Header content={site} />
      <section className="px-6 py-20 lg:px-12 xl:px-20">
        <div className="mx-auto max-w-4xl rounded-2xl border border-border/70 bg-white p-8 shadow-sm md:p-12">
          <Link href="/" className="text-sm font-semibold text-primary hover:underline">
            ← Back to home
          </Link>
          
          <h1 className="mt-8 text-4xl font-extrabold tracking-[-0.04em] text-primary md:text-6xl">
            {(faqs as any)?.headline || "Frequently Asked Questions"}
          </h1>
          
          {pageBody && (
            <p className="mt-4 text-base leading-7 text-[#31564e]/80">
              {pageBody}
            </p>
          )}

          {/* Render Sections Loop */}
          {FAQSections.length > 0 && (
            <div className="mt-12 space-y-8 border-t border-border/50 pt-8">
              {FAQSections.map((item: any, index: number) => (
                <div key={index} className="space-y-2">
                  <h3 className="text-lg font-bold tracking-tight text-primary md:text-xl">
                    {item.heading}
                  </h3>
                  <p className="text-base leading-7 text-[#31564e]">
                    {item.body}
                  </p>
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