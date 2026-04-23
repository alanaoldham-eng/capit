import React from 'react'
import { render, screen } from '@testing-library/react'
import { EducationalCard } from '@/components/educational-card'
import type { EducationalCardContent } from '@/lib/types'

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

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  ArrowRight: ({ className }: any) => <span className={className}>→</span>,
}))

describe('EducationalCard Component', () => {
  const mockContent: EducationalCardContent = {
    title: 'Well Plugging Basics',
    description: 'Learn the fundamentals of well plugging and environmental impact.',
    imageSrc: '/edu-card.png',
    imageAlt: 'Well illustration',
    linkHref: '/learn/well-plugging',
    linkLabel: 'Learn More',
  }

  it('renders card title', () => {
    render(<EducationalCard {...mockContent} />)
    
    expect(screen.getByText('Well Plugging Basics')).toBeInTheDocument()
  })

  it('renders card description', () => {
    render(<EducationalCard {...mockContent} />)
    
    expect(screen.getByText('Learn the fundamentals of well plugging and environmental impact.')).toBeInTheDocument()
  })

  it('renders card image with correct alt text', () => {
    render(<EducationalCard {...mockContent} />)
    
    const image = screen.getByAltText('Well illustration')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/edu-card.png')
  })

  it('renders CTA link with correct label', () => {
    render(<EducationalCard {...mockContent} />)
    
    const link = screen.getByText('Learn More')
    expect(link).toBeInTheDocument()
  })

  it('link has correct href', () => {
    render(<EducationalCard {...mockContent} />)
    
    const link = screen.getByText('Learn More')
    expect(link).toHaveAttribute('href', '/learn/well-plugging')
  })

  it('renders as article element', () => {
    const { container } = render(<EducationalCard {...mockContent} />)
    
    const article = container.querySelector('article')
    expect(article).toBeInTheDocument()
  })

  it('has card styling classes', () => {
    const { container } = render(<EducationalCard {...mockContent} />)
    
    const article = container.querySelector('article')
    expect(article).toHaveClass('bg-card', 'rounded-lg', 'border', 'border-border/50')
  })

  it('title has proper typography styling', () => {
    const { container } = render(<EducationalCard {...mockContent} />)
    
    const title = screen.getByText('Well Plugging Basics')
    expect(title).toHaveClass('text-xl', 'font-bold', 'leading-tight')
  })

  it('button renders with correct attributes', () => {
    const { container } = render(<EducationalCard {...mockContent} />)
    
    const buttons = screen.getAllByText('Learn More')
    expect(buttons.length).toBeGreaterThan(0)
    expect(buttons[0]).toHaveAttribute('href', '/learn/well-plugging')
  })

  it('image has hover scale effect', () => {
    const { container } = render(<EducationalCard {...mockContent} />)
    
    const image = screen.getByAltText('Well illustration')
    expect(image).toHaveClass('hover:scale-105')
  })
})
