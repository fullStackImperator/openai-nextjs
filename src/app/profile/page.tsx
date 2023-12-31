'use client'
import { profileAtom } from '@/atoms/profileAtom'
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import Link from 'next/link'
import { useRecoilState } from 'recoil'

export default withPageAuthRequired(function Profile() {
  const [profile, setProfile] = useRecoilState(profileAtom)
  function addCredits() {
    setProfile((profile) => ({ ...profile, credits: profile.credits + 5 }))
  }
  return (
    <section className="w-full flex- flex-col items-center">
      <section className="w-[95%] max-w-4xl flex flex-col gap-4">
        <h1 className="text-4xl font-bold text-center mt-4 text-indigo-600">
          Profile
        </h1>
        <h2 className="text-2xl font-bold text-center text-gray-800">
          You have {profile.credits} credits
        </h2>
        <button
          className="mx-auto bg-indigo-600 text-white px-4 py-2 rounded-md font-bold text-xl"
          onClick={addCredits}
        >
          Buy more credits
        </button>
      </section>
    </section>
  )
})
