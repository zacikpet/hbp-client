import React, { FC } from 'react'
import { Feedback } from 'api/feedback'

type UpdatesTableProps = {
  feedbacks: Feedback[]
  loading: boolean
}

const FeedbackTable: FC<UpdatesTableProps> = ({ feedbacks }) => {
  return (
    <div className="table-wrapper">
      <table className="w-full">
        <thead>
          <tr>
            <th>E-mail</th>
            <th>Description</th>
          </tr>
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
  )
}

export default FeedbackTable
