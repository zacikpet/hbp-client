import React, { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as MenuSVG } from 'resources/svg/menu.svg'
import Sidebar from './Sidebar'
import Wave from 'resources/wave.svg'
import Navigation from './Navigation'

const Navbar: FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="sticky shadow-2xl top-0 font-normal flex w-full h-16 bg-white text-black flex justify-between items-center pl-2 pr-4 md:pl-2 md:pr-8 antialiased z-40">
      <Link to="/" className="text-xl font-normal italic cursor-pointer flex items-center">
        <img src={Wave} width={48} />
        The Higgs Boson portal
      </Link>
      <div className="hidden md:flex w-1/2 justify-between ">
        <Navigation />
      </div>
      <button className="md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
        <MenuSVG height={32} width={32} />
      </button>

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </div>
  )
}

export default Navbar
