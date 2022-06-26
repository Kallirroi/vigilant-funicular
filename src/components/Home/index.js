import * as React from 'react';
import Header from '../Header';
import Controls from '../Controls';
import Viewer from '../Viewer';
import Fallback from '../Fallback';
import { makeStyles } from '@material-ui/styles'
import CircularProgress from '@mui/material/CircularProgress'
import List from '../List'
import { useLocalStorage } from '../../hooks'

const useStyles = makeStyles({
  home: {
    backgroundColor: '#FAFAFA',
    display: 'block',
    width: '100vw',
    height: '100vh',
    overflow: 'scroll',
  },
})

function Home() {
  const { getStoredItem, setStoredItem } = useLocalStorage()
  const [isViewerMode, setViewerMode] = React.useState(false)
  const classes = useStyles()
  const [hasLoaded, setHasLoaded] = React.useState(false)
  const [hasError, setHasError] = React.useState(false)
  const [countries, setCountries] = React.useState([])
  const [selectedCountry, setSelectedCountry] = React.useState({})
  const [endpoint, setEndpoint] = React.useState('https://restcountries.com/v3.1/all')
  
  // initial fetch
  React.useEffect(() => {
    const fetchCountries = async () => {
      const data = await fetch(endpoint).then(res => {
        setHasLoaded(true)
        return res.json()
      }).catch(err => {
        setHasError(true)
        console.error(err)  
      })
      setCountries(data)
      setStoredItem('countries', JSON.stringify(data))
    }
    fetchCountries()
  }, [endpoint, setStoredItem])

  const updateList = (endpoint) => {
    const cachedCountries = getStoredItem('countries')
    setCountries(JSON.parse(cachedCountries))
    setEndpoint(endpoint)
    console.log(`Updating list - current endpoint: ${endpoint}`)
  }

  const renderLoader = !countries || countries?.length === 0
  const renderError = hasError
  if (renderError) return <Fallback children={'😬😬 Something went wrong - look at the console!'}/>
  if (renderLoader) return <Fallback children={<CircularProgress color="inherit" />}/>

  return (
    <div className={classes.home}>
      <Header />
      {isViewerMode
      ? 
        <Viewer 
          toggleViewer={() => setViewerMode(!isViewerMode)} 
          country={selectedCountry}
          />
      :
        <>
          <Controls onControlSelection={updateList}/>
          {
            hasLoaded && countries ? 
              <List 
                toggleViewer={() => setViewerMode(!isViewerMode)} 
                selectCountry={(country) => setSelectedCountry(country)}
                /> 
            : <Fallback children={<CircularProgress color="inherit" />} />
          }
          
        </>
      } 
    </div>
  );
}

export default Home;
