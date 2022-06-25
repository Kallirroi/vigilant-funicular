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
import InformationItem from '../InformationItem'

const useStyles = makeStyles({
  wrapper: {
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '2vh 2vw'
  },
})

export default function List({ hasLoaded, hasError, toggleViewer, fallback, countries, selectCountry }) {
  const classes = useStyles()
  if (!countries || !hasLoaded || hasError) return fallback
  return (
    <Box sx={{ flexGrow: 1 }} className={classes.wrapper}>
      <Grid container spacing={8}>
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
  const population = country.population
  const region = country.region
  const capital = country.capital

  const handleClick = () => {
    toggleViewer()
    selectCountry(country)
  }

  return (
    <Grid item xs={3}>
      <Card sx={{ minWidth: 70 }}>
        <CardMedia
          component="img"
          height="220px"
          image={imagePath}
          alt={`${id} country flag`}
          sx={{
            objectFit: 'stretch', 
          }}
        />
        <CardContent>
          <Typography variant="h6" component="div">
            {officialName}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
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
        <CardActions>
          <Button size="small" onClick={handleClick}>
            Learn More
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}