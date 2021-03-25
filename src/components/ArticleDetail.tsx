import React, { FC, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'
import { getPaper, Paper, patchPaper } from '../api/papers'
import Latex from 'react-latex'
import Loader from 'react-loader-spinner'
import useDarkMode from '../hooks/useDarkMode'
import StageInfoCard from './StageInfoCard'
import useAuth from '../hooks/useAuth'
import ArticleEdit from './ArticleEdit'

type ArticleDetailProps = {
  selectedPaper?: Paper
  onFetch?: (paper: Paper) => void
}

const ArticleDetail: FC<ArticleDetailProps> = ({ selectedPaper, onFetch }) => {
  const { id } = useParams<{ id: string }>()
  const darkMode = useDarkMode()
  const auth = useAuth()
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
  }

  function handleEdit(edited: Paper) {
    console.log(edited)
  }

  const paper = fetchedPaper || selectedPaper

  return paper ? (
    <div className="min-h-page w-full p-8 md:px-32 bg-gray-50">
      <div className="relative max-w-3xl mx-auto">
        <div className="absolute -left-48 w-48 top-0">
          <Link to="/articles" onClick={handleClickBack}>
            <button className="btn bg-white">Back to all articles</button>
          </Link>
        </div>

        <ScrollLink
          duration={300}
          smooth
          className="absolute right-2 text-disabled cursor-pointer hover:underline"
          to="edit"
        >
          Edit
        </ScrollLink>

        <div className="bg-white p-8 rounded shadow-md my-1">
          <div className="flex py-1">
            <div className="article-info-card bg-blue-900">{paper.experiment.toUpperCase()}</div>
            <StageInfoCard stage={paper.stage} />
          </div>

          <h1 className="text-xl font-bold text-emphasis">
            <Latex>{paper?.title}</Latex>
          </h1>
          <br />
          {paper?.abstract && (
            <p className="font-serif">
              <Latex>{paper.abstract}</Latex>
            </p>
          )}
        </div>

        {paper.files.filter(file => !file.includes('Figure')).length > 0 && (
          <div className="bg-white p-8 rounded shadow-md my-1">
            <h1 className="text-emphasis font-semibold">Files</h1>
            {paper.files
              .filter(file => !file.includes('Figure'))
              .map(file => (
                <p key={file}>
                  <a target="_blank" className="text-blue-800 hover:underline" href={file}>
                    {file}
                  </a>
                </p>
              ))}
          </div>
        )}

        {paper.files.filter(file => file.includes('Figure')).length > 0 && (
          <div className="bg-white p-8 rounded shadow-md my-1">
            <h1 className="text-emphasis font-semibold">Figures</h1>
            {paper.files
              .filter(file => file.includes('Figure'))
              .map(figure => (
                <p key={figure}>
                  <a target="_blank" className="text-blue-800 hover:underline" href={figure}>
                    {figure}
                  </a>
                </p>
              ))}
          </div>
        )}

        <div id="edit" className="bg-white p-8 rounded shadow-md my-1">
          <h1 className="text-emphasis font-semibold">Edit</h1>
          {auth?.loggedIn && auth.user?.verified ? (
            <ArticleEdit paper={paper} onSave={handleEdit} />
          ) : (
            <div>
              <Link className="text-blue-800 underline" to="/login">
                Log in
              </Link>{' '}
              to your administrator account to edit.
            </div>
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
    </div>
  ) : (
    <></>
  )
}

export default ArticleDetail
