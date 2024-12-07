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
  lat: 37.3294,
  lng: -121.86,
}
// Mock restaurant data
const mockRestaurants = [
  {
    id: 'mock1',
    name: 'Mock Restaurant 1',
    address: '123 Street st, San Jose, CA',
    photos: ['https://via.placeholder.com/400'],
    lat: 37.3284,
    lng: -121.861,
    rating: 4.5,
    price: 2,
    categories: ['Mock Category 1'],
  },
  {
    id: 'mock2',
    name: 'Mock Restaurant 2',
    address: '338 Story Rd, San Jose, CA',
    photos: ['https://via.placeholder.com/400'],
    lat: 37.3314,
    lng: -121.8625,
    rating: 4.0,
    price: 3,
    categories: ['Mock Category 2'],
  },
]

interface Restaurant {
  id: string
  name: string
  address: string
  description?: string
  photos?: string[]
  zipcode?: string
  price?: number
  rating?: number
  categories?: string[]
  lat?: number
  lng?: number
}

const MapSearch: React.FC = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: REACT_APP_GOOGLE_API_KEY || '',
    libraries: ['places'],
  })

  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(
    [],
  )
  const [filters, setFilters] = useState({
    searchTerm: '',
    zipcode: '',
    categories: '',
    price: '',
    rating: '',
  })
  const [error, setError] = useState<string>('')

  const navigate = useNavigate()

  const handleRestaurantClick = (
    id: string,
    name: string,
    photos?: string,
    price?: number,
    rating?: number,
  ) => {
    navigate(`/restaurant?id=${id}`, {
      state: { name, price, rating, photos },
    })
  }

  const fetchRestaurantsFromGoogleAPI = async (
    location: google.maps.LatLngLiteral,
  ): Promise<Restaurant[]> => {
    const service = new google.maps.places.PlacesService(
      document.createElement('div'),
    )

    return new Promise<Restaurant[]>((resolve, reject) => {
      service.nearbySearch(
        {
          location: new google.maps.LatLng(location.lat, location.lng),
          radius: 15000, // 15km
          type: 'restaurant',
        },
        (results, status) => {
          // searching for nearby locations
          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            console.log('result from google map api ', results)

            // const filteredResults = results.filter((place) =>
            //   place.types?.includes('restaurant'),
            // )

            const restaurants = results.map((place) => ({
              id: place.place_id || 'Unknown',
              name: place.name || 'Unknown',
              address: place.vicinity || 'Unknown',
              photos: place.photos
                ? place.photos.map((photo) =>
                    photo.getUrl({ maxWidth: 400, maxHeight: 300 }),
                  )
                : [],
              lat: place.geometry?.location?.lat(),
              lng: place.geometry?.location?.lng(),
              rating: place.rating || undefined,
              price: place.price_level || 0,
              categories: place.types || [],
              zipcode: '',
            }))
            resolve(restaurants)
          } else {
            console.error('Service error:', status)
            reject('Unable to fetch restaurants from Google Places.')
          }
        },
      )
    })
  }
  // Fetch all restaurants
  const fetchRestaurants = async () => {
    try {
      const apiRestaurants = await fetchRestaurantsFromGoogleAPI(defaultCenter)

      // Ensure API data matches the Restaurant type
      const RestaurantData: Restaurant[] = apiRestaurants.map((restaurant) => ({
        id: restaurant.id,
        name: restaurant.name,
        address: restaurant.address,
        photos: restaurant.photos,
        rating: restaurant.rating,
        price: restaurant.price,
        lat: restaurant.lat,
        lng: restaurant.lng,
        categories: restaurant.categories,
        zipcode: '',
        // description: '',
      }))

      // Combine mock data and google map API data .
      const combinedRestaurants: Restaurant[] = [
        ...mockRestaurants,
        ...RestaurantData,
      ]

      setRestaurants(combinedRestaurants)
      setFilteredRestaurants(combinedRestaurants)
    } catch (error) {
      console.error(error)
      setError('Unable to fetch restaurants. Please try again later.')
    }
  }

  const handleSearch = () => {
    let results = restaurants

    if (filters.searchTerm) {
      results = results.filter((restaurant) =>
        restaurant.name
          .toLowerCase()
          .includes(filters.searchTerm.toLowerCase()),
      )
    }

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

    if (filters.zipcode) {
      results = results.filter((restaurant) =>
        restaurant.zipcode?.includes(filters.zipcode),
      )
    }

    if (filters.rating) {
      results = results.filter(
        (restaurant) =>
          restaurant.rating && restaurant.rating >= parseFloat(filters.rating),
      )
    }

    if (filters.price) {
      results = results.filter(
        (restaurant) =>
          restaurant.price && restaurant.price === parseInt(filters.price, 10),
      )
    }

    setFilteredRestaurants(results)
  }

  useEffect(() => {
    if (isLoaded) {
      fetchRestaurants()
    }
  }, [isLoaded])

  if (!isLoaded) return <div>Loading...</div>

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
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
      {error && (
        <Typography color="error" sx={{ marginBottom: '16px' }}>
          {error}
        </Typography>
      )}
      {/* Search textfields  */}
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
          sx={{ width: '300px', mr: 2 }}
        />
        <TextField
          placeholder="Categories (e.g. Coffee, Thai)"
          variant="outlined"
          value={filters.categories}
          onChange={(e) =>
            setFilters({ ...filters, categories: e.target.value })
          }
          sx={{ width: 300, mr: 2 }}
        />
        <Select
          value={filters.price}
          onChange={(e) => setFilters({ ...filters, price: e.target.value })}
          displayEmpty
          sx={{ width: 110, mr: 2 }}
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
          sx={{ width: 110, mr: 2 }}
        >
          <MenuItem value="">Rating</MenuItem>
          <MenuItem value="3">3 Stars & Up</MenuItem>
          <MenuItem value="4">4 Stars & Up</MenuItem>
          <MenuItem value="5">5 Stars</MenuItem>
        </Select>
        <TextField
          placeholder="Zipcode"
          variant="outlined"
          value={filters.zipcode}
          onChange={(e) => setFilters({ ...filters, zipcode: e.target.value })}
          sx={{ width: 120, mr: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          sx={{ height: 56, width: '200px' }}
        >
          Search
        </Button>
      </Box>
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
              sx={{ mb: 2, cursor: 'pointer' }}
              onClick={() =>
                handleRestaurantClick(
                  restaurant.id,
                  restaurant.name,
                  restaurant.photos && restaurant.photos[0]
                    ? restaurant.photos[0]
                    : '',
                )
              }
            >
              {/* Restaurant List on the left */}
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Box sx={{ flex: 1, pr: 2 }}>
                    <Typography variant="h6">{restaurant.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {restaurant.address}
                    </Typography>
                    {restaurant.rating && (
                      <Typography variant="body2" color="textSecondary">
                        <strong>Rating:</strong> {restaurant.rating} stars
                      </Typography>
                    )}

                    {restaurant.price !== undefined && (
                      <Typography variant="body2" color="textSecondary">
                        <strong>Price Level:</strong>{' '}
                        {'$'.repeat(restaurant.price ?? 0)}
                      </Typography>
                    )}
                  </Box>
                  {restaurant.photos && restaurant.photos.length > 0 && (
                    <Box
                      sx={{
                        width: 120,
                        height: 120,
                        overflow: 'hidden',
                        borderRadius: '8px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <img
                        src={restaurant.photos[0]}
                        alt={`${restaurant.name}`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    </Box>
                  )}
                </Box>
              </CardContent>
            </Card>
          ))}
        </Grid>
        {/* Map maker */}
        <Grid item xs={8}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={defaultCenter}
            zoom={15}
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
    </Box>
  )
}

export default MapSearch
