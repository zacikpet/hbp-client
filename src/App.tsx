import React, { FC, useState } from 'react'
import { Route, Switch } from 'react-router'
import Navbar from 'components/Navbar'
import HomeRoute from 'routes/HomeRoute'
import ArticlesRoute from 'routes/ArticlesRoute'
import FeedbackRoute from 'routes/FeedbackRoute'
import AboutRoute from 'routes/AboutRoute'
import HistoryRoute from 'routes/HistoryRoute'

export const DarkModeContext = React.createContext(false)

const App: FC = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const darkModeString = localStorage.getItem('darkMode')

    if (darkModeString) return JSON.parse(darkModeString)
    else return false
  })

  const handleChangeDarkMode = (dark: boolean) => {
    setDarkMode(dark)
    localStorage.setItem('darkMode', JSON.stringify(dark))
  }

  return (
    <div className={`w-full ${darkMode && 'dark'}`}>
      <div className="bg-light dark:bg-dark text-emphasis-none">
        <DarkModeContext.Provider value={darkMode}>
          <Navbar onChangeDarkMode={handleChangeDarkMode} />
          <Switch>
            <Route path="/articles">
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
        </DarkModeContext.Provider>
      </div>
    </div>
  )
}

export default App
