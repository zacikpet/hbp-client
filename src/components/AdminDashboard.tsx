import React, { FC, useEffect, useState } from 'react'
import { getStats, Stats } from '../api/stats'
import useAuth from '../hooks/useAuth'

type AdminDashboardProps = {
  onLogout: () => void
}

const AdminDashboard: FC<AdminDashboardProps> = ({ onLogout }) => {
  const [stats, setStats] = useState<Stats>()
  const auth = useAuth()

  useEffect(() => {
    getStats().then(setStats)
  }, [])

  return (
    <div className="min-h-page flex flex-col p-12">
      <h2 className="text-emphasis text-xl">
        Logged in as &nbsp;
        {auth?.user?.firstname} &nbsp;
        {auth?.user?.lastname} &nbsp; ({auth?.user?.email})
      </h2>
      <br />
      <h2 className="text-emphasis text-xl">Total articles: {stats?.total_papers}</h2>
      <br />
      <h2 className="text-emphasis text-xl">Updates history</h2>
      <table>
        <tbody>
          {stats?.updates.map(update => (
            <tr key={update.date}>
              <td>{new Date(update.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <button className="btn w-20" onClick={onLogout}>
        Sign out
      </button>
    </div>
  )
}

export default AdminDashboard
