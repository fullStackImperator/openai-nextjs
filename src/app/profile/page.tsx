"use client"
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import Link from 'next/link'

export default withPageAuthRequired(
function Profile() {
  return (
    <main>
      <h1>Hello world!</h1>
      <p>this is the user page</p>
      <div>
      <Link href="/">Go to main page</Link>
      </div>
    </main>
  )
})
