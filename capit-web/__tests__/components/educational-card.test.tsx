import React from 'react'
import { render, screen } from '@testing-library/react'
import { EducationalCard } from '@/components/educational-card'
import type { EducationalCardContent } from '@/lib/types'

jest.mock('next/link', () => {
  return ({ children, href }: any) => <a href={href}>{children}</a>
})

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, fill, ...props }: any) => (
    // eslint-disable-next-line jsx-a11y/alt-text
    <img src={src} alt={alt} {...props} />
  ),
}))

/**
 * A card exists to carry a title, an explanation, a picture and a link to the
 * page behind it. Those are the things asserted here; styling is not.
 */
describe('EducationalCard Component', () => {
  const card: EducationalCardContent = {
    title: 'What Is a Plugged Well?',
    description: 'A well sealed with cement plugs and recorded as plugged by the state regulator.',
    imageSrc: '/images/plugged-well.jpg',
    imageAlt: 'Illustration of a plugged well',
    linkHref: '/what-is-a-plugged-well',
    linkLabel: 'Learn What Counts',
  }

  it('renders the title and description', () => {
    render(<EducationalCard {...card} />)

    expect(screen.getByRole('heading', { name: card.title })).toBeInTheDocument()
    expect(screen.getByText(card.description!)).toBeInTheDocument()
  })

  it('links to the page it describes, using the configured label', () => {
    render(<EducationalCard {...card} />)

    expect(screen.getByRole('link', { name: /Learn What Counts/i })).toHaveAttribute(
      'href',
      '/what-is-a-plugged-well'
    )
  })

  it('renders the image with its alt text', () => {
    render(<EducationalCard {...card} />)

    expect(screen.getByAltText('Illustration of a plugged well')).toHaveAttribute(
      'src',
      '/images/plugged-well.jpg'
    )
  })

  it('falls back to the title for alt text when none is given', () => {
    // An editor leaving alt text blank should not produce an unlabelled image.
    render(<EducationalCard {...card} imageAlt={undefined} />)

    expect(screen.getByAltText(card.title!)).toBeInTheDocument()
  })

  it('falls back to a default link label and href', () => {
    render(<EducationalCard {...card} linkHref={undefined} linkLabel={undefined} />)

    expect(screen.getByRole('link', { name: /Learn More/i })).toHaveAttribute('href', '#')
  })
})
