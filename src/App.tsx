import React, { FC } from 'react'
import { Route, Switch } from 'react-router'
// import Navbar from 'components/Navbar'
import HomeRoute from 'routes/HomeRoute'
// import ArticlesRoute from 'routes/ArticlesRoute'

const App: FC = () => (
  <div className="w-full h-screen bg-white font-bold">
    {/*<Navbar />*/}
    <Switch>
      {/*
      <Route exact path="/articles">
        <ArticlesRoute experiment="cms" />
      </Route>
      */}
      <Route path="/">
        <HomeRoute />
      </Route>
    </Switch>
  </div>
)

export default App
