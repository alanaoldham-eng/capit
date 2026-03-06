import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { StatsDashboard } from "@/components/stats-dashboard"
import { EducationalSection } from "@/components/educational-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <Hero />
      <StatsDashboard />
      <EducationalSection />
      <Footer />
    </main>
  )
}
