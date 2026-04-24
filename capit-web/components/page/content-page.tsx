import Link from "next/link"
import type { PageContent } from "@/lib/types"

interface ContentPageProps {
  page: PageContent
}

export function ContentPage({ page }: ContentPageProps) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="px-6 py-20 lg:px-12 xl:px-20">
        <div className="mx-auto max-w-5xl">
          {page.eyebrow ? (
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-secondary">
              {page.eyebrow}
            </p>
          ) : null}
          <h1 className="max-w-4xl text-4xl font-black tracking-tight text-primary md:text-5xl lg:text-6xl">
            {page.headline}
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-muted-foreground md:text-lg">
            {page.body}
          </p>
          {(page.primaryCta || page.secondaryCta) ? (
            <div className="mt-8 flex flex-wrap gap-3">
              {page.primaryCta ? (
                <Link href={page.primaryCta.href} className="rounded-full bg-secondary px-6 py-3 text-sm font-bold text-primary shadow-md hover:bg-secondary/90">
                  {page.primaryCta.label}
                </Link>
              ) : null}
              {page.secondaryCta ? (
                <Link href={page.secondaryCta.href} className="rounded-full border border-primary/20 bg-white px-6 py-3 text-sm font-bold text-primary hover:bg-primary/5">
                  {page.secondaryCta.label}
                </Link>
              ) : null}
            </div>
          ) : null}
        </div>
      </section>

      <section className="px-6 pb-24 lg:px-12 xl:px-20">
        <div className="mx-auto grid max-w-5xl gap-6">
          {page.sections.map((section) => (
            <article key={section.heading} className="rounded-2xl border border-border/70 bg-card p-6 shadow-sm md:p-8">
              <h2 className="text-2xl font-black tracking-tight text-primary">{section.heading}</h2>
              <p className="mt-4 leading-8 text-muted-foreground">{section.body}</p>
              {section.bullets?.length ? (
                <ul className="mt-5 grid gap-2 text-sm text-foreground md:grid-cols-2">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="rounded-xl bg-muted/60 px-4 py-3">
                      {bullet}
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
