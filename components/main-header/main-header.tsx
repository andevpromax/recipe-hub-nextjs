'use client'

import Link from 'next/link'
import logoImg from '@/assets/logo.png'
import Image from 'next/image'
import MainHeaderBackground from './main-header-background'
import NavLink from '@/components/main-header/nav-link'
import { Suspense } from 'react'

function MainHeader() {
  return (
    <>
      <MainHeaderBackground />
      <header className="flex items-center justify-between px-4 py-8 md:px-[10%]">
        <Link
          href="/"
          className="flex items-center justify-center gap-8 no-underline text-[#ddd6cb] font-bold uppercase text-2xl tracking-[0.15rem] font-['Montserrat']"
        >
          <Image
            priority
            src={logoImg}
            alt="A plate with food on it"
            className="w-20 h-20 object-contain filter-[drop-shadow(0_0_0.75rem_rgba(0,0,0,0.5))]"
          />
          NextLevel Food
        </Link>

        <Suspense fallback={null}>
          <nav>
            <ul className="m-0 flex list-none gap-6 p-0 text-xl">
              <li>
                <NavLink href="/meals">Browse Meals</NavLink>
              </li>
              <li>
                <NavLink href="/community"> Foodies Community</NavLink>
              </li>
            </ul>
          </nav>
        </Suspense>
      </header>
    </>
  )
}

export default MainHeader
