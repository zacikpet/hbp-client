import React, { FC, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ReactComponent as MenuSVG } from 'resources/svg/menu.svg'
import Sidebar from './Sidebar'
import Logo from 'resources/hbp-logo.png'

const Navbar: FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { pathname } = useLocation()

  return (
    <div className="sticky shadow-2xl top-0 font-normal flex w-full h-16 bg-white text-black flex justify-between items-center pl-2 pr-4 md:pl-2 md:pr-8 antialiased z-40">
      <div className="flex items-center">
        <img src={Logo} width={48} alt="Logo" />
        <Link to="/" className="text-xl font-normal italic cursor-pointer px-2">
          The Higgs Boson portal
        </Link>
      </div>
      <div className="hidden md:flex w-1/2 justify-between ">
        <Link to="/" className={`cursor-pointer  ${pathname === '/' && 'border-b-2'}`}>
          Home
        </Link>
        <Link to="/articles" className={`cursor-pointer ${pathname === '/articles' && 'border-b-2'}`}>
          Articles
        </Link>
        <Link to="/history" className={`cursor-pointer ${pathname === '/history' && 'border-b-2'}`}>
          History
        </Link>
        <Link to="/about" className={`cursor-pointer ${pathname === '/about' && 'border-b-2'}`}>
          About
        </Link>
        <Link to="/feedback" className={`cursor-pointer ${pathname === '/feedback' && 'border-b-2'}`}>
          Feedback
        </Link>
      </div>
      <button className="md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
        <MenuSVG height={32} width={32} />
      </button>

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </div>
  )
}

export default Navbar
