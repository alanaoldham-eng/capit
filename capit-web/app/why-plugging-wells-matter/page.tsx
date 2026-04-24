import Link from "next/link"
import { Header } from "@/components/header"
import Footer from "@/components/footer"
import { getFullPageContent } from "@/lib/content"

export default function Page() {
  const { site, footer } = getFullPageContent()

  return (
    <main className="min-h-screen bg-[#fbfaf6]">
      <Header content={site} />
      <section className="px-6 py-20 lg:px-12 xl:px-20">
        <div className="mx-auto max-w-4xl rounded-2xl border border-border/70 bg-white p-8 shadow-sm md:p-12">
          <Link href="/" className="text-sm font-semibold text-primary hover:underline">← Back to home</Link>
          <h1 className="mt-8 text-4xl font-extrabold tracking-[-0.04em] text-primary md:text-6xl">Why Plugging Wells Matter</h1>
          <div className="mt-8 space-y-6 text-base leading-8 text-[#31564e]">
            <p>Plugging inactive and orphaned wells can reduce methane emissions, lower environmental risks, and help protect groundwater and nearby communities.</p>
            <p>This placeholder page is ready for Tina-managed content or a future richer page template. It exists so every homepage CTA and navigation item resolves to a real route during demo and system integration testing.</p>
          </div>
        </div>
      </section>
      <Footer site={site} content={footer} />
    </main>
  )
}
