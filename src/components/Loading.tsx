import React, { FC } from 'react'
import Loader from 'react-loader-spinner'
import useTextColor from 'hooks/useTextColor'

const Loading: FC = () => {
  const textColor = useTextColor()

  return (
    <div className="h-page flex justify-center items-center opacity-70">
      <Loader type="TailSpin" color={textColor} height={75} width={75} />
    </div>
  )
}

export default Loading
