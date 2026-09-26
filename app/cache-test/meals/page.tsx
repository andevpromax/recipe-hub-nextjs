import { getCachedMeals } from '@/lib/meals-tag'
import { revalidateMealsTag } from '@/lib/actions'

export default async function CachedMealsPage() {
  const meals = await getCachedMeals()

  return (
    <main className="flex flex-col gap-4">
      <h1 className="m-auto text-2xl text-[#ddd6cb] text-[2rem] font-bold font-['Montserrat'] tracking-[0.15rem] uppercase bg-linear-to-r from-[#f9572a] to-[#ffc905] bg-clip-text">
        Cached meals
      </h1>

      {meals.map((meal) => (
        <p key={meal.id}>{meal.title}</p>
      ))}

      <form action={revalidateMealsTag}>
        <button type="submit">Revalidate meals tag</button>
      </form>
    </main>
  )
}
