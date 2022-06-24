import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import TextField from '@mui/material/TextField'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

const useStyles = makeStyles({
  controls: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '2vw',
  },
})

const handleOnChange = () => {
  
}

export default function Controls() {
  const classes = useStyles()
  return (
    <div className={classes.controls}>
      <TextField
        onChange={handleOnChange}
        className={classes.search} 
        id="outlined-search" 
        label="🔍 Search for a country" 
        type="search" 
        />
      <BasicMenu />
    </div>
  )
}

const BasicMenu = () => {
  const [region, setRegion] = React.useState('')
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleSelectRegion = (r) => {
    setRegion(r)
    handleClose()
  }
  const regions = ['Australia', 'Europe', 'Americas', 'Asia']
  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Filter by Region
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {regions.map( r => <MenuItem onClick={() => handleSelectRegion(r)}>{r}</MenuItem>)}
      </Menu>
    </div>
  )
}