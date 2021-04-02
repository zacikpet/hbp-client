import React, { FC, useEffect, useState } from 'react'
import ArticleFilters, { FilterOptions } from './ArticleFilters'
import Article from './Article'
import Paginate from 'react-paginate'
import { Paper } from '../api/papers'
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts'
import useDarkMode from '../hooks/useDarkMode'

const initial: FilterOptions = {
  searchString: '',
  stages: ['submitted', 'preliminary', 'published'],
  experiments: ['atlas', 'cms', 'aleph', 'delphi', 'l3', 'opal', 'cdf', 'd0'],
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
  anyProduction: true,
  productions: ['ggf', 'vbf', 'whzh', 'tth'],
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
  const darkMode = useDarkMode()
  const [filterOptions, setFilterOptions] = useState<FilterOptions>(initial)
  const [filteredPapers, setFilteredPapers] = useState<Paper[]>(papers)

  const [page, setPage] = useState(0)
  const [displayedPapers, setDisplayedPapers] = useState<Paper[]>(filteredPapers.slice(0, 10))

  const [papersPerYear, setPapersPerYear] = useState<{ year: number; count: number }[]>([])
  const [cumulativePerYear, setCumulativePerYear] = useState<{ year: number; count: number }[]>([])

  useEffect(() => {
    setPapersPerYear(
      Array(37)
        .fill(0)
        .map((_, i) => i + 1985)
        .map(year => ({
          year: year,
          count: filteredPapers.filter(paper => paper.date.getFullYear() === year).length,
        }))
    )
  }, [filteredPapers])

  useEffect(() => {
    setCumulativePerYear(
      Array(37)
        .fill(0)
        .map((_, i) => i + 1985)
        .map(year => ({
          year: year,
          count: filteredPapers.filter(paper => paper.date.getFullYear() <= year).length,
        }))
    )
  }, [filteredPapers])

  const handlePageChange = ({ selected }: { selected: number }) => setPage(selected)

  function match(min: number, max: number, options: number[]) {
    let result = false

    for (const option of options) {
      if (min <= option && option <= max) result = true
    }

    return result
  }

  function intersects(options: string[], present: string[]) {
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
          paper.title.toLowerCase().includes(filterOptions.searchString.toLowerCase()) &&
          filterOptions.experiments.includes(paper.experiment) &&
          filterOptions.stages.includes(paper.stage) &&
          (filterOptions.anyLuminosity ||
            match(filterOptions.luminosity[0], filterOptions.luminosity[1], paper.luminosity)) &&
          (filterOptions.anyEnergy || match(filterOptions.energy[0], filterOptions.energy[1], paper.energy)) &&
          (filterOptions.anyDecay || intersects(paper.particles.product, filterOptions.decay.products)) &&
          (filterOptions.anyProduction || intersects(paper.production, filterOptions.productions)) &&
          filterOptions.models.includes(paper.model) &&
          ((filterOptions.date[0] <= new Date(paper.date) && filterOptions.date[1] >= new Date(paper.date)) ||
            filterOptions.anyDate)
      )
    )
  }, [filterOptions, papers])

  useEffect(() => {
    setDisplayedPapers(filteredPapers.slice(page * 10, (page + 1) * 10))
  }, [filteredPapers, page])

  /**
   * Scroll automatically to previous position
   */
  useEffect(() => {
    state && scrollTo(state.x, state.y)
    state && setPage(state.page)
  }, [state])

  return (
    <div className="flex flex-col md:flex-row min-h-page dark:bg-gray-900 p-4">
      <ArticleFilters options={filterOptions} onChange={setFilterOptions} />
      <div className="flex flex-col items-center w-full md:px-5">
        {displayedPapers.map((paper, index) => (
          <Article key={paper._id + index.toString()} paper={paper} onSelect={() => onSelect(paper, page)} />
        ))}

        <div className="p-8">
          {filteredPapers.length > 10 && (
            <Paginate
              pageCount={Math.ceil(filteredPapers.length / 10)}
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
      <div className="pt-1">
        <div className="bg-white dark:bg-gray-850 rounded shadow ">
          <div className="py-4 font-semibold w-full px-4 bg-gray-100 dark:bg-gray-800 rounded-t">
            Displaying {filteredPapers.length} articles.
          </div>

          <div className="px-4 flex flex-col items-center">
            <h2 className="text-disabled mt-2 font-serif">Number of articles published per year</h2>
            <BarChart width={300} height={200} margin={{ right: -25 }} data={papersPerYear}>
              <YAxis dataKey="count" orientation="right" />
              <XAxis dataKey="year" domain={[1985, 2022]} type="number" scale="time" ticks={[1990, 2000, 2010, 2020]} />
              <Tooltip labelClassName="text-black" />
              <Bar dataKey="count" fill="#3B790F" />
              <CartesianGrid stroke={darkMode ? '#333' : '#DDD'} />
            </BarChart>

            <h2 className="text-disabled mt-2 font-serif">Cumulative article count over the years</h2>
            <BarChart width={300} height={200} margin={{ right: -25 }} data={cumulativePerYear}>
              <YAxis dataKey="count" orientation="right" />
              <XAxis dataKey="year" domain={[1985, 2022]} type="number" scale="time" ticks={[1990, 2000, 2010, 2020]} />
              <Tooltip labelClassName="text-black" />
              <Bar dataKey="count" fill="darkred" />
              <CartesianGrid stroke={darkMode ? '#333' : '#DDD'} />
            </BarChart>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArticlesBrowse
