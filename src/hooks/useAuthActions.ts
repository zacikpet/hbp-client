import { useContext } from 'react'
import { AuthActionsContext, AuthActionsType } from '../App'

const useAuthActions = (): AuthActionsType | null => useContext(AuthActionsContext)

export default useAuthActions
