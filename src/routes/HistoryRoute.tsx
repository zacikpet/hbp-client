import React, { FC, useEffect, useState } from 'react'
import {
  Legend,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  ComposedChart,
  Tooltip,
  XAxis,
  YAxis,
  Line,
  Area,
  Label,
  CartesianGrid,
} from 'recharts'
import { getLowerLimits, getPrecision, LowerLimitPaper, PrecisionPaper } from '../api/papers'
import { useHistory } from 'react-router-dom'
import Loading from '../components/Loading'
import useDarkMode from '../hooks/useDarkMode'
import Gallery from '../components/Gallery'

const ticks = [1990, 1992, 1994, 1996, 1998, 2000, 2002, 2004].map(year => new Date(year, 0).getTime())

const upperLimitTicks = [2010, 2011, 2012].map(year => new Date(year, 0).getTime())

const precisionTicks = [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020].map(year => new Date(year, 0).getTime())

const tevatronLimits = [
  { date: new Date(2009, 3).getTime(), upper: 170, lower: 160, excluded: [160, 170] },
  { date: new Date(2010, 6).getTime(), upper: 175, lower: 158, excluded: [158, 175] },
  { date: new Date(2011, 3).getTime(), upper: 173, lower: 158, excluded: [158, 173] },
  { date: new Date(2012, 3).getTime(), upper: 179, lower: 147, excluded: [147, 179] },
  { date: new Date(2012, 6).getTime(), upper: 180, lower: 147, excluded: [147, 180] },
]

const HistoryRoute: FC = () => {
  const history = useHistory()
  const darkMode = useDarkMode()
  const [lowerLimits, setLowerLimits] = useState<LowerLimitPaper[]>([])
  const [precision, setPrecision] = useState<PrecisionPaper[]>([])

  const atlas = darkMode ? '#DD0000' : '#880000'
  const cms = darkMode ? '#00DDDD' : '#008888'

  useEffect(() => {
    getLowerLimits().then(setLowerLimits)
  }, [])

  useEffect(() => {
    getPrecision().then(setPrecision)
  }, [])

  function formatDate(value: number) {
    return new Date(value).getFullYear().toString()
  }

  function formatTooltip(value: number, label?: string) {
    // mass
    if (value < 1000) return [value, label]
    // timestamp
    else return [new Date(value).toDateString(), 'Date']
  }

  function handleClick(paper: LowerLimitPaper) {
    history.push(`/articles/${paper._id}`)
  }

  if (lowerLimits.length === 0) return <Loading />

  return (
    <div className="min-h-page">
      <Gallery
        title="Lower mass limit of the Standard Model Higgs boson"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur."
        contentClassName="w-full h-screen-2/3"
      >
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ bottom: 15 }}>
            <CartesianGrid stroke={darkMode ? '#222' : '#DDD'} />
            <ReferenceArea
              x1={new Date(1989, 7).getTime()}
              x2={new Date(1994, 6).getTime()}
              y1={0}
              y2={150}
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
              y2={150}
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
              domain={[new Date(1989, 7).getTime(), new Date(2005, 0).getTime()]}
              tickFormatter={formatDate}
            >
              <Label fill={darkMode ? 'white' : 'black'} value="Time" position="insideBottom" offset={-10} />
            </XAxis>
            <YAxis dataKey="lower_limit" type="number" ticks={[0, 25, 50, 75, 100, 125, 150]} domain={[0, 150]}>
              <Label
                fill={darkMode ? 'white' : 'black'}
                value="Mass (GeV)"
                position="left"
                offset={-10}
                angle={270}
                style={{ textAnchor: 'middle' }}
              />
            </YAxis>
            <Scatter
              onClick={handleClick}
              className="cursor-pointer"
              name="ALEPH"
              data={lowerLimits.filter(p => p.experiment === 'aleph')}
              fill="#b4ee7c"
            />
            <Scatter
              onClick={handleClick}
              className="cursor-pointer"
              name="DELPHI"
              data={lowerLimits.filter(p => p.experiment === 'delphi')}
              fill="#82ca9d"
            />
            <Scatter
              onClick={handleClick}
              className="cursor-pointer"
              name="L3"
              data={lowerLimits.filter(p => p.experiment === 'l3')}
              fill="#83a6ed"
            />
            <Scatter
              onClick={handleClick}
              className="cursor-pointer"
              name="OPAL"
              data={lowerLimits.filter(p => p.experiment === 'opal')}
              fill="#8884d8"
            />
            <Tooltip formatter={(value: number) => formatTooltip(value, 'Lower limit')} />
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
            <Legend verticalAlign="top" />
          </ScatterChart>
        </ResponsiveContainer>
      </Gallery>

      <Gallery
        title="The upper mass limit of the Standard Model Higgs boson"
        text={
          <p className="font-serif font-light">
            Development of the upper mass limit of the Standard Model Higgs boson. The limits were compiled in reference
            to&nbsp;
            <a
              href="http://sopczak.web.cern.ch/sopczak/tevatron/JPhysG_39_2012_113001.pdf"
              target="_blank"
              className="text-blue-700 hover:underline"
            >
              this paper&nbsp;
            </a>
            and set by the CDF and DØ collaborations. The red area represents the excluded mass range of the Standard
            Model Higgs boson at 95 % confidence level.
          </p>
        }
        contentClassName="w-full h-screen-2/3"
        reversed
      >
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={tevatronLimits} margin={{ top: 5, left: 0, right: 5, bottom: 15 }}>
            <CartesianGrid stroke={darkMode ? '#222' : '#DDD'} />
            <Line dataKey="upper" stroke="#222222" />
            <Line dataKey="lower" stroke="#222222" />
            <Area dataKey="excluded" fill="#EF4444" label="Excluded zone" />
            <Tooltip />
            <YAxis domain={[120, 180]} ticks={[120, 130, 140, 150, 160, 170, 180]}>
              <Label
                fill={darkMode ? 'white' : 'black'}
                value="Mass (GeV)"
                position="left"
                offset={-10}
                angle={270}
                style={{ textAnchor: 'middle' }}
              />
            </YAxis>
            <XAxis
              dataKey="date"
              type="number"
              scale="time"
              domain={['dataMin', 'dataMax']}
              tickFormatter={formatDate}
              ticks={upperLimitTicks}
            >
              <Label fill={darkMode ? 'white' : 'black'} value="Time" position="insideBottom" offset={-10} />
            </XAxis>
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
          </ComposedChart>
        </ResponsiveContainer>
      </Gallery>

      <Gallery
        title="The Higgs boson mass measurement"
        text="Development of the precision of the Higgs boson mass measurement by the ATLAS and CMS collaborations. The solid dot represents the measured Higgs boson mass. The inner error bar shows the statistical uncertainty, while the outer error bar shows the combined uncertainty (statistical and systematic)."
        contentClassName="w-full h-screen-3/4"
      >
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 0, left: 15, right: 15, bottom: 15 }}>
            <CartesianGrid stroke={darkMode ? '#222' : '#DDD'} />
            <XAxis
              type="number"
              dataKey="date"
              scale="time"
              ticks={precisionTicks}
              domain={[new Date(2013, 0).getTime(), new Date(2021, 0).getTime()]}
              tickFormatter={formatDate}
            >
              <Label fill={darkMode ? 'white' : 'black'} value="Time" position="insideBottom" offset={-10} />
            </XAxis>
            <YAxis
              dataKey="higgs_mass"
              type="number"
              ticks={[124, 124.2, 124.4, 124.6, 124.8, 125, 125.2, 125.4, 125.6, 125.8, 126]}
              domain={[124, 126]}
            >
              <Label
                fill={darkMode ? 'white' : 'black'}
                value="Mass (GeV)"
                position="left"
                angle={270}
                style={{ textAnchor: 'middle' }}
              />
            </YAxis>

            {precision.map(precision => (
              <ReferenceLine
                stroke={precision.experiment === 'atlas' ? atlas : cms}
                segment={[
                  {
                    x: precision.date,
                    y: precision.higgs_mass - Math.sqrt(precision.stat_error_up ** 2 + precision.sys_error_up ** 2),
                  },
                  {
                    x: precision.date,
                    y: precision.higgs_mass + Math.sqrt(precision.stat_error_up ** 2 + precision.sys_error_up ** 2),
                  },
                ]}
              />
            ))}

            {precision.map(precision => (
              <ReferenceLine
                stroke={precision.experiment === 'atlas' ? atlas : cms}
                segment={[
                  {
                    x: precision.date - 1000 * 60 * 60 * 24 * 31,
                    y: precision.higgs_mass - precision.stat_error_down,
                  },
                  {
                    x: precision.date + 1000 * 60 * 60 * 24 * 31,
                    y: precision.higgs_mass - precision.stat_error_down,
                  },
                ]}
              />
            ))}

            {precision.map(precision => (
              <ReferenceLine
                stroke={precision.experiment === 'atlas' ? atlas : cms}
                segment={[
                  {
                    x: precision.date - 1000 * 60 * 60 * 24 * 31,
                    y: precision.higgs_mass + precision.stat_error_up,
                  },
                  {
                    x: precision.date + 1000 * 60 * 60 * 24 * 31,
                    y: precision.higgs_mass + precision.stat_error_up,
                  },
                ]}
              />
            ))}

            {precision.map(precision => (
              <ReferenceLine
                stroke={precision.experiment === 'atlas' ? atlas : cms}
                segment={[
                  {
                    x: precision.date - 1000 * 60 * 60 * 24 * 31 * 2,
                    y: precision.higgs_mass - Math.sqrt(precision.stat_error_up ** 2 + precision.sys_error_up ** 2),
                  },
                  {
                    x: precision.date + 1000 * 60 * 60 * 24 * 31 * 2,
                    y: precision.higgs_mass - Math.sqrt(precision.stat_error_up ** 2 + precision.sys_error_up ** 2),
                  },
                ]}
              />
            ))}

            {precision.map(precision => (
              <ReferenceLine
                stroke={precision.experiment === 'atlas' ? atlas : cms}
                segment={[
                  {
                    x: precision.date - 1000 * 60 * 60 * 24 * 31 * 2,
                    y: precision.higgs_mass + Math.sqrt(precision.stat_error_up ** 2 + precision.sys_error_up ** 2),
                  },
                  {
                    x: precision.date + 1000 * 60 * 60 * 24 * 31 * 2,
                    y: precision.higgs_mass + Math.sqrt(precision.stat_error_up ** 2 + precision.sys_error_up ** 2),
                  },
                ]}
              />
            ))}

            <Scatter
              name="ATLAS"
              className="cursor-pointer"
              data={precision.filter(item => item.experiment === 'atlas')}
              fill={atlas}
              onClick={handleClick}
            />
            <Scatter
              name="CMS"
              className="cursor-pointer"
              data={precision.filter(item => item.experiment === 'cms')}
              fill={cms}
              onClick={handleClick}
            />
            <Tooltip formatter={(value: number) => formatTooltip(value, 'Measured mass')} />
            <Legend verticalAlign="top" />
          </ScatterChart>
        </ResponsiveContainer>
      </Gallery>
    </div>
  )
}

export default HistoryRoute
