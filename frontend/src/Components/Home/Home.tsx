import React from 'react'
import { Grid } from '@mui/material'
import Footer from './Footer'
import LandingPage from './Content'
import { useEffect } from 'react'
import { LoginContext } from '../../context/login'

const Home = () => {
  const loginContext = React.useContext(LoginContext);

    // Log the context values after they have been updated
    useEffect(() => {
      console.log('Updated loginContext:', loginContext);
    }, [loginContext]);


  const homepage = () => (
    <React.Fragment>
      <LandingPage />
      <Footer />
    </React.Fragment>
  )

  return <Grid>{homepage()}</Grid>
}

export default Home
