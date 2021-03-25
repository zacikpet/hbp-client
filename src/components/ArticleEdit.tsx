import React, { FC, useState } from 'react'
import { Model, Paper } from '../api/papers'

type ArticleEditProps = {
  paper: Paper
  onSave: (edited: Paper) => void
}

const ArticleEdit: FC<ArticleEditProps> = ({ paper, onSave }) => {
  const [edited, setEdited] = useState(paper)

  function handleSave(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    e.stopPropagation()
    onSave(edited)
  }

  function handleChangeModel(editedModel: Model) {
    setEdited({ ...edited, model: editedModel })
  }

  return (
    <div className="w-full">
      <div className="my-2">
        <label>Title</label>
        <textarea className="input w-full h-20" value={paper.title} />
      </div>

      <div className="my-2">
        <label>Abstract</label>
        <textarea className="input w-full h-40" value={paper.abstract} />
      </div>

      <fieldset className="my-2">
        <legend>Higgs model</legend>

        <input
          className="cursor-pointer"
          name="model"
          type="radio"
          id="sm"
          checked={edited.model === 'sm'}
          onClick={() => handleChangeModel('sm')}
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
          onClick={() => handleChangeModel('bsm')}
        />
        <label className="ml-2" htmlFor="bsm">
          Beyond the Standard model
        </label>
      </fieldset>

      <div className="flex justify-center">
        <button className="btn mx-auto" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  )
}

export default ArticleEdit
