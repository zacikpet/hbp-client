import React, { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'

type NavigationProps = {
  onAction?: () => void
}

const Navigation: FC<NavigationProps> = ({ onAction }) => {
  const { pathname } = useLocation()

  const handleAction = () => onAction && onAction()

  return (
    <>
      <Link to="/" onClick={handleAction} className={`navlink ${pathname === '/' && 'navlink-active'}`}>
        Home
      </Link>
      <Link to="/articles" onClick={handleAction} className={`navlink ${pathname === '/articles' && 'navlink-active'}`}>
        Articles
      </Link>
      <Link to="/history" onClick={handleAction} className={`navlink ${pathname === '/history' && 'navlink-active'}`}>
        History
      </Link>
      <Link to="/about" onClick={handleAction} className={`navlink ${pathname === '/about' && 'navlink-active'}`}>
        About
      </Link>
      <Link to="/feedback" onClick={handleAction} className={`navlink ${pathname === '/feedback' && 'navlink-active'}`}>
        Feedback
      </Link>
    </>
  )
}

export default Navigation
