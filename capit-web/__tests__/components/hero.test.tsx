import React from 'react'
import { render, screen } from '@testing-library/react'
import { Hero } from '@/components/hero'
import type { HeroContent } from '@/lib/types'

// Mock Next.js components
jest.mock('next/link', () => {
  return ({ children, href }: any) => <a href={href}>{children}</a>
})

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, fill, priority, ...props }: any) => (
    // eslint-disable-next-line jsx-a11y/alt-text
    <img src={src} alt={alt} {...props} />
  ),
}))

/**
 * These tests cover what the hero does, not how it is styled. Class names are
 * implementation detail: a restyle should not turn the suite red while the
 * component still works.
 */
describe('Hero Component', () => {
  const mockContent: HeroContent = {
    eyebrow: 'PUBLIC WELL-PLUGGING RECORDS, LINKED ON-CHAIN',
    headline: 'Every Plugged Well.\nOne Public Record.',
    description: 'CAPIT collects plugged-well records published by state regulators.',
    ctaButton: { label: 'VIEW DASHBOARD', href: '/dashboard' },
    secondaryCta: { label: 'EXPLORE STATES', href: '/states' },
    trustNote: 'CAPIT is an independent project of Tellus Digital, LLC.',
    image: { src: '/images/cappy-and-well.jpg', alt: 'Cappy beside a capped wellhead' },
  }

  describe('with content', () => {
    it('renders the headline as the top-level heading', () => {
      render(<Hero content={mockContent} />)

      const heading = screen.getByRole('heading', { level: 1 })
      // The headline is one element with a line break in it, so assert on the
      // whole string rather than on either line alone.
      expect(heading).toHaveTextContent('Every Plugged Well.')
      expect(heading).toHaveTextContent('One Public Record.')
    })

    it('renders the eyebrow, description and trust note', () => {
      render(<Hero content={mockContent} />)

      expect(
        screen.getByText(/PUBLIC WELL-PLUGGING RECORDS, LINKED ON-CHAIN/i)
      ).toBeInTheDocument()
      expect(screen.getByText(mockContent.description!)).toBeInTheDocument()
      expect(screen.getByText(mockContent.trustNote!)).toBeInTheDocument()
    })

    it('renders both calls to action as links to their targets', () => {
      render(<Hero content={mockContent} />)

      expect(screen.getByRole('link', { name: 'VIEW DASHBOARD' })).toHaveAttribute(
        'href',
        '/dashboard'
      )
      expect(screen.getByRole('link', { name: 'EXPLORE STATES' })).toHaveAttribute(
        'href',
        '/states'
      )
    })

    it('renders the hero image with its alt text', () => {
      render(<Hero content={mockContent} />)

      const image = screen.getByAltText('Cappy beside a capped wellhead')
      expect(image).toHaveAttribute('src', '/images/cappy-and-well.jpg')
    })
  })

  describe('without content', () => {
    it('falls back to default copy and links', () => {
      render(<Hero />)

      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Plug Wells.')
      expect(screen.getByRole('link', { name: 'VIEW DASHBOARD' })).toHaveAttribute(
        'href',
        '/dashboard'
      )
      expect(screen.getByRole('link', { name: 'EXPLORE STATES' })).toHaveAttribute(
        'href',
        '/states'
      )
    })

    it('falls back when a CMS field is present but empty', () => {
      // Editors clear fields in Tina; an empty string must not blank the hero.
      render(<Hero content={{ ...mockContent, headline: '', description: '' }} />)

      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Plug Wells.')
      expect(screen.getByText(/CAPIT brings together public well-plugging records/i)).toBeInTheDocument()
    })

    it('shows the fallback image when no image is configured', () => {
      render(<Hero content={{ ...mockContent, image: undefined }} />)

      expect(
        screen.getByAltText('CAPIT Verified Plugged Well Inspector')
      ).toHaveAttribute('src', '/images/cappy-and-well.jpg')
    })
  })
})
