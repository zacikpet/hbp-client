import { useContext } from 'react'
import { AuthContext, AuthContextType } from '../App'

const useAuth = (): AuthContextType | null => useContext(AuthContext)

export default useAuth
