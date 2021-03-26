import React, { FC, useEffect, useState } from 'react'
import {
  Legend,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { getLowerLimits, LowerLimitPaper } from '../api/papers'
import { useHistory } from 'react-router-dom'
import Loading from '../components/Loading'
import useDarkMode from '../hooks/useDarkMode'

const ticks = [1990, 1992, 1994, 1996, 1998, 2000, 2002, 2004].map(year => new Date(year, 0).getTime())

const testData = [
  {
    higgs_mass: 121,
    stat_error_up: 20,
    stat_error_down: 20,
    sys_error_up: 10,
    sys_error_down: 10,
    date: new Date(1994, 2),
  },
  {
    higgs_mass: 123,
    stat_error_up: 20,
    stat_error_down: 20,
    sys_error_up: 10,
    sys_error_down: 10,
    date: new Date(1996, 4),
  },
  {
    higgs_mass: 125,
    stat_error_up: 20,
    stat_error_down: 20,
    sys_error_up: 10,
    sys_error_down: 10,
    date: new Date(1998, 6),
  },
]

const HistoryRoute: FC = () => {
  const history = useHistory()
  const darkMode = useDarkMode()
  const [lowerLimits, setLowerLimits] = useState<LowerLimitPaper[]>([])

  useEffect(() => {
    getLowerLimits().then(setLowerLimits)
  }, [])

  function formatDate(value: number) {
    return new Date(value).getFullYear().toString()
  }

  function formatTooltip(value: number) {
    // mass
    if (value < 1000) return [value, 'Lower limit']
    // timestamp
    else return [new Date(value).toDateString(), 'Date']
  }

  function handleClick(paper: LowerLimitPaper) {
    history.push(`/articles/${paper._id}`)
  }

  if (lowerLimits.length === 0) return <Loading />

  return (
    <div className="min-h-page">
      <div className="w-full flex flex-row flex-wrap-reverse items-center">
        <div className="w-full md:w-1/2 p-16 pb-0 md:p-16 md:px-24 2xl:px-48">
          <h1 className="text-4xl font-bold text-emphasis">Lower mass limit of the Standard Model Higgs boson</h1>
          <br />
          <p className="font-serif font-light">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur.
          </p>
        </div>
        <div className="flex flex-col items-center w-full md:w-1/2 flex flex-col font-light p-16 h-screen-3/4">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart>
              <ReferenceArea
                x1={new Date(1989, 7).getTime()}
                x2={new Date(1994, 6).getTime()}
                y1={0}
                y2={125.35}
                label={{
                  position: 'insideBottom',
                  value: 'LEP I',
                }}
                opacity={0.4}
              />
              <ReferenceArea
                x1={new Date(1996, 6).getTime()}
                x2={new Date(2000, 10).getTime()}
                y1={0}
                y2={125.35}
                label={{
                  position: 'insideBottom',
                  value: 'LEP II',
                }}
                opacity={0.4}
              />
              <XAxis
                type="number"
                dataKey="date"
                scale="time"
                ticks={ticks}
                domain={[new Date(1989, 7).getTime(), 'dataMax']}
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
                fill={darkMode ? 'white' : 'black'}
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
              <Tooltip formatter={formatTooltip} />
              <ReferenceLine
                y={125.35}
                label={{
                  position: 'top',
                  value: 'Higgs boson mass',
                  fontWeight: 400,
                  fill: darkMode ? 'white' : 'black',
                  fillOpacity: 0.6,
                }}
                stroke="gray"
                strokeDasharray="5 3"
              />
              <Legend />
            </ScatterChart>
          </ResponsiveContainer>
          <p className="source">Figure 1. Development of the lower limit of SM Higgs Boson mass at LEP</p>
        </div>
      </div>

      <div className="w-full flex flex-row flex-wrap-reverse items-center">
        <div className="w-full md:w-1/2 p-16 pb-0 md:p-16 md:px-32 2xl:px-64">
          <h1 className="text-4xl font-bold text-emphasis">The Higgs boson mass measurement</h1>
          <br />
          <p className="font-serif font-light">The development of the measurement precision</p>
        </div>
        <div className="flex flex-col items-center w-full md:w-1/2 flex flex-col font-light p-16 h-screen-3/4">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart>
              <XAxis
                type="number"
                dataKey="date"
                scale="time"
                ticks={ticks}
                domain={[new Date(1989, 7).getTime(), 'dataMax']}
                tickFormatter={formatDate}
              />
              <YAxis
                dataKey="higgs_mass"
                type="number"
                ticks={[0, 25, 50, 75, 100, 125, 150]}
                domain={[0, 150]}
                unit="GeV"
              />

              {testData.map(precision => (
                <ReferenceLine
                  stroke="red"
                  segment={[
                    { x: precision.date.getTime(), y: precision.higgs_mass - precision.stat_error_down },
                    { x: precision.date.getTime(), y: precision.higgs_mass + precision.stat_error_up },
                  ]}
                />
              ))}

              {testData.map(precision => (
                <ReferenceLine
                  stroke="red"
                  segment={[
                    {
                      x: precision.date.getTime() - 1000 * 60 * 60 * 24 * 31 * 4,
                      y: precision.higgs_mass - precision.stat_error_down,
                    },
                    {
                      x: precision.date.getTime() + 1000 * 60 * 60 * 24 * 31 * 4,
                      y: precision.higgs_mass - precision.stat_error_down,
                    },
                  ]}
                />
              ))}

              {testData.map(precision => (
                <ReferenceLine
                  stroke="red"
                  segment={[
                    {
                      x: precision.date.getTime() - 1000 * 60 * 60 * 24 * 31 * 4,
                      y: precision.higgs_mass + precision.stat_error_up,
                    },
                    {
                      x: precision.date.getTime() + 1000 * 60 * 60 * 24 * 31 * 4,
                      y: precision.higgs_mass + precision.stat_error_up,
                    },
                  ]}
                />
              ))}

              {testData.map(precision => (
                <ReferenceLine
                  stroke="red"
                  segment={[
                    {
                      x: precision.date.getTime() - 1000 * 60 * 60 * 24 * 31 * 2,
                      y: precision.higgs_mass - precision.sys_error_down,
                    },
                    {
                      x: precision.date.getTime() + 1000 * 60 * 60 * 24 * 31 * 2,
                      y: precision.higgs_mass - precision.sys_error_down,
                    },
                  ]}
                />
              ))}

              {testData.map(precision => (
                <ReferenceLine
                  stroke="red"
                  segment={[
                    {
                      x: precision.date.getTime() - 1000 * 60 * 60 * 24 * 31 * 2,
                      y: precision.higgs_mass + precision.sys_error_up,
                    },
                    {
                      x: precision.date.getTime() + 1000 * 60 * 60 * 24 * 31 * 2,
                      y: precision.higgs_mass + precision.sys_error_up,
                    },
                  ]}
                />
              ))}

              <Scatter data={testData} />
            </ScatterChart>
          </ResponsiveContainer>
          <p className="source">Figure 1: Development of the lower limit of Higgs Boson mass</p>
        </div>
      </div>

      <div className="w-full flex flex-row flex-wrap-reverse items-center">
        <div className="w-full md:w-1/2 p-16 pb-0 md:p-16 md:px-32 2xl:px-64">
          <h1 className="text-4xl font-bold text-emphasis">The SM Higgs boson upper mass limit</h1>
          <br />
          <p className="font-serif font-light">
            The development of the mass have been compiled in reference to{' '}
            <a href="http://sopczak.web.cern.ch/sopczak/tevatron/JPhysG_39_2012_113001.pdf" target="_blank">
              http://sopczak.web.cern.ch/sopczak/tevatron/JPhysG_39_2012_113001.pdf
            </a>
          </p>
        </div>
        <div className="flex flex-col items-center w-full md:w-1/2 flex flex-col font-light p-16 h-screen-3/4">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart />
          </ResponsiveContainer>
          <p className="source">Figure 1: Development of the lower limit of Higgs Boson mass</p>
        </div>
      </div>
    </div>
  )
}

export default HistoryRoute
