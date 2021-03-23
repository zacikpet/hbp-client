import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { AuthContextType } from '../App'

type AdminNavbarProps = {
  auth: AuthContextType
}

const AdminNavbar: FC<AdminNavbarProps> = ({ auth }) => (
  <div className="fixed h-8 bg-gray-850 w-full top-0 z-20 flex items-center px-4 text-white transition">
    <span className="opacity-40">You are logged in as administrator</span>
    <span className="ml-2 text-red-600">{!auth.user?.verified && 'Unverified account'}</span>
    <span className="opacity-40 mr-0 ml-auto hover:underline">
      <Link to="/admin">Admin page</Link>
    </span>
  </div>
)

export default AdminNavbar
