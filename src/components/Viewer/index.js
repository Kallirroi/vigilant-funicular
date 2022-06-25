import * as React from 'react'
import Box from '@mui/material/Box'
import { makeStyles } from '@material-ui/styles'
import Button from '@mui/material/Button'
import InformationItem from '../InformationItem'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Paper } from '@mui/material'

const useStyles = makeStyles({
  viewerControls: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    padding: '2vw',
  },
  button: {
    width: '150px',
  },
  main: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: '2vh 0',
  },
  flag: {
    width: '40vw',
    maxHeight: '70vh',
  },
  informationWrapper: {
    margin: '0 2vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
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
  },
})

export default function Viewer({ country, toggleViewer, fallback }) {
  const classes = useStyles()

  if (!country) return fallback

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
    const cachedCountries = localStorage.getItem('countries')
    const countries = JSON.parse(cachedCountries)
    const borderingCountry = countries.filter((c) => c.cca3 === border)
    return borderingCountry[0].name.official
  }
  return (
    <Box sx={{ flexGrow: 1 }} className={classes.viewerControls}>
      <Button onClick={toggleViewer} className={classes.button}>← Back</Button>
      <main className={classes.main}>
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
        <Box sx={{ flexGrow: 1 }} className={classes.informationWrapper}>
          <Typography variant="h3" component="div">
            {officialName}
          </Typography>
          <div className={classes.informationMain}>
            <div>
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
            </div>
            <div>
              <Typography>
                <InformationItem fieldName={'Top Level Domain'} field={topLevelDomain} />
              </Typography>
              <Typography>
                <InformationItem fieldName={'Currencies'} field={currencies.map((c) =><span>{`${c.name} `}</span>)} />
              </Typography>
              <Typography>
                <InformationItem fieldName={'Languages'} field={languages.map( (l) => <span>{`${l.toUpperCase()} `}</span>)} />
              </Typography>
            </div>
          </div>
          <div className={classes.informationBottom}>
            <Typography sx={{fontWeight: 600}}>
              Border Countries
            </Typography>
            {bordersKeys.length === 0 ? 
              <Typography sx={{margin: '0 1vw'}}>
                None
              </Typography>
            : bordersKeys.map( (border) => (
              <Paper sx={{
                opacity: '0.8', 
                padding: '0 1vw', 
                margin: '0 1vw'
              }}>{queryCountriesByCode(border)}</Paper>
            ))}
          </div>
        </Box>
      </main>
    </Box>
  );
}
