import React, { FC, useEffect, useState } from 'react'
import { Feedback, getFeedback } from 'api/feedback'
import TableLoading from 'components/TableLoading'

const FeedbackTable: FC = () => {
  const [loading, setLoading] = useState(true)
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])

  useEffect(() => {
    setLoading(true)
    getFeedback().then(f => {
      setFeedbacks(f)
      setLoading(false)
    })
  }, [])

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
          {loading ? (
            <TableLoading />
          ) : (
            feedbacks.map(feedback => (
              <tr key={feedback.description}>
                <td>{feedback.email}</td>
                <td>{feedback.description}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default FeedbackTable
