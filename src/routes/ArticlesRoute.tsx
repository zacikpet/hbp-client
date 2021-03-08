import React, { FC, useContext, useEffect, useState } from 'react'
import { getPapers, Paper } from 'api/papers'
import Article from 'components/Article'
import ArticleFilters, { FilterOptions } from 'components/ArticleFilters'
import Loader from 'react-loader-spinner'
import { DarkModeContext } from 'App'

const ArticlesRoute: FC = () => {
  const [papers, setPapers] = useState<Paper[]>([])

  const darkMode = useContext(DarkModeContext)

  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    types: ['paper'],
    experiments: ['atlas', 'cms'],
    luminosity: [0, 0],
    energy: [0, 0],
    anyLuminosity: true,
    anyEnergy: true,
    anyDecay: true,
    decay: {
      products: [],
    },
  })

  const [loading, setLoading] = useState(true)

  function match(min: number, max: number, options: number[]) {
    for (const option of options) {
      if (min <= option && option <= max) return true
    }
    return false
  }

  function decay_match(options: string[], present: string[]) {
    const optionsSet = new Set(options)
    const presentSet = new Set(present)

    const intersection = new Set([...optionsSet].filter(x => presentSet.has(x)))
    return intersection.size > 0
  }

  const selectedPapers = papers.filter(
    paper =>
      filterOptions.experiments.includes(paper.experiment) &&
      filterOptions.types.includes(paper.type) &&
      (filterOptions.anyEnergy || match(filterOptions.luminosity[0], filterOptions.luminosity[1], paper.luminosity)) &&
      (filterOptions.anyLuminosity || match(filterOptions.energy[0], filterOptions.energy[1], paper.energy)) &&
      (filterOptions.anyDecay || decay_match(paper.particles.product, filterOptions.decay.products))
  )

  useEffect(() => {
    getPapers().then(papers => {
      setPapers(papers)
      setLoading(false)
    })
  }, [])

  if (loading)
    return (
      <div className="h-page flex justify-center items-center opacity-70">
        <Loader type="TailSpin" color={darkMode ? 'white' : 'black'} height={75} width={75} />
      </div>
    )

  return (
    <div className="flex flex-col md:flex-row w-full">
      <div className="md:sticky top-16 left-0 md:h-page flex-shrink-0 w-full md:w-1/4">
        <ArticleFilters onChange={setFilterOptions} initial={filterOptions} papers={papers} />
      </div>
      <div className="flex flex-col items-center w-full">
        Displaying {selectedPapers.length} articles
        {selectedPapers.slice(0, 20).map((paper, i) => (
          <Article key={paper.title + i} paper={paper} />
        ))}
      </div>
    </div>
  )
}

export default ArticlesRoute
