import React, { FC, useEffect, useState } from 'react'
import { Experiment, getPapers, Paper } from 'api/papers'
import Article from 'components/Article'
import Button from 'components/Button'

type ArticlesRouteProps = {
  experiment?: Experiment
}

const ArticlesRoute: FC<ArticlesRouteProps> = ({ experiment }) => {
  const [papers, setPapers] = useState<Paper[]>([])

  const [experiments, setExperiments] = useState<Experiment[]>(experiment ? [experiment] : [])

  const selectedPapers = papers.filter(paper => experiments.includes(paper.experiment))

  useEffect(() => {
    getPapers().then(setPapers)
  }, [])

  const onClickExperiment = (experiment: Experiment) => {
    if (experiments.includes(experiment)) {
      setExperiments(experiments.filter(e => e != experiment))
    } else {
      setExperiments([...experiments, experiment])
    }
  }

  return (
    <div className="flex flex-col items-center w-full h-screen my-80">
      <div>
        <Button text="atlas" onClick={() => onClickExperiment('atlas')} />
        <Button text="cms" onClick={() => onClickExperiment('cms')} />
      </div>
      {selectedPapers.length + ' papers'}
      {selectedPapers.map((paper, i) => (
        <Article key={paper.title + i} paper={paper} />
      ))}
    </div>
  )
}

export default ArticlesRoute
