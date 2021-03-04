import React, { FC } from 'react'
import { Route, Switch } from 'react-router'
import Navbar from 'components/Navbar'
import HomeRoute from 'routes/HomeRoute'
import ArticlesRoute from 'routes/ArticlesRoute'
import FeedbackRoute from 'routes/FeedbackRoute'
import AboutRoute from 'routes/AboutRoute'
import HistoryRoute from 'routes/HistoryRoute'

const App: FC = () => (
  <div className="w-full bg-white">
    <Navbar />
    <Switch>
      <Route exact path="/articles">
        <ArticlesRoute />
      </Route>
      <Route exact path="/feedback">
        <FeedbackRoute />
      </Route>
      <Route exact path="/about">
        <AboutRoute />
      </Route>
      <Route exact path="/history">
        <HistoryRoute />
      </Route>
      <Route path="/">
        <HomeRoute />
      </Route>
    </Switch>
  </div>
)

export default App
