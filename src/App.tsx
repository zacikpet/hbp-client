import React, { FC } from 'react'
import CircleMenu from 'components/CircleMenu'
import CircleMenuItem from 'components/CircleMenuItem'
import useRedirect from './hooks/useRedirect'

const App: FC = () => {
  const { toAtlas, toCms } = useRedirect()

  return (
    <div className="w-screen h-screen bg-gray-100 flex justify-center items-center">
      <CircleMenu outerRadius={200} extend={20} fontSize={20} innerRadius={120}>
        <CircleMenuItem text="ATLAS" onClick={toAtlas} color="red" angle={90} startAngle={0} />
        <CircleMenuItem text="CMS" onClick={toCms} color="green" angle={90} startAngle={90} />
        <CircleMenuItem text="D0" color="blue" angle={45} startAngle={180} />
        <CircleMenuItem text="ALEPH" color="magenta" angle={45} startAngle={225} />
        <CircleMenuItem text="DELPHI" color="pink" angle={45} startAngle={270} />
        <CircleMenuItem text="OPAL" color="white" angle={45} startAngle={315} />
      </CircleMenu>
    </div>
  )
}

export default App
