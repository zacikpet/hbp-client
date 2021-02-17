import React, { FC } from 'react'

type ButtonProps = {
  text: string
  className?: string
  onClick?: () => void
}

const Button: FC<ButtonProps> = ({ className, text, onClick }) => (
  <button onClick={onClick} className={'bg-green-300 py-1 px-2 ' + className}>
    {text}
  </button>
)

export default Button
