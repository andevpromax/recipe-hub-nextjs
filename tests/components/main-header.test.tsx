// @vitest-environment jsdom

import '@testing-library/jest-dom/vitest'

import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import MainHeader from '@/components/main-header/main-header'
import { usePathname } from 'next/navigation'

// vi.mock('next/navigation', () => ({
//   usePathname: vi.fn(() => '/'),
// }))

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}))

const mockedUsePathname = vi.mocked(usePathname)

vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: { src: string | { src: string }; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={typeof src === 'string' ? src : src.src} alt={alt} {...props} />
  ),
}))

beforeEach(() => {
  mockedUsePathname.mockReturnValue('/')
})

afterEach(() => {
  cleanup()
})

describe('MainHeader', () => {
  it('should render logo and navigation links', () => {
    render(<MainHeader />)

    expect(
      screen.getByRole('img', {
        name: 'A plate with food on it',
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('link', {
        name: /NextLevel Food/i,
      }),
    ).toHaveAttribute('href', '/')

    expect(
      screen.getByRole('link', {
        name: 'Browse Meals',
      }),
    ).toHaveAttribute('href', '/meals')

    expect(
      screen.getByRole('link', {
        name: 'Foodies Community',
      }),
    ).toHaveAttribute('href', '/community')
  })

  it('should mark Browse Meals as active on meals route', () => {
    mockedUsePathname.mockReturnValue('/meals')

    render(<MainHeader />)

    const mealsLink = screen.getByRole('link', {
      name: 'Browse Meals',
    })

    const communityLink = screen.getByRole('link', {
      name: 'Foodies Community',
    })

    expect(mealsLink).toHaveClass('bg-linear-to-r')
    expect(mealsLink).toHaveClass('text-transparent')

    expect(communityLink).not.toHaveClass('bg-linear-to-r')
    expect(communityLink).not.toHaveClass('text-transparent')
  })
})
