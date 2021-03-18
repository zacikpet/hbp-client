import React, { FC, useEffect, useState } from 'react'
import { Legend, ReferenceLine, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from 'recharts'
import { getLowerLimits, LowerLimitPaper } from '../api/papers'
import { useHistory } from 'react-router-dom'

const ticks = [1990, 1992, 1994, 1996, 1998, 2000, 2002, 2004].map(year => new Date(year, 0).getTime())

const HistoryRoute: FC = () => {
  const history = useHistory()
  const [lowerLimits, setLowerLimits] = useState<LowerLimitPaper[]>([])

  useEffect(() => {
    getLowerLimits().then(setLowerLimits)
  }, [])

  function formatDate(value: number) {
    return new Date(value).getFullYear().toString()
  }

  function handleClick(paper: LowerLimitPaper) {
    history.push(`/articles/${paper._id}`)
  }

  if (lowerLimits.length === 0) return <>Loading</>

  return (
    <div>
      <div className="w-full flex flex-row flex-wrap-reverse items-center">
        <div className="w-full md:w-1/2 p-16 pb-0 md:p-16 md:px-32 2xl:px-64">
          <h1 className="text-4xl font-bold text-emphasis">The Higgs boson lower mass limit</h1>
          <br />
          <p className="font-serif font-light">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur.
          </p>
        </div>
        <div className="flex flex-col items-center w-full md:w-1/2 flex flex-col font-light p-16">
          <ScatterChart width={500} height={300}>
            <XAxis
              type="number"
              dataKey="date"
              scale="time"
              ticks={ticks}
              domain={['dataMin', 'dataMax']}
              tickFormatter={formatDate}
            />
            <YAxis
              dataKey="lower_limit"
              type="number"
              ticks={[0, 25, 50, 75, 100, 125, 150]}
              domain={[0, 150]}
              unit="GeV"
            />
            <Scatter
              onClick={handleClick}
              className="cursor-pointer"
              name="ALEPH"
              data={lowerLimits.filter(p => p.experiment === 'aleph')}
              fill="#3B790F"
            />
            <Scatter
              onClick={handleClick}
              className="cursor-pointer"
              name="DELPHI"
              data={lowerLimits.filter(p => p.experiment === 'delphi')}
              fill="#FBBF24"
            />
            <Scatter
              onClick={handleClick}
              className="cursor-pointer"
              name="L3"
              data={lowerLimits.filter(p => p.experiment === 'l3')}
              fill="#2563EB"
            />
            <Scatter
              onClick={handleClick}
              className="cursor-pointer"
              name="OPAL"
              data={lowerLimits.filter(p => p.experiment === 'opal')}
              fill="#DC2626"
            />
            <Tooltip
              formatter={(data: never) => {
                if (data < 1000) return data
                else return new Date(data).toDateString()
              }}
            />
            <ReferenceLine y={125} label="Higgs boson mass" stroke="red" />
            <Legend />
          </ScatterChart>
          <p className="source">Development of the lower mass limit of the Higgs Boson</p>
        </div>
      </div>
      {/*
      <h1>Accelerators</h1>
      <h2>LEP (ALEPH, DELPHI, L3, OPAL)</h2>
      <h2>Tevatron (CDF, DØ)</h2>
      <h2>LHC (ATLAS, CMS)</h2>
      <h1 className="font-bold text-2xl text-center">Development of Standard Model Higgs boson mass measurements</h1>
      */}
    </div>
  )
}

export default HistoryRoute
