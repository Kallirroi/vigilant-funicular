import * as React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { makeStyles } from '@material-ui/styles'
import Button from '@mui/material/Button'
import InformationItem from '../InformationItem'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Paper } from '@mui/material'
import { useLocalStorage } from '../../hooks'

const useStyles = makeStyles({
  viewer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    padding: '2vw',
    height: '100%',
  },
  button: {
    width: '150px',
    margin: '1vh 0 !important',
  },
  flag: {
    maxHeight: '70vh',
  },
  informationWrapper: {
    margin: '0 2vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%'
  },
  informationMain: {
    width: '40vw',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  informationBottom: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'start',
    margin: '2vh 0',
  },
})

export default function Viewer({ country, toggleViewer }) {
  const classes = useStyles()
  const { getStoredItem } = useLocalStorage()

  const imagePath = country.flags.svg
  // We will grab the first element of this array which seems to be in the country's native language
  const nativeNameKeys = Object.keys(country.name.nativeName)
  const nativeName = country.name.nativeName[nativeNameKeys[0]].official
  const officialName = country.name.official
  const id = country.cca3
  const population = country.population.toLocaleString('en-US')
  const region = country.region
  const capital = country.capital[0]
  const topLevelDomain = country.tld
  const subRegion = country.subregion
  const languages = Object.keys(country.languages)
  const currencies = Object.values(country.currencies)
  const bordersKeys = country.borders ?? []

  const queryCountriesByCode = (border) => {
    const cachedCountries = getStoredItem('countries')
    const countries = JSON.parse(cachedCountries)
    const borderingCountry = countries.filter((c) => c.cca3 === border)
    return borderingCountry[0].name.official
  }
  return (
    <Box sx={{
        bgcolor: 'background.default',
        color: 'text.primary',
      }} 
      className={classes.viewer}>
      <Button color="secondary" onClick={toggleViewer} className={classes.button}>← Back</Button>
        <Grid container spacing={2}>
          {/* IMAGE */}
          <Grid item xs={12} md={8} lg={6}>
            <Paper className={classes.flag} >
              <CardMedia
                component="img"
                image={imagePath}
                sx={{
                  objectFit: 'fill',
                  height: '100%', 
                }}
                alt={`${id} country flag`}
              />
            </Paper>
          </Grid>
          {/* TEXT */}
          <Grid item xs={12} md={6} lg={4}>
            <Box className={classes.informationWrapper}>
              {/* Title */}
              <Typography variant="h3" component="div">
                {officialName}
              </Typography>
              {/* Information fields */}
              <Grid container spacing={2} className={classes.informationMain}>
                <Grid item>
                  <Typography>
                    <InformationItem fieldName={'Native name'} field={nativeName} />
                  </Typography>
                  <Typography>
                    <InformationItem fieldName={'Population'} field={population} />
                  </Typography>
                  <Typography>
                    <InformationItem fieldName={'Region'} field={region} />
                  </Typography>
                  <Typography>
                    <InformationItem fieldName={'Sub Region'} field={subRegion} />
                  </Typography>
                  <Typography>
                    <InformationItem fieldName={'Capital'} field={capital} />
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography>
                    <InformationItem fieldName={'Top Level Domain'} field={topLevelDomain} />
                  </Typography>
                  <Typography>
                    <InformationItem fieldName={'Currencies'} field={currencies.map((c, index) =><span key={index}>{`${c.name} `}</span>)} />
                  </Typography>
                  <Typography>
                    <InformationItem fieldName={'Languages'} field={languages.map( (l, index) => <span key={index}>{`${l.toUpperCase()} `}</span>)} />
                  </Typography>
                </Grid>
              </Grid>
              {/* Bordering countries */}
              <div className={classes.informationBottom}>
                <Typography sx={{fontWeight: 600}}>
                  Border Countries
                </Typography>
                {bordersKeys.length === 0 ? 
                  <Typography sx={{margin: '0 1vw'}}>
                    None
                  </Typography>
                : bordersKeys.map( (border) => (
                  <Paper elevation={'1'} sx={{
                    opacity: '0.9', 
                    padding: '0 1vw', 
                    margin: '0 1vw', 
                    fontSize: '10px',
                    verticalAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}>{queryCountriesByCode(border)}</Paper>
                ))}
              </div>
            </Box>
          </Grid>
        </Grid>
    </Box>
  );
}
