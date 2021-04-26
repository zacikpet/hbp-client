import React, { FC } from 'react'
import { Model } from '../api/papers'

const ModelInfoCard: FC<{ model: Model; className?: string }> = ({ className, model }) => {
  switch (model) {
    case 'sm':
      return <div className={'article-info-card bg-yellow-700 ' + className || ''}>SM</div>
    case 'bsm':
      return <div className={'article-info-card bg-purple-700 ' + className || ''}>Beyond SM</div>
    default:
      return <></>
  }
}

export default ModelInfoCard
