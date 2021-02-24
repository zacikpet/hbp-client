import React, { FC, useState } from 'react'
// import HiggsImg from 'resources/higgs.png'
import Collision from 'resources/collision.png'

interface CircleMenuProps {
  outerRadius: number
  extend: number
  fontSize?: number
  innerRadius?: number
  initialAngle?: number
}

type CircleMenuContextType = {
  outerRadius: number
  extend: number
  fontSize: number
  innerRadius: number
  initialAngle: number
  expandAll: boolean
  setExpandAll: React.Dispatch<React.SetStateAction<boolean>> | null
}

export const CircleMenuContext = React.createContext<CircleMenuContextType>({
  outerRadius: 0,
  extend: 0,
  fontSize: 0,
  innerRadius: 0,
  initialAngle: 0,
  expandAll: false,
  setExpandAll: null,
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

  const [expandAll, setExpandAll] = useState(false)

  const css = {
    transitionDuration: '0.1s',
    width: 2 * outerRadius + 2 * extend,
    height: 2 * outerRadius + 2 * extend,
    filter: 'drop-shadow( 0 0 10px rgba(0, 0, 0, 0.2)',
  }

  return (
    <svg style={css} className="transform">
      <CircleMenuContext.Provider
        value={{ outerRadius, extend, fontSize, innerRadius, initialAngle, expandAll, setExpandAll }}
      >
        {children}
      </CircleMenuContext.Provider>
      <defs>
        <pattern id="image" x="0%" y="0%" height="100%" width="100%" viewBox="0 0 100 100">
          <image x="0%" y="0%" width="100" height="100" xlinkHref={Collision} preserveAspectRatio="xMinYMin slice" />
        </pattern>
      </defs>

      <circle cx={centerX} cy={centerY} r={innerRadius} fill="white" fillOpacity={0.5} />
    </svg>
  )
}

export default CircleMenu
