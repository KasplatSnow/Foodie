// RestaurantPage2.tsx
import React, { useState, useEffect } from 'react'
import { Email, Phone, Person } from '@mui/icons-material'
import {
  Avatar,
  Box,
  Button,
  Typography,
  List,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  TextField,
  Snackbar,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import { RestaurantData } from '../types/restaurant.type'
import Header from '../Home/Header'
import { useAuth } from '../Auth/AuthContext'
// import Geocode from "react-geocode";
import { REACT_APP_GOOGLE_API_KEY } from '../../constants'

// Set your Google Maps API key
const mockRestaurants: RestaurantData[] = [
  {
    id: 1,
    name: 'Pho Ha Noi',
    address: '123 Main St, San Jose, CA',
    contactInfo: '123-456-7890',
    hours: '9:00 AM - 9:00 PM',
    description: 'A cozy place for delicious Vietnamese food.',
    photos: ['https://cdn.example.com/photo1.jpg', ''],
    zipcode: '95122',
    price: 2,
    rating: 4.5,
    categories: ['Vietnamese', 'Noodles'],
    lat: 37.3382,
    lng: -121.889,
  },
  {
    id: 2,
    name: 'Coffee and Co.',
    address: '789 Coffee Ln, San Jose, CA',
    contactInfo: '987-654-3210',
    hours: '10:00 AM - 10:00 PM',
    description: 'Famous for the best coffee in town.',
    photos: ['https://cdn.example.com/photo2.jpg', ''],
    zipcode: '95113',
    price: 1,
    rating: 4.8,
    categories: ['Coffee', 'Cafe'],
    lat: 37.336,
    lng: -121.8905,
  },
]

interface FetchOwnerRestaurantsParams {
  setRestaurants: React.Dispatch<React.SetStateAction<any>>
  userID: any
  setError: React.Dispatch<React.SetStateAction<string>>
}

const fetchRestaurants = ({
  setRestaurants,
  userID,
  setError,
}: FetchOwnerRestaurantsParams) => {
  fetch(
    `http://localhost:8080/api/business-owner/getrestaurants/userID/${userID}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
    .then((res) => res.json())
    .then((json) => {
      setError('')
      setRestaurants(json)
      console.log(json)
    })
    .catch((e) => {
      setError(e.toString())
      setRestaurants(mockRestaurants)
    })
}

interface FetchProfileParams {
  setUserData: React.Dispatch<React.SetStateAction<any>>
  userID: any
  setError: React.Dispatch<React.SetStateAction<string>>
}

const fetchProfileData = ({
  setUserData,
  userID,
  setError,
}: FetchProfileParams) => {
  fetch(`http://localhost:8080/api/users/getuserbyid/userID/${userID}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((json) => {
      setError('')
      setUserData(json)
    })
    .catch((e) => {
      setError(e.toString())
      setUserData([])
    })
}

const OwnerPage: React.FC = () => {
  const [restaurants, setRestaurants] = useState<RestaurantData[]>(
    mockRestaurants,
  )
  const [
    selectedRestaurant,
    setSelectedRestaurant,
  ] = useState<RestaurantData | null>(null)
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [error, setError] = useState('')
  const [userData, setUserData] = useState(null)
  const loginContext = useAuth()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [restaurantToDelete, setRestaurantToDelete] = useState<string | null>(
    null,
  )
  useEffect(() => {
    fetchRestaurants({ setRestaurants, userID: loginContext.userId, setError })
    fetchProfileData({ setUserData, userID: loginContext.userId, setError })
  }, [loginContext.userId])

  // add new restaurant
  const handleAddNewRestaurant = () => {
    setSelectedRestaurant({
      id: 0,
      name: '',
      address: '',
      contactInfo: '',
      hours: '',
      description: '',
      photos: [],
      zipcode: '',
      price: undefined,
      rating: undefined,
      categories: [],
      lat: undefined,
      lng: undefined,
    })
    setIsFormVisible(true)
  }
  // edit restaurant
  const handleEditRestaurant = (restaurant: RestaurantData) => {
    setSelectedRestaurant(restaurant)
    setIsFormVisible(true)
  }
  //NOTE
  //save restaurant and convert address to long and latitude
  const handleSaveRestaurant = async (data: RestaurantData) => {
    console.log('save changes')
    const { lat, lng } = await convertAddress(data.address)
    const newData = {
      ...data,
      lat,
      lng,
    }
    console.log('new data', newData)
    if (newData.id) {
      // Update existing restaurant
      setRestaurants((prevRestaurants) =>
        prevRestaurants.map((rest) =>
          rest.id === newData.id ? newData : rest,
        ),
      )
    } else {
      // Add new restaurant
      setRestaurants((prevRestaurants) => [
        ...prevRestaurants,
        { ...newData, id: (prevRestaurants.length + 1).toString() },
      ])
    }

    setIsFormVisible(false)
    setSnackbarOpen(true)
  }
  // console.log(
  //   'saved data',
  //   restaurants.map((t) => t.name),
  // )
  const convertAddress = async (address: string) => {
    try {
      const apiKey = REACT_APP_GOOGLE_API_KEY || ''
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address,
        )}&key=${apiKey}`,
      )
      const data = await response.json()
      // console.log('convert', data)
      if (data.status === 'OK') {
        const location = data.results[0].geometry.location
        return { lat: location.lat, lng: location.lng }
      } else {
        // console.error('Error fetching coordinates:', data.status)
        return { lat: 0, lng: 0 }
      }
    } catch (err) {
      console.error('Error fetching coordinates:', err)
      return { lat: 0, lng: 0 }
    }
  }

  // Delete dialog
  const openDeleteDialog = (restaurantId: string) => {
    setRestaurantToDelete(restaurantId)
    setDeleteDialogOpen(true)
  }

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false)
    setRestaurantToDelete(null)
  }

  const handleDeleteRestaurant = () => {
    if (restaurantToDelete) {
      setRestaurants((prevRestaurants) =>
        prevRestaurants.filter((r) => r.id !== restaurantToDelete),
      )
      setSnackbarOpen(true)
    }
    closeDeleteDialog()
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Header */}
      <Box
        sx={{
          backgroundColor: '#f5f5f5',
          padding: 2,
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Header />
      </Box>
      {/* Main Content */}
      <Box
        sx={{
          display: 'flex',
          flexGrow: 1,
          overflow: 'hidden',
        }}
      >
        {/* Left Column: Customer Info */}
        <Box
          sx={{
            width: '25%',
            backgroundColor: '#e3f2fd', // Light blue background
            padding: 3,
            borderRight: '1px solid #ddd',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* Avatar */}
          <Avatar
            alt="John Doe"
            src="/path/to/avatar.jpg" // Replace with a real image path
            sx={{
              width: 100,
              height: 100,
              marginBottom: 2,
              backgroundColor: '#64b5f6', // Fallback background color
            }}
          />

          {/* Customer Info Heading */}
          <Typography variant="h6" gutterBottom>
            Owner Info
          </Typography>

          {/* Info with Icons */}
          <Box
            sx={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <Typography
              variant="body1"
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
            >
              <Person fontSize="small" color="primary" />
              <strong>Name:</strong> {userData ? userData.username : ''}
            </Typography>
            <Typography
              variant="body1"
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
            >
              <Email fontSize="small" color="primary" />
              <strong>Email:</strong> {userData ? userData.email : ''}
            </Typography>
            <Typography
              variant="body1"
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
            >
              <Phone fontSize="small" color="primary" />
              <strong>Phone:</strong> {userData ? userData.phoneNumber : ''}
            </Typography>
          </Box>
        </Box>

        {/* Add New Restaurant Button */}
        {/* Right Column: Restaurant Management */}
        <Box sx={{ flex: 1, padding: 2, overflowY: 'auto', marginTop: '50px' }}>
          <Box
            sx={{
              paddingBottom: 2,
              borderBottom: '1px solid #ddd',
              marginBottom: 2,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleAddNewRestaurant}
              sx={{ mb: 3 }}
            >
              Add New Restaurant
            </Button>
          </Box>
          <List>
            {restaurants.map((restaurant) => (
              <Card key={restaurant.id} sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h6">{restaurant.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Address: {restaurant.address}
                  </Typography>
                  <Typography variant="body2">
                    {restaurant.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEditRestaurant(restaurant)}
                    startIcon={<EditIcon />}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => openDeleteDialog(restaurant.id)}
                    startIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            ))}
          </List>
          {/* Delete Dialog */}
          <Dialog open={deleteDialogOpen} onClose={closeDeleteDialog}>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this restaurant? This action
                cannot be undone.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeDeleteDialog}>Cancel</Button>
              <Button onClick={handleDeleteRestaurant} color="error">
                Delete
              </Button>
            </DialogActions>
          </Dialog>

          {/* Add/Edit Restaurant Form Dialog */}
          <Dialog
            open={isFormVisible}
            onClose={() => setIsFormVisible(false)}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle>
              {selectedRestaurant?.id
                ? 'Edit Restaurant'
                : 'Add New Restaurant'}
            </DialogTitle>
            <DialogContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="Restaurant Name"
                  value={selectedRestaurant?.name || ''}
                  onChange={(e) =>
                    setSelectedRestaurant(
                      (prev) => prev && { ...prev, name: e.target.value },
                    )
                  }
                  fullWidth
                />
                <TextField
                  label="Address"
                  value={selectedRestaurant?.address || ''}
                  onChange={(e) =>
                    setSelectedRestaurant(
                      (prev) => prev && { ...prev, address: e.target.value },
                    )
                  }
                  fullWidth
                />
                <TextField
                  label="Contact Info"
                  value={selectedRestaurant?.contactInfo || ''}
                  onChange={(e) =>
                    setSelectedRestaurant(
                      (prev) =>
                        prev && { ...prev, contactInfo: e.target.value },
                    )
                  }
                  fullWidth
                />
                <TextField
                  label="Hours"
                  value={selectedRestaurant?.hours || ''}
                  onChange={(e) =>
                    setSelectedRestaurant(
                      (prev) => prev && { ...prev, hours: e.target.value },
                    )
                  }
                  fullWidth
                />
                <TextField
                  label="Description"
                  value={selectedRestaurant?.description || ''}
                  onChange={(e) =>
                    setSelectedRestaurant(
                      (prev) =>
                        prev && { ...prev, description: e.target.value },
                    )
                  }
                  fullWidth
                  multiline
                  rows={4}
                />

                <TextField
                  label="Photos"
                  value={selectedRestaurant?.photos?.join(', ') || ''}
                  onChange={(e) =>
                    setSelectedRestaurant((prev) => {
                      if (!prev) return null
                      return {
                        ...prev,
                        photos: e.target.value
                          .split(',')
                          .map((photo) => photo.trim()),
                      }
                    })
                  }
                  fullWidth
                  multiline
                  rows={4}
                />
              </Box>
            </DialogContent>
            <Box
              sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}
            >
              <Button onClick={() => setIsFormVisible(false)}>Cancel</Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  selectedRestaurant && handleSaveRestaurant(selectedRestaurant)
                }
              >
                Save Changes
              </Button>
            </Box>
          </Dialog>
        </Box>
      </Box>
      {/* Snackbar for confirmation */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Restaurant details saved successfully"
      />
    </Box>
  )
}

export default OwnerPage
