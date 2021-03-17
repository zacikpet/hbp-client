import './styles.css'
import React, { FC, useEffect, useState } from 'react'
import { Route } from 'react-router-dom'
import Loading from 'components/Loading'
import ArticleDetail from 'components/ArticleDetail'
import ArticlesBrowse from 'components/ArticlesBrowse'
import { getPapers, Paper } from 'api/papers'
import { CSSTransition } from 'react-transition-group'

const ArticlesRoute: FC = () => {
  const [loading, setLoading] = useState(true)
  const [papers, setPapers] = useState<Paper[]>([])
  const [selectedArticle, setSelectedArticle] = useState<Paper>()

  const [scroll, setScroll] = useState<number>(0)
  const [previousScroll, setPreviousScroll] = useState<number>(0)

  const handleSelect = (article: Paper) => {
    setSelectedArticle(article)
    setPreviousScroll(window.pageYOffset)
  }

  const handleBack = () => setScroll(previousScroll)

  useEffect(() => {
    getPapers().then(papers => {
      setPapers(papers)
      setLoading(false)
    })
  }, [])

  if (loading) return <Loading />

  return (
    <>
      <Route exact path="/articles">
        {({ match }) => (
          <CSSTransition in={match !== null} timeout={300} classNames="page">
            <div className={match ? 'visible' : 'hidden'}>
              <ArticlesBrowse papers={papers} onSelect={handleSelect} scroll={scroll} />
            </div>
          </CSSTransition>
        )}
      </Route>
      <Route exact path="/articles/:id">
        {({ match }) => (
          <CSSTransition in={match !== null} timeout={300} classNames="page">
            <div className={match ? 'visible' : 'hidden'}>
              <ArticleDetail selectedPaper={selectedArticle} onBack={handleBack} />
            </div>
          </CSSTransition>
        )}
      </Route>
    </>
  )
}

export default ArticlesRoute
