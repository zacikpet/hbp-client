import React, { FC } from 'react'
import { Paper } from '../../api/papers'

const LowerLimitTooltip: FC<{ payload?: { value: number; payload: Paper }[] }> = ({ payload }) => {
  if (!payload?.length) return <></>

  const date = new Date(payload[0].value).toDateString()
  const limit = payload[1].value

  return (
    <>
      {payload?.length && (
        <div className="bg-white dark:bg-gray-900 opacity-80 p-1 border dark:border-gray-700 rounded">
          <p className="font-semibold">{payload[0].payload.experiment.toUpperCase()}</p>
          <p>{date}</p>
          <p>Lower Limit: {limit} GeV</p>
        </div>
      )}
    </>
  )
}

export default LowerLimitTooltip
