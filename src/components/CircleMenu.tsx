import React, { FC } from 'react'
import HiggsImg from 'resources/higgs.png'

interface CircleMenuProps {
  outerRadius: number
  extend: number
  fontSize?: number
  innerRadius?: number
  initialAngle?: number
}

export const CircleMenuContext = React.createContext({
  outerRadius: 0,
  extend: 0,
  fontSize: 0,
  innerRadius: 0,
  initialAngle: 0,
})

const CircleMenu: FC<CircleMenuProps> = ({
  children,
  outerRadius,
  extend,
  fontSize = 20,
  initialAngle = 0,
  innerRadius = outerRadius / 2,
}) => {
  const centerX = outerRadius + extend
  const centerY = outerRadius + extend

  return (
    <svg
      style={{
        width: 2 * outerRadius + 2 * extend,
        height: 2 * outerRadius + 2 * extend,
        filter: 'drop-shadow( 0 0 15px rgba(0, 0, 0, .7)',
      }}
    >
      <CircleMenuContext.Provider value={{ outerRadius, extend, fontSize, innerRadius, initialAngle }}>
        {children}
      </CircleMenuContext.Provider>

      <defs>
        <pattern id="image" x="0%" y="0%" height="100%" width="100%" viewBox="0 0 100 100">
          <image x="0%" y="0%" width="100" height="100" xlinkHref={HiggsImg} preserveAspectRatio="xMinYMin slice" />
        </pattern>
      </defs>

      <circle cx={centerX} cy={centerY} r={innerRadius} fill="url(#image)" className="cursor-pointer" />
    </svg>
  )
}

export default CircleMenu
