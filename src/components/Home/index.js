import * as React from 'react'
import Box from '@mui/material/Box'
import Header from '../Header'
import Controls from '../Controls'
import Viewer from '../Viewer'
import Fallback from '../Fallback'
import CircularProgress from '@mui/material/CircularProgress'
import List from '../List'
import { useLocalStorage } from '../../hooks'

export function Home({ toggleColorMode }) {
  const { setStoredItem } = useLocalStorage()
  const [isViewerMode, setViewerMode] = React.useState(false)
  const [hasLoaded, setHasLoaded] = React.useState(false)
  const [hasError, setHasError] = React.useState(false)
  const [countries, setCountries] = React.useState([])
  const [selectedCountry, setSelectedCountry] = React.useState({})
  const [endpoint, setEndpoint] = React.useState('https://restcountries.com/v3.1/all')
  
  React.useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await fetch(endpoint).then(res => res.json()
        ).catch(err => {
          setHasError(true)
          console.error(err)
          return
        })
        setHasLoaded(true)
        setCountries(data)
        setStoredItem('countries', JSON.stringify(data))
      } catch (error) {
        throw error
      }
    }
    fetchCountries()
  }, [endpoint, setStoredItem])

  const updateList = (endpoint) => {
    setEndpoint(endpoint)
    setStoredItem('endpoint', endpoint)
    console.log(`Updating list - current endpoint: ${endpoint}`)
  }

  const renderLoader = !countries || countries?.length === 0
  const renderError = hasError
  if (renderError) return <Fallback children={'😬😬 Something went wrong - look at the console!'}/>
  if (renderLoader) return <Fallback children={<CircularProgress color="inherit" />}/>

  return (
    <Box 
      sx={{
        bgcolor: 'background.default',
        color: 'text.primary',
        display: 'block',
        width: '100vw',
        height: '100vh',
        overflow: 'scroll',
      }}>
      <Header toggleColorMode={toggleColorMode} />
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
    </Box>
  );
}