import { beforeEach, describe, expect, it, vi } from 'vitest'

import { shareMeal } from '@/lib/actions'

const { saveMealMock, revalidatePathMock, redirectMock } = vi.hoisted(() => ({
  saveMealMock: vi.fn(),
  revalidatePathMock: vi.fn(),
  redirectMock: vi.fn(),
}))

vi.mock('@/lib/meals', () => ({
  saveMeal: saveMealMock,
}))

vi.mock('next/cache', () => ({
  revalidatePath: revalidatePathMock,
  revalidateTag: vi.fn(),
}))

vi.mock('next/navigation', () => ({
  redirect: redirectMock,
}))

beforeEach(() => {
  vi.clearAllMocks()
})

describe('shareMeal', () => {
  it('should return validation errors for invalid form data', async () => {
    const formData = new FormData()

    formData.set('title', '')
    formData.set('summary', '')
    formData.set('instructions', '')
    formData.set('name', '')
    formData.set('email', 'invalid-email')

    const image = new File(['image'], 'burger.jpg', {
      type: 'image/jpeg',
    })

    formData.set('image', image)

    const result = await shareMeal(
      {
        errors: {},
      },
      formData,
    )

    expect(result.errors.title).toBeDefined()
    expect(result.errors.summary).toBeDefined()
    expect(result.errors.instructions).toBeDefined()
    expect(result.errors.creator).toBeDefined()
    expect(result.errors.creator_email).toBeDefined()
  })

  it('should save valid meal and redirect to meals page', async () => {
    const formData = new FormData()

    formData.set('title', 'Burger')
    formData.set('summary', 'Delicious burger')
    formData.set('instructions', 'Cook the burger')
    formData.set('name', 'Andrii')
    formData.set('email', 'andrii@example.com')

    const image = new File(['fake image'], 'burger.jpg', {
      type: 'image/jpeg',
    })

    formData.set('image', image)

    saveMealMock.mockResolvedValue(undefined)

    await shareMeal(
      {
        errors: {},
      },
      formData,
    )

    expect(saveMealMock).toHaveBeenCalledTimes(1)

    expect(saveMealMock).toHaveBeenCalledWith({
      title: 'Burger',
      summary: 'Delicious burger',
      instructions: 'Cook the burger',
      creator: 'Andrii',
      creator_email: 'andrii@example.com',
      image,
    })

    expect(revalidatePathMock).toHaveBeenCalledWith('/meals', 'page')

    expect(redirectMock).toHaveBeenCalledWith('/meals')
  })

  it('should trim string fields before saving', async () => {
    const formData = new FormData()

    formData.set('title', '   Burger   ')
    formData.set('summary', '   Delicious burger   ')
    formData.set('instructions', '   Cook the burger   ')
    formData.set('name', '   Andrii   ')
    formData.set('email', 'andrii@example.com')

    const image = new File(['fake image'], 'burger.jpg', {
      type: 'image/jpeg',
    })

    formData.set('image', image)

    await shareMeal(
      {
        errors: {},
      },
      formData,
    )

    expect(saveMealMock).toHaveBeenCalledWith({
      title: 'Burger',
      summary: 'Delicious burger',
      instructions: 'Cook the burger',
      creator: 'Andrii',
      creator_email: 'andrii@example.com',
      image,
    })
  })

  it('should return validation error when email contains surrounding spaces', async () => {
    const formData = new FormData()

    formData.set('title', 'Burger')
    formData.set('summary', 'Delicious burger')
    formData.set('instructions', 'Cook the burger')
    formData.set('name', 'Andrii')
    formData.set('email', '   andrii@example.com   ')

    const image = new File(['fake image'], 'burger.jpg', {
      type: 'image/jpeg',
    })

    formData.set('image', image)

    const result = await shareMeal(
      {
        errors: {},
      },
      formData,
    )

    expect(result.errors.creator_email).toBeDefined()
    expect(saveMealMock).not.toHaveBeenCalled()
  })
})
