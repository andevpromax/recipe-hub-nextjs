export type Meal = {
  id: string
  slug: string
  title: string
  image: string
  summary: string
  instructions: string
  creator: string
  creator_email: string
}

export type NewMeal = {
  title: string
  image: File
  summary: string
  instructions: string
  creator: string
  creator_email: string
}
