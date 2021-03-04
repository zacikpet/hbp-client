import React, { FC } from 'react'

type CheckboxProps = {
  className?: string
  checked: boolean
  onChange: () => void
}

const Checkbox: FC<CheckboxProps> = ({ className, checked, onChange }) => {
  return (
    <button
      className={
        'h-4 w-4 border border-black duration-150 focus:outline-none m-1 ' +
        (checked ? 'bg-green-600' : 'bg-white') +
        ' ' +
        className
      }
      onClick={onChange}
    />
  )
}

export default Checkbox
