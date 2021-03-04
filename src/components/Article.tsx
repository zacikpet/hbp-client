import React, { FC } from 'react'
import { Paper } from 'api/papers'

type ArticleProps = {
  paper: Paper
}

const Article: FC<ArticleProps> = ({ paper }) => (
  <div className="w-full px-10 py-5 border-t cursor-pointer hover:bg-gray-50">
    <h1 className="font-bold">{paper.title}</h1>
    <p className="tex-gray-700 font-serif">{paper.abstract.slice(0, 250) + ' ...'}</p>
    <a>More</a>
    <p className="italic font-light">{new Date(paper.date).toDateString()}</p>
  </div>
)

export default Article
