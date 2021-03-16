import { useContext } from 'react'
import { DarkModeContext } from '../App'

const useDarkMode = (): boolean => useContext(DarkModeContext)

export default useDarkMode
