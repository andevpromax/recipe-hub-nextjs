import Image from 'next/image'

import mealIcon from '@/assets/icons/meal.png'
import communityIcon from '@/assets/icons/community.png'
import eventsIcon from '@/assets/icons/events.png'

export default function CommunityPage() {
  return (
    <>
      <header className="mx-auto mt-12 mb-20 w-[90%] max-w-300 text-center text-2xl text-[#ddd6cb]">
        <h1 className="font-['Montserrat']">
          One shared passion:{' '}
          <span className="bg-linear-to-r from-[#f9572a] to-[#ff8a05] bg-clip-text text-transparent">
            Food
          </span>
        </h1>

        <p>Join our community and share your favorite recipes!</p>
      </header>

      <main className="mx-auto w-[90%] max-w-160 text-center">
        <h2 className="mb-12 font-['Montserrat'] text-[2rem] text-[#ddd6cb]">Community Perks</h2>

        <ul className="my-12 list-none p-0">
          <li className="flex flex-col items-center gap-8">
            <Image src={mealIcon} alt="A delicious meal" className="h-32 w-32 object-contain" />

            <p className="m-0 font-['Montserrat'] text-2xl font-bold text-[#ddd6cb]">
              Share & discover recipes
            </p>
          </li>

          <li className="flex flex-col items-center gap-8">
            <Image
              src={communityIcon}
              alt="A crowd of people, cooking"
              className="h-32 w-32 object-contain"
            />

            <p className="m-0 font-['Montserrat'] text-2xl font-bold text-[#ddd6cb]">
              Find new friends & like-minded people
            </p>
          </li>

          <li className="flex flex-col items-center gap-8">
            <Image
              src={eventsIcon}
              alt="A crowd of people at a cooking event"
              className="h-32 w-32 object-contain"
            />

            <p className="m-0 font-['Montserrat'] text-2xl font-bold text-[#ddd6cb]">
              Participate in exclusive events
            </p>
          </li>
        </ul>
      </main>
    </>
  )
}
