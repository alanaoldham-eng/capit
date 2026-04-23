import React from 'react'
import { render, screen } from '@testing-library/react'
import { EducationalSection } from '@/components/educational-section'
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

jest.mock('lucide-react', () => ({
  ArrowRight: ({ className }: any) => <span className={className}>→</span>,
}))

describe('EducationalSection Component', () => {
  const mockCards: EducationalCardContent[] = [
    {
      title: 'Card 1',
      description: 'Description 1',
      imageSrc: '/image1.png',
      imageAlt: 'Image 1',
      linkHref: '/learn/1',
      linkLabel: 'Learn',
    },
    {
      title: 'Card 2',
      description: 'Description 2',
      imageSrc: '/image2.png',
      imageAlt: 'Image 2',
      linkHref: '/learn/2',
      linkLabel: 'Learn',
    },
    {
      title: 'Card 3',
      description: 'Description 3',
      imageSrc: '/image3.png',
      imageAlt: 'Image 3',
      linkHref: '/learn/3',
      linkLabel: 'Learn',
    },
  ]

  it('renders all educational cards', () => {
    render(<EducationalSection cards={mockCards} />)
    
    mockCards.forEach((card) => {
      expect(screen.getByText(card.title)).toBeInTheDocument()
      expect(screen.getByText(card.description)).toBeInTheDocument()
    })
  })

  it('renders section with proper background', () => {
    const { container } = render(<EducationalSection cards={mockCards} />)
    
    const section = container.querySelector('section')
    expect(section).toHaveClass('bg-background')
  })

  it('renders responsive grid layout', () => {
    const { container } = render(<EducationalSection cards={mockCards} />)
    
    const grid = container.querySelector('[class*="grid"]')
    expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3')
  })

  it('handles empty array gracefully', () => {
    const { container } = render(<EducationalSection cards={[]} />)
    
    const section = container.querySelector('section')
    expect(section).toBeInTheDocument()
  })

  it('renders correct number of articles', () => {
    const { container } = render(<EducationalSection cards={mockCards} />)
    
    const articles = container.querySelectorAll('article')
    expect(articles).toHaveLength(mockCards.length)
  })

  it('maintains proper spacing between cards', () => {
    const { container } = render(<EducationalSection cards={mockCards} />)
    
    const grid = container.querySelector('[class*="grid"]')
    expect(grid).toHaveClass('gap-6')
  })
})
