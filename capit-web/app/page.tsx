import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { StatsDashboard } from "@/components/stats-dashboard"
import { EducationalSection } from "@/components/educational-section"
import { Footer } from "@/components/footer"
import { getFullPageContent } from "@/lib/content"

export default function Home() {
  const { site, home, dashboard, footer } = getFullPageContent()

  return (
    <main className="min-h-screen flex flex-col">
      <Header content={site} />
      <Hero content={home.hero} />
      <StatsDashboard content={dashboard} />
      <EducationalSection cards={home.educationalCards} />
      <Footer content={footer} site={site} />
    </main>
  )
}
