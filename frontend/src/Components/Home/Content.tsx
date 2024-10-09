import {
  Typography,
  Button,
  Box,
  Container,
  CardContent,
  Card,
} from '@mui/material'

import Header from './Header'
import { boxes } from '../types/popular.type'
import { business } from '../types/business.type'
const LandingPage = () => {
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
      >
        <Container sx={{ flex: 1, padding: 3, backgroundColor: '#F9F9F7' }}>
          <Box
            sx={{
              width: '100%',
              height: '115px',
              display: 'flex', // Use flexbox to align content
              justifyContent: 'space-between', // Center content horizontally
              textAlign: 'center',
            }}
          >
            {business.map((column, index) => (
              <Box key={index} sx={{ flex: '1', padding: '0 24px' }}>
                <Typography variant="h6" align="center">
                  {column.title}
                </Typography>
                <Typography>{column.content}</Typography>
                <Typography sx={{ marginTop: '16px' }}>
                  {column.link}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </div>
      <Container sx={{ flex: 1, padding: 4 }}>
        <Box sx={{ padding: 4 }}>
          {/* Title for the entire section */}
          <Typography
            variant="h4"
            sx={{ textAlign: 'center', marginBottom: 2 }}
          >
            Top 4 Restaurants
          </Typography>
          {/* Box containing all the individual boxes */}
          <Box display="flex" justifyContent="space-between" gap={4}>
            {boxes.map((box, index) => (
              <Card key={index} sx={{ flex: 1, borderRadius: '12px' }}>
                {/* Centering the image */}
                <img
                  src={box.image}
                  alt={box.title}
                  style={{
                    display: 'block', // Set image to block
                    margin: '0 auto', // Center the image horizontally
                    width: '100%', // Full width of the card
                    maxHeight: '200px',
                    height: '100%',
                    objectFit: 'cover', // Maintain aspect ratio and cover the area
                  }}
                />
                <CardContent>
                  <Typography variant="h5" sx={{ textAlign: 'center' }}>
                    {box.title}
                  </Typography>
                  <Typography sx={{ textAlign: 'center' }}>
                    {box.content}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </Container>
    </div>
  )
}

export default LandingPage
