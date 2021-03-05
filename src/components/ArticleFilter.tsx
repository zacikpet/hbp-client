import React, { FC, useEffect, useState } from 'react'
import { Experiment, Paper, Type } from 'api/papers'
import { getTrackBackground, Range } from 'react-range'
import Checkbox from './Checkbox'

export type FilterOptions = {
  experiments: Experiment[]
  types: Type[]
  luminosity: number[]
  energy: number[]
}

type ArticleFilterProps = {
  initial: FilterOptions
  onChange: (options: FilterOptions) => void
  papers: Paper[]
}

const ArticleFilter: FC<ArticleFilterProps> = ({ onChange, initial, papers }) => {
  const [experiments, setExperiments] = useState(initial.experiments)
  const [types, setTypes] = useState(initial.types)

  const [luminosity, setLuminosity] = useState<number[]>(initial.luminosity)
  const [energy, setEnergy] = useState<number[]>(initial.energy)

  const [maxLuminosity, setMaxLuminosity] = useState(1)
  const [maxEnergy, setMaxEnergy] = useState(20000000)

  useEffect(() => {
    if (papers.length === 0) return

    const maxE = Math.max(...papers.map(p => Math.max(...p.energy)))
    const maxL = Math.max(...papers.map(p => Math.max(...p.luminosity)))

    //setMaxEnergy(maxE)
    setMaxLuminosity(maxL)

    //setEnergy([0, maxE])
    setLuminosity([0, maxL])
  }, [papers])

  const selectExperiment = (experiment: Experiment) => {
    if (experiments.includes(experiment)) setExperiments(experiments.filter(e => e !== experiment))
    else setExperiments([...experiments, experiment])
  }

  const selectType = (type: Type) => {
    if (types.includes(type)) setTypes(types.filter(t => t !== type))
    else setTypes([...types, type])
  }

  useEffect(() => {
    onChange({ experiments, types, luminosity, energy })
  }, [experiments, types, luminosity, energy])

  return (
    <div className="bg-white h-full flex flex-col px-5 py-5 border-r w-full">
      <h1 className="self-center">Filter</h1>
      <h2>Experiments</h2>
      <div className="flex justify-around">
        <div>
          <div className="flex">
            <Checkbox checked={experiments.includes('atlas')} onChange={() => selectExperiment('atlas')} />
            ATLAS
          </div>
          <div className="flex">
            <Checkbox checked={experiments.includes('cms')} onChange={() => selectExperiment('cms')} />
            CMS
          </div>
          <div className="text-gray-500">
            <input
              type="checkbox"
              disabled
              checked={experiments.includes('cdf')}
              onChange={() => selectExperiment('cdf')}
              className="bg-gray-300 m-1"
            />
            CDF
          </div>
          <div className="text-gray-500">
            <input
              type="checkbox"
              disabled
              checked={experiments.includes('d0')}
              onChange={() => selectExperiment('d0')}
              className="bg-gray-300 m-1"
            />
            DØ
          </div>
        </div>
        <div>
          <div className="flex">
            <Checkbox checked={experiments.includes('aleph')} onChange={() => selectExperiment('aleph')} />
            ALEPH
          </div>
          <div className="flex">
            <Checkbox checked={experiments.includes('delphi')} onChange={() => selectExperiment('delphi')} />
            DELPHI
          </div>
          <div className="flex">
            <Checkbox checked={experiments.includes('l3')} onChange={() => selectExperiment('l3')} />
            L3
          </div>
          <div className="flex">
            <Checkbox checked={experiments.includes('opal')} onChange={() => selectExperiment('opal')} />
            OPAL
          </div>
        </div>
      </div>
      <br />
      <h2>Type</h2>
      <div>
        <div className="flex">
          <Checkbox checked={types.includes('paper')} onChange={() => selectType('paper')} />
          Published papers
        </div>
        <div className="flex">
          <Checkbox checked={types.includes('note')} onChange={() => selectType('note')} />
          Preliminary results
        </div>
      </div>
      <br />
      <h2>Luminosity</h2>
      <Range
        step={1000}
        min={0}
        max={maxLuminosity}
        values={luminosity}
        onChange={setLuminosity}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              background: getTrackBackground({
                values: luminosity,
                colors: ['lightgray', 'green', 'lightgray'],
                min: 0,
                max: maxLuminosity,
              }),
            }}
            className="w-full h-1"
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div {...props} style={props.style} className="bg-green-600 w-4 h-4 rounded-full" />
        )}
      />
      {Math.round(luminosity[0] / 1000)} fb - {Math.round(luminosity[1] / 1000)} fb
      <br />
      <h2>Energy</h2>
      <Range
        step={1000000}
        min={0}
        max={maxEnergy}
        values={energy}
        onChange={setEnergy}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              background: getTrackBackground({
                values: energy,
                colors: ['lightgray', 'green', 'lightgray'],
                min: 0,
                max: maxEnergy,
              }),
            }}
            className="w-full h-1"
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div {...props} style={props.style} className="bg-green-600 w-4 h-4 rounded-full" />
        )}
      />
      {Math.round(energy[0] / 1000000)} TeV - {Math.round(energy[1] / 1000000)} TeV
    </div>
  )
}

export default ArticleFilter
