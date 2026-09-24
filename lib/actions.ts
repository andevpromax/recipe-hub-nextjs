'use server'

import { saveMeal } from '@/lib/meals'
import { redirect } from 'next/navigation'

export async function shareMeal(formData: FormData) {
  const meal = {
    title: getString(formData, 'title'),
    summary: getString(formData, 'summary'),
    instructions: getString(formData, 'instructions'),
    image: formData.get('image') as File,
    creator: getString(formData, 'creator'),
    creator_email: getString(formData, 'creator_email'),
  }

  await saveMeal(meal)
  redirect('/meals')
}

function getString(formData: FormData, key: string) {
  const value = formData.get(key)

  if (typeof value !== 'string') {
    throw new Error(`Invalid ${key}`)
  }

  return value
}
