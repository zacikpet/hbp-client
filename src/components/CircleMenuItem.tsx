import React, { FC, useCallback, useContext, useMemo, useState } from 'react'
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

const CircleMenuItem: FC<CircleItemProps> = ({ color, all, text, angle, startAngle, onClick, id, onHover }) => {
  const { outerRadius, extend, fontSize, innerRadius, initialAngle, expandAll, setExpandAll } = useContext(
    CircleMenuContext
  )
  const _startAngle = startAngle + initialAngle
  const [select, setSelect] = useState(false)
  const sineStartAngle = useMemo(() => sine(_startAngle), [_startAngle])
  const cosineStartAngle = useMemo(() => cosine(_startAngle), [_startAngle])
  const sineMidAngle = useMemo(() => sine(_startAngle + angle / 2), [_startAngle, angle])
  const cosineMidAngle = useMemo(() => cosine(_startAngle + angle / 2), [_startAngle, angle])
  const sineEndAngle = useMemo(() => sine(_startAngle + angle), [_startAngle, angle])
  const cosineEndAngle = useMemo(() => cosine(_startAngle + angle), [_startAngle, angle])

  const centerX = extend + outerRadius
  const centerY = extend + outerRadius
  const width = outerRadius - innerRadius
  const textPadding = (width - fontSize) / 2
  const textOuterRadius = outerRadius - textPadding
  const textInnerRadius = textOuterRadius - fontSize

  const getArc = useCallback(
    (radius: number) => ({
      arcStartX: centerX - radius * cosineStartAngle,
      arcStartY: centerY - radius * sineStartAngle,
      arcEndX: centerX - radius * cosineEndAngle,
      arcEndY: centerY - radius * sineEndAngle,
    }),
    [cosineStartAngle, sineStartAngle, cosineEndAngle, sineEndAngle, centerX, centerY]
  )

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
  } = useMemo(() => getArc(outerRadius), [outerRadius, getArc])

  const {
    arcStartX: innerArcStartX,
    arcStartY: innerArcStartY,
    arcEndX: innerArcEndX,
    arcEndY: innerArcEndY,
  } = useMemo(() => getArc(innerRadius), [innerRadius, getArc])

  const {
    arcStartX: textOuterArcStartX,
    arcStartY: textOuterArcStartY,
    arcEndX: textOuterArcEndX,
    arcEndY: textOuterArcEndY,
  } = useMemo(() => getArc(textOuterRadius), [textOuterRadius, getArc])

  const {
    arcStartX: textInnerArcStartX,
    arcStartY: textInnerArcStartY,
    arcEndX: textInnerArcEndX,
    arcEndY: textInnerArcEndY,
  } = useMemo(() => getArc(textInnerRadius), [textInnerRadius, getArc])

  const translateX = -extend * cosineMidAngle
  const translateY = -extend * sineMidAngle

  const css = { transitionDuration: '0.1s', fontSize: fontSize }
  const cssSelected = { ...css, transform: `translate(${translateX}px, ${translateY}px)` }

  return (
    <>
      <defs>
        {(_startAngle + 0.5 * angle) % 360 > 180 ? (
          <path
            id={`path-${id}`}
            d={`M${textOuterArcEndX},${textOuterArcEndY} A${textOuterRadius}, ${textOuterRadius} 1 0,0 ${textOuterArcStartX},${textOuterArcStartY}`}
          />
        ) : (
          <path
            id={`path-${id}`}
            d={`M${textInnerArcStartX},${textInnerArcStartY} A${textInnerRadius}, ${textInnerRadius} 1 0,1 ${textInnerArcEndX},${textInnerArcEndY}`}
          />
        )}
      </defs>
      <g style={select || expandAll ? cssSelected : css}>
        <path
          fill={color}
          stroke="black"
          strokeWidth={0.1}
          d={`M${innerArcStartX},${innerArcStartY} L${outerArcStartX},${outerArcStartY} A${outerRadius},${outerRadius} 1 0,1 ${outerArcEndX},${outerArcEndY} 
        L${innerArcEndX},${innerArcEndY} A${innerRadius}, ${innerRadius} 1 0,0 ${innerArcStartX},${innerArcStartY}
        z`}
        />
        <text textAnchor="middle" fill="black" className="text-xl">
          <textPath href={`#path-${id}`} startOffset="50%" className="transform">
            {text}
          </textPath>
        </text>
      </g>

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
