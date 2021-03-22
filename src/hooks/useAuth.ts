import { useContext } from 'react'
import { AuthContext } from '../App'

const useAuth = (): boolean => useContext(AuthContext)

export default useAuth
