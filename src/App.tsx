import React, { FC, useEffect, useState } from 'react'
import CircleMenu from 'components/CircleMenu'
import CircleMenuItem from 'components/CircleMenuItem'
import useRedirect from 'hooks/useRedirect'
import CmsBG from 'resources/cms.jpg'
import AtlasBG from 'resources/atlas.jpg'
import DelphiBG from 'resources/delphi.jpg'
import Navbar from './components/Navbar'

const images = [CmsBG, AtlasBG, DelphiBG]

const getBG = (id: string) => {
  switch (id) {
    case 'atlas':
      return AtlasBG
    case 'cms':
      return CmsBG
    case 'delphi':
      return DelphiBG
    default:
      return ''
  }
}

const App: FC = () => {
  const [background, setBackground] = useState('atlas')
  const { toAtlas, toCms } = useRedirect()

  const light = '#503067'
  const dark = '#332056'

  /**
   * Preload backgrounds
   */
  useEffect(() => {
    images.forEach(image => {
      const img = new Image()
      img.src = image
    })
  }, [])

  return (
    <div className={`w-screen h-screen bg-white flex flex-col justify-center items-center font-bold`}>
      <Navbar />
      <CircleMenu outerRadius={200} extend={12} fontSize={20} innerRadius={120}>
        <CircleMenuItem
          id="atlas"
          text="ATLAS"
          onClick={toAtlas}
          onHover={setBackground}
          color={dark}
          angle={90}
          startAngle={0}
        />
        <CircleMenuItem
          id="cms"
          text="CMS"
          onClick={toCms}
          onHover={setBackground}
          color={light}
          angle={90}
          startAngle={90}
        />
        <CircleMenuItem id="d0" text="D0" color={dark} angle={30} startAngle={180} />
        <CircleMenuItem id="cdf" text="CDF" color={light} angle={30} startAngle={210} />
        <CircleMenuItem id="aleph" text="ALEPH" color={dark} angle={30} startAngle={240} />
        <CircleMenuItem id="delphi" text="DELPHI" color={light} angle={30} startAngle={270} onHover={setBackground} />
        <CircleMenuItem id="opal" text="OPAL" color={dark} angle={30} startAngle={300} />
        <CircleMenuItem id="l3" text="L3" color={light} angle={30} startAngle={330} />
      </CircleMenu>
    </div>
  )
}

export default App
