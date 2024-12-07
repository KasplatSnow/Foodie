import React, { useEffect } from 'react'
import {
  Box,
  Button,
  Divider,
  Card,
  TextareaAutosize,
  Typography,
  List,
  ListItem,
} from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import StarIcon from '@mui/icons-material/Star'
import Header from '../Components/Home/Header'
import ReviewItem from '../Components/Restaurant/ReviewItem'
// Define types
interface Review {
  user: {
    name: string
    img: string
  }
  rating: number
  content: string
}
export default function RestaurantPage() {
  const { state } = useLocation() // Access passed state
  // const [restaurantData, setRestaurantData] = useState(state || {});
  // const [error, setError] = useState('');
  const navigate = useNavigate()

  useEffect(() => {
    if (!state) {
      console.error('No restaurant found')
    }
  }, [state])

  const handleStarClick = (rating: number) => {
    console.log(`Star ${rating} clicked!`)
    // Perform any action, e.g., set the rating state
  }

  return (
    <Box sx={{ height: '100%' }}>
      <Header />
      <Box sx={{ marginTop: '4rem' }}>
        {/* Image header with restaurant photo */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '40vh',
            backgroundImage: `url("${state?.photos}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: 'white',
            display: 'flex',
            alignItems: 'flex-end',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 1,
            }}
          />

          <Box
            sx={{
              position: 'relative',
              zIndex: 2,
              padding: '2rem',
              marginLeft: '1rem',
            }}
          >
            <Typography variant="h1" sx={{ fontSize: '3rem' }}>
              {state.name || 'Restaurant Name'}
            </Typography>
            <Box>
              {state.rating
                ? Array.from({
                    length: Math.floor(state.rating),
                  }).map((_, index) => <StarIcon key={index} />)
                : ''}
            </Box>
            <Typography variant="h3" sx={{ fontSize: '1.5rem' }}>
              {state.price ? '$'.repeat(state.price) : ''}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          marginLeft: '3rem',
          marginTop: '2rem',
          marginRight: '3rem',
          paddingBottom: '3rem',
        }}
      >
        <Button
          variant="contained"
          onClick={() =>
            navigate('/review', {
              state: { restaurantName: state.name },
            })
          }
        >
          Write a Review
        </Button>

        <Divider sx={{ marginTop: '2rem', marginBottom: '2rem' }} />

        {/* <Typography variant="h2">Location and Hours</Typography>
        {state.address &&
          (() => {
            const [street, cityState] = state.address.split(/,(.+)/) // Split on first comma
            return (
              <>
                <Typography>{street.trim()}</Typography>
                <Typography>{cityState.trim()}</Typography>
              </>
            )
          })()}
        <Typography>{state.zipcode}</Typography> */}

        {/* <Divider sx={{ marginTop: '2rem', marginBottom: '2rem' }} /> */}

        {/* <Typography variant="h2">About the Business</Typography>
        <Typography>{state.description}</Typography> */}

        {/* <Divider sx={{ marginTop: '2rem', marginBottom: '2rem' }} /> */}

        <Typography variant="h2">Reviews</Typography>
        {/* Review section */}
        <Card sx={{ padding: '2rem', marginTop: '2rem' }}>
          <Typography variant="h5" sx={{ marginBottom: '1rem' }}>
            Write Your Review
          </Typography>
          <TextareaAutosize
            minRows={4}
            maxRows={10}
            placeholder="Your Review"
            style={{
              width: '97%',
              padding: '16.5px 14px',
              marginBottom: '1rem',
              font: 'inherit',
              resize: 'none',
            }}
          />
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box sx={{ display: 'flex' }}>
              <Typography variant="h6">Rating:</Typography>
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <Button
                    key={index}
                    onClick={() => handleStarClick(index + 1)}
                    sx={{ minWidth: '3rem', width: '3rem' }}
                  >
                    <StarIcon />
                  </Button>
                ))}
            </Box>
            <Button variant="contained">Submit Review</Button>
          </Box>

          {/* Mobile view */}
          <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
            <Box sx={{ display: 'flex' }}>
              <Typography variant="h6">Rating:</Typography>
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <Button
                    key={index}
                    onClick={() => handleStarClick(index + 1)}
                    sx={{ minWidth: '2rem', width: '2rem' }}
                  >
                    <StarIcon />
                  </Button>
                ))}
            </Box>
            <Button variant="contained">Submit Review</Button>
          </Box>
        </Card>

        <Divider sx={{ marginTop: '2rem', marginBottom: '2rem' }} />

        {/* List of Reviews */}
        <List>
          {state.reviews && state.reviews.length > 0 ? (
            state.reviews.map((item: Review, index: number) => (
              <ListItem sx={{ padding: 0, marginTop: '1rem' }} key={index}>
                <ReviewItem
                  user={item.user}
                  rating={item.rating}
                  content={item.content}
                />
              </ListItem>
            ))
          ) : (
            <Typography
              variant="body1"
              sx={{ textAlign: 'center', marginTop: '1rem' }}
            >
              No reviews yet, be the first to review!
            </Typography>
          )}
        </List>
      </Box>
    </Box>
  )
}
