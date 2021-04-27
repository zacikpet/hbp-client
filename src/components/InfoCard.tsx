import React, { FC } from 'react'

const ProductionInfoCard: FC<{ text: string }> = ({ text }) => (
  <div className="p-2 uppercase tracking-wider text-xs font-semibold bg-gray-100 dark:bg-gray-800 rounded">{text}</div>
)

export default ProductionInfoCard
