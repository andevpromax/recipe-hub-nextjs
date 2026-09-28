import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest'
import { getMeal, getMeals, saveMeal, deleteMeal } from '@/lib/meals'
import type { NewMeal } from '@/types/meal'

const { getMock, allMock, runMock, putObjectMock, prepareMock, deleteObjectMock } = vi.hoisted(
  () => {
    const getMock = vi.fn()
    const allMock = vi.fn()
    const runMock = vi.fn()
    const putObjectMock = vi.fn()
    const deleteObjectMock = vi.fn()

    const prepareMock = vi.fn(() => ({
      get: getMock,
      all: allMock,
      run: runMock,
    }))

    return {
      getMock,
      prepareMock,
      allMock,
      runMock,
      putObjectMock,
      deleteObjectMock,
    }
  },
)

vi.mock('better-sqlite3', () => ({
  default: vi.fn(() => ({
    prepare: prepareMock,
  })),
}))

vi.mock('@aws-sdk/client-s3', () => ({
  S3: class {
    putObject = putObjectMock
    deleteObject = deleteObjectMock
  },
}))

// beforeEach(() => {
//   vi.clearAllMocks()
// })

beforeEach(() => {
  vi.clearAllMocks()

  putObjectMock.mockResolvedValue({})
  deleteObjectMock.mockResolvedValue({})
})

afterEach(() => {
  vi.useRealTimers()
})

describe('getMeal', () => {
  it('should return meal by slug', () => {
    const mockMeal = {
      id: 1,
      title: 'Burger',
      slug: 'burger',
    }

    getMock.mockReturnValue(mockMeal)

    const result = getMeal('burger')
    expect(result).toEqual(mockMeal)

    expect(prepareMock).toHaveBeenCalledWith('SELECT * FROM meals WHERE slug = ?')

    expect(getMock).toHaveBeenCalledWith('burger')
  })

  it('should return undefined when meal is not found', () => {
    getMock.mockReturnValue(undefined)

    const result = getMeal('unknown-meal')

    expect(result).toBeUndefined()
  })
})

describe('getMeals', () => {
  it('should return all meals', async () => {
    vi.useFakeTimers()
    const mockMeals = [
      {
        id: 1,
        title: 'Burger',
        slug: 'burger',
      },
      {
        id: 2,
        title: 'Pizza',
        slug: 'pizza',
      },
    ]

    allMock.mockReturnValue(mockMeals)

    const promise = getMeals()

    await vi.advanceTimersByTimeAsync(2000)

    const result = await promise

    expect(result).toEqual(mockMeals)
    expect(prepareMock).toHaveBeenCalledWith('SELECT * FROM meals')
    expect(allMock).toHaveBeenCalled()
  })

  it('should return an empty array when no meals are found', async () => {
    vi.useFakeTimers()

    allMock.mockReturnValue([])

    const promise = getMeals()

    await vi.advanceTimersByTimeAsync(2000)

    const result = await promise

    expect(result).toEqual([])
  })
})

function createMockMeal(overrides: Partial<NewMeal> = {}): NewMeal {
  const image = new File(['fake image content'], 'burger.jpg', {
    type: 'image/jpeg',
  })

  return {
    title: 'Burger',
    summary: 'Delicious burger',
    instructions: 'Cook the burger',
    creator: 'Andrii',
    creator_email: 'andrii@example.com',
    image,
    ...overrides,
  }
}
describe('saveMeal', () => {
  it('should save a meal', async () => {
    const mockMeal = createMockMeal()

    putObjectMock.mockResolvedValue({})

    await saveMeal(mockMeal)

    console.log('prepare:', prepareMock.mock.calls)
    console.log('run:', runMock.mock.calls)

    expect(putObjectMock).toHaveBeenCalledTimes(1)
    expect(putObjectMock).toHaveBeenCalledWith(
      expect.objectContaining({
        Bucket: 'andriipositko-nextjs-recipe-images',
        ContentType: 'image/jpeg',
        Body: expect.any(Buffer),
      }),
    )
    expect(putObjectMock).toHaveBeenCalledWith(
      expect.objectContaining({
        Key: expect.stringMatching(/\.jpg$/),
      }),
    )
    expect(runMock).toHaveBeenCalledTimes(1)

    expect(runMock).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Burger',
        summary: 'Delicious burger',
        instructions: 'Cook the burger',
        creator: 'Andrii',
        creator_email: 'andrii@example.com',
        image: expect.stringMatching(/\.jpg$/),
        slug: expect.any(String),
      }),
    )
  })

  it('should sanitize instructions before saving', async () => {
    const mockMeal = createMockMeal({
      instructions: '<img src="x" onerror="alert(1)">Cook the burger',
    })

    putObjectMock.mockResolvedValue({})

    await saveMeal(mockMeal)

    const savedMeal = runMock.mock.calls[0][0]

    expect(savedMeal.instructions).not.toContain('onerror')
    expect(savedMeal.instructions).toContain('Cook the burger')
  })

  it('should use the same image filename for S3 and database', async () => {
    const mockMeal = createMockMeal()

    putObjectMock.mockResolvedValue({})

    await saveMeal(mockMeal)

    const s3Params = putObjectMock.mock.calls[0][0]
    const savedMeal = runMock.mock.calls[0][0]

    expect(savedMeal.image).toBe(s3Params.Key)
    expect(savedMeal.image).toBe(`${savedMeal.slug}.jpg`)
  })

  it('should not mutate the original meal', async () => {
    const originalInstructions = '<img src="x" onerror="alert(1)">Cook the burger'

    const mockMeal = createMockMeal({
      instructions: originalInstructions,
    })

    putObjectMock.mockResolvedValue({})

    await saveMeal(mockMeal)

    expect(mockMeal.instructions).toBe(originalInstructions)
    expect(mockMeal.image).toBe(mockMeal.image)
    expect(mockMeal).not.toHaveProperty('slug')
  })

  it('should not save meal to database when S3 upload fails', async () => {
    const mockMeal = createMockMeal()

    putObjectMock.mockRejectedValueOnce(new Error('S3 upload failed'))

    await expect(saveMeal(mockMeal)).rejects.toThrow('S3 upload failed')

    expect(runMock).not.toHaveBeenCalled()
  })

  it('should delete meal from database and S3', async () => {
    getMock.mockReturnValue({
      id: 1,
      slug: 'burger',
      title: 'Burger',
      summary: 'Delicious burger',
      instructions: 'Cook it',
      creator: 'Andrii',
      creator_email: 'andrii@example.com',
      image: 'burger.jpg',
    })

    await deleteMeal('burger')

    expect(prepareMock).toHaveBeenCalledWith('DELETE FROM meals WHERE slug = ?')

    expect(runMock).toHaveBeenCalledWith('burger')

    expect(deleteObjectMock).toHaveBeenCalledWith({
      Bucket: 'andriipositko-nextjs-recipe-images',
      Key: 'burger.jpg',
    })
  })

  it('should throw an error if meal does not exist', async () => {
    getMock.mockReturnValue(undefined)

    await expect(deleteMeal('missing-meal')).rejects.toThrow('Meal not found')

    expect(runMock).not.toHaveBeenCalled()
    expect(deleteObjectMock).not.toHaveBeenCalled()
  })
})
