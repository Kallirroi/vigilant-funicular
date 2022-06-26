import * as React from 'react'
import Box from '@mui/material/Box'
import { makeStyles } from '@material-ui/styles'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import InformationItem from '../InformationItem'
import Fallback from '../Fallback';
import { useLocalStorage } from '../../hooks'
import { CardActionArea } from '@mui/material'

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '2vh 2vw', 
    flexGrow: '1'
  },
})

export default function List({ toggleViewer, selectCountry }) {
  const { getStoredItem } = useLocalStorage()
  const classes = useStyles()
  const cachedCountries = getStoredItem('countries')
  const countries = JSON.parse(cachedCountries)

  if (!(countries instanceof Array)) return <Fallback children={'😬😬 Something went wrong!'}/>

  return (
    <Box className={classes.wrapper}>
      <Grid container spacing={6}>
      {/* using cca2 as the unique ID - see more here https://github.com/mledoze/countries/blob/master/README.md */}
      { countries.map( (c) => 
        <BasicCard 
          key={c.cca2} 
          country={c} 
          toggleViewer={toggleViewer}
          selectCountry={selectCountry}
          />
        )
      } 
      </Grid>
    </Box>
  );
}

const BasicCard = ({ country, toggleViewer, selectCountry }) => {
  const imagePath = country.flags.svg
  const officialName = country.name.official
  const commonName = country.name.common
  const id = country.cca3
  const population = country.population.toLocaleString()
  const region = country.region
  const capital = country.capital

  const handleClick = () => {
    toggleViewer()
    selectCountry(country)
  }

  return (
    <Grid item xs={12} md={6} lg={3} sx={{marginBottom: '2vh'}}>
      <Card sx={{ minWidth: 70 }}>
        <CardActionArea onClick={handleClick}>
          <CardMedia
            component="img"
            height="220px"
            image={imagePath}
            alt={`${id} country flag`}
            sx={{
              objectFit: 'cover', 
            }}
          />
          <CardContent>
            {/* 
              Sometimes the official name can be quite long - resulting in inconsistent card heights.
              We can dynamically size the text (depending on the size of the {officialName} string), if we really want to go with that name
             */}
            <Typography sx={{ mb: 1 }} variant="body3" color="text.secondary">
              {officialName}
            </Typography>
            <Typography sx={{ mb: 1 }} variant="h6">
              {commonName}
            </Typography>
            <Typography variant="body2">
              <InformationItem fieldName={'Population'} field={population} />
            </Typography>
            <Typography variant="body2">
              <InformationItem fieldName={'Region'} field={region} />
            </Typography>
            <Typography variant="body2">
              <InformationItem fieldName={'Capital'} field={capital} />
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}