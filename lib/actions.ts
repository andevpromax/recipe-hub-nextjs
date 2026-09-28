'use server'

import { saveMeal, deleteMeal } from '@/lib/meals'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { revalidateTag } from 'next/cache'

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
  console.log('1. shareMeal started')

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
    console.log('2. validation failed')
    const errors = z.flattenError(result.error).fieldErrors

    return {
      errors,
    }
  }
  console.log('2. validation passed')

  await saveMeal(result.data)

  console.log('3. meal saved')

  revalidatePath('/meals', 'page')

  console.log('4. path revalidated')
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

  revalidatePath('/meals', 'page')
}
