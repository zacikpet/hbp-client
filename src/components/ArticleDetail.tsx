import React, { FC, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getPaper, Paper } from '../api/papers'
import Latex from 'react-latex'
import StageInfoCard from './StageInfoCard'
import useAuth from '../hooks/useAuth'
import ArticleEdit from './ArticleEdit'
import ModelInfoCard from './ModelInfoCard'
import InfoCard from './InfoCard'
import { getProductionString, copyStringToClipboard } from 'utils'
import Loading from './Loading'

type ArticleDetailProps = {
  onFetch?: (paper: Paper) => void
  onEdit: (paper: Paper) => void
  onNext: (currentId: string) => void
  onPrev: (currentId: string) => void
}

const ArticleDetail: FC<ArticleDetailProps> = ({ onFetch, onEdit, onNext, onPrev }) => {
  const { id } = useParams<{ id: string }>()
  const auth = useAuth()
  const [fetchedPaper, setFetchedPaper] = useState<Paper>()

  useEffect(() => {
    getPaper(id).then(paper => {
      setFetchedPaper(paper)
      // onFetch && onFetch(paper)
    })
  }, [id, onFetch])

  const paper = fetchedPaper

  return paper ? (
    <div className="min-h-page flex flex-col lg:flex-row p-2 justify-center">
      <div className="flex-shrink-0">
        <div className="bg-light dark:bg-gray-850 rounded shadow mb-2">
          <div className="px-4 py-2 rounded-t bg-gray-100 dark:bg-gray-800">
            <h1 className="uppercase tracking-wider text-xs font-semibold p-2">Actions</h1>
          </div>
          <div className="p-4 flex flex-col">
            <Link to="/articles" className="w-full">
              <button className="btn w-full px-4">Back to all articles</button>
            </Link>
            <div className="w-full mt-2">
              <button className="btn w-full px-4" onClick={() => copyStringToClipboard(window.location.href)}>
                Copy article URL
              </button>
            </div>
            <div className="w-full mt-2">
              <button className="btn w-full px-4" onClick={() => onNext(paper._id)}>
                Next article
              </button>
            </div>
            <div className="w-full mt-2">
              <button className="btn w-full px-4" onClick={() => onPrev(paper._id)}>
                Previous article
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:px-2">
        <div className="bg-white dark:bg-gray-850 rounded shadow-md">
          <div className="flex p-2 bg-gray-100 dark:bg-gray-800 rounded-t">
            <div className="article-info-card bg-blue-900">{paper.experiment.toUpperCase()}</div>
            <StageInfoCard stage={paper.stage} />
            <ModelInfoCard model={paper.model} className="ml-auto mr-0" />
          </div>
          <div className="px-8 py-6">
            <h1 className="text-xl font-semibold text-emphasis font-serif tracking-tight">
              <Latex>{paper.title}</Latex>
            </h1>
            {paper?.abstract && (
              <p className="font-serif mt-2 tracking-tight">
                <Latex>{paper.abstract}</Latex>
              </p>
            )}
          </div>
        </div>

        {paper.files.filter(file => !file.includes('Figure')).length > 0 && (
          <div className="bg-white dark:bg-gray-850 rounded shadow-md my-1">
            <div className="px-4 py-2 rounded-t bg-gray-100 dark:bg-gray-800">
              <h1 className="text-xs tracking-wider font-semibold uppercase p-2">Files</h1>
            </div>
            <div className="p-8">
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
          </div>
        )}

        {paper.files.filter(file => file.includes('Figure')).length > 0 && (
          <div className="bg-white dark:bg-gray-850 rounded shadow-md my-1">
            <div className="px-4 py-2 rounded-t bg-gray-100 dark:bg-gray-800">
              <h1 className="text-xs tracking-wider font-semibold uppercase p-2">Figures</h1>
            </div>
            <div className="p-8">
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
          </div>
        )}

        <div id="edit" className="bg-white dark:bg-gray-850 rounded shadow-md my-1">
          <div className="px-4 py-2 rounded-t bg-gray-100 dark:bg-gray-800">
            <h1 className="text-xs tracking-wider font-semibold uppercase p-2">Edit</h1>
          </div>
          <div className="p-8">
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
      <div className="flex-shrink-0 max-w-xs">
        <div className="bg-light dark:bg-gray-850 rounded shadow">
          <div className="px-4 py-2 rounded-t bg-gray-100 dark:bg-gray-800">
            <h1 className="text-xs tracking-wider font-semibold uppercase p-2">Info</h1>
          </div>
          <div className="p-4">
            <p className="text-disabled">ID: {paper._id}</p>

            <p>
              Published: <b className="font-semibold">{paper.date.toDateString()}</b>
            </p>
            {paper.superseded_id && (
              <Link className="hover:underline text-blue-900" to={`/articles/${paper.superseded_id}`}>
                This article has been superseded.
              </Link>
            )}
            {paper.supersedes_id && (
              <Link className="hover:underline text-blue-900" to={`/articles/${paper.supersedes_id}`}>
                Go to preliminary results.
              </Link>
            )}
            {paper.luminosity.length > 0 && (
              <p>
                Luminosity:{' '}
                {paper.luminosity.map((l, i) => (
                  <div key={i} className="font-semibold">
                    {l > 1000 ? l / 1000 : l}
                    {l > 1000 ? ' fb-1' : ' pb-1'}
                  </div>
                ))}
              </p>
            )}
            {paper.energy.length > 0 && (
              <p>
                C. Energy:{' '}
                <b className="font-semibold">
                  {paper.energy[0] > 1000000 ? paper.energy[0] / 1000000 : paper.energy[0] / 1000}
                  {paper.energy[0] > 1000000 ? ' TeV' : ' GeV'}
                </b>
              </p>
            )}
            <div className="mt-4">
              <InfoCard text={paper.model === 'sm' ? 'Standard Model' : 'Beyond the Standard Model'} />
              {paper.production.map(production => (
                <InfoCard key={production} text={getProductionString(production)} />
              ))}
            </div>
            {paper.particles.product.length > 0 && (
              <div className="mt-4">
                <h1>Decay products</h1>
                <div className="flex flex-wrap">
                  {paper.particles.product.map(product => (
                    <div
                      key={product}
                      className="p-2 uppercase text-xs font-semibold mr-1 mb-1 bg-primary rounded text-onprimary"
                    >
                      {product}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  )
}

export default ArticleDetail
