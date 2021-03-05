import React, { FC } from 'react'
import { ReactComponent as TickSVG } from 'resources/svg/tick.svg'

type CheckboxProps = {
  className?: string
  checked: boolean
  onChange: () => void
}

const Checkbox: FC<CheckboxProps> = ({ className, checked, onChange }) => {
  return (
    <button
      className={
        'h-4 w-4 border border-black duration-150 focus:outline-none m-1 flex justify-center items-center ' +
        (checked ? 'bg-green-600' : 'bg-white') +
        ' ' +
        className
      }
      onClick={onChange}
    >
      {checked && <TickSVG width="80%" height="80%" fill="white" />}
    </button>
  )
}

export default Checkbox
