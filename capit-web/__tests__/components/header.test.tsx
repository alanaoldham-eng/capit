import React from 'react'
import { fireEvent, render, screen, within } from '@testing-library/react'
import { Header } from '@/components/header'
import type { SiteContent } from '@/lib/types'

jest.mock('next/link', () => {
  return ({ children, href, onClick, ...props }: any) => (
    <a href={href} onClick={onClick} {...props}>
      {children}
    </a>
  )
})

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, fill, priority, ...props }: any) => (
    // eslint-disable-next-line jsx-a11y/alt-text
    <img src={src} alt={alt} {...props} />
  ),
}))

/**
 * Behaviour under test: navigation comes from the CMS, the mobile drawer opens
 * and closes, and the header still works when content is missing. Layout
 * classes are deliberately not asserted.
 */
describe('Header Component', () => {
  const site: SiteContent = {
    name: 'CAPIT',
    logo: { src: '/images/capit-logo.png', alt: 'CAPIT logo' },
    navigation: [
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'States', href: '/states' },
      { label: 'About', href: '/about' },
      { label: 'FAQs', href: '/faqs' },
    ],
    ctaButton: { label: 'Buy CAPIT', href: '/buy-capit' },
  }

  it('renders navigation from site content', () => {
    render(<Header site={site} />)

    for (const item of site.navigation!) {
      // Each link appears twice: desktop nav and the mobile drawer.
      const links = screen.getAllByRole('link', { name: item.label })
      expect(links.length).toBeGreaterThan(0)
      links.forEach((link) => expect(link).toHaveAttribute('href', item.href))
    }
  })

  it('accepts the same content through either the site or content prop', () => {
    const { unmount } = render(<Header site={site} />)
    expect(screen.getAllByRole('link', { name: 'Dashboard' }).length).toBeGreaterThan(0)
    unmount()

    render(<Header content={site} />)
    expect(screen.getAllByRole('link', { name: 'Dashboard' }).length).toBeGreaterThan(0)
  })

  it('renders the call to action from site content', () => {
    render(<Header site={site} />)

    expect(screen.getByRole('link', { name: 'Buy CAPIT' })).toHaveAttribute(
      'href',
      '/buy-capit'
    )
  })

  it('renders the logo with its alt text and links home', () => {
    render(<Header site={site} />)

    expect(screen.getByAltText('CAPIT logo')).toHaveAttribute(
      'src',
      '/images/capit-logo.png'
    )
    expect(screen.getByRole('link', { name: /CAPIT homepage/i })).toHaveAttribute('href', '/')
  })

  it('falls back to default navigation when no content is supplied', () => {
    render(<Header />)

    for (const label of ['Dashboard', 'States', 'About', 'FAQs']) {
      expect(screen.getAllByRole('link', { name: label }).length).toBeGreaterThan(0)
    }
    expect(screen.getByRole('link', { name: 'Buy CAPIT' })).toHaveAttribute('href', '/#swap')
  })

  describe('mobile navigation', () => {
    it('is hidden until the menu button is pressed', () => {
      const { container } = render(<Header site={site} />)

      const drawer = container.querySelector('#mobile-nav') as HTMLElement
      const toggle = screen.getByRole('button', { name: /open navigation menu/i })

      expect(drawer).not.toBeVisible()
      expect(toggle).toHaveAttribute('aria-expanded', 'false')

      fireEvent.click(toggle)

      expect(drawer).toBeVisible()
      expect(
        screen.getByRole('button', { name: /close navigation menu/i })
      ).toHaveAttribute('aria-expanded', 'true')
    })

    it('closes again when a link in the drawer is followed', () => {
      const { container } = render(<Header site={site} />)

      const drawer = container.querySelector('#mobile-nav') as HTMLElement
      fireEvent.click(screen.getByRole('button', { name: /open navigation menu/i }))
      expect(drawer).toBeVisible()

      fireEvent.click(within(drawer).getByRole('link', { name: 'States' }))

      expect(drawer).not.toBeVisible()
    })
  })
})
