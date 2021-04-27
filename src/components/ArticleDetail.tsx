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
import Card from './Card'

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
    <div className="min-h-page flex flex-col lg:flex-row p-2 justify-center gap-2">
      <div className="flex-shrink-0">
        <Card title="Actions" className="flex-shrink-0 flex flex-col gap-1">
          <Link to="/articles" className="w-full">
            <button className="btn w-full px-4">Back to all articles</button>
          </Link>
          <button className="btn w-full px-4" onClick={() => copyStringToClipboard(window.location.href)}>
            Copy article URL
          </button>
          <button className="btn w-full px-4" onClick={() => onNext(paper._id)}>
            Next article
          </button>
          <button className="btn w-full px-4" onClick={() => onPrev(paper._id)}>
            Previous article
          </button>
        </Card>
      </div>
      <div className="flex flex-col gap-2">
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
          <Card title="Files">
            {paper.files
              .filter(file => !file.includes('Figure'))
              .map(file => (
                <p key={file}>
                  <a target="_blank" className="text-sm tracking-wide text-blue-700 hover:underline" href={file}>
                    {file}
                  </a>
                </p>
              ))}
          </Card>
        )}

        {paper.files.filter(file => file.includes('Figure')).length > 0 && (
          <Card title="Figures">
            {paper.files
              .filter(file => file.includes('Figure'))
              .map(figure => (
                <p key={figure}>
                  <a target="_blank" className="text-blue-700 hover:underline" href={figure}>
                    {figure}
                  </a>
                </p>
              ))}
          </Card>
        )}

        <Card title="Edit">
          {auth?.loggedIn && auth.user?.verified ? (
            <ArticleEdit paper={paper} onEdit={onEdit} />
          ) : (
            <div>
              <Link className="text-sm tracking-wide text-blue-700 hover:underline" to="/login">
                Log in
              </Link>{' '}
              to your administrator account to edit.
            </div>
          )}
        </Card>
      </div>

      <div className="flex-shrink-0 max-w-xs flex flex-col gap-2">
        <Card title="Info" className="flex flex-col gap-1">
          <p className="text-sm text-disabled">
            ID: <span className="font-mono">{paper._id}</span>
          </p>

          <p className="text-sm tracking-wide">
            Published: <span className="uppercase font-semibold">{paper.date.toDateString()}</span>
          </p>
          {paper.superseded_id && (
            <Link
              className="text-sm tracking-wide hover:underline text-blue-700"
              to={`/articles/${paper.superseded_id}`}
            >
              This article has been superseded.
            </Link>
          )}
          {paper.supersedes_id && (
            <Link
              className="text-sm tracking-wide hover:underline text-blue-700"
              to={`/articles/${paper.supersedes_id}`}
            >
              Go to preliminary results.
            </Link>
          )}
          {paper.luminosity.length > 0 && (
            <p className="text-sm tracking-wide">
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
            <p className="text-sm tracking-wide">
              C. Energy:{' '}
              <b className="font-semibold">
                {paper.energy[0] > 1000000 ? paper.energy[0] / 1000000 : paper.energy[0] / 1000}
                {paper.energy[0] > 1000000 ? ' TeV' : ' GeV'}
              </b>
            </p>
          )}
          <div className="w-max">
            <InfoCard text={paper.model === 'sm' ? 'Standard Model' : 'Beyond the Standard Model'} />
          </div>
        </Card>

        {paper.production.length > 0 && (
          <Card title="Production modes" className="flex flex-col gap-1">
            {paper.production.map(production => (
              <div className="w-max">
                <InfoCard key={production} text={getProductionString(production)} />
              </div>
            ))}
          </Card>
        )}

        {paper.particles.product.length > 0 && (
          <Card title="Decay products">
            <div className="flex flex-wrap gap-1">
              {paper.particles.product.map(product => (
                <div
                  key={product}
                  className="p-2 uppercase tracking-wider text-xs font-semibold bg-primary rounded text-onprimary"
                >
                  {product}
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  ) : (
    <Loading />
  )
}

export default ArticleDetail
