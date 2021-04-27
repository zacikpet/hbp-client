import React, { FC } from 'react'

type CardProps = {
  title: string
  className?: string
}

const Card: FC<CardProps> = ({ title, children, className = '' }) => {
  return (
    <div className="bg-white dark:bg-gray-850 rounded shadow-md">
      <div className="px-4 py-2 rounded-t bg-gray-100 dark:bg-gray-800">
        <h1 className="text-xs tracking-wider font-semibold uppercase p-2">{title}</h1>
      </div>
      <div className={`p-4 ${className}`}>{children}</div>
    </div>
  )
}

export default Card
