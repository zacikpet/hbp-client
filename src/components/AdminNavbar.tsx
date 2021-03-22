import React, { FC } from 'react'
import { Link } from 'react-router-dom'

const AdminNavbar: FC = () => (
  <div className="fixed h-8 bg-red-500 w-full top-0 z-20 flex items-center px-4 text-white justify-between transition">
    <span>You are logged in as administrator</span>
    <Link to="/admin">Admin page</Link>
  </div>
)

export default AdminNavbar
