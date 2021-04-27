import { declineAdmin, getAdminRequests, verifyAdmin } from 'api/admin'
import { User } from 'api/auth'
import TableLoading from 'components/TableLoading'
import TablePagination from 'components/TablePagination'
import React, { FC, useEffect, useState } from 'react'

function getPage(list: User[], page: number, count: number) {
  return list.slice(page * count, (page + 1) * count)
}

const VerificationTable: FC = () => {
  const [requests, setRequests] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  function fetchRequests() {
    setLoading(true)
    getAdminRequests().then(r => {
      setRequests(r)
      setLoading(false)
    })
  }

  useEffect(fetchRequests, [])

  function handleVerify(id: string) {
    verifyAdmin(id).then(fetchRequests)
  }

  function handleDecline(id: string) {
    declineAdmin(id).then(fetchRequests)
  }

  const [page, setPage] = useState(0)
  const [pages, setPages] = useState(Math.ceil(requests.length / 5))
  const [displayed, setDisplayed] = useState(getPage(requests, page, 5))

  useEffect(() => setPages(Math.ceil(requests.length / 5)), [requests])
  useEffect(() => setDisplayed(getPage(requests, page, 5)), [requests, page])

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
          <th>Name</th>
          <th>E-mail</th>
          <th>Actions</th>
        </thead>
        <tbody>
          {loading ? (
            <TableLoading />
          ) : (
            displayed.map(request => (
              <tr>
                <td>
                  {request.firstname} {request.lastname}
                </td>
                <td className="text-center">{request.email}</td>
                <td className="text-center">
                  <span
                    className="uppercase tracking-wider mx-2 cursor-pointer font-semibold text-green-600 hover:underline"
                    onClick={() => handleVerify(request._id)}
                  >
                    Verify
                  </span>
                  <span
                    className="uppercase tracking-wider mx-2 cursor-pointer font-semibold text-red-600 hover:underline"
                    onClick={() => handleDecline(request._id)}
                  >
                    Decline
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <TablePagination page={page} pages={pages} onNextPage={handleNextPage} onPreviousPage={handlePreviousPage} />
    </div>
  )
}

export default VerificationTable
