import React, { FC, useState } from 'react'
import { ReactComponent as MenuSVG } from 'resources/svg/menu.svg'
import { ReactComponent as LeftArrowSVG } from 'resources/svg/left-arrow.svg'

type SidebarProps = {
  onOpen?: () => void
  onClose?: () => void
}

const Sidebar: FC<SidebarProps> = ({ onOpen, onClose }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleClick = () => {
    if (sidebarOpen && onClose) onClose()
    if (!sidebarOpen && onOpen) onOpen()
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <>
      <div
        className={`transform w-full md:w-1/2 lg:w-1/3 h-full p-10 transition-all flex-shrink-0 shadow-2xl z-20
        ${sidebarOpen ? 'ml-0' : '-ml-full md:-ml-1/2 lg:-ml-1/3'}`}
        style={{ backgroundColor: 'whitesmoke' }}
      >
        <div className="h-full">
          {sidebarOpen && (
            <button className="absolute right-0 top-10 md:hidden" onClick={handleClick}>
              <LeftArrowSVG width={40} />
            </button>
          )}
          <div className="h-1/3">
            <h1 className="text-4xl">The Higgs Boson portal</h1>
            <br />
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
          </div>
          <div className="flex flex-col h-1/3 justify-around text-xl">
            <h2 className="hover:text-gray-600 cursor-pointer">Experiments</h2>
            <h2 className="hover:text-gray-600 cursor-pointer">Publications</h2>
            <h2 className="hover:text-gray-600 cursor-pointer">About</h2>
          </div>
          <div className="h-1/3 flex flex-col justify-end">
            <button className="p-2 border-2 rounded border-black hover:bg-black text-black hover:text-white">
              <h2 className="font-semibold">Feedback</h2>
            </button>
          </div>
        </div>
      </div>
      <div
        className={`bg-white transform w-14 h-14 cursor-pointer absolute transition-all p-3 rounded-r-xl z-10 shadow-2xl top-8 ${
          sidebarOpen ? 'left-0 md:left-1/2 lg:left-1/3' : 'left-0'
        }`}
        onClick={handleClick}
      >
        <MenuSVG width="100%" height="100%" fill="black" />
      </div>
    </>
  )
}

export default Sidebar
