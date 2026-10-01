'use server'

import { saveMeal, deleteMeal } from '@/lib/meals'
import { revalidatePath, updateTag, revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const mealSchema = z.object({
  title: z.string().trim().min(1, 'Title is required!'),
  summary: z.string().trim().min(1, 'Summary is required'),
  instructions: z.string().trim().min(1, 'Instructions are required'),
  creator: z.string().trim().min(1, 'Name is required'),
  creator_email: z.email('Invalid email'),
  image: z.instanceof(File),
})

type ShareMealState = {
  errors: {
    title?: string[]
    summary?: string[]
    instructions?: string[]
    creator?: string[]
    creator_email?: string[]
    image?: string[]
  }
}

export async function shareMeal(
  prevState: ShareMealState,
  formData: FormData,
): Promise<ShareMealState> {
  const rawMeal = {
    title: getString(formData, 'title'),
    summary: getString(formData, 'summary'),
    instructions: getString(formData, 'instructions'),
    image: formData.get('image'),
    creator: getString(formData, 'name'),
    creator_email: getString(formData, 'email'),
  }

  const result = mealSchema.safeParse(rawMeal)

  if (!result.success) {
    const errors = z.flattenError(result.error).fieldErrors

    return {
      errors,
    }
  }

  await saveMeal(result.data)
  updateTag('meals')

  // revalidatePath('/meals', 'page')
  redirect('/meals')
}

function getString(formData: FormData, key: string) {
  const value = formData.get(key)

  if (typeof value !== 'string') {
    throw new Error(`Invalid ${key}`)
  }

  return value
}

export async function revalidateMealsTag() {
  revalidateTag('meals', 'max')
}

export async function deleteMealAction(formData: FormData) {
  const slug = formData.get('slug')

  if (typeof slug !== 'string') {
    throw new Error('Invalid slug')
  }

  await deleteMeal(slug)

  updateTag('meals')

  // revalidatePath('/meals', 'page')
}
