import * as React from 'react'
import Box from '@mui/material/Box'
import { makeStyles } from '@material-ui/styles'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

const useStyles = makeStyles({
  wrapper: {
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '2vw',
  },
})

export default function Viewer({ country, toggleViewer }) {
  const classes = useStyles()
  return (
    <Box sx={{ flexGrow: 1 }} className={classes.wrapper}>
      <Button onClick={toggleViewer}>Go back</Button>
      Viewer here
    </Box>
  );
}
