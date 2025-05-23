import React, { FC } from 'react'

type AlertProps = {
  level: 'error' | 'info'
  text: string
  onClose: () => void
}

const Alert: FC<AlertProps> = ({ text, onClose }) => {
  function handleClose(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault()
    onClose && onClose()
  }

  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      role="alert"
      onClick={handleClose}
    >
      <strong className="font-bold">{text}</strong>
    </div>
  )
}

export default Alert
