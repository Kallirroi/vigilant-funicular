import * as React from 'react';
import Header from '../Header';
import Controls from '../Controls';
import Viewer from '../Viewer';
import Box from '@mui/material/Box'
import { makeStyles } from '@material-ui/styles'
import List from '../List'

const useStyles = makeStyles({
  home: {
    backgroundColor: '#fff',
    height: '100vh'
  },
  loader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '2vh 2vw',
    height: '100vh'
  },
})

function Home() {
  const [isViewerMode, setViewerMode] = React.useState(false)
  const [selectedCountry, setSelectedCountry] = React.useState({})
  const classes = useStyles()
  const [hasLoaded, setHasLoaded] = React.useState(false)
  const [hasError, setHasError] = React.useState(false)
  const [countries, setCountries] = React.useState(() => {
    const cachedCountries = localStorage.getItem('countries');
    const initialValue = JSON.parse(cachedCountries);
    return initialValue || [];
  })
  React.useEffect(() => {
    const fetchCountries = async () => {
      const data = await fetch('https://restcountries.com/v3.1/all').then(res => {
        setHasLoaded(true)
        return res.json()
      }).catch(err => {
        setHasError(true)
        console.error(err)  
      })
      localStorage.setItem('countries', JSON.stringify(data))
    }
    fetchCountries()
  }, [countries])

  return (
    <div className={classes.home}>
      <Header />
      {isViewerMode 
      ? 
        <Viewer 
          toggleViewer={() => setViewerMode(!isViewerMode)} 
          country={selectedCountry} 
          fallback={<Loader />}
            
          />
      :
        <>
          <Controls/>
          <List 
            hasLoaded={hasLoaded}
            hasError={hasError}
            toggleViewer={() => setViewerMode(!isViewerMode)} 
            fallback={<Loader />} 
            countries={countries} 
            selectCountry={(country) => setSelectedCountry(country)}
            /> 
        </>
      } 
    </div>
  );
}

const Loader = () => {
  const classes = useStyles()
  return <Box sx={{alignContent: 'center' }} className={classes.loader}>
    Loading...
  </Box>
}
  

export default Home;
