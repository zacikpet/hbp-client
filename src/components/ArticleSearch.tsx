import React, { FC, useState } from 'react'
import { ReactComponent as SearchSVG } from 'resources/svg/search.svg'
import useTextColor from '../hooks/useTextColor'

type ArticleSearchProps = {
  value: string
  onChange: (newValue: string) => void
  placeHolder?: string
}

const ArticleSearch: FC<ArticleSearchProps> = ({ value, onChange, placeHolder }) => {
  const textColor = useTextColor()
  const [searchString, setSearchString] = useState(value)

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault()
    onChange(searchString)
    e?.stopPropagation()
  }

  return (
    <div className="flex items-center h-10">
      <form onSubmit={handleSubmit}>
        <input
          className="input p-2 text-md tracking-wide"
          value={searchString}
          placeholder={placeHolder}
          onChange={e => setSearchString(e.target.value)}
        />
      </form>
      <div className="ml-2 mr-1 opacity-90 cursor-pointer" onClick={() => handleSubmit()}>
        <SearchSVG className="w-4" fill={textColor} />
      </div>
    </div>
  )
}

export default ArticleSearch
