import React, { FC } from 'react'
import { PrecisionPaper } from '../../api/papers'
import Latex from 'react-latex'

const PrecisionTooltip: FC<{ payload?: { value: number; payload: PrecisionPaper }[] }> = ({ payload }) => {
  if (!payload?.length) return <></>

  const date = new Date(payload[0].value).toDateString()
  const mass = payload[1].value

  const paper = payload[0].payload

  const title = paper.combined ? 'ATLAS + CMS' : paper.experiment.toUpperCase()

  return (
    <>
      {payload?.length && (
        <div className="bg-white dark:bg-gray-900 opacity-90 p-1 border dark:border-gray-700 rounded">
          <p className="font-semibold">{title}</p>
          <p className="mb-2">{date}</p>
          <Latex>{`$${mass}_{-${paper.stat_error_down}}^{+${paper.stat_error_up}}(stat.)_{-${paper.sys_error_down}}^{+${paper.sys_error_up}}(sys.)\\,GeV $`}</Latex>
        </div>
      )}
    </>
  )
}

export default PrecisionTooltip
