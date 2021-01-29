import React, { FC, useContext, useMemo, useState } from 'react'
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
  all?: boolean
}

const CircleMenuItem: FC<CircleItemProps> = ({ all, text, angle, startAngle, color, onClick, id, onHover }) => {
  const { outerRadius, extend, fontSize, innerRadius, initialAngle, expandAll, setExpandAll } = useContext(
    CircleMenuContext
  )
  startAngle += initialAngle
  const [select, setSelect] = useState(false)
  const sineStartAngle = useMemo(() => sine(startAngle), [])
  const cosineStartAngle = useMemo(() => cosine(startAngle), [])
  const sineMidAngle = useMemo(() => sine(startAngle + angle / 2), [])
  const cosineMidAngle = useMemo(() => cosine(startAngle + angle / 2), [])
  const sineEndAngle = useMemo(() => sine(startAngle + angle), [])
  const cosineEndAngle = useMemo(() => cosine(startAngle + angle), [])

  const centerX = extend + outerRadius
  const centerY = extend + outerRadius
  const width = outerRadius - innerRadius
  const textPadding = (width - fontSize) / 2
  const textOuterRadius = outerRadius - textPadding
  const textInnerRadius = textOuterRadius - fontSize

  function getArc(radius: number) {
    return {
      arcStartX: centerX - radius * cosineStartAngle,
      arcStartY: centerY - radius * sineStartAngle,
      arcEndX: centerX - radius * cosineEndAngle,
      arcEndY: centerY - radius * sineEndAngle,
    }
  }

  function handleMouseEnter() {
    setSelect(true)
    onHover && onHover(id)
    all && setExpandAll && setExpandAll(true)
  }

  function handleMouseLeave() {
    setSelect(false)
    all && setExpandAll && setExpandAll(false)
  }

  const {
    arcStartX: outerArcStartX,
    arcStartY: outerArcStartY,
    arcEndX: outerArcEndX,
    arcEndY: outerArcEndY,
  } = useMemo(() => getArc(outerRadius), [])

  const {
    arcStartX: innerArcStartX,
    arcStartY: innerArcStartY,
    arcEndX: innerArcEndX,
    arcEndY: innerArcEndY,
  } = useMemo(() => getArc(innerRadius), [])

  const {
    arcStartX: textOuterArcStartX,
    arcStartY: textOuterArcStartY,
    arcEndX: textOuterArcEndX,
    arcEndY: textOuterArcEndY,
  } = useMemo(() => getArc(textOuterRadius), [])

  const {
    arcStartX: textInnerArcStartX,
    arcStartY: textInnerArcStartY,
    arcEndX: textInnerArcEndX,
    arcEndY: textInnerArcEndY,
  } = useMemo(() => getArc(textInnerRadius), [])

  const translateX = -extend * cosineMidAngle
  const translateY = -extend * sineMidAngle

  const css = { transitionDuration: '0.1s', fontSize: fontSize }
  const cssSelected = { ...css, transform: `translate(${translateX}px, ${translateY}px)` }
  const textCssSelected = { ...css, transform: `translate(0.1px, 0.1px)` }

  return (
    <>
      <path
        style={select || expandAll ? cssSelected : css}
        fill={color}
        d={`M${centerX},${centerY} L${outerArcStartX},${outerArcStartY} A${outerRadius},${outerRadius} 1 0,1 ${outerArcEndX},${outerArcEndY} 
        L${innerArcEndX},${innerArcEndY} A${innerRadius}, ${innerRadius} 1 0,0 ${innerArcStartX},${innerArcStartY}
        z`}
      />
      <defs>
        {(startAngle + 0.5 * angle) % 360 > 180 ? (
          <path
            id={`path-${id}`}
            stroke="black"
            strokeWidth="3"
            fill="none"
            className="transform"
            style={select || expandAll ? cssSelected : css}
            d={`M${textOuterArcEndX},${textOuterArcEndY} A${textOuterRadius}, ${textOuterRadius} 1 0,0 ${textOuterArcStartX},${textOuterArcStartY}`}
          />
        ) : (
          <path
            id={`path-${id}`}
            stroke="black"
            strokeWidth="3"
            fill="none"
            className="transform"
            style={select || expandAll ? cssSelected : css}
            d={`M${textInnerArcStartX},${textInnerArcStartY} A${textInnerRadius}, ${textInnerRadius} 1 0,1 ${textInnerArcEndX},${textInnerArcEndY}`}
          />
        )}
      </defs>

      <text
        textAnchor="middle"
        fill="white"
        className="text-xl transform"
        style={select || expandAll ? textCssSelected : css}
      >
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
