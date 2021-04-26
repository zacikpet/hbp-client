import React, { FC } from 'react'
import CtuLogo from 'resources/ctu.jpg'
import CernLogo from 'resources/cern.jpg'
import { Link } from 'react-router-dom'

const Footer: FC = () => (
  <div className="mb-0 mt-auto bg-gray-200 text-ondark px-2 py-4 flex items-center h-32 max-w-full w-full flex-wrap justify-between">
    <div className="flex">
      <img src={CtuLogo} alt="CTU logo" className="max-h-16 mx-2" />
      <img src={CernLogo} alt="CERN logo" className="max-h-16 mx-2" />
      <div className="mx-2 opacity-40">
        <p>Peter Žáčik</p>
        <p>zacikpet@fit.cvut.cz</p>
        <p>FIT CTU 2021</p>
      </div>
    </div>
    <div className="opacity-40 h-16 flex items-center w-32 justify-center">
      <Link to="/login" className="hover:underline">
        Administration
      </Link>
    </div>
  </div>
)

export default Footer
