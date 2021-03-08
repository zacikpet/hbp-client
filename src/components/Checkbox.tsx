import React, { FC } from 'react'
import { ReactComponent as TickSVG } from 'resources/svg/tick.svg'

type CheckboxProps = {
  className?: string
  checked: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
}

const Checkbox: FC<CheckboxProps> = ({ children, className, checked, onChange, disabled = false }) => {
  return (
    <div className={'flex ' + (disabled && 'text-disabled') + ' ' + className}>
      <button
        className={
          'h-4 w-4 border border-black duration-150 focus:outline-none m-1 flex justify-center items-center rounded ' +
          (checked ? 'bg-primary' : 'bg-white dark:bg-gray-700') +
          ' ' +
          (disabled ? 'bg-gray-400 dark:bg-gray-800' : '')
        }
        onClick={() => onChange && onChange(!checked)}
      >
        {checked && <TickSVG width="70%" height="70%" fill="white" />}
      </button>
      {children}
    </div>
  )
}

export default Checkbox
