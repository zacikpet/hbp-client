import React, { FC, useEffect, useState } from 'react'
import { getStats, Stats } from '../api/stats'

const AdminRoute: FC = () => {
  const [stats, setStats] = useState<Stats>()
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    getStats().then(setStats)
  }, [])

  return (
    <div className="min-h-page flex flex-col px-12">
      <div className="my-4 text-center">
        <h1 className="text-emphasis text-xl">Administration</h1>
      </div>
      <h2>Updates history</h2>
      <table>
        <th>
          <td>Date</td>
        </th>
        {stats?.updates.map(update => (
          <tr>
            <td>{new Date(update.date).toLocaleString()}</td>
          </tr>
        ))}
      </table>
    </div>
  )
}

export default AdminRoute
