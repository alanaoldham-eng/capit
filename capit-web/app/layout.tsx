import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
// 1. Surgically re-import your untracked Web3 initialization layer
import { Web3Provider } from "@/providers/Web3Provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CAPIT Ecosystem Registry",
  description: "Environmental Registry & Token Swap Interface",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        {/* 2. Wrap page hierarchy inside your context container */}
        <Web3Provider>
          {children}
        </Web3Provider>
      </body>
    </html>
  )
}