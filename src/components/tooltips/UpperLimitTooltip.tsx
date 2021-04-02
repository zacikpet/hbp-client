import React, { FC } from 'react'
import { Paper } from '../../api/papers'

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const UpperLimitTooltip: FC<{ payload?: { value: number; payload: Paper }[] }> = ({ payload }) => {
  if (!payload?.length) return <></>

  const date = new Date(payload[0].payload.date)
  const lower = payload[1].value
  const upper = payload[0].value

  return (
    <>
      {payload?.length && (
        <div className="bg-white dark:bg-gray-900 opacity-80 p-1 border dark:border-gray-700 rounded">
          <p className="font-semibold">
            {monthNames[date.getMonth()]} {date.getFullYear()}
          </p>
          <p>
            Excluded: {lower} - {upper} GeV
          </p>
        </div>
      )}
    </>
  )
}

export default UpperLimitTooltip
