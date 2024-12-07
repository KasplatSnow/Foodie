import React from 'react'
import { Grid } from '@mui/material'
import Footer from './Footer'
import LandingPage from './Content'
import { useEffect } from 'react'
import { useAuth } from '../Auth/AuthContext' // Adjust path as needed

const Home = () => {
  const loginContext = useAuth();

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
