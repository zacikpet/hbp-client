import React, { FC } from 'react'

interface CircleItemProps {
  angle: number
  startAngle: number
  color: string
}

const CircleMenuItem: FC<CircleItemProps> = ({ angle, startAngle, color }) => {
  const start = '192,192'
  let xTranslate = -5 * Math.cos(((startAngle + 0.5 * angle) * Math.PI) / 180)
  let yTranslate = -5 * Math.sin(((startAngle + 0.5 * angle) * Math.PI) / 180)

  xTranslate = Math.round((xTranslate / 5) * 8)
  yTranslate = Math.round((yTranslate / 5) * 8)

  console.log(color)
  console.log(xTranslate)
  console.log(yTranslate)

  const xSign = xTranslate > 0 ? '' : '-'
  const ySign = yTranslate > 0 ? '' : '-'

  return (
    <path
      className={`transform hover:bg-red-200 hover:${xSign}translate-x-${Math.abs(
        xTranslate
      )} hover:${ySign}translate-y-${Math.abs(
        yTranslate
      )} duration-100 cursor-pointer z-50`}
      fill={color}
      d={`M${start} L${192 - 160 * Math.cos((startAngle * Math.PI) / 180)},${
        192 - 160 * Math.sin((startAngle * Math.PI) / 180)
      } A160,160 1 0,1 ${
        192 - 160 * Math.cos(((angle + startAngle) * Math.PI) / 180)
      },${192 - 160 * Math.sin(((angle + startAngle) * Math.PI) / 180)} z`}
    />
  )
}

export default CircleMenuItem
