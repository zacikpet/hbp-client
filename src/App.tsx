import React, { FC, useState } from 'react'
import { Route, Switch } from 'react-router'
import Navbar from 'components/Navbar'
import HomeRoute from 'routes/HomeRoute'
import ArticlesRoute from 'routes/ArticlesRoute'
import FeedbackRoute from 'routes/FeedbackRoute'
import AboutRoute from 'routes/AboutRoute'
import HistoryRoute from 'routes/HistoryRoute'
import AdminRoute from 'routes/AdminRoute'
import Footer from './components/Footer'
import AdminNavbar from './components/AdminNavbar'
import LoginRoute from './routes/LoginRoute'

export const DarkModeContext = React.createContext(false)
export const AuthContext = React.createContext(false)

const App: FC = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const darkModeString = localStorage.getItem('darkMode')

    if (darkModeString) return JSON.parse(darkModeString)
    else return false
  })

  const [auth, setAuth] = useState(false)

  const handleChangeDarkMode = (dark: boolean) => {
    setDarkMode(dark)
    localStorage.setItem('darkMode', JSON.stringify(dark))
  }

  return (
    <div className={`w-full ${darkMode && 'dark'}`}>
      <div className="bg-light dark:bg-dark text-emphasis-none">
        <DarkModeContext.Provider value={darkMode}>
          <AuthContext.Provider value={auth}>
            {auth && <AdminNavbar />}
            <Navbar onChangeDarkMode={handleChangeDarkMode} />
            <main style={{ marginTop: auth ? 96 : 64 }}>
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
                <Route exact path="/login">
                  <LoginRoute />
                </Route>
                <Route exact path="/admin">
                  <AdminRoute />
                </Route>
                <Route path="/">
                  <HomeRoute />
                </Route>
              </Switch>
            </main>
            <Footer />
          </AuthContext.Provider>
        </DarkModeContext.Provider>
      </div>
    </div>
  )
}

export default App
