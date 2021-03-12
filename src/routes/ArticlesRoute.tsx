import React, { FC, useContext, useEffect, useState } from 'react'
import { getPapers, Paper } from 'api/papers'
import Article from 'components/Article'
import ArticleFilters, { FilterOptions } from 'components/ArticleFilters'
import Loader from 'react-loader-spinner'
import Paginate from 'react-paginate'
import { DarkModeContext } from 'App'
import ArticleSearch from '../components/ArticleSearch'

const initial: FilterOptions = {
  stages: ['submitted', 'preliminary', 'published'],
  experiments: ['atlas', 'cms'],
  luminosity: [0, 0],
  energy: [0, 0],
  anyLuminosity: true,
  anyEnergy: true,
  anyDecay: true,
  decay: {
    products: [],
  },
  models: ['sm', 'bsm'],
  date: [new Date(Date.now() - 1000 * 60 * 60 * 24 * 365), new Date()],
  anyDate: true,
}

const ArticlesRoute: FC = () => {
  const darkMode = useContext(DarkModeContext)

  const [loading, setLoading] = useState(true)
  const [papers, setPapers] = useState<Paper[]>([])

  const [filterOptions, setFilterOptions] = useState<FilterOptions>(initial)
  const [filteredPapers, setFilteredPapers] = useState<Paper[]>(papers)

  const [searchString, setSearchString] = useState('')
  const [searchedPapers, setSearchedPapers] = useState<Paper[]>(filteredPapers)

  const [page, setPage] = useState(0)
  const [displayedPapers, setDisplayedPapers] = useState<Paper[]>(searchedPapers.slice(0, 10))

  function match(min: number, max: number, options: number[]) {
    let result = false

    for (const option of options) {
      if (min <= option && option <= max) result = true
    }

    return result
  }

  function decay_match(options: string[], present: string[]) {
    const optionsSet = new Set(options)
    const presentSet = new Set(present)

    const intersection = new Set([...optionsSet].filter(x => presentSet.has(x)))
    return intersection.size > 0
  }

  useEffect(() => {
    getPapers().then(papers => {
      setPapers(papers)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    setPage(0)
    setFilteredPapers(
      papers.filter(
        paper =>
          filterOptions.experiments.includes(paper.experiment) &&
          filterOptions.stages.includes(paper.stage) &&
          (filterOptions.anyLuminosity ||
            match(filterOptions.luminosity[0], filterOptions.luminosity[1], paper.luminosity)) &&
          (filterOptions.anyEnergy || match(filterOptions.energy[0], filterOptions.energy[1], paper.energy)) &&
          (filterOptions.anyDecay || decay_match(paper.particles.product, filterOptions.decay.products)) &&
          filterOptions.models.includes(paper.model) &&
          ((filterOptions.date[0] <= new Date(paper.date) && filterOptions.date[1] >= new Date(paper.date)) ||
            filterOptions.anyDate)
      )
    )
  }, [filterOptions, papers])

  useEffect(() => {
    setPage(0)
    setSearchedPapers(
      filteredPapers.filter(
        paper => searchString == '' || paper.title.toLowerCase().includes(searchString.toLowerCase())
      )
    )
  }, [filteredPapers, searchString])

  useEffect(() => {
    setDisplayedPapers(searchedPapers.slice(page * 10, (page + 1) * 10))
  }, [searchedPapers, page])

  const handlePageChange = ({ selected }: { selected: number }) => setPage(selected)

  if (loading)
    return (
      <div className="h-page flex justify-center items-center opacity-70">
        <Loader type="TailSpin" color={darkMode ? 'white' : 'black'} height={75} width={75} />
      </div>
    )

  return (
    <div className="flex flex-col md:flex-row w-full">
      <div className="md:sticky top-16 left-0 md:h-page flex-shrink-0 w-full md:w-1/4">
        <ArticleFilters options={filterOptions} onChange={setFilterOptions} />
      </div>
      <div className="flex flex-col items-center w-full px-5">
        <ArticleSearch
          value={searchString}
          onChange={setSearchString}
          placeHolder={'Search ' + filteredPapers.length + ' articles'}
        />

        {displayedPapers.map(paper => (
          <Article key={paper._id} paper={paper} />
        ))}

        <div className="p-8">
          {searchedPapers.length > 10 && (
            <Paginate
              pageCount={Math.ceil(searchedPapers.length / 10)}
              pageRangeDisplayed={2}
              marginPagesDisplayed={3}
              containerClassName="flex items-center"
              nextClassName="btn mx-2"
              previousClassName="btn mx-2"
              activeClassName="text-primary"
              pageClassName="cursor-pointer mx-2 hover:underline"
              onPageChange={handlePageChange}
              forcePage={page}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default ArticlesRoute
