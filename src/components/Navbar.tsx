import React, { FC } from 'react'

const Navbar: FC = () => {
  return (
    <div className="absolute top-0 left-0 flex w-full h-12 font-bold text-xl bg-transparent text-white flex justify-end p-3">
      <h1 className="font-light">Latest news</h1>
    </div>
  )
}

export default Navbar
