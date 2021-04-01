import useDarkMode from './useDarkMode'

const useTextColor = (): string => {
  const darkMode = useDarkMode()

  return darkMode ? 'white' : 'black'
}

export default useTextColor
