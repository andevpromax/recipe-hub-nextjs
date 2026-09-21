import Link from 'next/link'
import ImageSlideshow from '@/components/images/image-slideshow'

export default function Home() {
  return (
    <>
      <header className="flex gap-12 my-12 mx-auto w-[90%] max-w-300">
        <div className="w-160 h-100">
          <ImageSlideshow />
        </div>
        <div>
          <div className="text-2xl text-[#ddd6cb]">
            <h1 className="text-[2rem] font-bold font-['Montserrat'] tracking-[0.15rem] uppercase bg-linear-to-r from-[#f9572a] to-[#ffc905] bg-clip-text">
              NextLevel Food for NextLevel Foodies
            </h1>
            <p>Taste & share food from all over the world.</p>
          </div>
          <div className="text-2xl flex gap-4">
            <Link
              href="/community"
              className="mt-4 inline-block rounded-lg py-2 pr-4 font-normal text-[#ff9b05] no-underline hover:text-[#f9b241]"
            >
              Join the Community
            </Link>
            <Link
              href="/meals"
              className="inline-block mt-4 py-2 px-4 rounded-lg  bg-linear-to-r from-[#f9572a] to-[#ff9b05] text-white font-bold no-underline hover:from-[#fd4715] hover:to-[#f9b241]"
            >
              Explore Meals
            </Link>
          </div>
        </div>
      </header>
      <main>
        <section className="flex flex-col text-[#ddd6cb] text-2xl max-w-200 w-[90%] my-8 mx-auto text-center">
          <h2>How it works</h2>
          <p>
            NextLevel Food is a platform for foodies to share their favorite recipes with the world.
            It&apos;s a place to discover new dishes, and to connect with other food lovers.
          </p>
          <p>
            NextLevel Food is a place to discover new dishes, and to connect with other food lovers.
          </p>
        </section>

        <section className="flex flex-col text-[#ddd6cb] text-2xl max-w-200 w-[90%] my-8 mx-auto text-center">
          <h2>Why NextLevel Food?</h2>
          <p>
            NextLevel Food is a platform for foodies to share their favorite recipes with the world.
            It&apos;s a place to discover new dishes, and to connect with other food lovers.
          </p>
          <p>
            NextLevel Food is a place to discover new dishes, and to connect with other food lovers.
          </p>
        </section>
      </main>
    </>
    // <main>
    //   <h1 className="text-center text-white text-4xl font-bold">Time to get started!</h1>
    //   <p>
    //     <Link href="/community">Community Page</Link>
    //   </p>
    //   <p>
    //     <Link href="/meals">Meals Page</Link>
    //   </p>
    //   <p>
    //     <Link href="/meals/share">Share Meal Page</Link>
    //   </p>
    // </main>
  )
}
