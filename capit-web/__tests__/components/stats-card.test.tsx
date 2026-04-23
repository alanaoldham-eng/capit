import React from 'react'
import { render, screen } from '@testing-library/react'
import { StatsCard } from '@/components/stats-card'
import type { StatsCardContent } from '@/lib/types'

describe('StatsCard Component', () => {
  const mockContent: StatsCardContent = {
    title: 'Total Wells',
    value: '1,234',
    subtitle: 'Plugged in 2024',
  }

  it('renders the stats card with all content', () => {
    render(<StatsCard {...mockContent} />)
    
    expect(screen.getByText('Total Wells')).toBeInTheDocument()
    expect(screen.getByText('1,234')).toBeInTheDocument()
    expect(screen.getByText('Plugged in 2024')).toBeInTheDocument()
  })

  it('displays the title with correct styling', () => {
    const { container } = render(<StatsCard {...mockContent} />)
    
    const title = screen.getByText('Total Wells')
    expect(title).toHaveClass('text-xs', 'font-semibold', 'uppercase')
  })

  it('displays the value prominently', () => {
    const { container } = render(<StatsCard {...mockContent} />)
    
    const value = screen.getByText('1,234')
    expect(value).toHaveClass('text-4xl', 'lg:text-5xl', 'font-bold', 'text-primary')
  })

  it('has correct card styling', () => {
    const { container } = render(<StatsCard {...mockContent} />)
    
    const card = container.querySelector('div')
    expect(card).toHaveClass('bg-card', 'rounded-xl', 'border', 'shadow-sm')
  })

  it('renders subtitle with correct styling', () => {
    const { container } = render(<StatsCard {...mockContent} />)
    
    const subtitle = screen.getByText('Plugged in 2024')
    expect(subtitle).toHaveClass('text-xs', 'text-muted-foreground')
  })

  it('handles large numbers correctly', () => {
    const largeNumberContent = {
      ...mockContent,
      value: '999,999+',
    }
    
    render(<StatsCard {...largeNumberContent} />)
    expect(screen.getByText('999,999+')).toBeInTheDocument()
  })
})
