import React, { FC } from 'react'
import CtuLogo from 'resources/ctu.jpg'
import CernLogo from 'resources/cern.jpg'
import { Link } from 'react-router-dom'

const Footer: FC = () => (
  <div className="bg-dark dark:bg-black text-ondark px-2 py-4 flex items-center text-white">
    <img src={CtuLogo} alt="CTU logo" className="max-h-16 mx-2" />
    <img src={CernLogo} alt="CERN logo" className="max-h-16 mx-2" />
    <div className="mx-2 opacity-40">
      <p>Peter Žáčik</p>
      <p>zacikpet@fit.cvut.cz</p>
      <p>FIT CTU 2021</p>
    </div>
    <div className="mr-2 ml-auto opacity-40">
      <Link to="/login" className="hover:underline">
        Administration
      </Link>
    </div>
  </div>
)

export default Footer
