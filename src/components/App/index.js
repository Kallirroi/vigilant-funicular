import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useLocalStorage } from '../../hooks'
import { Home } from '../Home'

const ColorModeContext = React.createContext({ toggleColorMode: () => {} })

const App = () => {
  const { getStoredItem, setStoredItem} = useLocalStorage()
  const [mode, setMode] = React.useState(() => {
    return getStoredItem('mode') ?? 'light'
  })
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) =>
          prevMode === 'light' ? 'dark' : 'light',
        )
        console.log(mode)
        setStoredItem('mode', mode)
      },
    }),
    [mode, setStoredItem],
  )
  const getDesignTokens = (mode) => ({
    typography: {
      fontFamily: [
        '"Nunito Sans"',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
    palette: {
      ...(mode === 'light' ? 
        {
         primary: {
          main: '#FAFAFA',
         },
          background: {
            default: '#FAFAFA',
            paper: '#FFFFFF',
          },
          secondary: {
            main: '#000000',
          },
          text: {
            primary: '#000000',
            secondary: '#000000',  
          }
        }
      : 
        {
          primary: {
            main: '#2A3843',
          },
          secondary: {
            main: '#FFFFFF',
          },
          background: {
            paper: '#2A3843',
            default: '#202D36',
          },
          text: {
            primary: '#FFFFFF',
            secondary: '#FFFFFF',
          },
        }
      ),

    },
  })

  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode])
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Home toggleColorMode={colorMode.toggleColorMode}/>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App
