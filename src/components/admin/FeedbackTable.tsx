import React, { FC } from 'react'
import { Feedback } from 'api/feedback'

type UpdatesTableProps = {
  feedbacks: Feedback[]
  loading: boolean
}

const FeedbackTable: FC<UpdatesTableProps> = ({ feedbacks, loading = false }) => {
  return (
    <div className="bg-white shadow dark:bg-gray-800 p-4 rounded">
      <h1 className="text-center text-emphasis font-semibold">Feedback</h1>
      <table className="bg-gray-50 dark:bg-gray-900 w-full shadow-inner">
        <thead className="border">
          <th>E-mail</th>
          <th>Description</th>
        </thead>
        <tbody className="shadow-inner">
          {feedbacks.map(feedback => (
            <tr className="border border-gray-200" key={feedback.description}>
              <td>{feedback.email}</td>
              <td>{feedback.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default FeedbackTable
