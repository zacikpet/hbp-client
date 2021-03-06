import React, { FC, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as MenuSVG } from 'resources/svg/menu.svg'
import Sidebar from './Sidebar'
import Wave from 'resources/wave.svg'
import Navigation from './Navigation'
import { DarkModeContext } from '../App'

type NavbarProps = {
  onChangeDarkMode: (dark: boolean) => void
}

const Navbar: FC<NavbarProps> = ({ onChangeDarkMode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const darkMode = useContext(DarkModeContext)

  return (
    <div className="sticky top-0 w-full h-16 flex justify-between items-center bg-light dark:bg-dark pl-2 pr-4 md:pl-2 md:pr-8 shadow-2xl z-40">
      <div className="text-xl font-normal italic cursor-pointer flex items-center">
        <img src={Wave} width={48} alt="Logo" onClick={() => onChangeDarkMode(!darkMode)} />
        <Link to="/">The Higgs Boson portal</Link>
      </div>
      <div className="hidden md:flex w-1/2 justify-between ">
        <Navigation />
      </div>
      <button className="md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
        <MenuSVG fill={darkMode ? 'white' : 'black'} fillOpacity={0.7} height={32} width={32} />
      </button>

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </div>
  )
}

export default Navbar
