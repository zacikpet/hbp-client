import './styles.css'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { Route, useLocation } from 'react-router-dom'
import Loading from 'components/Loading'
import ArticleDetail from 'components/ArticleDetail'
import ArticlesBrowse, { State } from 'components/ArticlesBrowse'
import { getPapers, Paper } from 'api/papers'

const ArticlesRoute: FC = () => {
  const [loading, setLoading] = useState(true)
  const [papers, setPapers] = useState<Paper[]>([])
  const [selectedArticle, setSelectedArticle] = useState<Paper>()
  const [state, setState] = useState<State>()
  const [previousState, setPreviousState] = useState<State>()

  const { pathname } = useLocation()

  const handleSelect = (article: Paper, page: number) => {
    setSelectedArticle(article)
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

  if (loading) return <Loading />

  return (
    <>
      <Route exact path="/articles">
        <ArticlesBrowse papers={papers} onSelect={handleSelect} state={state} />
      </Route>
      <Route path="/articles/:id">
        <ArticleDetail selectedPaper={selectedArticle} onFetch={handleFetch} onEdit={handleEdit} />
      </Route>
    </>
  )
}

export default ArticlesRoute
