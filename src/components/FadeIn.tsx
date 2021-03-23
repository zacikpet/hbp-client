import React, { FC } from 'react'
import { CSSTransition } from 'react-transition-group'

type FadeProps = {
  when: boolean
}

const FadeIn: FC<FadeProps> = ({ when, children }) => {
  return (
    <CSSTransition in={when} timeout={300} classNames="page">
      <div className={when ? '' : 'hidden'}>{children}</div>
    </CSSTransition>
  )
}

export default FadeIn
