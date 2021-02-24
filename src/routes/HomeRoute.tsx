import React, { FC, useState } from 'react'
import CircleMenuItem from '../components/CircleMenuItem'
import CircleMenu from '../components/CircleMenu'
import useRedirect from '../hooks/useRedirect'
// import { ReactComponent as MenuSVG } from 'resources/svg/menu.svg'
import Sidebar from '../components/Sidebar'
// import Background from 'resources/bg.jpeg'
import CernLogo from 'resources/cern.png'

const HomeRoute: FC = () => {
  const { toAtlas, toCms, toAleph, toCdf, toD0, toDelphi, toL3, toOpal } = useRedirect()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-cover" /*style={{ backgroundImage: `url(${Background})` }}*/>
      <Sidebar onOpen={() => setSidebarOpen(true)} onClose={() => setSidebarOpen(false)} />
      <div className={`h-full justify-center items-center ${sidebarOpen ? 'hidden md:flex md:w-full' : 'w-full flex'}`}>
        <CircleMenu outerRadius={200} extend={12} fontSize={20} innerRadius={120}>
          <CircleMenuItem id="atlas" text="ATLAS" onClick={toAtlas} color="red" angle={90} startAngle={0} />
          <CircleMenuItem id="cms" text="CMS" onClick={toCms} color="red" angle={90} startAngle={90} />
          <CircleMenuItem id="d0" text="D0" color="red" angle={30} startAngle={180} onClick={toD0} />
          <CircleMenuItem id="cdf" text="CDF" color="red" angle={30} startAngle={210} onClick={toCdf} />
          <CircleMenuItem id="aleph" text="ALEPH" color="red" angle={30} startAngle={240} onClick={toAleph} />
          <CircleMenuItem id="delphi" text="DELPHI" color="red" angle={30} startAngle={270} onClick={toDelphi} />
          <CircleMenuItem id="opal" text="OPAL" color="red" angle={30} startAngle={300} onClick={toOpal} />
          <CircleMenuItem id="l3" text="L3" color="red" angle={30} startAngle={330} onClick={toL3} />
        </CircleMenu>
      </div>
      <img className="absolute right-8 bottom-5" width={80} height={80} src={CernLogo} alt="Cern Logo" />
      <span className="absolute right-2 bottom-0 font-light">Peter Žáčik - FIT CTU - 2021</span>
    </div>
  )
}

export default HomeRoute
