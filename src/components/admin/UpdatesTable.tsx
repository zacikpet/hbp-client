import React, { FC, useEffect, useState } from 'react'
import { getStats, Stats, Update } from 'api/stats'
import TablePagination from 'components/TablePagination'
import TableLoading from 'components/TableLoading'

function getPage(list: Update[], page: number, count: number) {
  return list.slice(page * count, (page + 1) * count)
}

const UpdatesTable: FC = () => {
  const [stats, setStats] = useState<Stats>({ updates: [], total_papers: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getStats().then(s => {
      setStats(s)
      setLoading(false)
    })
  }, [])

  const [page, setPage] = useState(0)
  const [pages, setPages] = useState(Math.ceil(stats.updates.length / 5))
  const [displayed, setDisplayed] = useState(getPage(stats.updates, page, 5))

  useEffect(() => setPages(Math.ceil(stats.updates.length / 5)), [stats])
  useEffect(() => setDisplayed(getPage(stats.updates, page, 5)), [stats, page])

  function handleNextPage() {
    if (page === pages - 1) return

    setPage(current => current + 1)
  }

  function handlePreviousPage() {
    if (page === 0) return
    setPage(current => current - 1)
  }

  return (
    <div className="table-wrapper">
      <table className="w-full">
        <thead>
          <th>Date</th>
          <th>Time</th>
          <th>Trigger</th>
        </thead>
        <tbody>
          {loading ? (
            <TableLoading />
          ) : (
            displayed.map(update => (
              <tr key={update.date}>
                <td className="text-center">{new Date(update.date).toLocaleDateString()}</td>
                <td className="text-center">{new Date(update.date).toLocaleTimeString()}</td>
                <td className="text-center">{update.trigger || '-'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <TablePagination page={page} pages={pages} onNextPage={handleNextPage} onPreviousPage={handlePreviousPage} />
    </div>
  )
}

export default UpdatesTable
