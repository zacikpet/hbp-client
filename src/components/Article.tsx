import React, { FC } from 'react'
import { Paper } from 'api/papers'
import Button from './Button'

type ArticleProps = {
  paper: Paper
}

const Article: FC<ArticleProps> = ({ paper }) => (
  <div className="w-full md:w-4/5 p-2 bg-gray-300 m-2 flex">
    {paper.experiment}:{paper.title}
    <Button text="Details" className="ml-auto mr-0" />
  </div>
)

export default Article
