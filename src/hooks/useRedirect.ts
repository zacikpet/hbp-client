import { useCallback } from 'react'
import { useHistory } from 'react-router'

type Return = {
  toAtlas: () => void
  toCms: () => void
}

const useRedirect = (): Return => {
  const history = useHistory()

  const toAtlas = useCallback(() => history.push('/atlas'), [history])

  const toCms = () => history.push('/cms')

  return { toAtlas, toCms }
}

export default useRedirect
