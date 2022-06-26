import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Divider, TextField, Grid, Menu, MenuItem, Button } from '@mui/material'

const useStyles = makeStyles({
  controls: {
    padding: '2vh 2vw',
  },
  search: {
    height: '50px',
    marginBottom: '10px !important'
  },
  menu: {
    '& > *': {
      height: '50px',
    }
  },
})

export default function Controls({ onControlSelection }) {
  const classes = useStyles()
  return (
    <>
      <Grid container className={classes.controls}>
        <SearchField onControlSelection={onControlSelection} />
        <BasicMenu onControlSelection={onControlSelection} />
      </Grid>
      <Divider light />
    </>

  )
}

const SearchField = ({ onControlSelection }) => {
  const classes = useStyles()
  const [searchTerm, setSearchTerm] = React.useState('')

  const handleSearchQuery = (e) => {
    const searchTerm = e.target.value
    setSearchTerm(searchTerm)
  }

  const handleSubmit = () => {
    // onControlSelection(`https://restcountries.com/v3.1/name/${searchTerm.toString()}`)
    console.log(searchTerm)
  }
  return (
    <Grid item xs={12} md={10} lg={10}
      className={classes.search}
      >
      <form onSubmit={handleSubmit}>
        <TextField
          onChange={handleSearchQuery}
          className={classes.search} 
          id="outlined-search" 
          label="🔍 Search for a country" 
          type="search" 
          /> 
      </form>
    </Grid>
  )
}

const BasicMenu = ({ onControlSelection }) => {
  const classes = useStyles()
  const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']
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
    onControlSelection(`https://restcountries.com/v3.1/region/${r.toLowerCase()}`)
    handleClose()
  }
  return (
    <Grid item className={classes.menu}>
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
        {region !== '' ? region : 'Filter by Region'}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {regions.map( (r, index) => <MenuItem 
          key={index}
          onClick={() => handleSelectRegion(r)}
          >
          {r}
        </MenuItem>)}
      </Menu>
    </Grid>
  )
}