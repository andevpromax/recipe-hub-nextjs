// @vitest-environment jsdom

import '@testing-library/jest-dom/vitest'

import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import ShareMealPage from '@/app/meals/share/page'
import userEvent from '@testing-library/user-event'
import { useActionState } from 'react'

vi.mock('@/lib/actions', () => ({
  shareMeal: vi.fn(),
}))

vi.mock('@/components/meals/image-picker', () => ({
  default: () => <div data-testid="image-picker">Image Picker</div>,
}))

vi.mock('@/components/meals/meals-form-submit', () => ({
  default: () => <button type="submit">Share Meal</button>,
}))

vi.mock('react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react')>()

  return {
    ...actual,
    useActionState: vi.fn(),
  }
})

const mockedUseActionState = vi.mocked(useActionState)

beforeEach(() => {
  mockedUseActionState.mockReturnValue([
    {
      errors: {},
    },
    vi.fn(),
    false,
  ])
})

afterEach(() => {
  cleanup()
})

describe('ShareMealPage', () => {
  it('should render meal form fields', () => {
    render(<ShareMealPage />)

    expect(
      screen.getByRole('heading', {
        name: /Share your favorite meal/i,
      }),
    ).toBeInTheDocument()

    expect(screen.getByLabelText('Your name')).toBeInTheDocument()
    expect(screen.getByLabelText('Your email')).toBeInTheDocument()
    expect(screen.getByLabelText('Title')).toBeInTheDocument()
    expect(screen.getByLabelText('Short Summary')).toBeInTheDocument()
    expect(screen.getByLabelText('Instructions')).toBeInTheDocument()

    expect(
      screen.getByRole('button', {
        name: 'Share Meal',
      }),
    ).toBeInTheDocument()
  })

  it('should allow user to fill in the form fields', async () => {
    const user = userEvent.setup()

    render(<ShareMealPage />)

    const nameInput = screen.getByLabelText('Your name')
    const emailInput = screen.getByLabelText('Your email')
    const titleInput = screen.getByLabelText('Title')
    const summaryInput = screen.getByLabelText('Short Summary')
    const instructionsInput = screen.getByLabelText('Instructions')

    await user.type(nameInput, 'Andrii')
    await user.type(emailInput, 'andrii@example.com')
    await user.type(titleInput, 'Burger')
    await user.type(summaryInput, 'Delicious burger')
    await user.type(instructionsInput, 'Cook the burger')

    expect(nameInput).toHaveValue('Andrii')
    expect(emailInput).toHaveValue('andrii@example.com')
    expect(titleInput).toHaveValue('Burger')
    expect(summaryInput).toHaveValue('Delicious burger')
    expect(instructionsInput).toHaveValue('Cook the burger')
  })

  it('should require all form fields', () => {
    render(<ShareMealPage />)

    expect(screen.getByLabelText('Your name')).toBeRequired()
    expect(screen.getByLabelText('Your email')).toBeRequired()
    expect(screen.getByLabelText('Title')).toBeRequired()
    expect(screen.getByLabelText('Short Summary')).toBeRequired()
    expect(screen.getByLabelText('Instructions')).toBeRequired()
  })

  it('should validate email format', async () => {
    const user = userEvent.setup()

    render(<ShareMealPage />)

    const emailInput = screen.getByLabelText('Your email')

    await user.type(emailInput, 'invalid-email')

    expect(emailInput).toBeInvalid()

    await user.clear(emailInput)
    await user.type(emailInput, 'andrii@example.com')

    expect(emailInput).toBeValid()
  })

  it('should display server validation error for title', () => {
    mockedUseActionState.mockReturnValue([
      {
        errors: {
          title: ['Title must contain at least 3 characters'],
        },
      },
      vi.fn(),
      false,
    ])

    render(<ShareMealPage />)

    expect(screen.getByText('Title must contain at least 3 characters')).toBeInTheDocument()
  })

  it('should submit form data', async () => {
    const user = userEvent.setup()
    const formActionMock = vi.fn()

    mockedUseActionState.mockReturnValue([
      {
        errors: {},
      },
      formActionMock,
      false,
    ])

    render(<ShareMealPage />)

    await user.type(screen.getByLabelText('Your name'), 'Andrii')
    await user.type(screen.getByLabelText('Your email'), 'andrii@example.com')
    await user.type(screen.getByLabelText('Title'), 'Burger')
    await user.type(screen.getByLabelText('Short Summary'), 'Delicious burger')
    await user.type(screen.getByLabelText('Instructions'), 'Cook the burger')

    await user.click(
      screen.getByRole('button', {
        name: 'Share Meal',
      }),
    )

    expect(formActionMock).toHaveBeenCalledTimes(1)

    const formData = formActionMock.mock.calls[0][0] as FormData

    expect(formData.get('name')).toBe('Andrii')
    expect(formData.get('email')).toBe('andrii@example.com')
    expect(formData.get('title')).toBe('Burger')
    expect(formData.get('summary')).toBe('Delicious burger')
    expect(formData.get('instructions')).toBe('Cook the burger')
  })
})
