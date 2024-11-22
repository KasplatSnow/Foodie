import React, { useState } from 'react'
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
  InputAdornment,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
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
  id: string
  name: string
  address: string
  contactInfo: string
  hours: string
  description: string
  photos: string[]
  zipcode: string
  price?: number // Optional: Price level (1 = Low, 2 = Medium, 3 = High)
  rating?: number // Optional: Rating out of 5
  categories?: string[] // Optional: Array of categories
  lat?: number // Optional: Latitude for marker placement
  lng?: number // Optional: Longitude for marker placement
}

// Mock restaurant data
const mockRestaurants: Restaurant[] = [
  {
    id: '11SS',
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
  },
  {
    id: '2ASDDF',
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
  },
  {
    id: '3SFASFDS',
    name: 'Starbucks',
    address: '456 Pasta Rd, San Jose, CA',
    contactInfo: '123-789-4560',
    hours: '7:00 AM - 8:00 PM',
    description: 'A great place to grab coffee and relax.',
    photos: ['https://cdn.example.com/photo3.jpg'],
    zipcode: '95114',
    price: 3,
    rating: 4.2,
    categories: ['Cafe', 'Coffee'],
    lat: 37.3402,
    lng: -121.8855,
  },
]

const MapSearch: React.FC = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: REACT_APP_GOOGLE_API_KEY || '', // Securely access the key
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

  const handleSearch = () => {
    let results = mockRestaurants

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
      {/* Top Search Bar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 2,
          borderBottom: '1px solid #ddd',
        }}
      >
        <TextField
          placeholder="Search for restaurants (e.g., pho)"
          variant="outlined"
          fullWidth
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
          sx={{ mr: 2 }}
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
          sx={{ height: 56 }}
        >
          Search
        </Button>
      </Box>

      {/* Main Content */}
      <Grid container sx={{ flexGrow: 1 }}>
        {/* Left Side: Restaurant List */}
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
          {filteredRestaurants.length === 0 && (
            <Typography>No restaurants found.</Typography>
          )}
          {filteredRestaurants.map((restaurant, index) => (
            <Card key={index} sx={{ mb: 2 }}>
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
                <Typography variant="body2">
                  <strong>Price:</strong> {'$'.repeat(restaurant.price || 0)}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Grid>

        {/* Right Side: Map */}
        <Grid item xs={8}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={defaultCenter}
            zoom={12}
          >
            {filteredRestaurants.map(
              (restaurant, index) =>
                restaurant.lat &&
                restaurant.lng && (
                  <Marker
                    key={index}
                    position={{ lat: restaurant.lat, lng: restaurant.lng }}
                    title={`${restaurant.name} - ${restaurant.address}`}
                  />
                ),
            )}
          </GoogleMap>
        </Grid>
      </Grid>
    </Box>
  )
}

export default MapSearch
