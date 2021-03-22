import React, { FC, useState } from 'react'

type Page = 'login' | 'signup'

const LoginRoute: FC = () => {
  const [page, setPage] = useState<Page>('login')

  return (
    <div className="min-h-page flex justify-center items-center">
      <div className="bg-gray-100 shadow-xl p-8 flex flex-col">
        {page === 'login' && (
          <div>
            <h1 className="m-2">Log in</h1>
            <form className="flex flex-col w-72">
              <input type="text" placeholder="email" className="m-2" />
              <input type="password" placeholder="password" className="m-2" />
            </form>
            Sign up instead
            <button className="btn">Log in</button>
          </div>
        )}
        {page === 'signup' && (
          <div>
            <h1 className="m-2">Sign up</h1>
            <form className="flex flex-col w-72">
              <input type="text" placeholder="email" className="m-2" />
              <input type="password" placeholder="password" className="m-2" />
            </form>
            Log in instead
            <button className="btn">Sign up</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default LoginRoute
