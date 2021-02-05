import { useCallback } from 'react'
import { useHistory } from 'react-router'

type Redirect = {
  toAtlas: () => void
  toCms: () => void
  toAleph: () => void
  toDelphi: () => void
  toD0: () => void
  toCdf: () => void
  toL3: () => void
  toOpal: () => void
}

const useRedirect = (): Redirect => {
  const history = useHistory()

  const toAtlas = useCallback(() => history.push('/atlas'), [history])
  const toCms = useCallback(() => history.push('/cms'), [history])
  const toAleph = useCallback(() => history.push('/aleph'), [history])
  const toDelphi = useCallback(() => history.push('/delphi'), [history])
  const toD0 = useCallback(() => history.push('/d0'), [history])
  const toCdf = useCallback(() => history.push('/cdf'), [history])
  const toL3 = useCallback(() => history.push('/l3'), [history])
  const toOpal = useCallback(() => history.push('/opal'), [history])

  return { toAtlas, toCms, toAleph, toDelphi, toD0, toCdf, toL3, toOpal }
}

export default useRedirect
