import React, { FC, useEffect, useState } from 'react'
import { Experiment, Type } from '../api/papers'

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
    <div className="bg-white h-full flex flex-col px-5 py-5 border-r">
      <h1 className="self-center">Filter</h1>
      <h2>Experiments</h2>
      <div className="flex">
        <div>
          <div>
            <input type="checkbox" checked={experiments.includes('atlas')} onChange={() => selectExperiment('atlas')} />
            ATLAS
          </div>
          <div>
            <input type="checkbox" checked={experiments.includes('cms')} onChange={() => selectExperiment('cms')} />
            CMS
          </div>
          <div className="text-gray-500">
            <input
              type="checkbox"
              disabled
              checked={experiments.includes('cdf')}
              onChange={() => selectExperiment('cdf')}
              className="bg-gray-300"
            />
            CDF
          </div>
          <div className="text-gray-500">
            <input
              type="checkbox"
              disabled
              checked={experiments.includes('d0')}
              onChange={() => selectExperiment('d0')}
              className="bg-gray-300"
            />
            DØ
          </div>
        </div>
        <div>
          <div>
            <input type="checkbox" checked={experiments.includes('aleph')} onChange={() => selectExperiment('aleph')} />
            ALEPH
          </div>
          <div>
            <input
              type="checkbox"
              checked={experiments.includes('delphi')}
              onChange={() => selectExperiment('delphi')}
            />
            DELPHI
          </div>
          <div>
            <input type="checkbox" checked={experiments.includes('l3')} onChange={() => selectExperiment('l3')} />
            L3
          </div>
          <div>
            <input type="checkbox" checked={experiments.includes('opal')} onChange={() => selectExperiment('opal')} />
            OPAL
          </div>
        </div>
      </div>
      <h2>Type</h2>
      <div>
        <div>
          <input type="checkbox" checked={types.includes('paper')} onChange={() => selectType('paper')} />
          Published papers
        </div>
        <div>
          <input type="checkbox" checked={types.includes('note')} onChange={() => selectType('note')} />
          Preliminary results
        </div>
      </div>
      <h2>Minimal luminosity</h2>
      <input type="range" min={0} max={500000} />
      <h2>Energy</h2>
      <input type="range" min={0} max={500000} />
    </div>
  )
}

export default ArticleFilter
