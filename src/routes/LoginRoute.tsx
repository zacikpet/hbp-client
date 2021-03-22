import React, { FC, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import useAuth from '../hooks/useAuth'
import { Redirect } from 'react-router-dom'
import useAuthActions from '../hooks/useAuthActions'

type Page = 'login' | 'signup'

const LoginRoute: FC = () => {
  const actions = useAuthActions()
  const auth = useAuth()

  const [page, setPage] = useState<Page>('login')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [verify, setVerify] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')

  function handleLogin() {
    actions?.onLogin(email, password)
  }

  if (auth?.loggedIn) return <Redirect to="/admin" />

  return (
    <div className="min-h-page flex justify-center items-center">
      <div className="bg-gray-50 dark:bg-gray-850 shadow-xl p-8 flex flex-col rounded">
        <CSSTransition in={page === 'login'} timeout={300} classNames="page">
          <div className={page === 'login' ? '' : 'hidden'}>
            <h1 className="m-2 text-emphasis text-lg font-semibold">Administrator login</h1>
            <form className="flex flex-col w-72">
              <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                type="text"
                placeholder="email"
                className="input m-2"
              />
              <input
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
                placeholder="password"
                className="input m-2"
              />
            </form>
            <div className="flex justify-between p-2 text-primary">
              <a onClick={() => setPage('signup')} className="cursor-pointer hover:underline">
                Request an account
              </a>
              <button className="btn" onClick={handleLogin}>
                Log in
              </button>
            </div>
          </div>
        </CSSTransition>
        <CSSTransition in={page === 'signup'} timeout={300} classNames="page">
          <div className={page === 'signup' ? '' : 'hidden'}>
            <h1 className="m-2 text-emphasis text-lg font-semibold">Request an administrator account</h1>
            <form className="flex flex-col w-72">
              <input name="firstname" type="text" placeholder="First name" className="input m-2" />
              <input name="lastname" type="text" placeholder="Last name" className="input m-2" />
              <input name="email" type="text" placeholder="email" className="input m-2" />
              <input name="password" type="password" placeholder="password" className="input m-2" />
              <input name="verify" type="password" placeholder="verify password" className="input m-2" />
            </form>
            <div className="flex justify-between p-2 text-primary">
              <a onClick={() => setPage('login')} className="cursor-pointer hover:underline">
                Log in instead
              </a>
              <button className="btn">Sign up</button>
            </div>
          </div>
        </CSSTransition>
      </div>
    </div>
  )
}

export default LoginRoute
