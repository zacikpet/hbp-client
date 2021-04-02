import React, { FC, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ReactComponent as MenuSVG } from 'resources/svg/menu.svg'
import Sidebar from './Sidebar'
import Wave from 'resources/wave.svg'
import Navigation from './Navigation'
import useDarkMode from 'hooks/useDarkMode'
import useAuth from 'hooks/useAuth'
import useTextColor from 'hooks/useTextColor'

type NavbarProps = {
  onChangeDarkMode: (dark: boolean) => void
}

const Navbar: FC<NavbarProps> = ({ onChangeDarkMode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const darkMode = useDarkMode()
  const textColor = useTextColor()
  const auth = useAuth()
  const { pathname } = useLocation()

  return (
    <div className="sticky top-0 h-16 bg-light dark:bg-gray-850 px-4 shadow z-40">
      <div className="max-w-screen-2xl flex flex justify-between items-center h-16 mx-auto">
        <div className="cursor-pointer flex items-center">
          <img src={Wave} className="w-12 h-12" alt="Logo" onClick={() => onChangeDarkMode(!darkMode)} />
          <Link to="/" className="text-subtitle italic ">
            The Higgs Boson portal
          </Link>
        </div>
        {auth?.loggedIn && (
          <Link
            to="/admin"
            className={`duration-300 text-red-500 border-b-2 border-transparent hover:border-gray-100 dark:hover:border-gray-700 font-semibold ${
              pathname === '/admin' && 'border-red-500 hover:border-red-500'
            }`}
          >
            Admin
          </Link>
        )}
        <div className="hidden md:flex w-1/2 justify-between">
          <Navigation />
        </div>
        <button className="md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <MenuSVG fill={textColor} fillOpacity={0.7} height={32} width={32} />
        </button>
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>
    </div>
  )
}

export default Navbar
