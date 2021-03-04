import React, { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'

type SidebarProps = {
  open: boolean
  onClose?: () => void
}

const Sidebar: FC<SidebarProps> = ({ open, onClose }) => {
  const { pathname } = useLocation()

  const handleClick = () => {
    onClose && onClose()
    scroll(0, 0)
  }

  return (
    <div
      className={`md:hidden transition-all duration-300 fixed top-16 w-screen h-page ${
        open ? 'left-0' : 'left-wscreen'
      }`}
    >
      <div className="flex flex-col bg-white h-full w-full md:hidden justify-between">
        <div />
        <div className="flex flex-col justify-around h-1/2 text-xl items-center">
          <Link to="/" onClick={handleClick} className={pathname === '/' ? 'border-b-2' : ''}>
            Home
          </Link>
          <Link to="/articles" onClick={handleClick} className={pathname === '/articles' ? 'border-b-2' : ''}>
            Articles
          </Link>
          <Link to="/history" onClick={handleClick} className={pathname === '/history' ? 'border-b-2' : ''}>
            History
          </Link>
          <Link to="/about" onClick={handleClick} className={pathname === '/about' ? 'border-b-2' : ''}>
            About
          </Link>
          <Link to="/feedback" onClick={handleClick} className={pathname === '/feedback' ? 'border-b-2' : ''}>
            Feedback
          </Link>
        </div>
        <div className="text-center p-4">
          <p className="font-light">Peter Zacik FIT CTU 2021</p>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
