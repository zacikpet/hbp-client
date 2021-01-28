import React, { FC } from 'react'

interface CircleMenuProps {
  outerRadius: number
  extend: number
  fontSize?: number
  innerRadius?: number
  initialAngle?: number
}

const CircleMenu: FC<CircleMenuProps> = ({
  children,
  outerRadius,
  extend,
  fontSize,
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
      }}
    >
      {React.Children.map(children, child => {
        if (React.isValidElement(child))
          return React.cloneElement(child, { outerRadius, extend, fontSize, innerRadius, initialAngle })
        else return child
      })}
      <circle fill="black" cx={centerX} cy={centerY} r={innerRadius} />
    </svg>
  )
}

export default CircleMenu
