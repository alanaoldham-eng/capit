import React from 'react'
import { render, screen } from '@testing-library/react'
import { Header } from '@/components/header'
import type { SiteContent } from '@/lib/types'

// Mock Next.js Link component
jest.mock('next/link', () => {
  return ({ children, href }: any) => (
    <a href={href}>{children}</a>
  )
})

// Mock the config function
jest.mock('@/lib/config/cta', () => ({
  getBuyCapitUrl: () => 'https://uniswap.example.com/capit'
}))

describe('Header Component', () => {
  const mockContent: SiteContent = {
    name: 'CAPIT',
    logo: {
      alt: 'CAPIT Logo',
    },
    navigation: [
      { label: 'Home', href: '/' },
      { label: 'Dashboard', href: '#dashboard' },
      { label: 'Learn', href: '#learn' },
    ],
    ctaButton: {
      label: 'Buy CAPIT',
      href: 'https://uniswap.example.com',
    },
  }

  it('renders header with logo and site name', () => {
    render(<Header content={mockContent} />)
    
    expect(screen.getByText('CAPIT')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(<Header content={mockContent} />)
    
    mockContent.navigation.forEach((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument()
    })
  })

  it('renders CTA button with correct text', () => {
    render(<Header content={mockContent} />)
    
    const button = screen.getByText('Buy CAPIT')
    expect(button).toBeInTheDocument()
  })

  it('has correct accessibility attributes', () => {
    render(<Header content={mockContent} />)
    
    const buyButton = screen.getByRole('link', { name: /buy capit/i })
    expect(buyButton).toHaveAttribute('aria-label')
  })

  it('has header element with correct structure', () => {
    const { container } = render(<Header content={mockContent} />)
    
    const header = container.querySelector('header')
    expect(header).toBeInTheDocument()
    expect(header).toHaveClass('border-b', 'border-border/50')
  })

  it('renders navigation as hidden on mobile', () => {
    const { container } = render(<Header content={mockContent} />)
    
    const nav = container.querySelector('nav')
    expect(nav).toHaveClass('hidden', 'md:flex')
  })
})
