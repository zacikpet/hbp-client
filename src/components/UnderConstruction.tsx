import React, { FC } from 'react'
import Loader from 'react-loader-spinner'

const UnderConstruction: FC = () => (
  <div className="w-full h-page flex flex-col justify-around items-center text-xl">
    <Loader type="CradleLoader" color="black" height={75} width={75} />
    This page is under construction ...
    <div />
  </div>
)

export default UnderConstruction
