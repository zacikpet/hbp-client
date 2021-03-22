import React, { FC, useEffect, useState } from 'react'
import { getStats, Stats } from '../api/stats'
import useAuth from '../hooks/useAuth'
import { Redirect } from 'react-router-dom'
import { getCurrentUser, User } from '../api/auth'
import useAuthActions from '../hooks/useAuthActions'

const AdminRoute: FC = () => {
  const [stats, setStats] = useState<Stats>()
  const auth = useAuth()
  const actions = useAuthActions()
  const [user, setUser] = useState<User>()

  useEffect(() => {
    getCurrentUser().then(setUser)
  }, [])

  if (!auth?.loggedIn) return <Redirect to="/home" />

  return (
    <div className="min-h-page flex flex-col px-12">
      <button className="btn" onClick={() => actions?.onLogout()}>
        Sign out
      </button>
      {user?.email}
      <div className="my-4 text-center">
        <h1 className="text-emphasis text-xl">Administration</h1>
      </div>
      <h2>Updates history</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {stats?.updates.map(update => (
            <tr key={update.date}>
              <td>{new Date(update.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminRoute
