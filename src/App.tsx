import React, { FC, useCallback, useEffect, useState } from 'react'
import { Route, Switch } from 'react-router'
import Navbar from 'components/Navbar'
import HomeRoute from 'routes/HomeRoute'
import ArticlesRoute from 'routes/ArticlesRoute'
import FeedbackRoute from 'routes/FeedbackRoute'
import AboutRoute from 'routes/AboutRoute'
import HistoryRoute from 'routes/HistoryRoute'
import AdminRoute from 'routes/AdminRoute'
import Footer from './components/Footer'
import LoginRoute from './routes/LoginRoute'
import { logout, User, verifyAuth } from './api/auth'
import SessionExpiredRoute from './routes/SessionExpiredRoute'

export const DarkModeContext = React.createContext(false)

export type AuthContextType = {
  loggedIn: boolean
  user: User | null
}

export const AuthContext = React.createContext<AuthContextType>({ loggedIn: false, user: null })

const App: FC = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const darkModeString = localStorage.getItem('darkMode')

    if (darkModeString) return JSON.parse(darkModeString)
    else return false
  })

  function handleChangeDarkMode(dark: boolean) {
    setDarkMode(dark)
    localStorage.setItem('darkMode', JSON.stringify(dark))
  }

  const handleLogout = useCallback(() => {
    logout().then(() => setAuth({ user: null, loggedIn: false }))
  }, [])

  const [auth, setAuth] = useState<AuthContextType>({
    loggedIn: false,
    user: null,
  })

  useEffect(() => {
    verifyAuth().then(result => {
      setAuth({
        loggedIn: result.logged_in,
        user: result.user,
      })
    })
  }, [])

  return (
    <div className={`w-full ${darkMode && 'dark'}`}>
      <div className="bg-gradient-to-b from-gray-50 to-gray-100 dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-900 text-emphasis-none">
        <DarkModeContext.Provider value={darkMode}>
          <AuthContext.Provider value={auth}>
            <Navbar onChangeDarkMode={handleChangeDarkMode} />
            <main className="mx-auto max-w-screen-2xl">
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
                  <LoginRoute setAuth={setAuth} />
                </Route>
                <Route exact path="/admin">
                  <AdminRoute onLogout={handleLogout} />
                </Route>
                <Route exact path="/expired">
                  <SessionExpiredRoute onLogout={handleLogout} />
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
