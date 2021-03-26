import React, { FC, useState } from 'react'
import { Model, Paper, patchPaper } from '../api/papers'
import { ReactComponent as CrossSVG } from 'resources/svg/cross.svg'
import Checkbox from './Checkbox'
import { particles } from './ArticleFilters'

type ArticleEditProps = {
  paper: Paper
  onEdit: (edited: Paper) => void
}

const ArticleEdit: FC<ArticleEditProps> = ({ paper, onEdit }) => {
  const [edited, setEdited] = useState(paper)

  const [loading, setLoading] = useState(false)

  function handleChangeModel(editedModel: Model) {
    setEdited({ ...edited, model: editedModel })
  }

  function addLuminosity() {
    setEdited({
      ...edited,
      luminosity: [...edited.luminosity, 0],
    })
  }

  function removeLuminosity(index: number) {
    setEdited({
      ...edited,
      luminosity: [...edited.luminosity.slice(0, index), ...edited.luminosity.slice(index + 1)],
    })
  }

  function changeLuminosity(index: number, newValue: number) {
    setEdited({
      ...edited,
      luminosity: [...edited.luminosity.slice(0, index), newValue, ...edited.luminosity.slice(index + 1)],
    })
  }

  function addEnergy() {
    setEdited({
      ...edited,
      energy: [...edited.energy, 0],
    })
  }

  function removeEnergy(index: number) {
    setEdited({
      ...edited,
      energy: [...edited.energy.slice(0, index), ...edited.energy.slice(index + 1)],
    })
  }

  function changeEnergy(index: number, newValue: number) {
    setEdited({
      ...edited,
      energy: [...edited.energy.slice(0, index), newValue, ...edited.energy.slice(index + 1)],
    })
  }

  function addLowerLimit() {
    setEdited({
      ...edited,
      lower_limit: 1,
    })
  }

  function removeLowerLimit() {
    setEdited({
      ...edited,
      lower_limit: undefined,
    })
  }

  function changeLowerLimit(newValue: number) {
    setEdited({
      ...edited,
      lower_limit: newValue,
    })
  }

  function addPrecision() {
    setEdited({
      ...edited,
      precision: {
        higgs_mass: 125,
        stat_error_up: 1,
        stat_error_down: 1,
        sys_error_up: 1,
        sys_error_down: 1,
      },
    })
  }

  function removePrecision() {
    setEdited({
      ...edited,
      precision: undefined,
    })
  }

  function setHiggsMass(newValue: number) {
    setEdited({
      ...edited,
      precision: edited.precision && {
        ...edited.precision,
        higgs_mass: newValue,
      },
    })
  }

  function setStatErrorUp(newValue: number) {
    setEdited({
      ...edited,
      precision: edited.precision && {
        ...edited.precision,
        stat_error_up: newValue,
      },
    })
  }

  function setStatErrorDown(newValue: number) {
    setEdited({
      ...edited,
      precision: edited.precision && {
        ...edited.precision,
        stat_error_down: newValue,
      },
    })
  }

  function setSysErrorUp(newValue: number) {
    setEdited({
      ...edited,
      precision: edited.precision && {
        ...edited.precision,
        sys_error_up: newValue,
      },
    })
  }

  function setSysErrorDown(newValue: number) {
    setEdited({
      ...edited,
      precision: edited.precision && {
        ...edited.precision,
        sys_error_down: newValue,
      },
    })
  }

  function handleEdit() {
    setLoading(true)
    patchPaper(paper._id, edited).then(() => {
      setLoading(false)
      onEdit(edited)
    })
  }

  return (
    <div className="w-full">
      <fieldset className="my-2">
        <legend>Higgs model</legend>

        <input
          className="cursor-pointer"
          name="model"
          type="radio"
          id="sm"
          checked={edited.model === 'sm'}
          onChange={e => e.target.checked && handleChangeModel('sm')}
        />
        <label className="ml-2" htmlFor="sm">
          Standard model
        </label>
        <br />
        <input
          className="cursor-pointer"
          name="model"
          type="radio"
          id="bsm"
          checked={edited.model === 'bsm'}
          onChange={e => e.target.checked && handleChangeModel('bsm')}
        />
        <label className="ml-2" htmlFor="bsm">
          Beyond the Standard model
        </label>
      </fieldset>

      <div className="my-2">
        <label>Luminosity</label>
        {edited.luminosity.map((value, index) => (
          <div className="flex items-center my-1">
            <input
              className="input mr-2 w-32"
              type="number"
              value={value}
              onChange={e => changeLuminosity(index, parseInt(e.target.value))}
            />
            <div className="font-semibold">fb^-1</div>
            <CrossSVG
              className="ml-2 w-4 h-4 text-red-600 hover:text-red-700 fill-current cursor-pointer"
              onClick={() => removeLuminosity(index)}
            />
          </div>
        ))}
        <button
          className="bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 rounded shadow w-8 h-8 text-2xl my-1"
          onClick={addLuminosity}
        >
          +
        </button>
      </div>

      <div className="my-2">
        <label>Centre of Mass Energy</label>
        {edited.energy.map((value, index) => (
          <div className="flex items-center my-1">
            <input
              className="input mr-2 w-32"
              type="number"
              value={value}
              onChange={e => changeEnergy(index, parseInt(e.target.value))}
            />
            <div className="font-semibold">keV</div>
            <CrossSVG
              className="ml-2 w-4 h-4 text-red-600 hover:text-red-700 fill-current cursor-pointer"
              onClick={() => removeEnergy(index)}
            />
          </div>
        ))}
        <button
          className="bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 rounded shadow w-8 h-8 text-2xl my-1"
          onClick={addEnergy}
        >
          +
        </button>
      </div>

      <div className="my-2">
        <label>Decay products</label>
        <div className="grid grid-cols-3">
          {particles.map(particle => (
            <div className="flex">
              <Checkbox key={particle} checked={edited.particles.product.includes(particle)} />
              {particle}
            </div>
          ))}
        </div>
      </div>

      <div className="my-2">
        <label>Lower mass limit at 95 % CL</label>
        {edited.lower_limit !== undefined ? (
          <div className="flex items-center">
            <input
              className="input"
              value={edited.lower_limit}
              onChange={e => changeLowerLimit(parseFloat(e.target.value))}
              type="number"
              step="0.1"
            />
            <CrossSVG
              className="ml-2 w-4 h-4 text-red-600 hover:text-red-700 fill-current cursor-pointer"
              onClick={removeLowerLimit}
            />
          </div>
        ) : (
          <div>
            <button
              className="bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 rounded shadow w-8 h-8 text-2xl my-1"
              onClick={addLowerLimit}
            >
              +
            </button>
          </div>
        )}
      </div>

      <div className="my-2">
        <label>Mass Precision Measurement</label>
        {edited.precision !== undefined ? (
          <div className="flex flex-col">
            <CrossSVG
              className="ml-2 w-4 h-4 text-red-600 hover:text-red-700 fill-current cursor-pointer"
              onClick={removePrecision}
            />
            <div>
              <label>Higgs mass</label>
              <input
                className="input ml-2"
                value={edited.precision.higgs_mass}
                onChange={e => setHiggsMass(parseFloat(e.target.value))}
                type="number"
                step="0.01"
              />
            </div>
            <div>
              <label>Upper statistical error</label>
              <input
                className="input ml-2"
                value={edited.precision.stat_error_up}
                onChange={e => setStatErrorUp(parseFloat(e.target.value))}
                type="number"
                step="0.01"
              />
            </div>
            <div>
              <label>Lower statistical error</label>
              <input
                className="input ml-2"
                value={edited.precision.stat_error_down}
                onChange={e => setStatErrorDown(parseFloat(e.target.value))}
                type="number"
                step="0.01"
              />
            </div>
            <div>
              <label>Upper systematic error</label>
              <input
                className="input ml-2"
                value={edited.precision.sys_error_up}
                onChange={e => setSysErrorUp(parseFloat(e.target.value))}
                type="number"
                step="0.01"
              />
            </div>
            <div>
              <label>Lower systematic error</label>
              <input
                className="input ml-2"
                value={edited.precision.sys_error_down}
                onChange={e => setSysErrorDown(parseFloat(e.target.value))}
                type="number"
                step="0.01"
              />
            </div>
          </div>
        ) : (
          <div>
            <button
              className="bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 rounded shadow w-8 h-8 text-2xl my-1"
              onClick={addPrecision}
            >
              +
            </button>
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <button className="btn mx-auto" onClick={handleEdit}>
          {loading ? 'Saving' : 'Save'}
        </button>
      </div>
    </div>
  )
}

export default ArticleEdit
