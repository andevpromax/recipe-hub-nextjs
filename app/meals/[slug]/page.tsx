import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

import { getMeal } from '@/lib/meals'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const meal = getMeal(slug)

  if (!meal) {
    notFound()
  }

  return {
    title: meal.title,
    description: meal.summary,
  }
}

type MealDetailsPageProps = {
  params: Promise<{ slug: string }>
}

export default function MealDetailsPage({ params }: MealDetailsPageProps) {
  return (
    <Suspense fallback={<p>Loading meal...</p>}>
      <MealDetails params={params} />
    </Suspense>
  )
}

async function MealDetails({ params }: MealDetailsPageProps) {
  const { slug } = await params
  const meal = getMeal(slug)

  if (!meal) {
    notFound()
  }

  return (
    <>
      <header className="mx-auto flex max-w-7xl gap-12 px-4 py-8">
        <div className="relative h-80 w-120">
          <Image
            src={`https://andriipositko-nextjs-recipe-images.s3.eu-north-1.amazonaws.com/${meal.image}`}
            alt={meal.title}
            fill
            className="animate-fade-slide-in-from-left rounded-lg object-cover shadow-[0_0_0.5rem_rgba(0,0,0,0.5)]"
          />
        </div>

        <div className="animate-fade-slide-in-from-right max-w-160 px-4 pt-2 text-[#ddd6cb]">
          <h1 className="m-0 font-['Montserrat'] text-[3.5rem] uppercase [text-shadow:0_0_0.5rem_rgba(0,0,0,0.5)]">
            {meal.title}
          </h1>

          <p className="text-2xl italic text-[#cfa69b]">
            by{' '}
            <a
              href={`mailto:${meal.creator_email}`}
              className="bg-linear-to-r from-[#f9572a] to-[#ff8a05] bg-clip-text text-transparent hover:[text-shadow:0_0_18px_rgba(248,190,42,0.8)]"
            >
              {meal.creator}
            </a>
          </p>

          <p className="text-2xl">{meal.summary}</p>
        </div>
      </header>

      <main>
        <p className="whitespace-pre-line animate-fade-slide-in-from-bottom mx-auto my-8 max-w-240 rounded-lg bg-[#6e6464] p-8 text-xl leading-normal text-[#13120f] shadow-[0_0_0.5rem_rgba(0,0,0,0.5)]">
          {meal.instructions}
        </p>
        {/*
            <p className="whitespace-pre-line animate-fade-slide-in-from-bottom mx-auto my-8 max-w-240 rounded-lg bg-[#6e6464] p-8 text-xl leading-normal text-[#13120f] shadow-[0_0_0.5rem_rgba(0,0,0,0.5)]">
            dangerouslySetInnerHTML={{
            __html: meal.instructions,
          }}
        ></p> */}
      </main>
    </>
  )
}
