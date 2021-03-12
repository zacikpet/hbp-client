import React, { FC, useContext, useState } from 'react'
import { ReactComponent as SearchSVG } from 'resources/svg/search.svg'
import { DarkModeContext } from '../App'

type ArticleSearchProps = {
  value: string
  onChange: (newValue: string) => void
  placeHolder?: string
}

const ArticleSearch: FC<ArticleSearchProps> = ({ value, onChange, placeHolder }) => {
  const darkMode = useContext(DarkModeContext)
  const [searchString, setSearchString] = useState(value)

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault()
    onChange(searchString)
    e?.stopPropagation()
  }

  return (
    <div className="flex items-center">
      <div className="mx-1 opacity-90 cursor-pointer" onClick={() => handleSubmit()}>
        <SearchSVG className="w-4" fill={darkMode ? 'white' : 'black'} />
      </div>
      <form onSubmit={handleSubmit}>
        <input
          className="rounded border border-gray-200 dark:border-gray-800 m-2 px-2 font-semibold focus:outline-none focus:ring focus:ring-primary dark:bg-gray-850"
          value={searchString}
          placeholder={placeHolder}
          onChange={e => setSearchString(e.target.value)}
        />
      </form>
    </div>
  )
}

export default ArticleSearch
