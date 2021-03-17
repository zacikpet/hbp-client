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
          <CSSTransition in={match !== null} timeout={300} classNames="page" unmountOnExit>
            <ArticlesBrowse papers={papers} onSelectArticle={setSelectedArticle} />
          </CSSTransition>
        )}
      </Route>
      <Route exact path="/articles/:id">
        {({ match }) => (
          <CSSTransition in={match !== null} timeout={300} classNames="page" unmountOnExit>
            <ArticleDetail paper={selectedArticle} />
          </CSSTransition>
        )}
      </Route>
    </>
  )
}

export default ArticlesRoute
