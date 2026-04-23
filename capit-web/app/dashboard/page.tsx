import { Header } from "@/components/header"
import { StatsDashboard } from "@/components/stats-dashboard"
import Footer from "@/components/footer"
import { getFullPageContent } from "@/lib/content"

export default function DashboardPage() {
  const { site, dashboard, footer } = getFullPageContent()

  return (
    <main className="min-h-screen bg-[#F8F7F2]">
      <Header content={site} />
      <section className="px-6 py-12 lg:px-12 xl:px-16">
        <div className="mx-auto max-w-[1440px] rounded-[28px] bg-white px-8 py-10 shadow-[0_24px_60px_rgba(15,56,41,0.06)]">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-secondary">Live Overview</p>
          <h1 className="mt-3 text-4xl font-black tracking-[-0.04em] text-primary sm:text-5xl">CAPIT Dashboard</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-foreground/78">
            This sample dashboard page demonstrates how CAPIT can expand beyond the homepage into dedicated product pages for reporting, analytics, and investor-facing education.
          </p>
        </div>
      </section>
      <StatsDashboard content={dashboard} />
      <Footer content={footer} site={site} />
    </main>
  )
}
