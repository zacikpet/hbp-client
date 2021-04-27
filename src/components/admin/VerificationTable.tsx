import React, { FC } from 'react'

type UpdatesTableProps = {
  loading: boolean
}

const VerificationTable: FC<UpdatesTableProps> = ({}) => {
  return (
    <>
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
    </>
  )
}

export default VerificationTable
