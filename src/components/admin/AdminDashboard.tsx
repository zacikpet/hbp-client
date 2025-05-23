import React, { FC } from 'react'
import useAuth from '../../hooks/useAuth'
import FeedbackTable from './FeedbackTable'
import UpdatesTable from './UpdatesTable'
import DefaultUserPhoto from 'resources/defaultuser.png'
import VerificationTable from './VerificationTable'
import Card from 'components/Card'

type AdminDashboardProps = {
  onLogout: () => void
}

const AdminDashboard: FC<AdminDashboardProps> = ({ onLogout }) => {
  const auth = useAuth()

  return (
    <div className="min-h-page">
      <div className="grid p-2 gap-2">
        <Card title="Administration">
          <div className="grid grid-cols-3">
            <div>
              <div className="flex">
                <img src={DefaultUserPhoto} className="w-20 m-2" />
                <div>
                  <h1 className="mx-4 mb-4 text-xl text-emphasis font-semibold">Account details</h1>
                  <p className="mx-4">
                    {auth?.user?.firstname} {auth?.user?.lastname}
                  </p>
                  <p className="mx-4">{auth?.user?.email}</p>
                </div>
              </div>
              <button className="btn mx-2" onClick={onLogout}>
                Sign out
              </button>
            </div>
            <div>{/*<h2 className="text-lg">Total articles: {stats?.total_papers}</h2>*/}</div>
            <div className="flex justify-center items-center"></div>
          </div>
        </Card>
        <div className="grid md:grid-cols-2 gap-2">
          <div className="grid grid-rows-2 gap-2">
            <Card title="Database updates">
              <UpdatesTable />
            </Card>
            <Card title="Administrator account requests">
              <VerificationTable />
            </Card>
          </div>
          <Card title="Feedback">
            <FeedbackTable />
          </Card>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
