import { getCachedMealsCount } from '@/lib/meals-tag'

export default async function CachedMealsCountPage() {
  const count = await getCachedMealsCount()

  return (
    <main className="flex flex-col gap-4">
      <h1 className="m-auto çtext-2xl text-[#ddd6cb] text-[2rem] font-bold font-['Montserrat'] tracking-[0.15rem] uppercase bg-linear-to-r from-[#f9572a] to-[#ffc905] bg-clip-text">
        Cached meals count
      </h1>

      <p>Total meals: {count}</p>
    </main>
  )
}
