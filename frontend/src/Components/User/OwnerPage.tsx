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
  Snackbar,
  CircularProgress
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import { RestaurantData } from '../types/restaurant.type'
import Header from '../Home/Header'
import { useAuth } from '../Auth/AuthContext'
import { AddRestaurantForm, EditRestaurantForm } from './AddEditRestaurant'

// import Geocode from "react-geocode";
import { REACT_APP_GOOGLE_API_KEY } from '../../constants'

// Set your Google Maps API key
const mockRestaurants: RestaurantData[] = [
  {
    businessOwnerId: 1,
    email: 'test@gmail.com',
    name: 'Pho Ha Noi',
    address: '123 Main St, San Jose, CA',
    phoneNumber: '123-456-7890',
    hours: '9:00 AM - 9:00 PM',
    description: 'A cozy place for delicious Vietnamese food.',
    photo: ['https://cdn.example.com/photo1.jpg', ''],
    zipCode: '95122',
    price: 2,
    rating: 4.5,
    cuisine: ['Vietnamese', 'Noodles'],
    lat: 37.3382,
    lng: -121.889,
  },
]

// interface FetchOwnerRestaurantsParams {
//   setRestaurants: React.Dispatch<React.SetStateAction<any>>
//   userID: any
//   setError: React.Dispatch<React.SetStateAction<string>>
// }

// Fetch restaurants from backend
const fetchRestaurants = async ({
  setRestaurants,
  userID,
  setError,
}: {
  setRestaurants: React.Dispatch<React.SetStateAction<RestaurantData[]>>
  userID: number
  setError: React.Dispatch<React.SetStateAction<string>>
}) => {
  try {
    const response = await fetch(
      // `http://localhost:8080/api/business-owner/getrestaurants/userID/1`,
      `http://localhost:8080/api/business-owner/getrestaurants/userID/${userID}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    const json = await response.json()
    console.log('Fetched Restaurants:', json)
    setRestaurants(json)
    setError('')
  } catch (e) {
    console.error('Fetch Error:', e)
    setError('Failed to fetch restaurants.')
    setRestaurants(mockRestaurants) // Fallback to mock data
  }
}

// interface FetchProfileParams {
//   setUserData: React.Dispatch<React.SetStateAction<any>>
//   userID: any
//   setError: React.Dispatch<React.SetStateAction<string>>
// }

const fetchProfileData = async ({
  setUserData,
  userID,
  setError,
}: {
  setUserData: React.Dispatch<React.SetStateAction<any>>
  userID: number
  setError: React.Dispatch<React.SetStateAction<string>>
}) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/users/getuserbyid/userID/${userID}`,
      // `http://localhost:8080/api/users/getuserbyid/userID/1`,

      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      },
    )
    const json = await response.json()
    console.log('Fetched User Profile:', json)
    setUserData(json)
    setError('')
  } catch (e) {
    console.error('Fetch User Error:', e)
    setError('Failed to fetch user data.')
    setUserData(null)
  }
}

interface PostRestaurantParams {
  newRestaurant: any
  setError: React.Dispatch<React.SetStateAction<string>>
}

/* EXAMPLE OF WHAT newRestaurant input SHOULD BE
  {
    "email": "aroma@gmail.com",
    "name": "Aroma",
    "zipCode": "95121",
    "address": "3005 Silver Creek Rd Ste 150, San Jose, CA",
    "phoneNumber": "(408)622-8633",
    "businessOwnerId": 1,
    "hours": "10:00 AM - 9:00 PM",
    "description": "An Aroma you can taste! Enjoy our Vietnamese-inspired desserts, coffees, and teas! Every cup is made to order and includes the freshest ingredients to satisfy any of your cravings!",
    "cuisine": ["tea", "desserts", "coffee"],
    "photo": ["https://s3-media0.fl.yelpcdn.com/bphoto/wj_vEiq8AlhosfLJkIc1mQ/o.jpg"],
    "rating": 4.5,
    "price": 2,
    "lng": -121.813356,
    "lat": 37.309213
  }
*/
const postRestaurant = ({ newRestaurant, setError }: PostRestaurantParams) => {
  console.log('NEW', newRestaurant)
  return fetch(`http://localhost:8080/api/restaurants/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newRestaurant),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
      return res.json()
    })
    .then((json) => {
      setError('')
    })
    .catch((e) => {
      setError(e.toString())
    })
}

interface EditRestaurantParams {
  newRestaurant: any
  restaurantID: any
  setError: React.Dispatch<React.SetStateAction<string>>
}

/* EXAMPLE OF WHAT newRestaurant input SHOULD BE
  {
    "email": "aroma@gmail.com",
    "name": "Aroma",
    "zipCode": "95121",
    "address": "3005 Silver Creek Rd Ste 150, San Jose, CA",
    "phoneNumber": "(408)622-8633",
    "businessOwnerId": 1,
    "hours": "10:00 AM - 9:00 PM",
    "description": "An Aroma you can taste! Enjoy our Vietnamese-inspired desserts, coffees, and teas! Every cup is made to order and includes the freshest ingredients to satisfy any of your cravings!",
    "cuisine": ["tea", "desserts", "coffee"],
    "photo": ["https://s3-media0.fl.yelpcdn.com/bphoto/wj_vEiq8AlhosfLJkIc1mQ/o.jpg"],
    "rating": 4.5,
    "price": 2,
    "lng": -121.813356,
    "lat": 37.309213
  }

  restaurantID is the id of the restaurant being edited
*/
const editRestaurant = ({
  newRestaurant,
  restaurantID,
  setError,
}: EditRestaurantParams) => {
  return fetch(
    `http://localhost:8080/api/restaurants/update/restaurantid/${restaurantID}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newRestaurant),
    },
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
      return res.json()
    })
    .then((json) => {
      setError('')
    })
    .catch((e) => {
      setError(e.toString())
    })
}

const OwnerPage: React.FC = () => {
  const [restaurants, setRestaurants] = useState<RestaurantData[]>(
    mockRestaurants,
  )
  const [addFormVisible, setAddFormVisible] = useState(false)
  const [editFormVisible, setEditFormVisible] = useState(false)
  const [
    selectedRestaurant,
    setSelectedRestaurant,
  ] = useState<RestaurantData | null>(null)
  // const [isFormVisible, setIsFormVisible] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [error, setError] = useState('')
  const [userData, setUserData] = useState<any>(null)
  const loginContext = useAuth()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [restaurantToDelete, setRestaurantToDelete] = useState<number | null>(
    null,
  )
  useEffect(() => {
    fetchRestaurants({ setRestaurants, userID: loginContext.userId, setError })
    fetchProfileData({ setUserData, userID: loginContext.userId, setError })
  }, [loginContext.userId])

  // add new restaurant
  const handleAddNewRestaurant = () => {
    setSelectedRestaurant({
      businessOwnerId: loginContext.userId,
      name: '',
      email: '',
      address: '',
      phoneNumber: '',
      hours: '',
      description: '',
      photo: [],
      zipCode: '',
      price: undefined,
      rating: undefined,
      cuisine: [],
      lat: undefined,
      lng: undefined,
    })
    setAddFormVisible(true)
  }

  // edit restaurant
  const handleEditRestaurant = (restaurant: RestaurantData) => {
    setSelectedRestaurant(restaurant)
    setEditFormVisible(true)
  }
  //convert address into lng, lat
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

  //handle button add new restaurant
  const handleSaveAddRestaurant = async (data: RestaurantData) => {
    const { lat, lng } = await convertAddress(data.address)
    const newData = {
      ...data,
      lat,
      lng,
      businessOwnerId: loginContext.userId,
    }
    // Add new restaurant
    setRestaurants((prevRestaurants) => [
      ...prevRestaurants,
      { ...newData, id: (prevRestaurants.length + 1).toString() },
    ])
    postRestaurant({ newRestaurant: newData, setError })
    setAddFormVisible(false)
  }
  //handle button edit restaurant

  const handleSaveEditRestaurant = async (data: RestaurantData) => {
    const { lat, lng } = await convertAddress(data.address)
    const newData = {
      ...data,
      lat,
      lng,
    }

    if (newData.businessOwnerId !== 1) {
      // Update existing restaurant
      setRestaurants((prevRestaurants) =>
        prevRestaurants.map((rest) =>
          rest.restaurantID === newData.restaurantID ? newData : rest,
        ),
      )
      editRestaurant({
        newRestaurant: newData,
        restaurantID: newData.restaurantID,
        setError,
      })
      setEditFormVisible(false)
    }
  }
  // //save restaurant and convert address to long and latitude
  // const handleSaveRestaurant = async (data: RestaurantData) => {
  //   const { lat, lng } = await convertAddress(data.address)
  //   const newData = {
  //     ...data,
  //     lat,
  //     lng,
  //   }
  //   console.log('new data', newData)
  //   if (newData.businessOwnerId !== 1) {
  //     // Update existing restaurant
  //     setRestaurants((prevRestaurants) =>
  //       prevRestaurants.map((rest) =>
  //         rest.businessOwnerId === newData.businessOwnerId ? newData : rest,
  //       ),
  //     )
  //     editRestaurant({
  //       newRestaurant: newData,
  //       restaurantID: data.businessOwnerId,
  //       setError,
  //     })
  //   } else {
  //     // Add new restaurant
  //     setRestaurants((prevRestaurants) => [
  //       ...prevRestaurants,
  //       { ...newData, id: (prevRestaurants.length + 1).toString() },
  //     ])
  //     postRestaurant({ newRestaurant: newData, setError })
  //   }

  //   setIsFormVisible(false)
  //   setSnackbarOpen(true)
  // }
  // console.log(
  //   'saved data',
  //   restaurants.map((t) => t.description),
  // )

  // console.log(
  //   'user data',
  //   userData.map((t) => t.email),
  // )

  // Delete dialog
  const openDeleteDialog = (businessOwnerId: number) => {
    setRestaurantToDelete(businessOwnerId)
    setDeleteDialogOpen(true)
  }

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false)
    setRestaurantToDelete(null)
  }

  const handleDeleteRestaurant = () => {
    if (restaurantToDelete) {
      setRestaurants((prevRestaurants) =>
        prevRestaurants.filter((r) => r.businessOwnerId !== restaurantToDelete),
      )
      setSnackbarOpen(true)
    }
    closeDeleteDialog()
  }

  if (userData == null) {  // If userData is still null, show a loading indicator
    return (
        <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress />
            <Typography>Must be logged in</Typography>
        </Box>
    );
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
          marginTop: '50px',
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
            src={userData.pfp} // Replace with a real image path
            sx={{
              width: 100,
              height: 100,
              marginBottom: 2,
              backgroundColor: '#64b5f6', // Fallback background color
            }}
          />

          {/* Customer Info Heading */}
          {/* <Typography variant="h6" gutterBottom>
            Owner Info
          </Typography> */}

          {/* Business Owner info Left column */}
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
              <strong>Username:</strong> {userData ? userData.username : ''}
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
        {/* Right Column */}
        <Box sx={{ flex: 1, padding: 3 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddNewRestaurant}
            sx={{ marginBottom: 2 }}
          >
            Add New Restaurant
          </Button>

          <List>
            {restaurants.map((restaurant) => (
              <Card key={restaurant.businessOwnerId} sx={{ marginBottom: 2 }}>
                <CardContent>
                  <Typography variant="h6">{restaurant.name}</Typography>
                  <Typography variant="body2">
                    Address: {restaurant.address}
                  </Typography>
                  <Typography variant="body2">
                    Phone: {restaurant.phoneNumber}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="outlined"
                    startIcon={<EditIcon />}
                    onClick={() => handleEditRestaurant(restaurant)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => openDeleteDialog(restaurant.businessOwnerId)}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            ))}
          </List>
        </Box>
      </Box>

      {/* Add Form */}
      {addFormVisible && (
        <AddRestaurantForm
          onClose={() => setAddFormVisible(false)}
          onSave={handleSaveAddRestaurant}
        />
      )}

      {/* Edit Form */}
      {editFormVisible && selectedRestaurant && (
        <EditRestaurantForm
          restaurant={selectedRestaurant}
          onClose={() => setEditFormVisible(false)}
          onSave={handleSaveEditRestaurant}
        />
      )}

      {/* Delete Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this restaurant? This action cannot
            be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteRestaurant} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
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
