import { useCallback } from 'react'
import { useHistory } from 'react-router'

type Redirect = {
  toHome: () => void
  toArticles: () => void
}

const useRedirect = (): Redirect => {
  const history = useHistory()

  const toHome = useCallback(() => history.push('/'), [history])
  const toArticles = useCallback(() => history.push('/articles'), [history])

  return { toHome, toArticles }
}

export default useRedirect
