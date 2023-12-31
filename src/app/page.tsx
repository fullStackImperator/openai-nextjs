'use client'
import Link from 'next/link'
import { useUser } from '@auth0/nextjs-auth0/client'

export default function Home() {
  const { user, error, isLoading } = useUser()
  return (
    <section className="w-full flex flex-col">
      {/* {user && <p>The user {user?.name} is logged in</p>} */}
      {user ? (
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="mt-4 text-4xl font-bold text-center text-indigo-600">
            Hi, {user?.nickname || user?.name || 'dear user'}!
          </h1>
          <h2>
            Welcome to Blogify, where you can easily create full blog posts with
            just one click.
          </h2>
          <Link
            href="/new"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500 transition-all"
          >
            Get Started
          </Link>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="mt-4 text-4xl font-bold text-center text-indigo-600">
            Hello!
          </h1>
          <h2>
            Welcome to Blogify, where you can easily create full blog posts with
            just one click.
          </h2>
          <Link
            href="/api/auth/login"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500 transition-all"
          >
            login
          </Link>
        </div>
      )}
    </section>
  )
}
