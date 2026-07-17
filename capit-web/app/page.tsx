import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { StatsDashboard } from "@/components/stats-dashboard"
import { EducationalSection } from "@/components/educational-section"
import { MethodologyStrip } from "@/components/methodology-strip"
import Footer from "@/components/footer"
import { getFullPageContent } from "@/lib/content"
import dynamic from "next/dynamic"

// Dynamically load the Web3 widget ONLY on the client side to bypass the Node/indexedDB backend crash
const SwapWidget = dynamic(
  () => import("../components/SwapWidget").then((mod) => mod.SwapWidget),
  {
    ssr: false,
    loading: () => (
      <div className="h-[300px] flex flex-col items-center justify-center text-sm font-medium text-slate-400 animate-pulse">
        <span>Initializing Web3 Provider...</span>
      </div>
    ),
  }
)

export default function Home() {
  const { site, home, dashboard, footer } = getFullPageContent()

  return (
    <main className="min-h-screen flex flex-col bg-[#FBFBFA] text-slate-900 scroll-smooth">
      <Header content={site} />
      
      <Hero content={home.hero} />
      
      <StatsDashboard content={dashboard} />
      
      <EducationalSection cards={home.educationalCards} />
      
      {/* --- SURGICAL Web3 INSERTION: Keep styles untouched --- */}
      <section 
        id="swap-section" 
        className="w-full py-20 px-4 bg-white border-y border-slate-100 flex flex-col justify-center items-center scroll-mt-24"
      >
        <div className="mb-8 text-center max-w-md">
          <h3 className="text-xs font-black uppercase tracking-widest text-[#E5AF30] mb-2">On-Chain Interface</h3>
          <p className="text-sm font-bold text-slate-500">Interact directly with the live Uniswap V3 registry contract curve pool below.</p>
        </div>
        <SwapWidget />
      </section>
      {/* ------------------------------------------------------------- */}
      
      <MethodologyStrip content={home.methodologyStrip} />
      
      <Footer content={footer} site={site} />
    </main>
  )
}