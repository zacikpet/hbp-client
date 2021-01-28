import React, { FC } from 'react'

const CircleMenu: FC = ({ children }) => {
  return (
    <div className="w-auto h-auto">
      <svg className="w-96 h-96 m-8">
        <circle fill="black" cx="12rem" cy="12rem" r="10rem" />
        {children}
      </svg>
    </div>
  )
}

export default CircleMenu
