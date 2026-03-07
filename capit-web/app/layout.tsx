import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "CAPIT - Plug Wells. Mint Tokens. Track Progress.",
  description: "Where onshore well plugging meets cryptocurrency. For every US onshore well plugged, one new CAPIT token is minted. Follow the real-time progress of well plugging efforts nationwide.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
