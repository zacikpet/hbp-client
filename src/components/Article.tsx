import React, { FC, useState } from 'react'
import { Paper } from 'api/papers'
import Latex from 'react-latex'
import { Link } from 'react-router-dom'
import StageInfoCard from './StageInfoCard'

type ArticleProps = {
  paper: Paper
  onSelect: () => void
}

const Article: FC<ArticleProps> = ({ paper, onSelect }) => {
  const [collapsed, setCollapsed] = useState(true)

  const abstract = collapsed ? paper.abstract?.slice(0, 200) : paper.abstract

  return (
    <div className="w-full px-10 pb-5 my-1 bg-white dark:hover:bg-gray-850 dark:border-gray-700 shadow-md rounded">
      <div className="flex pt-3 pb-1">
        <div className="article-info-card bg-blue-900">{paper.experiment.toUpperCase()}</div>
        <StageInfoCard stage={paper.stage} />
      </div>
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
          <a onClick={() => setCollapsed(!collapsed)} className="font-sans cursor-pointer text-primary hover:underline">
            {collapsed ? 'See more' : 'Hide'}
          </a>
        </p>
      )}
      <div className="flex items-end justify-between">
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
  )
}

export default Article
