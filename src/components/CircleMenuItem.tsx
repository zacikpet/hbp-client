import React, { FC, useState } from 'react'

const UnitArcX = (angle: number) => Math.cos((angle * Math.PI) / 180)
const UnitArcY = (angle: number) => Math.sin((angle * Math.PI) / 180)

interface CircleItemProps {
  text: string
  angle: number
  startAngle: number
  color: string
  onClick?: () => void
  outerRadius?: number
  innerRadius?: number
  extend?: number
  fontSize?: number
}

const CircleMenuItem: FC<CircleItemProps> = ({
  fontSize = 10,
  text,
  angle,
  startAngle,
  color,
  onClick,
  outerRadius = 0,
  extend = 0,
}) => {
  const [select, setSelect] = useState(false)

  const centerX = extend + outerRadius
  const centerY = extend + outerRadius

  const getArc = (radius: number) => ({
    arcStartX: centerX - radius * UnitArcX(startAngle),
    arcStartY: centerY - radius * UnitArcY(startAngle),
    arcEndX: centerX - radius * UnitArcX(startAngle + angle),
    arcEndY: centerY - radius * UnitArcY(startAngle + angle),
  })

  const { arcStartX: outerArcStartX, arcStartY: outerArcStartY, arcEndX: outerArcEndX, arcEndY: outerArcEndY } = getArc(
    outerRadius
  )

  const textPadding = 20
  const textOuterRadius = outerRadius - textPadding

  const {
    arcStartX: textOuterArcStartX,
    arcStartY: textOuterArcStartY,
    arcEndX: textOuterArcEndX,
    arcEndY: textOuterArcEndY,
  } = getArc(textOuterRadius)

  const textInnerRadius = textOuterRadius - fontSize

  const {
    arcStartX: textInnerArcStartX,
    arcStartY: textInnerArcStartY,
    arcEndX: textInnerArcEndX,
    arcEndY: textInnerArcEndY,
  } = getArc(textInnerRadius)

  const translateX = Math.round(-extend * UnitArcX(startAngle + 0.5 * angle))
  const translateY = Math.round(-extend * UnitArcY(startAngle + 0.5 * angle))

  const css = { transitionDuration: '0.1s', fontSize: fontSize }
  const cssSelected = { ...css, transform: `translate(${translateX}px, ${translateY}px)` }
  const textCssSelected = { ...css, transform: `translate(0.1px, 0.1px)` }

  return (
    <>
      <path
        style={select ? cssSelected : css}
        fill={color}
        d={`M${centerX},${centerY} L${outerArcStartX},${outerArcStartY} A${outerRadius},${outerRadius} 1 0,1 ${outerArcEndX},${outerArcEndY} z`}
      />
      <defs>
        {startAngle + 0.5 * angle > 180 ? (
          <path
            id={`path-${text}`}
            stroke="black"
            strokeWidth="3"
            fill="none"
            className="transform"
            style={select ? cssSelected : css}
            d={`M${textOuterArcEndX},${textOuterArcEndY} A${textOuterRadius}, ${textOuterRadius} 1 0,0 ${textOuterArcStartX},${textOuterArcStartY}`}
          />
        ) : (
          <path
            id={`path-${text}`}
            stroke="black"
            strokeWidth="3"
            fill="none"
            className="transform"
            style={select ? cssSelected : css}
            d={`M${textInnerArcStartX},${textInnerArcStartY} A${textInnerRadius}, ${textInnerRadius} 1 0,1 ${textInnerArcEndX},${textInnerArcEndY}`}
          />
        )}
      </defs>
      <text textAnchor="middle" fill="black" className="text-xl transform" style={select ? textCssSelected : css}>
        <textPath xlinkHref={`#path-${text}`} startOffset="50%">
          {text}
        </textPath>
      </text>
      <path
        className="cursor-pointer"
        onClick={onClick}
        onMouseEnter={() => setSelect(true)}
        onMouseLeave={() => setSelect(false)}
        fillOpacity={0}
        d={`M${centerX},${centerY} L${outerArcStartX},${outerArcStartY} A${outerRadius},${outerRadius} 1 0,1 ${outerArcEndX},${outerArcEndY} z`}
      />
    </>
  )
}

export default CircleMenuItem
