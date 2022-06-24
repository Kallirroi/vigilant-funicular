import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const MaterialTheme = ({ children }) => {
  const colorMode = React.useContext(ColorModeContext);
  const mode = colorMode.mode
  const theme = createTheme({
    palette: {
      mode,
    },
  })
  return (
  <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </ColorModeContext.Provider>)
}

export default MaterialTheme
