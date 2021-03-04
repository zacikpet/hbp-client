import React, { FC, useEffect, useState } from 'react'
import { Experiment, Type } from 'api/papers'
import { getTrackBackground, Range } from 'react-range'
import Checkbox from './Checkbox'

export type FilterOptions = {
  experiments: Experiment[]
  types: Type[]
}

type ArticleFilterProps = {
  initial: FilterOptions
  onChange: (options: FilterOptions) => void
}

const ArticleFilter: FC<ArticleFilterProps> = ({ onChange, initial }) => {
  const [experiments, setExperiments] = useState(initial.experiments)
  const [types, setTypes] = useState(initial.types)

  const [luminosity, setLuminosity] = useState([0, 100])
  const [energy, setEnergy] = useState([0, 100])

  const selectExperiment = (experiment: Experiment) => {
    if (experiments.includes(experiment)) setExperiments(experiments.filter(e => e !== experiment))
    else setExperiments([...experiments, experiment])
  }

  const selectType = (type: Type) => {
    if (types.includes(type)) setTypes(types.filter(t => t !== type))
    else setTypes([...types, type])
  }

  useEffect(() => {
    onChange({ experiments, types })
  }, [experiments, types])

  return (
    <div className="bg-white h-full flex flex-col px-5 py-5 border-r w-full">
      <h1 className="self-center">Filter</h1>
      <h2>Experiments</h2>
      <div className="flex justify-around">
        <div>
          <div>
            <Checkbox checked={experiments.includes('atlas')} onChange={() => selectExperiment('atlas')} />
            ATLAS
          </div>
          <div>
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
          <div>
            <Checkbox checked={experiments.includes('aleph')} onChange={() => selectExperiment('aleph')} />
            ALEPH
          </div>
          <div>
            <Checkbox checked={experiments.includes('delphi')} onChange={() => selectExperiment('delphi')} />
            DELPHI
          </div>
          <div>
            <Checkbox checked={experiments.includes('l3')} onChange={() => selectExperiment('l3')} />
            L3
          </div>
          <div>
            <Checkbox checked={experiments.includes('opal')} onChange={() => selectExperiment('opal')} />
            OPAL
          </div>
        </div>
      </div>
      <br />
      <h2>Type</h2>
      <div>
        <div>
          <Checkbox checked={types.includes('paper')} onChange={() => selectType('paper')} />
          Published papers
        </div>
        <div>
          <Checkbox checked={types.includes('note')} onChange={() => selectType('note')} />
          Preliminary results
        </div>
      </div>
      <br />
      <h2>Luminosity</h2>
      <Range
        step={1}
        min={0}
        max={100}
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
                max: 100,
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
      <br />
      <h2>Energy</h2>
      <Range
        step={1}
        min={0}
        max={100}
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
                max: 100,
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
    </div>
  )
}

export default ArticleFilter
