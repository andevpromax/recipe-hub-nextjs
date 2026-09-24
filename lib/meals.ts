import sql from 'better-sqlite3'
import slugify from 'slugify'
import xss from 'xss'
import fs from 'node:fs'
import { NewMeal } from '@/types/meal'

const db = sql('meals.db')

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000))

  return db.prepare('SELECT * FROM meals').all()
}

export function getMeal(slug: string) {
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug)
}

export async function saveMeal(meal: NewMeal) {
  const slug = slugify(meal.title, { lower: true })
  const instructions = xss(meal.instructions)

  const extension = meal.image.name.split('.').pop()
  const fileName = `${slug}.${extension}`

  const stream = fs.createWriteStream(`public/images/${fileName}`)
  const bufferedImage = await meal.image.arrayBuffer()

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error('Saving image failed!')
    }
  })

  const mealToSave = {
    ...meal,
    slug,
    instructions,
    image: `/images/${fileName}`,
  }

  db.prepare(
    `
    INSERT into meals
      (title, summary, instructions, creator, creator_email, image, slug )
    VALUES (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    )
  `,
  ).run(mealToSave)
}
