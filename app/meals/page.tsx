import Link from 'next/link'
import MealsGrid from '@/components/meals/meals-grid'
import { getMeals } from '@/lib/meals'
import { Suspense } from 'react'

export const metadata = {
  title: 'All Meals',
  description: 'Browse the delicious meals shared by our vibrant community.',
}

async function Meals() {
  const meals = await getMeals()

  return <MealsGrid meals={meals} />
}

function MealsPage() {
  return (
    <>
      <header className="mx-auto mt-12 mb-20 w-[90%] max-w-300 text-2xl text-[#ddd6cb]">
        <h1 className="font-['Montserrat']">
          Delicious meals, created{' '}
          <span className="bg-linear-to-r from-[#f9572a] to-[#ff8a05] bg-clip-text text-transparent">
            by you
          </span>
        </h1>

        <p className="m-0">Choose your favorite recipe and cook it yourself. It is easy and fun!</p>

        <p>
          <Link
            href="/meals/share"
            className="mt-4 inline-block rounded-lg bg-linear-to-r from-[#f9572a] to-[#ff9b05] px-4 py-2 font-bold text-white no-underline"
          >
            Share Your Favorite Recipe
          </Link>
        </p>
      </header>
      <main>
        <Suspense fallback={<p className="animate-loading text-center">Fetching meals...</p>}>
          <Meals />
        </Suspense>
      </main>
    </>
  )
}

export default MealsPage
