import React, { FC } from 'react'
import { Stage } from '../api/papers'

const StageInfoCard: FC<{ stage: Stage }> = ({ stage }) => {
  switch (stage) {
    case 'preliminary':
      return <div className="article-info-card w-20 bg-red-600">Preliminary</div>
    case 'submitted':
      return <div className="article-info-card w-20 bg-primary">Submitted</div>
    case 'published':
      return <div className="article-info-card w-20 bg-blue-400">Published</div>
    default:
      return <></>
  }
}

export default StageInfoCard
