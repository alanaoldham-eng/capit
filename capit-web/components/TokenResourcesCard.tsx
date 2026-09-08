'use client'

import React, { useState } from 'react'
import type { TokenResourcesCardContent, ResourceLink } from '@/lib/types'
import { explorerUrl, tokenAddress as envTokenAddress } from '@/config/web3'

interface TokenResourcesCardProps {
  content?: TokenResourcesCardContent
}

export function TokenResourcesCard({ content }: TokenResourcesCardProps) {
  const title = content?.title || 'On-Chain Verification'
  const subtitle = content?.subtitle || 'Official contract references & protocol documentation'
  // Env wins: the address is network-specific, so it must not be edited to a
  // value that disagrees with the chain the app is actually pointed at.
  const contractAddress = envTokenAddress || content?.contractAddress || ''

  const [copied, setCopied] = useState(false)

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(contractAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // Explorer host follows the configured chain, so a testnet preview and a
  // mainnet deploy both link somewhere real without editing content.
  const explorer = explorerUrl
  const shortAddress = contractAddress
    ? `${contractAddress.slice(0, 10)}...${contractAddress.slice(-6)}`
    : 'Not deployed'

  const defaultLinks: ResourceLink[] = [
    { title: 'TOKEN CONTRACT ADDRESS', subtitle: shortAddress, url: `${explorer}/token/${contractAddress}`, badge: 'Copy' },
    { title: 'CONTRACT ON BASESCAN', subtitle: 'Verified Code', url: `${explorer}/address/${contractAddress}` },
    { title: 'UNISWAP V3 POOL TRACKER', subtitle: 'Live Pair', url: 'https://app.uniswap.org' },
    { title: 'TECHNICAL WHITEPAPER', subtitle: 'Methodology', url: '/methodology' },
  ]

  // CMS rows win, but blank url/subtitle fall back to the derived value so an
  // editor never has to paste a chain-specific explorer URL by hand.
  const links: ResourceLink[] = content?.links?.length
    ? content.links.map((link, idx) => ({
        ...link,
        subtitle: link.subtitle || defaultLinks[idx]?.subtitle || '',
        url: link.url || defaultLinks[idx]?.url || '#',
      }))
    : defaultLinks

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-bold text-foreground">{title}</h3>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>

      <div className="space-y-2">
        {links.map((link: ResourceLink, idx: number) => {
          const isCopyLink = link.badge === 'Copy' || link.title === 'TOKEN CONTRACT ADDRESS'
          return (
            <div
              key={idx}
              className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/20 hover:bg-muted/50 transition-colors text-xs"
            >
              <a
                href={link.url}
                target={link.url.startsWith('http') ? '_blank' : '_self'}
                rel="noopener noreferrer"
                className="flex-1 min-w-0 pr-2"
              >
                <p className="font-bold text-foreground truncate">{link.title}</p>
                <p className="text-[10px] text-muted-foreground truncate">{link.subtitle}</p>
              </a>
              {isCopyLink ? (
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-2.5 py-1 rounded bg-[#FABE3C] hover:bg-[#e5aa2b] text-neutral-900 font-bold text-[10px] transition-colors shrink-0 cursor-pointer shadow-sm active:scale-95"
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              ) : link.badge ? (
                <span className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 font-bold text-[10px] shrink-0">
                  {link.badge}
                </span>
              ) : null}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TokenResourcesCard