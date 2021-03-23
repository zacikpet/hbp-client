import React, { FC, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import useAuth from '../hooks/useAuth'
import { Redirect } from 'react-router-dom'
import { login, signup } from '../api/auth'
import { AuthContextType } from '../App'

type Page = 'login' | 'signup'

type LoginRouteProps = {
  setAuth: React.Dispatch<AuthContextType>
}

const LoginRoute: FC<LoginRouteProps> = ({ setAuth }) => {
  const auth = useAuth()

  const [page, setPage] = useState<Page>('login')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [verify, setVerify] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')

  const [error, setError] = useState<string | null>(null)

  function handleLogin(e?: React.FormEvent<HTMLFormElement>) {
    e?.preventDefault()
    e?.stopPropagation()
    login(email, password).then(result => setAuth({ user: result.user, loggedIn: true }))
  }

  function handleSignup(e?: React.FormEvent<HTMLFormElement>) {
    e?.preventDefault()
    e?.stopPropagation()
    signup(email, password, firstname, lastname)
      .then(() => handleLogin())
      .catch(() => setError('Failed to create account'))
  }

  if (auth?.loggedIn) return <Redirect to="/admin" />

  return (
    <div className="min-h-page flex justify-center items-center">
      <div className="bg-gray-50 dark:bg-gray-850 shadow-xl p-8 flex flex-col rounded">
        {error}
        <CSSTransition in={page === 'login'} timeout={300} classNames="page">
          <div className={page === 'login' ? '' : 'hidden'}>
            <h1 className="my-2 text-emphasis text-lg font-semibold">Administrator login</h1>
            <form className="flex flex-col w-72" onSubmit={handleLogin}>
              <label>E-mail</label>
              <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                type="text"
                placeholder="email"
                className="input mb-2"
              />
              <label>Password</label>
              <input
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
                placeholder="•••••••••"
                className="input mb-2"
              />
              <div className="flex justify-between p-2 text-primary">
                <a onClick={() => setPage('signup')} className="cursor-pointer hover:underline">
                  Request an account
                </a>
                <input type="submit" className="btn" value="Log in" />
              </div>
            </form>
          </div>
        </CSSTransition>
        <CSSTransition in={page === 'signup'} timeout={300} classNames="page">
          <div className={page === 'signup' ? '' : 'hidden'}>
            <h1 className="my-2 text-emphasis text-lg font-semibold">Request an administrator account</h1>
            <form className="flex flex-col w-72" onSubmit={handleSignup}>
              <label>First name</label>
              <input
                value={firstname}
                onChange={e => setFirstname(e.target.value)}
                name="firstname"
                type="text"
                placeholder="First name"
                className="input mb-2"
              />
              <label>Last name</label>
              <input
                value={lastname}
                onChange={e => setLastname(e.target.value)}
                name="lastname"
                type="text"
                placeholder="Last name"
                className="input mb-2"
              />

              <label>E-mail</label>
              <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                name="email"
                type="text"
                placeholder="email"
                className="input mb-2"
              />
              <label>Password</label>
              <input
                value={password}
                onChange={e => setPassword(e.target.value)}
                name="password"
                type="password"
                placeholder="•••••••••"
                className="input mb-2"
              />
              <label>Verify password</label>
              <input
                value={verify}
                onChange={e => setVerify(e.target.value)}
                name="verify"
                type="password"
                placeholder="•••••••••"
                className="input mb-2"
              />

              <div className="flex justify-between p-2 text-primary">
                <a onClick={() => setPage('login')} className="cursor-pointer hover:underline">
                  Log in instead
                </a>
                <input type="submit" className="btn" value="Submit" />
              </div>
            </form>
          </div>
        </CSSTransition>
      </div>
    </div>
  )
}

export default LoginRoute
