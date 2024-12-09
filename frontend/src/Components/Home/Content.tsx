import { Typography, Button, Box, Container } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import Header from './Header'
import { boxes } from '../types/popular.type'
import { business } from '../types/business.type'
const LandingPage = () => {
  const navigate = useNavigate()
  return (
    <div>
      <Header />
      <Box
        sx={{
          position: 'relative',
          height: '100vh',
          overflow: 'hidden',
          margin: 0,
          padding: 0,
        }}
      >
        <Box
          sx={{
            position: 'absolute', // Absolute positioning to cover the full screen
            top: 0,
            left: 0,
            width: '100%', // Full width
            height: '100%', // Full height
            backgroundImage:
              'url(https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)',
            backgroundSize: 'cover', // Cover the entire box
            backgroundPosition: 'bottom center', // Center the image
            zIndex: 1, // Send to the back
          }}
        />

        {/* Box 2 - Overlapping Content */}
        <Box
          sx={{
            position: 'absolute', // Position it absolutely to overlap
            top: '50%', // Center it vertically
            left: '50%', // Center it horizontally
            transform: 'translate(-50%, -50%)', // Center using transform
            width: '80%', // Adjust width as needed
            padding: 4,
            zIndex: 2, // Bring to front
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '8px', // Optional rounded corners
          }}
        >
          <Box textAlign="center">
            <Typography variant="h4" gutterBottom>
              Welcome to Foodie
            </Typography>
            <Button
              onClick={() => navigate('/register')}
              variant="contained"
              sx={{
                minHeight: '50px',
                // backgroundColor: '#AD343E',
                borderRadius: '118px',
                width: '150px',
                marginRight: 2,
                '&:hover': {
                  backgroundColor: '#AD343E', // Darker shade for hover effect
                },
              }}
            >
              Register
            </Button>
            <Button
              onClick={() => navigate('/login')}
              variant="contained"
              sx={{
                minHeight: '50px',
                borderRadius: '118px',
                width: '150px',
                '&:hover': {
                  backgroundColor: '#AD343E', // Darker shade for hover effect
                },
              }}
            >
              Log In
            </Button>
          </Box>
        </Box>
      </Box>
      <div
        style={{
          backgroundColor: '#F9F9F7',
        }}
      ></div>
    </div>
  )
}

export default LandingPage
