import React, { FC, useContext, useEffect, useState } from 'react'
import { Experiment, Paper, Type } from 'api/papers'
import { getTrackBackground, Range } from 'react-range'
import Checkbox from './Checkbox'
import { DarkModeContext } from '../App'

export type FilterOptions = {
  experiments: Experiment[]
  types: Type[]
  luminosity: number[]
  energy: number[]
}

type ArticleFiltersProps = {
  initial: FilterOptions
  onChange: (options: FilterOptions) => void
  papers: Paper[]
}

const ArticleFilters: FC<ArticleFiltersProps> = ({ onChange, initial, papers }) => {
  const [experiments, setExperiments] = useState(initial.experiments)
  const [types, setTypes] = useState(initial.types)

  const [luminosity, setLuminosity] = useState<number[]>(initial.luminosity)
  const [energy, setEnergy] = useState<number[]>(initial.energy)

  const [maxLuminosity, setMaxLuminosity] = useState(1)
  const [maxEnergy] = useState(20000000)

  const darkMode = useContext(DarkModeContext)

  useEffect(() => {
    if (papers.length === 0) return

    // const maxE = Math.max(...papers.map(p => Math.max(...p.energy)))
    const maxL = Math.max(...papers.map(p => Math.max(...p.luminosity)))

    //setMaxEnergy(maxE)
    setMaxLuminosity(maxL)

    setEnergy([0, maxEnergy])
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
    <div className="h-full flex flex-col px-5 border-r w-full dark:border-gray-700">
      <div className="p-2 border-b dark:border-gray-700">
        <h2>Experiments</h2>
        <div className="flex justify-around p-2">
          <div>
            <div className="flex">
              <Checkbox checked={experiments.includes('atlas')} onChange={() => selectExperiment('atlas')} />
              ATLAS
            </div>
            <div className="flex">
              <Checkbox checked={experiments.includes('cms')} onChange={() => selectExperiment('cms')} />
              CMS
            </div>
            <div className="flex text-disabled">
              <Checkbox disabled checked={false} />
              CDF
            </div>
            <div className="flex text-disabled">
              <Checkbox disabled checked={false} />
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
      </div>
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
                colors: [darkMode ? '#374151' : 'lightgray', '#3B790F', darkMode ? '#374151' : 'lightgray'],
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
          <div {...props} style={{ ...props.style, cursor: 'pointer' }} className="bg-primary w-4 h-4 rounded-full" />
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
                colors: [darkMode ? '#374151' : 'lightgray', '#3B790F', darkMode ? '#374151' : 'lightgray'],
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
          <div {...props} style={{ ...props.style, cursor: 'pointer' }} className="bg-primary w-4 h-4 rounded-full" />
        )}
      />
      {Math.round(energy[0] / 1000000)} TeV - {Math.round(energy[1] / 1000000)} TeV
    </div>
  )
}

export default ArticleFilters
