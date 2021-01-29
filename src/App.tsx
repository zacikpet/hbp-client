import React, { FC, useEffect, useState } from 'react'
import CircleMenu from 'components/CircleMenu'
import CircleMenuItem from 'components/CircleMenuItem'
import useRedirect from 'hooks/useRedirect'
import CmsBG from 'resources/cms.jpg'
import AtlasBG from 'resources/atlas.jpg'
import DelphiBG from 'resources/delphi.jpg'

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

  const dark = 'rgb(48,37,81)'
  const light = 'rgb(70,53,133)'

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
    <div
      className={`w-screen h-screen bg-gray-100 flex flex-col justify-center items-center transition-all bg-cover font-bold`}
      style={{
        backgroundImage: `url(${getBG('')})`,
      }}
    >
      <CircleMenu outerRadius={200} extend={20} fontSize={20} innerRadius={120}>
        <CircleMenuItem
          id="atlas"
          text="ATLAS"
          onClick={toAtlas}
          onHover={setBackground}
          color={light}
          angle={60}
          startAngle={0}
        />
        <CircleMenuItem
          id="all"
          text="ALL"
          onClick={toAtlas}
          onHover={setBackground}
          color={dark}
          angle={60}
          startAngle={60}
          all
        />
        <CircleMenuItem
          id="cms"
          text="CMS"
          onClick={toCms}
          onHover={setBackground}
          color={light}
          angle={60}
          startAngle={120}
        />
        <CircleMenuItem id="d0" text="D0" color={dark} angle={36} startAngle={180} />
        <CircleMenuItem id="aleph" text="ALEPH" color={light} angle={36} startAngle={216} />
        <CircleMenuItem id="delphi" text="DELPHI" color={dark} angle={36} startAngle={252} onHover={setBackground} />
        <CircleMenuItem id="opal" text="OPAL" color={light} angle={36} startAngle={288} />
        <CircleMenuItem id="l3" text="L3" color={dark} angle={36} startAngle={324} />
      </CircleMenu>
    </div>
  )
}

export default App
