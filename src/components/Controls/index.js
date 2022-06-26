import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import TextField from '@mui/material/TextField'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Divider } from '@mui/material'

const useStyles = makeStyles({
  controls: {
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '2vh 2vw',
  },
  search: {
    height: '50px',
    width: '240px',
    paddingRight: '1vw'
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
      <div className={classes.controls}>
        <SearchField onControlSelection={onControlSelection} />
        <BasicMenu onControlSelection={onControlSelection} />
      </div>
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
  return (
    <Box
      className={classes.search}
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={() => onControlSelection(`https://restcountries.com/v3.1/name/${searchTerm}?fullText=true`)}
      >
      <TextField
        onChange={handleSearchQuery}
        className={classes.search} 
        id="outlined-search" 
        label="🔍 Search for a country" 
        type="search" 
        /> 
    </Box>
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
    <div className={classes.menu}>
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
    </div>
  )
}