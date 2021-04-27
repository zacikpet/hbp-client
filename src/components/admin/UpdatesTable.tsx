import React, { FC, useEffect, useState } from 'react'
import { Update } from 'api/stats'

type UpdatesTableProps = {
  updates: Update[]
  loading: boolean
}

function getPage(list: Update[], page: number, count: number) {
  return list.slice(page * count, (page + 1) * count)
}

const UpdatesTable: FC<UpdatesTableProps> = ({ updates }) => {
  const [page, setPage] = useState(0)
  const [pages, setPages] = useState(Math.ceil(updates.length / 5))
  const [displayed, setDisplayed] = useState(getPage(updates, page, 5))

  useEffect(() => setPages(Math.ceil(updates.length / 5)), [updates])
  useEffect(() => setDisplayed(getPage(updates, page, 5)), [updates, page])

  function handleNextPage() {
    if (page === pages - 1) return

    setPage(current => current + 1)
  }

  function handlePreviousPage() {
    if (page === 0) return
    setPage(current => current - 1)
  }

  return (
    <>
      <div className="table-wrapper">
        <table className="w-full">
          <thead>
            <th>Date</th>
            <th>Time</th>
            <th>Trigger</th>
          </thead>
          <tbody>
            {displayed.map(update => (
              <tr key={update.date}>
                <td>{new Date(update.date).toLocaleDateString()}</td>
                <td>{new Date(update.date).toLocaleTimeString()}</td>
                <td>{update.trigger || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between">
        <button onClick={handlePreviousPage}>Previous</button>
        {page + 1} / {pages}
        <button onClick={handleNextPage}>Next</button>
      </div>
    </>
  )
}

export default UpdatesTable
