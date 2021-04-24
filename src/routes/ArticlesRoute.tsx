import './styles.css'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { Route, Switch, useHistory, useLocation } from 'react-router-dom'
import Loading from 'components/Loading'
import ArticleDetail from 'components/ArticleDetail'
import ArticlesBrowse, { State } from 'components/ArticlesBrowse'
import { getPapers, Paper } from 'api/papers'
import { FilterOptions } from 'components/ArticleFilters'

const initial: FilterOptions = {
  searchString: '',
  stages: ['submitted', 'preliminary', 'published'],
  experiments: ['atlas', 'cms', 'aleph', 'delphi', 'l3', 'opal', 'cdf', 'd0'],
  luminosity: [0, 139000],
  energy: [0, 14000000],
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

const ArticlesRoute: FC = () => {
  const [loading, setLoading] = useState(true)
  const [papers, setPapers] = useState<Paper[]>([])
  const [state, setState] = useState<State>()
  const [previousState, setPreviousState] = useState<State>()
  const [filterOptions, setFilterOptions] = useState<FilterOptions>(initial)

  const history = useHistory()
  const { pathname } = useLocation()

  const handleSelect = (article: Paper, page: number) => {
    setPreviousState({ x: window.pageXOffset, y: window.pageYOffset, page: page })
    scrollTo(0, 0)
  }

  useEffect(() => {
    if (pathname === '/articles') setState(previousState)
  }, [pathname, previousState])

  const handleFetch = useCallback((paper: Paper) => {
    setPapers(old => {
      const index = old.findIndex(p => p._id === paper._id)
      return [...old.slice(0, index), paper, ...old.slice(index + 1)]
    })
  }, [])

  useEffect(() => {
    getPapers().then(papers => {
      setPapers(papers)
      setLoading(false)
    })
  }, [])

  function handleEdit(edited: Paper) {
    setPapers(papers.map(paper => (paper._id === edited._id ? edited : paper)))
  }

  function handleNext(currentId: string) {
    const currentIndex = papers.findIndex(p => p._id === currentId)

    if (currentIndex === -1) return

    const nextIndex = currentIndex + 1

    if (nextIndex >= papers.length) return

    const nextId = papers[nextIndex]._id

    history.push(`/articles/${nextId}`)
  }

  function handlePrev(currentId: string) {
    const currentIndex = papers.findIndex(p => p._id === currentId)
    if (currentIndex === -1) return

    const prevIndex = currentIndex - 1

    if (prevIndex < 0) return

    const prevId = papers[prevIndex]._id

    history.push(`/articles/${prevId}`)
  }

  if (loading) return <Loading />

  return (
    <Switch>
      <Route exact path="/articles">
        <ArticlesBrowse
          papers={papers}
          onSelect={handleSelect}
          state={state}
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
        />
      </Route>
      <Route path="/articles/:id">
        <ArticleDetail onFetch={handleFetch} onEdit={handleEdit} onNext={handleNext} onPrev={handlePrev} />
      </Route>
    </Switch>
  )
}

export default ArticlesRoute
