'use client'
import { useUser } from '@auth0/nextjs-auth0/client'
import Link from 'next/link'
import Image from 'next/image'
import { BiPen, BiCoin, BiLogOut } from 'react-icons/bi'
import { useRecoilValue } from 'recoil'
import { profileAtom } from '@/atoms/profileAtom'

export default function Navbar() {
  const profile = useRecoilValue(profileAtom)
  const { user } = useUser()

  // console.log(user)
  return (
    <nav className="w-full px-6 py-2 z-20 bg-white shadow-md grid grid-cols-3 ">
      {user ? (
        <div className="flex justify-start">
          <div className=" flex flex-col md:flex-row justify-start items-center md:gap-4">
            <div className="flex items-center  gap-1">
              <BiCoin />
              <span className="hidden md:block">Credits:</span> {profile.credits}
            </div>
            <Link
              href="/profile"
              className="text-xs md:text-xl font-bold text-gray-600 hover:text-indigo-600"
            >
              BUY MORE
            </Link>
          </div>
        </div>
      ) : (
        <div></div>
      )}
      <Link
        href="/"
        className="flex flex-row justify-center items-center gap-1 font-medium text-lg"
      >
        <BiPen></BiPen>Bloggify
      </Link>
      {user ? (
        <div className=" flex flex-row justify-end items-center gap-2">
          <Image
            className="rounded-full"
            src={user?.picture || ''}
            alt={user?.name || ''}
            width={24}
            height={24}
          />
          <span className="md:hidden font-semibold text-gray-600">Hi!</span>
          <span className="hidden md:block font-semibold text-gray-600">Hi, {user?.name}!</span>
          <Link
            href="/api/auth/logout"
            className="font-semibold text-gray-600 text-xl cursor-pointer hover:text-indigo-600"
          >
            <BiLogOut />
          </Link>
        </div>
      ) : (
        <div></div>
      )}
    </nav>
  )
}
