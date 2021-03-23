import React, { FC, useEffect } from 'react'

type SessionExpiredRouteProps = {
  onLogout: () => void
}

const SessionExpiredRoute: FC<SessionExpiredRouteProps> = ({ onLogout }) => {
  useEffect(onLogout, [onLogout])

  return <div className="min-h-page">Your session has expired.</div>
}

export default SessionExpiredRoute
