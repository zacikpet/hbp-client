import React, { FC, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getPaper, Paper, patchPaper } from '../api/papers'
import Latex from 'react-latex'
import Loader from 'react-loader-spinner'
import useDarkMode from '../hooks/useDarkMode'

type ArticleDetailProps = {
  selectedPaper?: Paper
  onBack?: () => void
  onFetch?: (paper: Paper) => void
}

const ArticleDetail: FC<ArticleDetailProps> = ({ selectedPaper, onBack, onFetch }) => {
  const { id } = useParams<{ id: string }>()
  const darkMode = useDarkMode()

  const [fetchedPaper, setFetchedPaper] = useState<Paper>()
  const [patching, setPatching] = useState(false)

  const [lowerLimit, setLowerLimit] = useState(0)

  useEffect(() => {
    if (!selectedPaper && id)
      getPaper(id).then(paper => {
        setFetchedPaper(paper)
        onFetch && onFetch(paper)
      })
  }, [id, onFetch, selectedPaper])

  function patchLowerLimit() {
    setPatching(true)
    patchPaper(id, { lower_limit: lowerLimit }).then(() =>
      getPaper(id).then(paper => {
        setFetchedPaper(paper)
        setPatching(false)
        onFetch && onFetch(paper)
      })
    )
  }

  function handleClickBack() {
    setFetchedPaper(undefined)
    onBack && onBack()
  }

  const paper = fetchedPaper || selectedPaper

  return (
    <div className="min-h-page w-full p-8 md:px-32">
      <Link to="/articles" onClick={handleClickBack}>
        <button className="btn">Back to all articles</button>
      </Link>
      <div className="ml-auto mr-auto mt-8 max-w-3xl">
        <h1 className="text-xl font-bold text-emphasis">
          <Latex>{paper?.title}</Latex>
        </h1>
        <br />
        {paper?.abstract && (
          <p className="font-serif">
            <Latex>{paper.abstract}</Latex>
          </p>
        )}
        {paper && paper.files.length > 0 && (
          <a href={paper.files[0]} target="_blank" className="mr-2">
            <button className="btn">PDF</button>
          </a>
        )}
      </div>
      <br />
      {paper?.lower_limit ? <h2>Current lower limit: {paper.lower_limit}</h2> : <h2>No lower limit set</h2>}
      <input
        className="input"
        value={lowerLimit}
        onChange={e => setLowerLimit(parseFloat(e.target.value))}
        type="number"
        step="0.1"
      />
      <button className="btn ml-2" onClick={patchLowerLimit}>
        Update
      </button>
      {patching && <Loader type="TailSpin" color={darkMode ? 'white' : 'black'} height={75} width={75} />}
    </div>
  )
}

export default ArticleDetail
