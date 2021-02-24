import React, { FC, useState } from 'react'
import CircleMenuItem from '../components/CircleMenuItem'
import CircleMenu from '../components/CircleMenu'
import useRedirect from '../hooks/useRedirect'
import Sidebar from '../components/Sidebar'
import Space from 'resources/space.jpg'
// import CernLogo from 'resources/cern.png'

const HomeRoute: FC = () => {
  const { toAtlas, toCms, toAleph, toCdf, toD0, toDelphi, toL3, toOpal } = useRedirect()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const green = 'rgb(52, 211, 153)'
  const red = '#F87171'

  return (
    <div className="flex h-screen bg-cover" style={{ backgroundImage: `url(${Space})` }}>
      <Sidebar onOpen={() => setSidebarOpen(true)} onClose={() => setSidebarOpen(false)} />
      <div className={`h-full justify-center items-center ${sidebarOpen ? 'hidden md:flex md:w-full' : 'w-full flex'}`}>
        <CircleMenu outerRadius={200} extend={12} fontSize={20} innerRadius={120}>
          <CircleMenuItem id="atlas" text="ATLAS" onClick={toAtlas} color={red} angle={45} startAngle={0} />
          <CircleMenuItem id="cms" text="CMS" onClick={toCms} color={red} angle={45} startAngle={45} />
          <CircleMenuItem id="d0" text="D0" color={green} angle={45} startAngle={90} onClick={toD0} />
          <CircleMenuItem id="cdf" text="CDF" color={green} angle={45} startAngle={135} onClick={toCdf} />
          <CircleMenuItem id="aleph" text="ALEPH" color="whitesmoke" angle={45} startAngle={180} onClick={toAleph} />
          <CircleMenuItem id="delphi" text="DELPHI" color="whitesmoke" angle={45} startAngle={225} onClick={toDelphi} />
          <CircleMenuItem id="opal" text="OPAL" color="whitesmoke" angle={45} startAngle={270} onClick={toOpal} />
          <CircleMenuItem id="l3" text="L3" color="whitesmoke" angle={45} startAngle={315} onClick={toL3} />
        </CircleMenu>
      </div>
      {/*<img
        className="absolute right-8 bottom-5"
        width={80}
        height={80}
        src={CernLogo}
        alt="Cern Logo"
        style={{ filter: 'invert(1)' }}
      />*/}
      <span className="absolute right-2 bottom-0 font-light text-white">Peter Žáčik - FIT CTU - 2021</span>
    </div>
  )
}

export default HomeRoute
