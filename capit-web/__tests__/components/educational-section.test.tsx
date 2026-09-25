import React from 'react'
import { render, screen } from '@testing-library/react'
import { EducationalSection } from '@/components/educational-section'
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
 * The section's job is to render one card per entry, in the order the CMS gives
 * them, and to survive an empty list. Grid classes are not asserted: the layout
 * can be restyled without breaking these tests.
 */
describe('EducationalSection Component', () => {
  const cards: EducationalCardContent[] = [
    {
      title: 'What Is a Plugged Well?',
      description: 'A well sealed with cement plugs and recorded by the regulator.',
      imageSrc: '/images/plugged-well.jpg',
      imageAlt: 'Illustration of a plugged well',
      linkHref: '/what-is-a-plugged-well',
      linkLabel: 'Learn What Counts',
    },
    {
      title: 'Why Does Plugging Wells Matter?',
      description: 'Plugging closes out a well and reduces the risk of leaks.',
      imageSrc: '/images/well-river.jpg',
      imageAlt: 'Illustration showing environmental benefits',
      linkHref: '/why-plugging-wells-matter',
      linkLabel: 'Why It Matters',
    },
    {
      title: 'How Many Unplugged Wells Remain?',
      description: 'Estimates vary by definition and source.',
      imageSrc: '/images/plug-map.jpg',
      imageAlt: 'Map showing inactive wells',
      linkHref: '/inactive-wells-remain',
      linkLabel: 'See the Data Context',
    },
  ]

  it('renders one card per entry', () => {
    render(<EducationalSection cards={cards} />)

    expect(screen.getAllByRole('article')).toHaveLength(cards.length)
  })

  it('keeps the order the content gives', () => {
    render(<EducationalSection cards={cards} />)

    const headings = screen
      .getAllByRole('heading')
      .map((heading) => heading.textContent)

    expect(headings).toEqual(cards.map((card) => card.title))
  })

  it('links each card to its page', () => {
    render(<EducationalSection cards={cards} />)

    for (const card of cards) {
      expect(screen.getByRole('link', { name: new RegExp(card.linkLabel!, 'i') })).toHaveAttribute(
        'href',
        card.linkHref
      )
    }
  })

  it('renders nothing when there are no cards', () => {
    render(<EducationalSection cards={[]} />)

    expect(screen.queryByRole('article')).not.toBeInTheDocument()
  })

  it('renders nothing when the cards prop is omitted', () => {
    render(<EducationalSection />)

    expect(screen.queryByRole('article')).not.toBeInTheDocument()
  })
})
