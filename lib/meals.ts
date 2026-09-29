import slugify from 'slugify'
import xss from 'xss'
import { NewMeal, Meal } from '@/types/meal'
import { S3 } from '@aws-sdk/client-s3'
import db from '@/lib/db'

const s3 = new S3({
  region: 'eu-north-1',
})

export async function getMeals(): Promise<Meal[]> {
  await new Promise((resolve) => setTimeout(resolve, 2000))

  return db.prepare('SELECT * FROM meals').all() as Meal[]
}

export function getMeal(slug: string): Meal | undefined {
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug) as Meal | undefined
}

export async function saveMeal(meal: NewMeal) {
  const slug = createUniqueSlug(meal.title)
  const instructions = xss(meal.instructions)

  const extension = meal.image.name.split('.').pop()
  const fileName = `${slug}.${extension}`

  const bufferedImage = await meal.image.arrayBuffer()

  await s3.putObject({
    Bucket: 'andriipositko-nextjs-recipe-images',
    Key: fileName,
    Body: Buffer.from(bufferedImage),
    ContentType: meal.image.type,
  })

  const mealToSave = {
    ...meal,
    slug,
    instructions,
    image: fileName,
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

function createUniqueSlug(title: string) {
  const baseSlug = slugify(title, { lower: true })

  const existingSlug = db.prepare('SELECT 1 FROM meals WHERE slug = ?').get(baseSlug)

  if (!existingSlug) {
    return baseSlug
  }

  let counter = 2
  let slug = `${baseSlug}-${counter}`

  while (db.prepare('SELECT 1 FROM meals WHERE slug = ?').get(slug)) {
    counter++
    slug = `${baseSlug}-${counter}`
  }

  return slug
}

export async function deleteMeal(slug: string) {
  const meal = getMeal(slug)

  if (!meal) {
    throw new Error('Meal not found')
  }

  db.prepare('DELETE FROM meals WHERE slug = ?').run(slug)

  await s3.deleteObject({
    Bucket: 'andriipositko-nextjs-recipe-images',
    Key: meal.image,
  })
}

//! Store the image to the public folder
// export async function saveMeal(meal: NewMeal) {
//   const slug = createUniqueSlug(meal.title)
//   const instructions = xss(meal.instructions)

//   const extension = meal.image.name.split('.').pop()
//   const fileName = `${slug}.${extension}`

//   const stream = fs.createWriteStream(`public/images/${fileName}`)
//   const bufferedImage = await meal.image.arrayBuffer()

//   stream.write(Buffer.from(bufferedImage), (error) => {
//     if (error) {
//       throw new Error('Saving image failed!')
//     }
//   })

//   const mealToSave = {
//     ...meal,
//     slug,
//     instructions,
//     image: `/images/${fileName}`,
//   }

//   db.prepare(
//     `
//     INSERT into meals
//       (title, summary, instructions, creator, creator_email, image, slug )
//     VALUES (
//       @title,
//       @summary,
//       @instructions,
//       @creator,
//       @creator_email,
//       @image,
//       @slug
//     )
//   `,
//   ).run(mealToSave)
// }
