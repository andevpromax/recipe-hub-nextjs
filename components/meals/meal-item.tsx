import Link from 'next/link'
import Image from 'next/image'
import type { Meal } from '@/types/meal'

type MealItemProps = Meal & {
  eager?: boolean
}

function MealItem({ title, slug, image, summary, creator, eager }: MealItemProps) {
  console.log('image', image)
  return (
    <article className="flex h-full flex-col justify-between overflow-hidden rounded-sm bg-linear-to-r from-[#2c1e19] to-[#25200f] text-[#ddd6cb] shadow-[0_0_12px_rgba(0,0,0,0.3)] transition-all duration-300 ease-in-out">
      <header>
        <div className="relative h-60">
          <Image
            src={`https://andriipositko-nextjs-recipe-images.s3.eu-north-1.amazonaws.com/${image}`}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            loading={eager ? 'eager' : 'lazy'}
          />
        </div>

        <div className="px-4 pt-2">
          <h2 className="m-0 font-['Montserrat'] text-2xl">{title}</h2>

          <p className="m-0 text-xs italic text-[#cfa69b]">by {creator}</p>
        </div>
      </header>

      <div className="flex h-full flex-col justify-between">
        <p className="m-0 px-4 pt-4">{summary}</p>

        <div className="p-4 text-right">
          <Link
            href={`/meals/${slug}`}
            className="mt-4 inline-block rounded-lg bg-linear-to-r from-[#f9572a] to-[#ff9b05] px-4 py-2 font-bold text-white no-underline hover:from-[#fd4715] hover:to-[#f9b241] hover:shadow-[0_0_12px_rgba(242,100,18,0.8)]"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  )
}

export default MealItem
