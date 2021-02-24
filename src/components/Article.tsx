import React, { FC } from 'react'
import { Paper } from 'api/papers'
import Button from './Button'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import MathJax from 'react-mathjax'

type ArticleProps = {
  paper: Paper
}

const Article: FC<ArticleProps> = ({ paper }) => (
  <div className="w-full md:w-4/5 p-2 bg-gray-300 m-2 flex">
    <MathJax.Provider>
      {paper.experiment}:<MathJax.Node formulat={paper.title} />
    </MathJax.Provider>
    <Button text="Details" className="ml-auto mr-0" />
  </div>
)

export default Article
