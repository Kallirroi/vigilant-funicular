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

export default function List({ toggleViewer }) {
  const classes = useStyles()
  const [countries, setCountries] = React.useState([])
  React.useEffect(() => {
  const fetchCountries = async () => {
    const data = await fetch('https://restcountries.com/v3.1/all').then(res => res.json())
    setCountries(data)
  }
  fetchCountries()
}, [countries])

  return (
    <Box sx={{ flexGrow: 1 }} className={classes.wrapper}>
    <Grid container spacing={8}>
      {/* using cca2 as the unique ID - see more here https://github.com/mledoze/countries/blob/master/README.md */}
      {countries.slice(0,50).map( (c) => 
        <BasicCard key={c.cca2} country={c} toggleViewer={toggleViewer} />
      )} 
    </Grid>
    </Box>
  );
}

const BasicCard = ({ country, toggleViewer }) => {
  const imagePath = country.flags.svg
  const officialName = country.name.official
  const commonName = country.name.common
  const id = country.cca3
  const population = country.population
  const region = country.region
  const capital = country.capital

  return (
    <Grid item xs={3}>
      <Card sx={{ minWidth: 50 }}>
        <CardMedia
          component="img"
          height="140"
          image={imagePath}
          alt={`${id} country flag`}
        />
        <CardContent>
          <Typography sx={{ overflow: 'hide'}}  variant="h6" component="div">
            {officialName}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {commonName}
          </Typography>
          <Typography variant="body2">
            {`Population: ${population}`}
          </Typography>
          <Typography variant="body2">
            {`Region: ${region}`}
          </Typography>
          <Typography variant="body2">
            {`Capital: ${capital}`}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={toggleViewer}>
            Learn More
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}