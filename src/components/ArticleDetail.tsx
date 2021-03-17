import React, { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPaper, Paper, patchPaper } from '../api/papers'
import Latex from 'react-latex'
import Loader from 'react-loader-spinner'
import useDarkMode from '../hooks/useDarkMode'
import useRedirect from '../hooks/useRedirect'

type ArticleDetailProps = {
  paper?: Paper
}

const ArticleDetail: FC<ArticleDetailProps> = ({ paper }) => {
  const { id } = useParams<{ id: string }>()
  const darkMode = useDarkMode()

  const [article, setArticle] = useState<Paper | undefined>(paper)
  const [patching, setPatching] = useState(false)
  const [lowerLimit, setLowerLimit] = useState(0)
  const { toArticles } = useRedirect()

  useEffect(() => {
    if (!article) getPaper(id).then(setArticle)
  }, [article, id])

  function patchLowerLimit() {
    setPatching(true)
    patchPaper(id, { lower_limit: lowerLimit }).then(() =>
      getPaper(id).then(paper => {
        setArticle(paper)
        setPatching(false)
      })
    )
  }

  return (
    <div className="h-page w-full p-16 bg-gray-50">
      <button className="btn" onClick={toArticles}>
        Back to all articles
      </button>
      <h1 className="text-xl font-bold text-emphasis">
        <Latex>{article?.title}</Latex>
      </h1>
      <br />
      {article?.abstract && (
        <p className="font-serif">
          <Latex>{article.abstract}</Latex>
        </p>
      )}
      <br />
      {article?.lower_limit ? <h2>Current lower limit: {article.lower_limit}</h2> : <h2>No lower limit set</h2>}
      <input value={lowerLimit} onChange={e => setLowerLimit(parseInt(e.target.value))} type="number" />
      <button className="btn ml-2" onClick={patchLowerLimit}>
        Update
      </button>
      {patching && <Loader type="TailSpin" color={darkMode ? 'white' : 'black'} height={75} width={75} />}
    </div>
  )
}

export default ArticleDetail
