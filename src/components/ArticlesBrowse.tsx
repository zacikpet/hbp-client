import React, { FC, useEffect, useState } from 'react'
import ArticleFilters, { FilterOptions } from './ArticleFilters'
import ArticleSearch from './ArticleSearch'
import Article from './Article'
import Paginate from 'react-paginate'
import { Paper } from '../api/papers'
import useAuth from '../hooks/useAuth'

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
  date: [new Date(Date.now() - 1000 * 60 * 60 * 24 * 365), new Date()], // last year
  anyDate: true,
}

export type State = {
  x: number
  y: number
  page: number
}

type ArticlesBrowseProps = {
  papers: Paper[]
  onSelect: (selected: Paper, page: number) => void
  state?: State
}

const ArticlesBrowse: FC<ArticlesBrowseProps> = ({ papers, onSelect, state }) => {
  const auth = useAuth()
  const [filterOptions, setFilterOptions] = useState<FilterOptions>(initial)
  const [filteredPapers, setFilteredPapers] = useState<Paper[]>(papers)

  const [searchString, setSearchString] = useState('')
  const [searchedPapers, setSearchedPapers] = useState<Paper[]>(filteredPapers)

  const [page, setPage] = useState(0)
  const [displayedPapers, setDisplayedPapers] = useState<Paper[]>(searchedPapers.slice(0, 10))

  const handlePageChange = ({ selected }: { selected: number }) => setPage(selected)

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

  /**
   * Scroll automatically to previous position
   */
  useEffect(() => {
    state && scrollTo(state.x, state.y)
    state && setPage(state.page)
  }, [state])

  return (
    <div className="flex flex-col md:flex-row min-h-page bg-gray-50 dark:bg-gray-900">
      <div className="md:sticky left-0 md:h-page flex-shrink-0" style={{ top: auth?.loggedIn ? 96 : 64 }}>
        <ArticleFilters options={filterOptions} onChange={setFilterOptions} />
      </div>
      <div className="flex flex-col items-center w-full px-5">
        <ArticleSearch
          value={searchString}
          onChange={setSearchString}
          placeHolder={'Search ' + filteredPapers.length + ' articles'}
        />

        {displayedPapers.map((paper, index) => (
          <Article key={paper._id + index.toString()} paper={paper} onSelect={() => onSelect(paper, page)} />
        ))}

        <div className="p-8">
          {searchedPapers.length > 10 && (
            <Paginate
              pageCount={Math.ceil(searchedPapers.length / 10)}
              pageRangeDisplayed={2}
              marginPagesDisplayed={3}
              containerClassName="flex items-center"
              nextLabel={<button className="btn mx-2">Next</button>}
              previousLabel={<button className="btn mx-2">Previous</button>}
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

export default ArticlesBrowse
