import React, { FC, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'
import { getPaper, Paper } from '../api/papers'
import Latex from 'react-latex'
import StageInfoCard from './StageInfoCard'
import useAuth from '../hooks/useAuth'
import ArticleEdit from './ArticleEdit'

type ArticleDetailProps = {
  selectedPaper?: Paper
  onFetch?: (paper: Paper) => void
  onEdit: (paper: Paper) => void
}

const ArticleDetail: FC<ArticleDetailProps> = ({ selectedPaper, onFetch, onEdit }) => {
  const { id } = useParams<{ id: string }>()
  const auth = useAuth()
  const [fetchedPaper, setFetchedPaper] = useState<Paper>()

  useEffect(() => {
    if (!selectedPaper && id)
      getPaper(id).then(paper => {
        setFetchedPaper(paper)
        onFetch && onFetch(paper)
      })
  }, [id, onFetch, selectedPaper])

  function handleClickBack() {
    setFetchedPaper(undefined)
  }

  const paper = fetchedPaper || selectedPaper

  return paper ? (
    <div className="min-h-page w-full p-8 md:px-32 bg-gray-50 dark:bg-gray-900">
      <div className="relative max-w-3xl mx-auto">
        <div className="absolute -left-48 w-48 top-0">
          <Link to="/articles" onClick={handleClickBack}>
            <button className="btn">Back to all articles</button>
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

        <div className="bg-white dark:bg-gray-850 p-8 rounded shadow-md my-1">
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
          <div className="bg-white dark:bg-gray-850 p-8 rounded shadow-md my-1">
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
          <div className="bg-white dark:bg-gray-850 p-8 rounded shadow-md my-1">
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

        <div id="edit" className="bg-white dark:bg-gray-850 p-8 rounded shadow-md my-1">
          <h1 className="text-emphasis font-semibold">Edit</h1>
          {auth?.loggedIn && auth.user?.verified ? (
            <ArticleEdit paper={paper} onEdit={onEdit} />
          ) : (
            <div>
              <Link className="text-blue-800 underline" to="/login">
                Log in
              </Link>{' '}
              to your administrator account to edit.
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <></>
  )
}

export default ArticleDetail
