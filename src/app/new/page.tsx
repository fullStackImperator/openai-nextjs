'use client'
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import Link from 'next/link'
import { tones } from '@/data/tones'
import { useState } from 'react'
import { generatePost } from '@/lib/functions'
import { useRecoilState } from 'recoil'
import { FaSpinner, FaRegTired } from 'react-icons/fa'

export default withPageAuthRequired(function Page() {
  const [post, setPost] = useState<Post | null>(null)
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [postPrompt, setPostPrompt] = useState<PostPrompt>({
    title: '',
    description: '',
    keywords: '',
    tone: '',
  })
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // reset all the flags
    setHasSubmitted(false)
    setError(false)
    setSuccess(false)
    setIsWaitingForResponse(true)
    // console.log('postPrompt:', postPrompt)
    const res = await generatePost(postPrompt)
    await res
      .json()
      .then((data) => {
        setIsWaitingForResponse(false)
        setHasSubmitted(false)
        setSuccess(true)
        // console.log(data)
        setPost(data.post)
      })
      .catch((err) => {
        setIsWaitingForResponse(false)
        setHasSubmitted(false)
        setError(true)
      })
  }

  return (
    <section className="w-full flex flex-col items-center">
      <section className="w-[95%] max-w-4xl">
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-4 mt-4 items-center"
        >
          <h1 className="text-4xl font-bold text-center text-indigo-600">
            Generate new post
          </h1>

          <div className="w-full flex flex-col gap-2">
            <label
              htmlFor="title"
              className="text-gray-600 text-sm font-semibold"
            >
              Title (optional)
            </label>
            <input
              className="w-full border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              id="title"
              type="text"
              name="title"
              placeholder="Enter a title (e.g. 'How to make a blog post')"
              value={postPrompt.title}
              onChange={(e) =>
                setPostPrompt({ ...postPrompt, title: e.target.value })
              }
            />
          </div>

          <div className="w-full flex flex-col gap-2">
            <label
              htmlFor="description"
              className="text-gray-600 text-sm font-semibold"
            >
              Desription
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter a description"
              value={postPrompt.description}
              onChange={(e) =>
                setPostPrompt({ ...postPrompt, description: e.target.value })
              }
              className="w-full border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div className="w-full flex flex-col gap-2">
            <label
              htmlFor="keywords"
              className="text-gray-600 text-sm font-semibold"
            >
              Keywords
            </label>
            <input
              className="w-full border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              id="keywords"
              type="text"
              name="keywords"
              placeholder="Enter keywords (e.g. 'How to make a blog post')"
              value={postPrompt.keywords}
              onChange={(e) =>
                setPostPrompt({ ...postPrompt, keywords: e.target.value })
              }
            />
          </div>

          <div className="w-full flex flex-col gap-2">
            <label
              htmlFor="tone"
              className="text-gray-600 text-sm font-semibold"
            >
              Tone
            </label>
            <select
              name="tone"
              id="tone"
              value={postPrompt.tone}
              onChange={(e) =>
                setPostPrompt({ ...postPrompt, tone: e.target.value })
              }
              className="w-full border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              {tones.map((tone, index) => (
                <option key={index} value={tone.value}>
                  {tone.label}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-indigo-600 w-fit text-white px-4 py-2 rounded-md mt-4 hover:bg-indigo-500 transition-all cursor-pointer"
          >
            Submit
          </button>
        </form>
        {isWaitingForResponse && hasSubmitted && (
          <div className="w-full flex flex-col gap-4 mt-4 items-center">
            <FaSpinner className="animate-spin w-8 h-8 text-indigo-600" />
          </div>
        )}
        {error && (
          <div className="w-full flex flex-col gap-4 mt-4 items-center">
            <FaRegTired className="w-8 h-8 text-rose-600" />
            <p className="text-rose-600 text-center">
              Something went wrong. Please try again.
            </p>
          </div>
        )}
        {success && post && (
          <div className="w-full flex flex-col gap-4 mt-4">
            <h1 className="text-4xl font-bold text-gray-800 text-center">
              {post.title}
            </h1>
            {typeof post.content === "string" ? (
              <p className='text-gray-600'>{post.content}</p>
            ) : (
              <div className='flex flex-col gap-2'>
                {post.content.map((paragraph, index) => (
                  <p key={index} className='text-gray-600'>
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
          </div>
        )}
      </section>
    </section>
  )
})
