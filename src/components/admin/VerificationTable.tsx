import React, { FC } from 'react'

type UpdatesTableProps = {
  loading: boolean
}

const VerificationTable: FC<UpdatesTableProps> = ({}) => {
  return (
    <div className="bg-white shadow dark:bg-gray-800 p-4 rounded">
      <h1 className="mx-4 mb-4 text-xl text-emphasis font-semibold">Administrator account requests</h1>

      {true ? (
        <div className="flex justify-center text-disabled">No requests yet.</div>
      ) : (
        <>
          <div className="table-wrapper">
            <table>
              <thead>
                <th>E-mail</th>
                <th>Name</th>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}

export default VerificationTable
