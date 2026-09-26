import { unstable_cache } from 'next/cache'
import { Meal } from '@/types/meal'
import sql from 'better-sqlite3'
const db = sql('meals.db')

export const getCachedMeals = unstable_cache(
  async () => {
    console.log('GET MEALS FROM DATABASE')

    return db.prepare('SELECT * FROM meals').all() as Meal[]
  },
  ['meals-list'],
  {
    tags: ['meals'],
  },
)

export const getCachedMealsCount = unstable_cache(
  async () => {
    console.log('GET MEALS COUNT FROM DATABASE')

    const result = db.prepare('SELECT COUNT(*) as count FROM meals').get() as { count: number }

    return result.count
  },
  ['meals-count'],
  {
    tags: ['meals'],
  },
)
