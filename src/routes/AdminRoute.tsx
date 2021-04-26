import React, { FC } from 'react'
import useAuth from '../hooks/useAuth'
import { Redirect } from 'react-router-dom'
import AdminDashboard from '../components/admin/AdminDashboard'

type AdminRouteProps = {
  onLogout: () => void
}

const AdminRoute: FC<AdminRouteProps> = ({ onLogout }) => {
  const auth = useAuth()

  if (!auth?.loggedIn) return <Redirect to="/home" />

  if (auth.loggedIn && auth.user?.verified) return <AdminDashboard onLogout={onLogout} />

  return (
    <div className="min-h-page flex justify-center items-center">
      <div className="bg-gray-50 dark:bg-gray-850 shadow-xl p-8 flex flex-col rounded">
        <h1 className="text-emphasis font-bolder text-xl">Your account is not verified</h1>
        <p>You will receive an email when we verify your identify.</p>
        <button className="btn m-2 mt-8" onClick={onLogout}>
          Sign out
        </button>
      </div>
    </div>
  )
}

export default AdminRoute
