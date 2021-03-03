import React, { FC, useState } from 'react'
import { Link as ScrollLink } from 'react-scroll'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { ReactComponent as MenuSVG } from 'resources/svg/menu.svg'
import Sidebar from './Sidebar'
import useRedirect from '../hooks/useRedirect'

const Navbar: FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { toHome } = useRedirect()
  const { pathname } = useLocation()

  const handleAction = (action: () => void) => {
    setSidebarOpen(false)
    action()
  }

  return (
    <div className="sticky shadow-2xl top-0 font-normal flex w-full h-16 bg-white text-black flex justify-between items-center px-4 md:px-8 antialiased z-40">
      <div className="flex">
        <h1 className="text-xl font-normal italic cursor-pointer" onClick={() => handleAction(toHome)}>
          The Higgs Boson portal
        </h1>
      </div>
      <div className="hidden md:flex w-1/2 justify-between ">
        <span className="cursor-pointer hover:underline">
          {pathname === '/' ? (
            <ScrollLink className="cursor-pointer" to="experiments" offset={-64} smooth duration={500}>
              Experiments
            </ScrollLink>
          ) : (
            <RouterLink to="/">Experiments</RouterLink>
          )}
        </span>
        <span className="cursor-pointer hover:underline">
          <RouterLink to="/articles">Articles</RouterLink>
        </span>
        <a className="cursor-pointer hover:underline">History</a>
        <a className="cursor-pointer hover:underline">About</a>
      </div>
      <button className="md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
        <MenuSVG height={32} width={32} />
      </button>

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </div>
  )
}

export default Navbar
