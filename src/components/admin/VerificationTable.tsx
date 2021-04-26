import React, { FC } from 'react'
import { Feedback } from 'api/feedback'

type UpdatesTableProps = {
  feedbacks: Feedback[]
  loading: boolean
}

const VerificationTable: FC<UpdatesTableProps> = ({ feedbacks }) => {
  return (
    <div className="bg-white shadow dark:bg-gray-800 p-4 rounded">
      <h1 className="mx-4 mb-4 text-xl text-emphasis font-semibold">Administrator account requests</h1>
      <div className="table-wrapper">
        <table>
          <thead>
            <th>E-mail</th>
            <th>Name</th>
          </thead>
          <tbody>
            {feedbacks.map(feedback => (
              <tr key={feedback.description}>
                <td>{feedback.email}</td>
                <td>{feedback.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default VerificationTable
