import React, { FC, useEffect } from 'react'
import useAuthActions from '../hooks/useAuthActions'

const SessionExpiredRoute: FC = () => {
  const actions = useAuthActions()

  // useEffect(() => actions?.onLogout(), [actions])

  return <div className="min-h-page">Your session has expired.</div>
}

export default SessionExpiredRoute
