import React, { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPaper, Paper } from '../api/papers'
import Loading from '../components/Loading'
import Latex from 'react-latex'

const ArticleRoute: FC = () => {
  const { id } = useParams<{ id: string }>()

  const [article, setArticle] = useState<Paper>()

  useEffect(() => {
    getPaper(id).then(setArticle)
  }, [id])

  if (!article) return <Loading />

  return (
    <div className="w-full p-16">
      <h1 className="text-xl font-bold text-emphasis">
        <Latex>{article.title}</Latex>
      </h1>
      <br />
      <p className="font-serif">
        <Latex>{article.abstract}</Latex>
      </p>
    </div>
  )
}

export default ArticleRoute
