// @vitest-environment jsdom

import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { usePathname } from 'next/navigation'
import { afterEach, describe, expect, it, vi } from 'vitest'
import NavLink from '@/components/main-header/nav-link'

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}))

const mockedUsePathname = vi.mocked(usePathname)

afterEach(() => {
  cleanup()
})

describe('NavLink', () => {
  it('should render link with correct text and href', () => {
    mockedUsePathname.mockReturnValue('/')

    render(<NavLink href="/meals">Browse Meals</NavLink>)

    const link = screen.getByRole('link', {
      name: 'Browse Meals',
    })

    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/meals')
  })

  it('should apply active styles when pathname matches href', () => {
    mockedUsePathname.mockReturnValue('/meals')

    render(<NavLink href="/meals">Browse Meals</NavLink>)

    const link = screen.getByRole('link', {
      name: 'Browse Meals',
    })

    expect(link).toHaveClass('bg-linear-to-r')
    expect(link).toHaveClass('text-transparent')
  })

  it('should stay active on nested routes', () => {
    mockedUsePathname.mockReturnValue('/meals/burger')

    render(<NavLink href="/meals">Browse Meals</NavLink>)

    const link = screen.getByRole('link', {
      name: 'Browse Meals',
    })

    expect(link).toHaveClass('bg-linear-to-r')
    expect(link).toHaveClass('text-transparent')
  })
})
