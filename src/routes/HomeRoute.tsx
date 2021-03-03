import React, { FC, useState } from 'react'
import CircleMenuItem from '../components/CircleMenuItem'
import CircleMenu from '../components/CircleMenu'
import useRedirect from '../hooks/useRedirect'
import Sidebar from '../components/Sidebar'
import Space from 'resources/space.jpg'
import CernLogo from 'resources/cern.png'
import Mountains from 'resources/mountains.jpg'
import Cern from 'resources/cern.jpg'
import Navbar from '../components/Navbar'
import Atlas from 'resources/atlas.jpg'
import { Link } from 'react-scroll'

const HomeRoute: FC = () => {
  const { toAtlas, toCms, toAleph, toCdf, toD0, toDelphi, toL3, toOpal } = useRedirect()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [menuOuterRadius, setMenuOuterRadius] = useState(window.innerHeight / 3)
  const menuInnerRadius = (menuOuterRadius * 3) / 5

  const green = 'rgb(52, 211, 153)'

  const red = '#F87171'

  return (
    <div className="bg-cover bg-center" style={{ backgroundImage: `url(${Cern})` }}>
      <div className="flex h-screen-3/4 justify-start items-center bg-filter-dark pl-40">
        {/*<Sidebar onOpen={() => setSidebarOpen(true)} onClose={() => setSidebarOpen(false)} />*/}
        <Navbar />
        <div>
          <h1 className="text-gray-300 text-4xl">The Higgs Boson portal</h1>
          <h1 className="text-gray-300 text-xl italic">Powered by CDS</h1>
        </div>

        {/*<CircleMenu outerRadius={menuOuterRadius} extend={12} fontSize={12} innerRadius={menuInnerRadius}>
          <CircleMenuItem id="atlas" text="ATLAS" onClick={toAtlas} color="whitesmoke" angle={45} startAngle={0} />
          <CircleMenuItem id="cms" text="CMS" onClick={toCms} color="whitesmoke" angle={45} startAngle={45} />
          <CircleMenuItem id="d0" text="D0" color="whitesmoke" angle={45} startAngle={90} onClick={toD0} />
          <CircleMenuItem id="cdf" text="CDF" color="whitesmoke" angle={45} startAngle={135} onClick={toCdf} />
          <CircleMenuItem id="aleph" text="ALEPH" color="whitesmoke" angle={45} startAngle={180} onClick={toAleph} />
          <CircleMenuItem id="delphi" text="DELPHI" color="whitesmoke" angle={45} startAngle={225} onClick={toDelphi} />
          <CircleMenuItem id="opal" text="OPAL" color="whitesmoke" angle={45} startAngle={270} onClick={toOpal} />
          <CircleMenuItem id="l3" text="L3" color="whitesmoke" angle={45} startAngle={315} onClick={toL3} />
        </CircleMenu>
        */}
      </div>
      <div id="experiments" className="h-screen flex cursor-pointer">
        <div className="h-full card-experiment bg-atlas">
          <div className="card-experiment-title">ATLAS</div>
        </div>
        <div className="h-full card-experiment bg-cms">
          <div className="card-experiment-title">CMS</div>
        </div>
        <div className="h-full card-experiment bg-cdf">
          <div className="card-experiment-title">CDF</div>
        </div>
        <div className="h-full card-experiment bg-d0">
          <div className="card-experiment-title">D0</div>
        </div>
        <div className="w-full h-full">
          <div className="h-1/2 card-experiment bg-delphi">
            <div className="card-experiment-title">DELPHI</div>
          </div>
          <div className="h-1/2 card-experiment bg-opal">
            <div className="card-experiment-title">OPAL</div>
          </div>
        </div>
        <div className="w-full h-full">
          <div className="h-1/2 card-experiment bg-l3">
            <div className="card-experiment-title">L3</div>
          </div>
          <div className="h-1/2 card-experiment bg-aleph">
            <div className="card-experiment-title">ALEPH</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeRoute
