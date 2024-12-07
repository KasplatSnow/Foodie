import React, { useState, useEffect } from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import {
  Box,
  Grid,
  TextField,
  Select,
  MenuItem,
  Button,
  Card,
  CardContent,
  Typography,
  // Dialog,
  // DialogTitle,
  // DialogContent,
  // Rating,
  // Snackbar,
  InputAdornment,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { REACT_APP_GOOGLE_API_KEY } from '../../constants'
import { useNavigate } from 'react-router-dom'
import Header from '../Home/Header'

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
  id: string
  name: string
  address: string
  contactInfo: string
  hours: string
  description: string
  photos: string[]
  zipcode: string
  price?: number
  rating?: number
  categories?: string[]
  lat?: number
  lng?: number
  reviews?: Review[]
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

interface FetchRestaurantParams {
  setRestaurants: React.Dispatch<React.SetStateAction<any>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

const fetchRestaurants = ({ setRestaurants, setError }: FetchRestaurantParams) => {
  fetch(`http://localhost:8080/api/restaurants/allrestaurants`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((json) => {
      setError('');
      setRestaurants(json[0]);
      console.log(json[0]);
    })
    .catch((e) => {
      setError(e.toString());
      setRestaurants([]);
    });
};

const MapSearch: React.FC = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: REACT_APP_GOOGLE_API_KEY || '',
  })

  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(
    mockRestaurants,
  )
  const [filters, setFilters] = useState({
    searchTerm: '',
    rating: '',
    price: '',
    zipcode: '',
    categories: '',
  })

  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRestaurants({ setRestaurants, setError });
  }, []);

  // const [
  //   selectedRestaurant,
  //   setSelectedRestaurant,
  // ] = useState<Restaurant | null>(null)
  // const [reviewFormOpen, setReviewFormOpen] = useState(false)
  // const [reviewName, setReviewName] = useState('')
  // const [reviewComment, setReviewComment] = useState('')
  // const [reviewRating, setReviewRating] = useState<number | null>(null)
  // const [snackbarOpen, setSnackbarOpen] = useState(false)

  const navigate = useNavigate()
  const handleRestaurantClick = (id: string) => {
    navigate(`/restaurant?${id}`)
  }

  const handleSearch = () => {
    let results = restaurants

    // Filter by search term
    if (filters.searchTerm) {
      results = results.filter((restaurant) =>
        restaurant.name
          .toLowerCase()
          .includes(filters.searchTerm.toLowerCase()),
      )
    }

    // Filter by rating
    if (filters.rating) {
      results = results.filter(
        (restaurant) =>
          restaurant.rating && restaurant.rating >= parseFloat(filters.rating),
      )
    }

    // Filter by price
    if (filters.price) {
      results = results.filter(
        (restaurant) =>
          restaurant.price && restaurant.price === parseInt(filters.price),
      )
    }

    // Filter by zipcode
    if (filters.zipcode) {
      results = results.filter(
        (restaurant) => restaurant.zipcode === filters.zipcode,
      )
    }

    // Filter by categories
    if (filters.categories) {
      const categoriesArray = filters.categories
        .toLowerCase()
        .split(',')
        .map((cat) => cat.trim())
      results = results.filter((restaurant) =>
        categoriesArray.some((cat) =>
          (restaurant.categories ?? [])
            .map((c) => c.toLowerCase())
            .includes(cat),
        ),
      )
    }

    setFilteredRestaurants(results)
  }

  if (!isLoaded) return <div>Loading...</div>

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box
        sx={{
          width: '100%',
          backgroundColor: '#fff',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          zIndex: 10,
        }}
      >
        <Header />
      </Box>

      {/* Search Filters */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 2,
          borderBottom: '1px solid #ddd',
          marginTop: '60px',
        }}
      >
        <TextField
          placeholder="Search for restaurants"
          variant="outlined"
          value={filters.searchTerm}
          onChange={(e) =>
            setFilters({ ...filters, searchTerm: e.target.value })
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            width: '850px',
            mr: 2,
          }}
        />
        <TextField
          placeholder="Zipcode"
          variant="outlined"
          value={filters.zipcode}
          onChange={(e) => setFilters({ ...filters, zipcode: e.target.value })}
          sx={{ width: 150, mr: 2 }}
        />
        <TextField
          placeholder="Categories (e.g., Vietnamese, Coffee)"
          variant="outlined"
          value={filters.categories}
          onChange={(e) =>
            setFilters({ ...filters, categories: e.target.value })
          }
          sx={{ width: 250, mr: 2 }}
        />
        <Select
          value={filters.price}
          onChange={(e) => setFilters({ ...filters, price: e.target.value })}
          displayEmpty
          sx={{ width: 150, mr: 2 }}
        >
          <MenuItem value="">Price</MenuItem>
          <MenuItem value="1">Low</MenuItem>
          <MenuItem value="2">Medium</MenuItem>
          <MenuItem value="3">High</MenuItem>
        </Select>
        <Select
          value={filters.rating}
          onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
          displayEmpty
          sx={{ width: 150, mr: 2 }}
        >
          <MenuItem value="">Rating</MenuItem>
          <MenuItem value="3">3 Stars & Up</MenuItem>
          <MenuItem value="4">4 Stars & Up</MenuItem>
          <MenuItem value="5">5 Stars</MenuItem>
        </Select>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          sx={{ height: 56, width: '150px' }}
        >
          Search
        </Button>
      </Box>

      {/* Main Content */}
      <Grid container sx={{ flexGrow: 1 }}>
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
            <Card
              key={restaurant.id}
              sx={{ mb: 2 }}
              onClick={() => handleRestaurantClick(restaurant.id)}
            >
              <CardContent>
                <Typography variant="h6">{restaurant.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {restaurant.address}
                </Typography>
                <Typography variant="body2">
                  {restaurant.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Grid>

        {/* Map */}
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
      {/* <Dialog
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
      </Dialog> */}

      {/* Snackbar */}
      {/* <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Review submitted successfully!"
      /> */}
    </Box>
  )
}

export default MapSearch
