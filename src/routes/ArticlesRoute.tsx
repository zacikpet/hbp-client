import './styles.css'
import React, { FC, useEffect, useState } from 'react'
import { Route, useLocation } from 'react-router-dom'
import Loading from 'components/Loading'
import ArticleDetail from 'components/ArticleDetail'
import ArticlesBrowse, { State } from 'components/ArticlesBrowse'
import { getPapers, Paper } from 'api/papers'
import { CSSTransition } from 'react-transition-group'

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

  const handleFetch = (paper: Paper) => {
    const index = papers.findIndex(p => p._id === paper._id)

    setPapers([...papers.slice(0, index), paper, ...papers.slice(index + 1)])
  }

  useEffect(() => {
    getPapers().then(papers => {
      setPapers(papers)
      setLoading(false)
    })
  }, [])

  function handleEdit(edited: Paper) {
    setPapers(papers.map(paper => (paper._id === edited._id ? paper : edited)))
  }

  if (loading) return <Loading />

  return (
    <>
      <Route exact path="/articles">
        {({ match }) => (
          <CSSTransition in={match !== null} timeout={300} classNames="page">
            <div className={match ? 'visible' : 'hidden'}>
              <ArticlesBrowse papers={papers} onSelect={handleSelect} state={state} />
            </div>
          </CSSTransition>
        )}
      </Route>
      <Route exact path="/articles/:id">
        {({ match }) => (
          <CSSTransition in={match !== null} timeout={300} classNames="page">
            <div className={match ? 'visible' : 'hidden'}>
              <ArticleDetail selectedPaper={selectedArticle} onFetch={handleFetch} onEdit={handleEdit} />
            </div>
          </CSSTransition>
        )}
      </Route>
    </>
  )
}

export default ArticlesRoute
