import React, { FC, useState } from 'react'
import { Paper } from 'api/papers'
import Latex from 'react-latex'
import { Link } from 'react-router-dom'
import StageInfoCard from './StageInfoCard'
import ModelInfoCard from './ModelInfoCard'

type ArticleProps = {
  paper: Paper
  onSelect: () => void
}

const Article: FC<ArticleProps> = ({ paper, onSelect }) => {
  const [collapsed, setCollapsed] = useState(true)

  const abstract = collapsed ? paper.abstract?.slice(0, 200) : paper.abstract

  return (
    <div className="w-full pb-5 my-1 bg-white hover:bg-gray-100 dark:bg-gray-850 dark:hover:bg-gray-800 shadow rounded">
      <div className="flex p-2 bg-gray-100 dark:bg-gray-800 rounded-t">
        <div className="article-info-card bg-blue-900">{paper.experiment.toUpperCase()}</div>
        <StageInfoCard stage={paper.stage} />
        <ModelInfoCard model={paper.model} className="ml-auto mr-0" />
      </div>
      <div className="w-full py-4 px-8">
        <Link to={`/articles/${paper._id}`} onClick={onSelect}>
          <h1 className="font-bold text-emphasis">
            <Latex>{paper.title}</Latex>
          </h1>
        </Link>
        {abstract && (
          <p className="font-serif">
            <Latex>{abstract}</Latex>
            {collapsed && <span>&#8230;</span>}
            &nbsp;&nbsp;
            <a
              onClick={() => setCollapsed(!collapsed)}
              className="font-sans cursor-pointer text-primary hover:underline"
            >
              {collapsed ? 'See more' : 'Hide'}
            </a>
          </p>
        )}
        <div className="flex items-end justify-between mt-4">
          <p className="text-disabled italic font-light">{new Date(paper.date).toDateString()}</p>
          <div className="flex">
            {paper.files.length > 0 && (
              <a href={paper.files[0]} target="_blank" className="mr-2">
                <button className="btn">PDF</button>
              </a>
            )}
            <Link to={`/articles/${paper._id}`} onClick={onSelect}>
              <button className="btn">Details</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Article
