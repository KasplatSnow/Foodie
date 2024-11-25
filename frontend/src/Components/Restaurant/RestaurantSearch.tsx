import React, { useState } from 'react'
import {
  Box,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Rating,
  Snackbar,
} from '@mui/material'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'

import { REACT_APP_GOOGLE_API_KEY } from '../../constants'

const mapContainerStyle = {
  width: '100%',
  height: '100%',
}

const defaultCenter = {
  lat: 37.3382,
  lng: -121.8863,
}

// Define the type for Restaurant data
interface Restaurant {
  id: string // Unique identifier
  name: string
  address: string
  contactInfo: string
  hours: string
  description: string
  photos: string[]
  zipcode: string
  price?: number // Optional: Price level
  rating?: number // Optional: Rating out of 5
  categories?: string[] // Optional: Array of categories
  lat?: number // Optional: Latitude
  lng?: number // Optional: Longitude
  reviews?: Review[] // List of reviews
}

interface Review {
  id: string
  name: string
  comment: string
  rating: number
  date: string
}

// Mock restaurant data
const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Pho Ha Noi',
    address: '123 Main St, San Jose, CA',
    contactInfo: '123-456-7890',
    hours: '9:00 AM - 9:00 PM',
    description: 'A cozy place for delicious Vietnamese food.',
    photos: ['https://cdn.example.com/photo1.jpg'],
    zipcode: '95122',
    price: 2,
    rating: 4.5,
    categories: ['Vietnamese', 'Noodles'],
    lat: 37.3382,
    lng: -121.889,
    reviews: [],
  },
  {
    id: '2',
    name: 'Coffee and Co.',
    address: '789 Coffee Ln, San Jose, CA',
    contactInfo: '987-654-3210',
    hours: '10:00 AM - 10:00 PM',
    description: 'Famous for the best coffee in town.',
    photos: ['https://cdn.example.com/photo2.jpg'],
    zipcode: '95113',
    price: 1,
    rating: 4.8,
    categories: ['Coffee', 'Cafe'],
    lat: 37.336,
    lng: -121.8905,
    reviews: [],
  },
]

const MapSearchWithReview: React.FC = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: REACT_APP_GOOGLE_API_KEY || '', // Securely access the key
  })

  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(
    mockRestaurants,
  )

  const [
    selectedRestaurant,
    setSelectedRestaurant,
  ] = useState<Restaurant | null>(null)
  const [reviewFormOpen, setReviewFormOpen] = useState(false)
  const [reviewName, setReviewName] = useState('')
  const [reviewComment, setReviewComment] = useState('')
  const [reviewRating, setReviewRating] = useState<number | null>(null)
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  const handleOpenReviewForm = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant)
    setReviewFormOpen(true)
  }

  const handleSubmitReview = () => {
    if (!reviewName || !reviewComment || !reviewRating || !selectedRestaurant) {
      alert('Please fill in all fields to submit a review.')
      return
    }

    const newReview: Review = {
      id: Date.now().toString(),
      name: reviewName,
      comment: reviewComment,
      rating: reviewRating,
      date: new Date().toLocaleString(),
    }

    // Add the review to the selected restaurant
    setFilteredRestaurants((prevRestaurants) =>
      prevRestaurants.map((restaurant) =>
        restaurant.id === selectedRestaurant.id
          ? {
              ...restaurant,
              reviews: [...(restaurant.reviews || []), newReview],
            }
          : restaurant,
      ),
    )

    // Clear form and close dialog
    setReviewName('')
    setReviewComment('')
    setReviewRating(null)
    setReviewFormOpen(false)
    setSnackbarOpen(true)
  }

  if (!isLoaded) return <div>Loading...</div>

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Search Filters (same as before) */}

      <Grid container sx={{ flexGrow: 1 }}>
        {/* Left: Restaurant List */}
        <Grid
          item
          xs={4}
          sx={{
            overflowY: 'auto',
            height: '100%',
            borderRight: '1px solid #ddd',
            p: 2,
          }}
        >
          {filteredRestaurants.map((restaurant) => (
            <Card key={restaurant.id} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6">{restaurant.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {restaurant.address}
                </Typography>
                <Typography variant="body2">
                  {restaurant.description}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  <strong>Rating:</strong> {restaurant.rating} ⭐
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={() => handleOpenReviewForm(restaurant)}
                >
                  Submit Review
                </Button>
              </CardContent>
            </Card>
          ))}
        </Grid>

        {/* Right: Map */}
        <Grid item xs={8}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={defaultCenter}
            zoom={12}
          >
            {filteredRestaurants.map(
              (restaurant) =>
                restaurant.lat &&
                restaurant.lng && (
                  <Marker
                    key={restaurant.id}
                    position={{ lat: restaurant.lat, lng: restaurant.lng }}
                    title={`${restaurant.name} - ${restaurant.address}`}
                  />
                ),
            )}
          </GoogleMap>
        </Grid>
      </Grid>

      {/* Review Form Dialog */}
      <Dialog
        open={reviewFormOpen}
        onClose={() => setReviewFormOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Submit Review for {selectedRestaurant?.name}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Your Name"
              value={reviewName}
              onChange={(e) => setReviewName(e.target.value)}
              fullWidth
            />
            <TextField
              label="Your Review"
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              multiline
              rows={4}
              fullWidth
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography>Rating:</Typography>
              <Rating
                value={reviewRating}
                onChange={(e, newValue) => setReviewRating(newValue)}
              />
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmitReview}
            >
              Submit Review
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Review submitted successfully!"
      />
    </Box>
  )
}

export default MapSearchWithReview
