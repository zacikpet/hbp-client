import React, { FC } from 'react'
import { Link as ScrollLink } from 'react-scroll'
import { Link as RouterLink, useLocation } from 'react-router-dom'

type SidebarProps = {
  open: boolean
  onClose?: () => void
}

const Sidebar: FC<SidebarProps> = ({ open, onClose }) => {
  const { pathname } = useLocation()

  return (
    <div className={`transition-all duration-300 fixed top-16 w-full h-sidebar ${open ? 'left-0' : 'left-screen'}`}>
      <div className="flex flex-col bg-white h-full w-full md:hidden justify-between">
        <div />
        <div className="flex flex-col justify-around h-1/2 text-xl items-center">
          {pathname === '/' ? (
            <ScrollLink
              className="cursor-pointer"
              to="experiments"
              offset={-64}
              smooth
              duration={500}
              onClick={() => onClose && onClose()}
            >
              Experiments
            </ScrollLink>
          ) : (
            <RouterLink to="/">Experiments</RouterLink>
          )}
          <RouterLink to="/articles" onClick={() => onClose && onClose()}>
            Articles
          </RouterLink>
          <div>
            <a>History</a>
          </div>
          <div>
            <a>About</a>
          </div>
        </div>
        <div className="text-center p-4">
          <p className="font-light">Peter Zacik FIT CTU 2021</p>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
