import React, { FC, useState } from 'react'
import { Experiment, Model, Production, Stage } from 'api/papers'
import { getTrackBackground, Range } from 'react-range'
import Checkbox from './Checkbox'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import useDarkMode from '../hooks/useDarkMode'
import ArticleSearch from './ArticleSearch'
import Card from './Card'

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
  anyProduction: boolean
  productions: Production[]
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

  const [luminosity, setLuminosity] = useState(options.luminosity)
  const [energy, setEnergy] = useState(options.energy)

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

  const selectProduction = (mode: Production) => {
    if (options.productions.includes(mode))
      onChange({ ...options, productions: options.productions.filter(m => m !== mode) })
    else onChange({ ...options, productions: [...options.productions, mode] })
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

  const setAnyProduction = () => onChange({ ...options, anyProduction: !options.anyProduction })

  const setAnyLuminosity = () => onChange({ ...options, anyLuminosity: !options.anyLuminosity })

  const setAnyEnergy = () => onChange({ ...options, anyEnergy: !options.anyEnergy })

  const commitLuminosity = (range: number[]) => onChange({ ...options, luminosity: range })

  const commitEnergy = (range: number[]) => onChange({ ...options, energy: range })

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
    <div className="flex flex-col gap-2">
      <div className="bg-white dark:bg-gray-850 shadow rounded p-2">
        <ArticleSearch
          value={options.searchString}
          onChange={newValue => onChange({ ...options, searchString: newValue })}
          placeHolder="Search"
        />
      </div>
      <Card title="Date">
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
      </Card>
      <Card title="Experiments" className="flex">
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
      </Card>
      <Card title="Luminosity">
        <Checkbox checked={options.anyLuminosity} onChange={setAnyLuminosity} className="m-2">
          Any
        </Checkbox>
        {!options.anyLuminosity && (
          <div className="p-2 text-center">
            <Range
              onChange={setLuminosity}
              step={1000}
              min={0}
              max={139000}
              values={luminosity}
              onFinalChange={commitLuminosity}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    background: getTrackBackground({
                      values: luminosity,
                      colors: [darkMode ? '#374151' : 'lightgray', '#3B790F', darkMode ? '#374151' : 'lightgray'],
                      min: 0,
                      max: 139000,
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
            <p className="text-sm tracking-wide mt-1">
              {Math.round(luminosity[0] / 1000)} fb<sup>-1</sup> - {Math.round(luminosity[1] / 1000)} fb<sup>-1</sup>
            </p>
          </div>
        )}
      </Card>
      <Card title="Centre-of-mass Energy">
        <Checkbox checked={options.anyEnergy} onChange={setAnyEnergy} className="m-2">
          Any
        </Checkbox>
        {!options.anyEnergy && (
          <div className="p-2 text-center">
            <Range
              step={1000000}
              min={0}
              max={14000000}
              values={energy}
              onChange={setEnergy}
              onFinalChange={commitEnergy}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    background: getTrackBackground({
                      values: energy,
                      colors: [darkMode ? '#374151' : 'lightgray', '#3B790F', darkMode ? '#374151' : 'lightgray'],
                      min: 0,
                      max: 14000000,
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
            <p className="text-sm tracking-wide mt-1">
              {Math.round(energy[0] / 1000000)} TeV - {Math.round(energy[1] / 1000000)} TeV
            </p>
          </div>
        )}
      </Card>
      <Card title="Decay products">
        <Checkbox checked={options.anyDecay} onChange={setAnyDecay} className="m-2">
          Any
        </Checkbox>
        {!options.anyDecay && (
          <div className="flex flex-col gap-2">
            <p className="text-xs tracking-wider">Options: </p>
            <select className="input" onChange={event => addDecayProduct(event.target.value)}>
              {particles.map(particle => (
                <option key={particle} value={particle} onClick={() => addDecayProduct(particle)}>
                  {particle}
                </option>
              ))}
            </select>
            <p className="text-xs tracking-wider">
              {options.decay.products.length === 0 ? 'No decay products selected.' : 'Selected:'}
            </p>
            <div className="flex flex-wrap gap-1">
              {options.decay.products.map(product => (
                <div
                  key={product}
                  onClick={() => removeDecayProduct(product)}
                  className="p-2 cursor-pointer tracking-wider uppercase text-xs font-semibold bg-primary rounded text-onprimary"
                >
                  {product}
                </div>
              ))}
            </div>
            {options.decay.products.length > 0 && (
              <p className="text-disabled text-xs tracking-wider">Click on decay product to remove.</p>
            )}
          </div>
        )}
      </Card>
      <Card title="Higgs model">
        <Checkbox checked={options.models.includes('sm')} onChange={() => selectModel('sm')} className="m-2">
          Standard model
        </Checkbox>
        <Checkbox checked={options.models.includes('bsm')} onChange={() => selectModel('bsm')} className="m-2">
          Beyond the Standard model
        </Checkbox>
      </Card>
      <Card title="Production mode">
        <Checkbox checked={options.anyProduction} onChange={setAnyProduction} className="m-2">
          Any
        </Checkbox>

        {!options.anyProduction && (
          <>
            <Checkbox
              checked={options.productions.includes('ggf')}
              className="m-2"
              onChange={() => selectProduction('ggf')}
            >
              Gluon-gluon fusion
            </Checkbox>
            <Checkbox
              checked={options.productions.includes('vbf')}
              className="m-2"
              onChange={() => selectProduction('vbf')}
            >
              Vector-boson fusion
            </Checkbox>
            <Checkbox
              checked={options.productions.includes('whzh')}
              className="m-2"
              onChange={() => selectProduction('whzh')}
            >
              WH/ZH
            </Checkbox>
            <Checkbox
              checked={options.productions.includes('tth')}
              className="m-2"
              onChange={() => selectProduction('tth')}
            >
              ttH
            </Checkbox>
          </>
        )}
      </Card>
      <Card title="Stage">
        <Checkbox checked={options.stages.includes('preliminary')} onChange={() => selectStage('preliminary')}>
          Preliminary results
        </Checkbox>
        <Checkbox checked={options.stages.includes('submitted')} onChange={() => selectStage('submitted')}>
          Submitted papers
        </Checkbox>
        <Checkbox checked={options.stages.includes('published')} onChange={() => selectStage('published')}>
          Published papers
        </Checkbox>
      </Card>
    </div>
  )
}

export default ArticleFilters
