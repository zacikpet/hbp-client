import React, { FC } from 'react'
import { Experiment, Model, Stage } from 'api/papers'
import { getTrackBackground, Range } from 'react-range'
import Checkbox from './Checkbox'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import useDarkMode from '../hooks/useDarkMode'
import ArticleSearch from './ArticleSearch'

export const particles = [
  'boson',
  'higgs',
  'photon',
  'gluon',
  'w_boson',
  'z_boson',
  'quark',
  'top',
  'bottom',
  'up',
  'down',
  'charm',
  'strange',
  'lepton',
  'electron',
  'muon',
  'tau',
  'neutrino',
  'e_neutrino',
  'm_neutrino',
  't_neutrino',
  'invisible',
  'jets',
  'new',
  'gravitino',
  'dark',
]

export type FilterOptions = {
  experiments: Experiment[]
  stages: Stage[]
  anyLuminosity: boolean
  anyEnergy: boolean
  luminosity: number[]
  energy: number[]
  anyDecay: boolean
  decay: {
    products: string[]
  }
  models: Model[]
  date: [Date, Date]
  anyDate: boolean
  searchString: string
}

type ArticleFiltersProps = {
  options: FilterOptions
  onChange: (options: FilterOptions) => void
}

const ArticleFilters: FC<ArticleFiltersProps> = ({ onChange, options }) => {
  const darkMode = useDarkMode()
  const addDecayProduct = (product: string) => {
    if (options.decay.products.includes(product)) return
    onChange({
      ...options,
      decay: {
        ...options.decay,
        products: [...options.decay.products, product],
      },
    })
  }

  const removeDecayProduct = (product: string) => {
    onChange({
      ...options,
      decay: {
        ...options.decay,
        products: options.decay.products.filter(p => p !== product),
      },
    })
  }

  const selectExperiment = (experiment: Experiment) => {
    if (options.experiments.includes(experiment))
      onChange({ ...options, experiments: options.experiments.filter(e => e !== experiment) })
    else onChange({ ...options, experiments: [...options.experiments, experiment] })
  }

  const selectStage = (stage: Stage) => {
    if (options.stages.includes(stage)) onChange({ ...options, stages: options.stages.filter(s => s !== stage) })
    else onChange({ ...options, stages: [...options.stages, stage] })
  }

  const selectModel = (model: Model) => {
    if (options.models.includes(model)) onChange({ ...options, models: options.models.filter(m => m !== model) })
    else onChange({ ...options, models: [...options.models, model] })
  }

  const setAnyDecay = () => onChange({ ...options, anyDecay: !options.anyDecay })

  const setAnyLuminosity = () => onChange({ ...options, anyLuminosity: !options.anyLuminosity })

  const setAnyEnergy = () => onChange({ ...options, anyEnergy: !options.anyEnergy })

  const setLuminosity = (range: number[]) => onChange({ ...options, luminosity: range })

  const setEnergy = (range: number[]) => onChange({ ...options, energy: range })

  const setAnyDate = () => onChange({ ...options, anyDate: !options.anyDate })

  const handleStartDate = (date: Date) => {
    onChange({
      ...options,
      date: [date, options.date[1]],
    })
  }

  const handleEndDate = (date: Date) => {
    onChange({
      ...options,
      date: [options.date[0], date],
    })
  }

  return (
    <div className="flex flex-col" style={{ direction: 'rtl' }}>
      <div className="article-filter">
        <ArticleSearch
          value={options.searchString}
          onChange={newValue => onChange({ ...options, searchString: newValue })}
          placeHolder="Search"
        />
      </div>

      <div className="article-filter">
        <h2>Date</h2>
        <div className="p-2">
          <Checkbox checked={options.anyDate} onChange={setAnyDate}>
            All of time
          </Checkbox>
          {!options.anyDate && (
            <>
              <div className="flex items-center my-1">
                <p>From</p>
                <div className="mr-0 ml-auto">
                  <ReactDatePicker
                    showYearDropdown
                    dateFormat="dd. MM. yyyy"
                    closeOnScroll
                    className="h-8 rounded dark:bg-gray-850 cursor-pointer"
                    selected={options.date[0]}
                    onChange={handleStartDate}
                    popperModifiers={{
                      offset: { enabled: true, offset: -50 },
                    }}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between my-1">
                <p>To</p>
                <div className="mr-0 ml-auto">
                  <ReactDatePicker
                    showYearDropdown
                    dateFormat="dd. MM. yyyy"
                    closeOnScroll
                    className="h-8 rounded dark:bg-gray-850 cursor-pointer"
                    selected={options.date[1]}
                    onChange={handleEndDate}
                    popperModifiers={{
                      offset: { enabled: true, offset: -50 },
                    }}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="article-filter">
        <h2>Experiments</h2>
        <div className="flex p-2">
          <div className="mr-4">
            <Checkbox checked={options.experiments.includes('atlas')} onChange={() => selectExperiment('atlas')}>
              ATLAS
            </Checkbox>
            <Checkbox checked={options.experiments.includes('cms')} onChange={() => selectExperiment('cms')}>
              CMS
            </Checkbox>
            <Checkbox checked={options.experiments.includes('cdf')} onChange={() => selectExperiment('cdf')}>
              CDF
            </Checkbox>
            <Checkbox checked={options.experiments.includes('d0')} onChange={() => selectExperiment('d0')}>
              DØ
            </Checkbox>
          </div>
          <div>
            <Checkbox checked={options.experiments.includes('aleph')} onChange={() => selectExperiment('aleph')}>
              ALEPH
            </Checkbox>
            <Checkbox checked={options.experiments.includes('delphi')} onChange={() => selectExperiment('delphi')}>
              DELPHI
            </Checkbox>
            <Checkbox checked={options.experiments.includes('l3')} onChange={() => selectExperiment('l3')}>
              L3
            </Checkbox>
            <Checkbox checked={options.experiments.includes('opal')} onChange={() => selectExperiment('opal')}>
              OPAL
            </Checkbox>
          </div>
        </div>
      </div>
      <div className="article-filter">
        <h2>Luminosity</h2>
        <Checkbox checked={options.anyLuminosity} onChange={setAnyLuminosity} className="m-2">
          Any
        </Checkbox>
        {!options.anyLuminosity && (
          <div className="p-2">
            <Range
              step={1000}
              min={0}
              max={1000000}
              values={options.luminosity}
              onChange={setLuminosity}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    background: getTrackBackground({
                      values: options.luminosity,
                      colors: [darkMode ? '#374151' : 'lightgray', '#3B790F', darkMode ? '#374151' : 'lightgray'],
                      min: 0,
                      max: 1000000,
                    }),
                  }}
                  className="w-full h-1"
                >
                  {children}
                </div>
              )}
              renderThumb={({ props }) => (
                <div
                  {...props}
                  style={{ ...props.style, cursor: 'pointer' }}
                  className="bg-primary w-4 h-4 rounded-full"
                />
              )}
            />
            {Math.round(options.luminosity[0] / 1000)} fb - {Math.round(options.luminosity[1] / 1000)} fb
          </div>
        )}
      </div>
      <div className="article-filter">
        <h2>Energy</h2>
        <Checkbox checked={options.anyEnergy} onChange={setAnyEnergy} className="m-2">
          Any
        </Checkbox>
        {!options.anyEnergy && (
          <div className="p-2">
            <Range
              step={1000000}
              min={0}
              max={20000000}
              values={options.energy}
              onChange={setEnergy}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    background: getTrackBackground({
                      values: options.energy,
                      colors: [darkMode ? '#374151' : 'lightgray', '#3B790F', darkMode ? '#374151' : 'lightgray'],
                      min: 0,
                      max: 20000000,
                    }),
                  }}
                  className="w-full h-1"
                >
                  {children}
                </div>
              )}
              renderThumb={({ props }) => (
                <div
                  {...props}
                  style={{ ...props.style, cursor: 'pointer' }}
                  className="bg-primary w-4 h-4 rounded-full"
                />
              )}
            />
            {Math.round(options.energy[0] / 1000000)} TeV - {Math.round(options.energy[1] / 1000000)} TeV
          </div>
        )}
      </div>
      <div className="article-filter">
        <h2>Decay products</h2>
        <Checkbox checked={options.anyDecay} onChange={setAnyDecay} className="m-2">
          Any
        </Checkbox>
        {!options.anyDecay && (
          <div className="">
            <select className="input mb-2" onChange={event => addDecayProduct(event.target.value)}>
              {particles.map(particle => (
                <option key={particle} value={particle} onClick={() => addDecayProduct(particle)}>
                  {particle}
                </option>
              ))}
            </select>
            <p>{options.decay.products.length === 0 && 'No decay products selected.'}</p>

            <div className="flex flex-wrap">
              {options.decay.products.map(product => (
                <div
                  className="px-1 m-1 bg-primary rounded text-onprimary cursor-pointer"
                  onClick={() => removeDecayProduct(product)}
                >
                  {product}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="article-filter">
        <h2>Higgs model</h2>
        <Checkbox checked={options.models.includes('sm')} onChange={() => selectModel('sm')} className="m-2">
          Standard model
        </Checkbox>
        <Checkbox checked={options.models.includes('bsm')} onChange={() => selectModel('bsm')} className="m-2">
          Beyond the Standard model
        </Checkbox>
      </div>
      <div className="article-filter">
        <h2>Production mode</h2>
        <Checkbox checked={true} disabled className="m-2">
          Gluon-gluon fusion
        </Checkbox>
        <Checkbox checked={true} disabled className="m-2">
          Vector-boson fusion
        </Checkbox>
        <Checkbox checked={true} disabled className="m-2">
          WH/ZH
        </Checkbox>
        <Checkbox checked={true} disabled className="m-2">
          ttH
        </Checkbox>
      </div>
      <div className="article-filter">
        <h2>Type</h2>
        <div className="p-2">
          <Checkbox checked={options.stages.includes('preliminary')} onChange={() => selectStage('preliminary')}>
            Preliminary results
          </Checkbox>
          <Checkbox checked={options.stages.includes('submitted')} onChange={() => selectStage('submitted')}>
            Submitted papers
          </Checkbox>
          <Checkbox checked={options.stages.includes('published')} onChange={() => selectStage('published')}>
            Published papers
          </Checkbox>
        </div>
      </div>
    </div>
  )
}

export default ArticleFilters
