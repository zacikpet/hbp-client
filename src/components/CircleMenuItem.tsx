import React, { FC, useContext, useState } from 'react'
import { CircleMenuContext } from './CircleMenu'

const cosine = (angle: number) => Math.cos((angle * Math.PI) / 180)
const sine = (angle: number) => Math.sin((angle * Math.PI) / 180)

interface CircleItemProps {
  id: string
  text: string
  angle: number
  startAngle: number
  color: string
  onClick?: () => void
  onHover?: (id: string) => void
}

const CircleMenuItem: FC<CircleItemProps> = ({ text, angle, startAngle, color, onClick, id, onHover }) => {
  const { outerRadius, extend, fontSize, innerRadius, initialAngle } = useContext(CircleMenuContext)
  const [select, setSelect] = useState(false)
  const centerX = extend + outerRadius
  const centerY = extend + outerRadius
  const width = outerRadius - innerRadius
  const textPadding = (width - fontSize) / 2
  const textOuterRadius = outerRadius - textPadding
  const textInnerRadius = textOuterRadius - fontSize
  startAngle += initialAngle

  const getArc = (radius: number) => ({
    arcStartX: centerX - radius * cosine(startAngle),
    arcStartY: centerY - radius * sine(startAngle),
    arcEndX: centerX - radius * cosine(startAngle + angle),
    arcEndY: centerY - radius * sine(startAngle + angle),
  })

  const handleMouseEnter = () => {
    setSelect(true)
    onHover && onHover(id)
  }

  const handleMouseLeave = () => {
    setSelect(false)
  }

  const { arcStartX: outerArcStartX, arcStartY: outerArcStartY, arcEndX: outerArcEndX, arcEndY: outerArcEndY } = getArc(
    outerRadius
  )

  const { arcStartX: innerArcStartX, arcStartY: innerArcStartY, arcEndX: innerArcEndX, arcEndY: innerArcEndY } = getArc(
    innerRadius
  )

  const {
    arcStartX: textOuterArcStartX,
    arcStartY: textOuterArcStartY,
    arcEndX: textOuterArcEndX,
    arcEndY: textOuterArcEndY,
  } = getArc(textOuterRadius)

  const {
    arcStartX: textInnerArcStartX,
    arcStartY: textInnerArcStartY,
    arcEndX: textInnerArcEndX,
    arcEndY: textInnerArcEndY,
  } = getArc(textInnerRadius)

  const translateX = Math.round(-extend * cosine(startAngle + 0.5 * angle))
  const translateY = Math.round(-extend * sine(startAngle + 0.5 * angle))

  const css = { transitionDuration: '0.1s', fontSize: fontSize }
  const cssSelected = { ...css, transform: `translate(${translateX}px, ${translateY}px)` }
  const textCssSelected = { ...css, transform: `translate(0.1px, 0.1px)` }

  return (
    <>
      <path
        style={select ? cssSelected : css}
        fill={color}
        d={`M${centerX},${centerY} L${outerArcStartX},${outerArcStartY} A${outerRadius},${outerRadius} 1 0,1 ${outerArcEndX},${outerArcEndY} 
        L${innerArcEndX},${innerArcEndY} A${innerRadius}, ${innerRadius} 1 0,0 ${innerArcStartX},${innerArcStartY}
        z`}
      />
      <defs>
        {Math.round(startAngle + 0.5 * angle) % 360 > 180 ? (
          <path
            id={`path-${id}`}
            stroke="black"
            strokeWidth="3"
            fill="none"
            className="transform"
            style={select ? cssSelected : css}
            d={`M${textOuterArcEndX},${textOuterArcEndY} A${textOuterRadius}, ${textOuterRadius} 1 0,0 ${textOuterArcStartX},${textOuterArcStartY}`}
          />
        ) : (
          <path
            id={`path-${id}`}
            stroke="black"
            strokeWidth="3"
            fill="none"
            className="transform"
            style={select ? cssSelected : css}
            d={`M${textInnerArcStartX},${textInnerArcStartY} A${textInnerRadius}, ${textInnerRadius} 1 0,1 ${textInnerArcEndX},${textInnerArcEndY}`}
          />
        )}
      </defs>

      <text textAnchor="middle" fill="white" className="text-xl transform" style={select ? textCssSelected : css}>
        <textPath xlinkHref={`#path-${id}`} startOffset="50%">
          {text}
        </textPath>
      </text>
      <path
        className="cursor-pointer"
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        fillOpacity={0}
        d={`M${centerX},${centerY} L${outerArcStartX},${outerArcStartY} A${outerRadius},${outerRadius} 1 0,1 ${outerArcEndX},${outerArcEndY} z`}
      />
    </>
  )
}

export default CircleMenuItem
