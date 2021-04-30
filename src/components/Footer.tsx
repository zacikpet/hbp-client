import React, { FC } from 'react'
import CtuLogo from 'resources/ctu.jpg'
import CernLogo from 'resources/cern.jpg'
import { Link } from 'react-router-dom'

const Footer: FC = () => (
  <div className="mb-0 mt-auto bg-gray-200 dark:bg-gray-950 px-2 py-4 flex items-center h-32 max-w-full w-full flex-wrap justify-between shadow-inner">
    <div className="flex">
      <img src={CtuLogo} alt="CTU logo" className="max-h-16 mx-2" />
      <img src={CernLogo} alt="CERN logo" className="max-h-16 mx-2" />
      <div className="mx-2 text-disabled">
        <br />
        <p>Peter Žáčik</p>
        <p>zacikpet@fit.cvut.cz</p>
      </div>
      <div className="mx-2 text-disabled">
        <p>supervised by:</p>
        <p>André Sopczak</p>
        <p>andre.sopczak@cern.ch</p>
      </div>
    </div>
    <div className="h-16 flex items-center w-32 justify-center">
      <Link to="/login" className="hover:underline text-disabled">
        Administration
      </Link>
    </div>
  </div>
)

export default Footer
