import Link from "next/link"
import { Header } from "@/components/header"
import Footer from "@/components/footer"
import { getFullPageContent } from "@/lib/content"

interface ContentPageTemplateProps {
  eyebrow: string
  title: string
  intro: string
  sections: Array<{
    heading: string
    body: string[]
  }>
}

export function ContentPageTemplate({ eyebrow, title, intro, sections }: ContentPageTemplateProps) {
  const { site, footer } = getFullPageContent()

  return (
    <main className="min-h-screen bg-[#F8F7F2] text-foreground">
      <Header content={site} />
      <section className="px-6 py-16 lg:px-12 lg:py-20 xl:px-16">
        <div className="mx-auto max-w-[980px] rounded-[32px] border border-border/70 bg-white px-8 py-10 shadow-[0_24px_60px_rgba(15,56,41,0.06)] sm:px-10 lg:px-14 lg:py-14">
          <p className="mb-4 text-sm font-black uppercase tracking-[0.16em] text-secondary">{eyebrow}</p>
          <h1 className="max-w-[760px] text-4xl font-black tracking-[-0.04em] text-primary sm:text-5xl lg:text-6xl">{title}</h1>
          <p className="mt-6 max-w-[760px] text-lg leading-9 text-foreground/78">{intro}</p>

          <div className="mt-10 space-y-8">
            {sections.map((section) => (
              <article key={section.heading} className="rounded-[24px] bg-[#F8F7F2] px-6 py-6">
                <h2 className="text-2xl font-black tracking-[-0.03em] text-primary">{section.heading}</h2>
                <div className="mt-4 space-y-4 text-base leading-8 text-foreground/78">
                  {section.body.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10">
            <Link
              href="/"
              className="inline-flex items-center rounded-2xl bg-primary px-6 py-3 text-sm font-bold uppercase tracking-[0.12em] text-primary-foreground transition-colors hover:bg-primary/92"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
      <Footer content={footer} site={site} />
    </main>
  )
}
