import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Web3Provider } from '@/providers/Web3Provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CAPIT Ecosystem | Public Well-Plugging Registry',
  description:
    'CAPIT tracks public well-plugging records with 1:1 on-chain verification on Base network.',
  icons: {
    icon: '/images/capit-logo.png',
    shortcut: '/images/capit-logo.png',
    apple: '/images/capit-logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <Web3Provider>{children}</Web3Provider>
      </body>
    </html>
  )
}