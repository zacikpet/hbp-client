import React, { FC, useState } from 'react'
import { Link } from 'react-scroll'
import { ReactComponent as MenuSVG } from 'resources/svg/menu.svg'
import Sidebar from './Sidebar'

const Navbar: FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="sticky shadow-2xl top-0 font-normal flex w-full h-16 text-blue-50 flex justify-between items-center px-4 md:px-8 bg-blue-900 subpixel-antialiased z-40">
      <div className="flex">
        <h1 className="text-xl font-normal italic">The Higgs Boson portal</h1>
      </div>
      <div className="hidden md:flex w-1/2 justify-between">
        <a className="cursor-pointer hover:underline">
          <Link to="experiments" smooth offset={-64} duration={500}>
            Experiments
          </Link>
        </a>
        <a className="cursor-pointer hover:underline">Articles</a>
        <a className="cursor-pointer hover:underline">History</a>
        <a className="cursor-pointer hover:underline">About</a>
      </div>
      <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
        <MenuSVG height="2rem" width="2rem" fill="white" />
      </button>

      {sidebarOpen && <Sidebar onClose={() => setSidebarOpen(false)} />}
    </div>
  )
}

export default Navbar
