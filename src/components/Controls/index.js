import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Divider, TextField, Grid, Menu, MenuItem, Button, Box } from '@mui/material'

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
  button: {
    width: '150px',
    margin: '1vh 0 !important',
  },
})

export default function Controls({ onControlSelection }) {
  const classes = useStyles()
  const [searchTerm, setSearchTerm] = React.useState('')
  const [hasSubmitted, setHasSubmitted] = React.useState(false)
  const [region, setRegion] = React.useState('')
  return (
    <>
      <Grid container className={classes.controls}>
        <SearchField 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          setHasSubmitted={setHasSubmitted}
          onControlSelection={onControlSelection} 
          classes={classes}
          />
        <BasicMenu 
          onControlSelection={onControlSelection} 
          classes={classes} 
          region={region}
          setRegion={setRegion}
          />
      </Grid>
      <Divider light />
      {/* Show RESET if we have submitted a search or if we have selected a region */}
      {((searchTerm !== '' && hasSubmitted) || region !== '') &&
        <Grid container sx={{ display: 'flex', justifyContent:'center' }}>
          <Button color="secondary" onClick={() => {
            setSearchTerm('')
            setRegion('')
            onControlSelection(`https://restcountries.com/v3.1/all`)
          }} 
          className={classes.button}>Reset search</Button>
        </Grid>
      }
    </>

  )
}

const SearchField = ({ onControlSelection, searchTerm, setSearchTerm, setHasSubmitted, classes }) => {
  const handleSearchQuery = (e) => {
    const searchTerm = e.target.value
    setSearchTerm(searchTerm)
    setHasSubmitted(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (searchTerm !== '') {
      setHasSubmitted(true)
      onControlSelection(`https://restcountries.com/v3.1/name/${searchTerm.toString()}`)
    }
  }
  return (
    <Grid item xs={12} md={10} lg={10} className={classes.search}>
      <Box 
        noValidate
        autoComplete="off"
        component="form" 
        onSubmit={handleSubmit}>
        <TextField
          value={searchTerm}
          onChange={handleSearchQuery}
          className={classes.search} 
          id="outlined-search" 
          label="🔍 Search for a country" 
          type="search" 
          /> 
      </Box>
    </Grid>
  )
}

const BasicMenu = ({ onControlSelection, classes, region, setRegion }) => {
  const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']
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