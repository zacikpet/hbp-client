import React, { FC } from 'react'
import { Paper } from 'api/papers'

type ArticleProps = {
  paper: Paper
}

const Article: FC<ArticleProps> = ({ paper }) => (
  <a href={paper.files[0]} target="_blank">
    <div className="w-full px-10 py-5 border-t cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-850 dark:border-gray-700">
      <h1 className="font-bold text-emphasis">
        {paper.experiment.toUpperCase()}: {paper.title}
      </h1>
      <p className="font-serif">{paper.abstract}</p>
      <p className="text-disabled italic font-light">{new Date(paper.date).toDateString()}</p>
    </div>
  </a>
)

export default Article
