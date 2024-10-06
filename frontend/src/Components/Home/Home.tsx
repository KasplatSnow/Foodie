import React from 'react'
import { Grid } from '@mui/material'
import Footer from './Footer'
import LandingPage from './Content'

const Home = () => {
  const homepage = () => (
    <React.Fragment>
      <LandingPage />
      <Footer />
    </React.Fragment>
  )

  return <Grid>{homepage()}</Grid>
}

export default Home
