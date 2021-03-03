import React, { FC } from 'react'
import { Link } from 'react-scroll'

const Navbar: FC = () => {
  return (
    <div className="text-xl font-light absolute top-0 left-0 flex w-full h-12 pb-12 bg-gradient-to-b from-black to-transparent text-gray-400 flex justify-center p-6">
      {/*<h1>The Higgs Boson Portal</h1>*/}
      <div className="w-3/5 flex justify-between">
        <h1 className="cursor-pointer">
          <Link to="experiments" smooth>
            Experiments
          </Link>
        </h1>
        <h1>Articles</h1>
        <h1>History</h1>
        <h1>About</h1>
      </div>
      {/*<h1 className="cursor-pointer">
        <Link to="latest-news" smooth>
          Latest news
        </Link>
      </h1>*/}
    </div>
  )
}

export default Navbar
