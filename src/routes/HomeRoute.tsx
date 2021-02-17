import React, { FC } from 'react'
import CircleMenuItem from '../components/CircleMenuItem'
import CircleMenu from '../components/CircleMenu'
import useRedirect from '../hooks/useRedirect'

const HomeRoute: FC = () => {
  const { toAtlas, toCms, toAleph, toCdf, toD0, toDelphi, toL3, toOpal } = useRedirect()

  const light = '#503067'
  const dark = '#332056'

  return (
    <CircleMenu outerRadius={200} extend={12} fontSize={20} innerRadius={120}>
      <CircleMenuItem id="atlas" text="ATLAS" onClick={toAtlas} color={dark} angle={90} startAngle={0} />
      <CircleMenuItem id="cms" text="CMS" onClick={toCms} color={light} angle={90} startAngle={90} />
      <CircleMenuItem id="d0" text="D0" color={dark} angle={30} startAngle={180} onClick={toD0} />
      <CircleMenuItem id="cdf" text="CDF" color={light} angle={30} startAngle={210} onClick={toCdf} />
      <CircleMenuItem id="aleph" text="ALEPH" color={dark} angle={30} startAngle={240} onClick={toAleph} />
      <CircleMenuItem id="delphi" text="DELPHI" color={light} angle={30} startAngle={270} onClick={toDelphi} />
      <CircleMenuItem id="opal" text="OPAL" color={dark} angle={30} startAngle={300} onClick={toOpal} />
      <CircleMenuItem id="l3" text="L3" color={light} angle={30} startAngle={330} onClick={toL3} />
    </CircleMenu>
  )
}

export default HomeRoute
