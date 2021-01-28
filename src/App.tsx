import React, { FC } from 'react'
import CircleMenu from 'components/CircleMenu'
import CircleMenuItem from './components/CircleMenuItem'

const App: FC = () => {
  return (
    <div className="w-screen h-screen bg-gray-100 flex justify-center items-center">
      <CircleMenu>
        <CircleMenuItem color="red" angle={90} startAngle={0} />
        <CircleMenuItem color="green" angle={90} startAngle={90} />
        <CircleMenuItem color="blue" angle={45} startAngle={180} />
        <CircleMenuItem color="yellow" angle={45} startAngle={225} />
        <CircleMenuItem color="pink" angle={45} startAngle={270} />
        <CircleMenuItem color="white" angle={45} startAngle={315} />
      </CircleMenu>
    </div>
  )
}

export default App
