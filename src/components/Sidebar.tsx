import React, { FC } from 'react'
import { ReactComponent as MenuSVG } from 'resources/svg/menu.svg'

type SidebarProps = {
  onClose: () => void
}

const Sidebar: FC<SidebarProps> = ({ onClose }) => {
  return (
    <div className="fixed flex flex-col top-0 left-0 bg-blue-900 h-screen w-full md:hidden">
      <div className="w-full flex justify-between p-4 bg-blue-900 items-center">
        <h1 className="text-xl italic">The Higgs Boson portal</h1>
        <button className="md:hidden" onClick={onClose}>
          <MenuSVG height="2rem" width="2rem" fill="white" />
        </button>
      </div>
      <div className="flex flex-col justify-around h-1/2 text-xl items-center">
        <div>
          <a>Experiments</a>
        </div>
        <div>
          <a>Articles</a>
        </div>
        <div>
          <a>History</a>
        </div>
        <div>
          <a>About</a>
        </div>
      </div>
      <div className="mt-auto mb-0 text-center p-4">
        <p className="font-light">Peter Žáčik FIT CTU 2021</p>
      </div>
    </div>
  )
}

export default Sidebar
