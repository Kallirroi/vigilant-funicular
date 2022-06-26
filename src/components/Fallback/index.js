import * as React from 'react'
import Box from '@mui/material/Box'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  home: {
    backgroundColor: '#fff',
    display: 'block',
    width: '100vw',
    height: '100vh',
    overflow: 'scroll',
  },
  fallback: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
})

export default function Fallback({ children }) {
  const classes = useStyles()
  return (
    <div className={classes.home}>
      <Box className={classes.fallback}>{children}</Box>
    </div>
  )
}