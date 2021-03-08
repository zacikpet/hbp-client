import React, { FC } from 'react'
import CtuLogo from 'resources/ctu.jpg'

const Footer: FC = () => (
  <div className="bg-dark dark:bg-black text-ondark flex p-4">
    <div className="w-1/2 flex flex-col items-center">
      <text>Peter Zacik</text>
      <img src={CtuLogo} alt="CTU logo" width={200} />
    </div>
    <div className="w-1/2">right</div>
  </div>
)

export default Footer
