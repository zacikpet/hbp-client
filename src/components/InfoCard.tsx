import React, { FC } from 'react'

const ProductionInfoCard: FC<{ text: string }> = ({ text }) => (
  <div className="bg-gray-100 dark:bg-gray-800 font-semibold rounded shadow p-1 px-2 my-2 text-center">{text}</div>
)

export default ProductionInfoCard
