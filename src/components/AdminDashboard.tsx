import { Feedback, getFeedback } from 'api/feedback'
import React, { FC, useEffect, useState } from 'react'
import { getStats, Stats } from '../api/stats'
import useAuth from '../hooks/useAuth'
import FeedbackTable from './admin/FeedbackTable'
import UpdatesTable from './admin/UpdatesTable'

type AdminDashboardProps = {
  onLogout: () => void
}

const AdminDashboard: FC<AdminDashboardProps> = ({ onLogout }) => {
  const [stats, setStats] = useState<Stats>()
  const [feedback, setFeedback] = useState<Feedback[]>([])
  const auth = useAuth()

  useEffect(() => {
    getStats().then(setStats)
    getFeedback().then(setFeedback)
  }, [])

  return (
    <div className="min-h-page py-6">
      <div className="bg-white shadow rounded mb-1 p-4">
        <h2 className="text-emphasis text-xl">
          Logged in as &nbsp;
          {auth?.user?.firstname} &nbsp;
          {auth?.user?.lastname} &nbsp; ({auth?.user?.email})
        </h2>
        <br />
        <h2 className="text-emphasis text-xl">Total articles: {stats?.total_papers}</h2>
      </div>
      <div className="grid grid-cols-2 gap-1">
        <UpdatesTable updates={stats?.updates || []} loading={Boolean(stats)} />
        <FeedbackTable feedbacks={feedback} loading={feedback.length > 0} />
      </div>
      <br />
      <button className="btn w-20" onClick={onLogout}>
        Sign out
      </button>
    </div>
  )
}

export default AdminDashboard
