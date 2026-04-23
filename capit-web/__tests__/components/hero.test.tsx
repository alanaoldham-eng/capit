import React from 'react'
import { render, screen } from '@testing-library/react'
import { Hero } from '@/components/hero'
import type { HeroContent } from '@/lib/types'
import Image from 'next/image'

// Mock Next.js components
jest.mock('next/link', () => {
  return ({ children, href }: any) => (
    <a href={href}>{children}</a>
  )
})

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, fill, priority, ...props }: any) => (
    // eslint-disable-next-line jsx-a11y/alt-text
    <img src={src} alt={alt} {...props} />
  ),
}))

describe('Hero Component', () => {
  const mockContent: HeroContent = {
    headline: 'Revolutionize',
    headlineHighlight: 'Energy Production',
    description: 'A blockchain-based platform for sustainable energy.',
    ctaButton: {
      label: 'Get Started',
      href: '/start',
    },
    image: {
      src: '/hero-image.png',
      alt: 'Hero illustration',
    },
  }

  it('renders headline and highlight', () => {
    render(<Hero content={mockContent} />)
    
    expect(screen.getByText('Revolutionize')).toBeInTheDocument()
    expect(screen.getByText('Energy Production')).toBeInTheDocument()
  })

  it('renders description text', () => {
    render(<Hero content={mockContent} />)
    
    expect(screen.getByText('A blockchain-based platform for sustainable energy.')).toBeInTheDocument()
  })

  it('renders CTA button with correct label', () => {
    render(<Hero content={mockContent} />)
    
    const button = screen.getByText('Get Started')
    expect(button).toBeInTheDocument()
  })

  it('renders hero image with correct alt text', () => {
    render(<Hero content={mockContent} />)
    
    const image = screen.getByAltText('Hero illustration')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/hero-image.png')
  })

  it('has section element with correct styling', () => {
    const { container } = render(<Hero content={mockContent} />)
    
    const section = container.querySelector('section')
    expect(section).toHaveClass('relative', 'w-full', 'overflow-hidden')
  })

  it('renders grid for desktop layout', () => {
    const { container } = render(<Hero content={mockContent} />)
    
    const grid = container.querySelector('[class*="grid"]')
    expect(grid).toHaveClass('lg:grid-cols-2')
  })

  it('headline has proper sizing classes', () => {
    const { container } = render(<Hero content={mockContent} />)
    
    const headline = screen.getByText('Revolutionize')
    expect(headline).toHaveClass('text-5xl', 'md:text-6xl', 'lg:text-7xl', 'font-bold')
  })

  it('CTA button is clickable and links to correct href', () => {
    const { container } = render(<Hero content={mockContent} />)
    
    const buttons = screen.getAllByText('Get Started')
    expect(buttons.length).toBeGreaterThan(0)
    expect(buttons[0]).toBeInTheDocument()
  })
})
