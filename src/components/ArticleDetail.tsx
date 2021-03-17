import React, { FC, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getPaper, Paper, patchPaper } from '../api/papers'
import Latex from 'react-latex'
import Loader from 'react-loader-spinner'
import useDarkMode from '../hooks/useDarkMode'

type ArticleDetailProps = {
  selectedPaper?: Paper
  onBack?: () => void
}

const ArticleDetail: FC<ArticleDetailProps> = ({ selectedPaper, onBack }) => {
  const { id } = useParams<{ id: string }>()
  const darkMode = useDarkMode()

  const [fetchedPaper, setFetchedPaper] = useState<Paper>()
  const [patching, setPatching] = useState(false)

  const [lowerLimit, setLowerLimit] = useState(0)

  useEffect(() => {
    if (!fetchedPaper) getPaper(id).then(setFetchedPaper)
  }, [fetchedPaper, id])

  function patchLowerLimit() {
    setPatching(true)
    patchPaper(id, { lower_limit: lowerLimit }).then(() =>
      getPaper(id).then(paper => {
        setFetchedPaper(paper)
        setPatching(false)
      })
    )
  }

  const paper = selectedPaper || fetchedPaper

  return (
    <div className="h-page w-full p-16 bg-gray-50">
      <Link to="/articles" onClick={onBack}>
        <button className="btn">Back to all articles</button>
      </Link>
      <h1 className="text-xl font-bold text-emphasis">
        <Latex>{paper?.title}</Latex>
      </h1>
      <br />
      {paper?.abstract && (
        <p className="font-serif">
          <Latex>{paper.abstract}</Latex>
        </p>
      )}
      <br />
      {paper?.lower_limit ? <h2>Current lower limit: {paper.lower_limit}</h2> : <h2>No lower limit set</h2>}
      <input value={lowerLimit} onChange={e => setLowerLimit(parseInt(e.target.value))} type="number" />
      <button className="btn ml-2" onClick={patchLowerLimit}>
        Update
      </button>
      {patching && <Loader type="TailSpin" color={darkMode ? 'white' : 'black'} height={75} width={75} />}
    </div>
  )
}

export default ArticleDetail
