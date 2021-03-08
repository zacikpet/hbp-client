import React, { FC, useContext, useEffect, useState } from 'react'
import { Experiment, Paper, Type } from 'api/papers'
import { getTrackBackground, Range } from 'react-range'
import Checkbox from './Checkbox'
import { DarkModeContext } from '../App'

export type FilterOptions = {
  experiments: Experiment[]
  types: Type[]
  anyLuminosity: boolean
  anyEnergy: boolean
  luminosity: number[]
  energy: number[]
  anyDecay: boolean
  decay: {
    products: string[]
  }
}

type ArticleFiltersProps = {
  initial: FilterOptions
  onChange: (options: FilterOptions) => void
  papers: Paper[]
}

const options = [
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

const ArticleFilters: FC<ArticleFiltersProps> = ({ onChange, initial, papers }) => {
  const [experiments, setExperiments] = useState(initial.experiments)
  const [types, setTypes] = useState(initial.types)

  const [anyLuminosity, setAnyLuminosity] = useState(initial.anyLuminosity)
  const [anyEnergy, setAnyEnergy] = useState(initial.anyEnergy)

  const [luminosity, setLuminosity] = useState<number[]>(initial.luminosity)
  const [energy, setEnergy] = useState<number[]>(initial.energy)

  const [maxLuminosity, setMaxLuminosity] = useState(1)
  const [maxEnergy] = useState(20000000)

  const [anyDecay, setAnyDecay] = useState(initial.anyDecay)
  const [decay, setDecay] = useState(initial.decay)

  const darkMode = useContext(DarkModeContext)

  const addDecayProduct = (product: string) => {
    if (decay.products.includes(product)) return
    setDecay({
      ...decay,
      products: [...decay.products, product],
    })
  }

  const removeDecayProduct = (product: string) => {
    setDecay({ ...decay, products: decay.products.filter(p => p !== product) })
  }

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
    onChange({ experiments, types, luminosity, energy, anyEnergy, anyLuminosity, anyDecay, decay })
  }, [experiments, types, luminosity, energy, anyEnergy, anyLuminosity, anyDecay, decay])

  return (
    <div
      className="h-full flex flex-col px-5 border-r w-full dark:border-gray-700 overflow-y-auto sticky top-16 left-0"
      style={{ direction: 'rtl' }}
    >
      <div className="article-filter">
        <h2>Experiments</h2>
        <div className="flex justify-around p-2">
          <div>
            <Checkbox checked={experiments.includes('atlas')} onChange={() => selectExperiment('atlas')}>
              ATLAS
            </Checkbox>
            <Checkbox checked={experiments.includes('cms')} onChange={() => selectExperiment('cms')}>
              CMS
            </Checkbox>
            <Checkbox disabled checked={false}>
              CDF
            </Checkbox>
            <Checkbox disabled checked={false}>
              DØ
            </Checkbox>
          </div>
          <div>
            <Checkbox checked={experiments.includes('aleph')} onChange={() => selectExperiment('aleph')}>
              ALEPH
            </Checkbox>
            <Checkbox checked={experiments.includes('delphi')} onChange={() => selectExperiment('delphi')}>
              DELPHI
            </Checkbox>
            <Checkbox checked={experiments.includes('l3')} onChange={() => selectExperiment('l3')}>
              L3
            </Checkbox>
            <Checkbox checked={experiments.includes('opal')} onChange={() => selectExperiment('opal')}>
              OPAL
            </Checkbox>
          </div>
        </div>
      </div>
      <div className="article-filter">
        <h2>Type</h2>
        <div className="p-2">
          <Checkbox checked={types.includes('paper')} onChange={() => selectType('paper')}>
            Published papers
          </Checkbox>
          <Checkbox checked={types.includes('note')} onChange={() => selectType('note')}>
            Preliminary results
          </Checkbox>
        </div>
      </div>
      <div className="article-filter">
        <h2>Luminosity</h2>
        <Checkbox checked={anyLuminosity} onChange={setAnyLuminosity} className="m-2">
          Any
        </Checkbox>
        {!anyLuminosity && (
          <div className="p-2">
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
                <div
                  {...props}
                  style={{ ...props.style, cursor: 'pointer' }}
                  className="bg-primary w-4 h-4 rounded-full"
                />
              )}
            />
            {Math.round(luminosity[0] / 1000)} fb - {Math.round(luminosity[1] / 1000)} fb
          </div>
        )}
      </div>
      <div className="article-filter">
        <h2>Energy</h2>
        <Checkbox checked={anyEnergy} onChange={setAnyEnergy} className="m-2">
          Any
        </Checkbox>
        {!anyEnergy && (
          <div className="p-2">
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
                <div
                  {...props}
                  style={{ ...props.style, cursor: 'pointer' }}
                  className="bg-primary w-4 h-4 rounded-full"
                />
              )}
            />
            {Math.round(energy[0] / 1000000)} TeV - {Math.round(energy[1] / 1000000)} TeV
          </div>
        )}
      </div>
      <div className="article-filter">
        <h2>Decay products</h2>
        <Checkbox checked={anyDecay} onChange={setAnyDecay} className="m-2">
          Any
        </Checkbox>
        {!anyDecay && (
          <div className="">
            <select className="text-sm mb-2" onChange={event => addDecayProduct(event.target.value)}>
              {options.map(option => (
                <option value={option} onClick={() => addDecayProduct(option)}>
                  {option}
                </option>
              ))}
            </select>

            <div className="flex flex-wrap">
              {decay.products.map(product => (
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
        <Checkbox checked={true} className="m-2">
          SM
        </Checkbox>
        <Checkbox checked={true} className="m-2">
          BSM
        </Checkbox>
      </div>
      <div className="article-filter">
        <h2>Production mode</h2>
        <Checkbox checked={true} className="m-2">
          Gluon-gluon fusion
        </Checkbox>
        <Checkbox checked={true} className="m-2">
          Vector-boson fusion
        </Checkbox>
        <Checkbox checked={true} className="m-2">
          ttH
        </Checkbox>
        <Checkbox checked={true} className="m-2">
          WH/ZH
        </Checkbox>
      </div>
    </div>
  )
}

export default ArticleFilters
