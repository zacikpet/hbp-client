import React, { FC } from 'react'
import { Route, Switch } from 'react-router'
import Navbar from 'components/Navbar'
import HomeRoute from 'routes/HomeRoute'
import ArticlesRoute from 'routes/ArticlesRoute'

const App: FC = () => (
  <div className={`w-full h-full bg-white flex flex-col justify-center items-center font-bold`}>
    <Navbar />
    <Switch>
      <Route exact path="/">
        <HomeRoute />
      </Route>
      <Route exact path="/articles">
        <ArticlesRoute experiment="cms" />
      </Route>
    </Switch>
  </div>
)

export default App
