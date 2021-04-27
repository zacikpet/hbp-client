import React, { FC } from 'react'
import Navigation from 'components/Navigation'

type SidebarProps = {
  open: boolean
  onClose?: () => void
}

const Sidebar: FC<SidebarProps> = ({ open, onClose }) => {
  const handleAction = () => {
    onClose && onClose()
    scroll(0, 0)
  }

  return (
    <div
      className={`top-16 md:hidden transition-all duration-300 fixed w-screen h-page left-wscreen ${
        open ? 'transform -translate-x-wscreen' : ''
      }`}
    >
      <div className="flex flex-col bg-gray-50 dark:bg-gray-900 h-full w-full md:hidden justify-between shadow-inner">
        <div />
        <div className="flex flex-col justify-around h-1/2 text-xl items-center">
          <Navigation onAction={handleAction} />
        </div>
        <div className="text-center p-4">
          <p className="font-light">Peter Zacik FIT CTU 2021</p>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
