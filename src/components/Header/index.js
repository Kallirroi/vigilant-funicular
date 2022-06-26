import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { useLocalStorage } from '../../hooks'

export default function Header({ toggleColorMode }) {
  const { getStoredItem } = useLocalStorage()
  const [mode, setMode] = React.useState(() => {
    return getStoredItem('mode') ?? 'light'
  }) 
  return (
    <Box>
      <AppBar position="static">
        <Toolbar variant="regular" >
          <Typography 
            variant="h5" 
            component="div" 
            fontWeight={600} 
            sx={{ flexGrow: 1 }}
          >
            Where in the world?
          </Typography>
          <IconButton 
            sx={{ ml: 1 }} 
            onClick={() => {
              toggleColorMode()
              setMode((prevMode) =>
                prevMode === 'light' ? 'dark' : 'light',
              )
            }} 
            color="inherit">
            {mode === 'dark' ? 
              <Brightness7Icon /> 
              : <Brightness4Icon />
            }
          </IconButton>
          <Typography variant='overline'>
            {mode}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}