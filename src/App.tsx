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
import AdminNavbar from './components/AdminNavbar'
import LoginRoute from './routes/LoginRoute'
import { login, logout, verifyAuth } from './api/auth'
import { useHistory } from 'react-router-dom'
import SessionExpiredRoute from './routes/SessionExpiredRoute'

export const DarkModeContext = React.createContext(false)

export type AuthContextType = {
  loggedIn: boolean
  verified: boolean
}

export type AuthActionsType = {
  onLogin: (email: string, password: string) => void
  onLogout: () => void
}

export const AuthContext = React.createContext<AuthContextType | null>(null)
export const AuthActionsContext = React.createContext<AuthActionsType | null>(null)

const App: FC = () => {
  const history = useHistory()

  const [darkMode, setDarkMode] = useState(() => {
    const darkModeString = localStorage.getItem('darkMode')

    if (darkModeString) return JSON.parse(darkModeString)
    else return false
  })

  function handleChangeDarkMode(dark: boolean) {
    setDarkMode(dark)
    localStorage.setItem('darkMode', JSON.stringify(dark))
  }

  const handleLogin = useCallback(
    (email: string, password: string) => {
      login(email, password).then(() => {
        setAuth(old => ({
          ...old,
          loggedIn: true,
        }))
        history.push('/admin')
      })
    },
    [history]
  )

  const handleLogout = useCallback(() => {
    console.log('HANDLE LOGOUT')
    logout().then(() => {
      setAuth(old => ({ ...old, loggedIn: false }))
      history.push('/home')
    })
  }, [history])

  const [auth, setAuth] = useState<AuthContextType>({
    loggedIn: false,
    verified: false,
  })

  /*
  useEffect(() => {
    verifyAuth()
      .then(() => setAuth(old => ({ ...old, loggedIn: true })))
      .catch(() => setAuth(old => ({ ...old, loggedIn: false })))
  }, [])

   */
  return (
    <div className={`w-full ${darkMode && 'dark'}`}>
      <div className="bg-light dark:bg-dark text-emphasis-none">
        <DarkModeContext.Provider value={darkMode}>
          <AuthContext.Provider value={auth}>
            <AuthActionsContext.Provider value={{ onLogin: handleLogin, onLogout: handleLogout }}>
              {auth.loggedIn && <AdminNavbar auth={auth} />}
              <Navbar onChangeDarkMode={handleChangeDarkMode} />
              <main style={{ marginTop: auth?.loggedIn ? 96 : 64 }}>
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
                  <Route exact path="/expired">
                    <SessionExpiredRoute />
                  </Route>
                  <Route path="/">
                    <HomeRoute />
                  </Route>
                </Switch>
              </main>
              <Footer />
            </AuthActionsContext.Provider>
          </AuthContext.Provider>
        </DarkModeContext.Provider>
      </div>
    </div>
  )
}

export default App
