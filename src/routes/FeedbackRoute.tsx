import React, { FC, useState } from 'react'
import { postFeedback } from '../api/feedback'

const FeedbackRoute: FC = () => {
  const [description, setDescription] = useState('')
  const [articles, setArticles] = useState('')
  const [comments, setComments] = useState('')
  const [email, setEmail] = useState('')

  const [posted, setPosted] = useState(false)
  const [failed, setFailed] = useState(false)

  function sendFeedback(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const articleList = articles.split(/\r?\n/)

    postFeedback({ description, articles: articleList, comments, email })
      .then(() => setPosted(true))
      .catch(() => setFailed(true))
  }

  if (failed)
    return (
      <div className="min-h-page flex items-center justify-center text-3xl text-emphasis">Something went wrong.</div>
    )

  if (posted)
    return (
      <div className="min-h-page flex items-center justify-center text-3xl text-emphasis">
        Thank you for your feedback!
      </div>
    )

  return (
    <div className="min-h-page py-4">
      <div className="mx-auto w-full md:w-1/2 p-8 md:px-16 bg-white shadow rounded dark:bg-gray-850">
        <h1 className="text-emphasis font-semibold text-3xl">Is there something wrong?</h1>
        <form className="mt-8" onSubmit={sendFeedback}>
          <p className="text-lg">Please describe the problem in detail:</p>
          <textarea
            className="w-full input resize-none h-32"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <p className="text-lg mt-4">
            Is this related to some article(s)? If so, please provide their URLs, titles, or the IDs at the top of the
            article page.
          </p>
          <p className="text-disabled">If you include multiple articles, please put them on separate lines.</p>
          <textarea
            className="w-full input resize-none h-32 input"
            value={articles}
            onChange={e => setArticles(e.target.value)}
          />

          <p className="text-lg mt-4">Anything else? (Feature requests, comments, ...)</p>
          <textarea
            className="w-full input resize-none h-32 input"
            value={comments}
            onChange={e => setComments(e.target.value)}
          />

          <p className="text-lg mt-4">Your email:</p>
          <input type="text" className="input w-full" value={email} onChange={e => setEmail(e.target.value)} />

          <div className="mt-4">
            <button type="submit" className="btn">
              Send feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FeedbackRoute
