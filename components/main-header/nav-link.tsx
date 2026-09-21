'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const path = usePathname()
  const isActive = path.startsWith(href)

  return (
    <Link
      href={href}
      className={`
        rounded-lg px-4 py-2 font-bold text-[#ddd6cb] no-underline
        hover:bg-linear-to-r
        hover:from-[#ff8a05]
        hover:to-[#f9b331]
        hover:bg-clip-text
        hover:text-transparent
        hover:[text-shadow:0_0_18px_rgba(248,190,42,0.8)] ${isActive ? 'bg-linear-to-r from-[#ff8a05] to-[#f9b331] bg-clip-text text-transparent' : ''}`}
    >
      {children}
    </Link>
  )
}

export default NavLink
