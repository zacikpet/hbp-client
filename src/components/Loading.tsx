import React, { FC } from 'react'
import Loader from 'react-loader-spinner'
import useDarkMode from '../hooks/useDarkMode'

const Loading: FC = () => {
  const darkMode = useDarkMode()

  return (
    <div className="h-page flex justify-center items-center opacity-70">
      <Loader type="TailSpin" color={darkMode ? 'white' : 'black'} height={75} width={75} />
    </div>
  )
}

export default Loading
