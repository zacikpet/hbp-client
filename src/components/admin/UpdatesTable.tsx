import React, { FC } from 'react'
import { Update } from 'api/stats'

type UpdatesTableProps = {
  updates: Update[]
  loading: boolean
}

const UpdatesTable: FC<UpdatesTableProps> = ({ updates }) => {
  return (
    <div className="bg-white shadow dark:bg-gray-800 p-4 rounded">
      <h1 className="text-center text-emphasis font-semibold">Updates</h1>
      <table className="bg-gray-50 dark:bg-gray-900 w-full shadow-inner">
        <thead className="border">
          <th>Date</th>
          <th>Time</th>
          <th>Trigger</th>
        </thead>
        <tbody className="shadow-inner">
          {updates.map(update => (
            <tr className="border border-gray-200" key={update.date}>
              <td>{new Date(update.date).toLocaleDateString()}</td>
              <td>{new Date(update.date).toLocaleTimeString()}</td>
              <td>{update.trigger || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UpdatesTable
