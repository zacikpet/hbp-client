import React, { FC, useEffect, useState } from 'react'
import { getPapers, Paper } from 'api/papers'
import Article from 'components/Article'
import ArticleFilter, { FilterOptions } from 'components/ArticleFilter'
import Loader from 'react-loader-spinner'

const ArticlesRoute: FC = () => {
  const [papers, setPapers] = useState<Paper[]>([])
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    types: ['paper'],
    experiments: ['atlas', 'cms'],
  })
  const [loading, setLoading] = useState(true)

  const selectedPapers = papers.filter(
    paper => filterOptions.experiments.includes(paper.experiment) && filterOptions.types.includes(paper.type)
  )

  useEffect(() => {
    getPapers().then(papers => {
      setPapers(papers)
      setLoading(false)
    })
  }, [])

  if (loading)
    return (
      <div className="w-screen h-page flex justify-center items-center">
        <Loader type="TailSpin" color="black" height={75} width={75} />
      </div>
    )

  return (
    <div className="flex flex-col md:flex-row w-full bg-white">
      <div className="md:sticky top-16 left-0 md:h-page flex-shrink-0 w-full md:w-1/4">
        <ArticleFilter onChange={setFilterOptions} initial={filterOptions} />
      </div>
      <div className="flex flex-col items-center w-full">
        Displaying {selectedPapers.length} articles
        {selectedPapers.slice(0, 10).map((paper, i) => (
          <Article key={paper.title + i} paper={paper} />
        ))}
      </div>
    </div>
  )
}

export default ArticlesRoute
