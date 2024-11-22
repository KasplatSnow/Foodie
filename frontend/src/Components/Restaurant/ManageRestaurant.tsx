// RestaurantPage2.tsx
import React, { useState } from 'react'
import {
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
  TextField,
  Snackbar,
  IconButton,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import { RestaurantData } from '../types/restaurant.type'

const mockRestaurants: RestaurantData[] = [
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
  },
]

const RestaurantManagement: React.FC = () => {
  const [restaurants, setRestaurants] = useState<RestaurantData[]>(
    mockRestaurants,
  )
  const [
    selectedRestaurant,
    setSelectedRestaurant,
  ] = useState<RestaurantData | null>(null)
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  const handleAddNewRestaurant = () => {
    setSelectedRestaurant({
      id: '',
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

  const handleEditRestaurant = (restaurant: RestaurantData) => {
    setSelectedRestaurant(restaurant)
    setIsFormVisible(true)
  }

  const handleSaveRestaurant = (data: RestaurantData) => {
    if (data.id) {
      // Update existing restaurant
      setRestaurants((prevRestaurants) =>
        prevRestaurants.map((rest) => (rest.id === data.id ? data : rest)),
      )
    } else {
      // Add new restaurant
      setRestaurants((prevRestaurants) => [
        ...prevRestaurants,
        { ...data, id: (prevRestaurants.length + 1).toString() },
      ])
    }
    setIsFormVisible(false)
    setSnackbarOpen(true)
  }

  const handleDeleteRestaurant = (restaurantId: string) => {
    setRestaurants((prevRestaurants) =>
      prevRestaurants.filter((r) => r.id !== restaurantId),
    )
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && selectedRestaurant) {
      const newPhotoUrls = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file),
      )
      setSelectedRestaurant((prev) =>
        prev
          ? { ...prev, photos: [...(prev.photos || []), ...newPhotoUrls] }
          : prev,
      )
    }
  }

  const handleRemovePhoto = (index: number) => {
    setSelectedRestaurant((prev) =>
      prev
        ? {
            ...prev,
            photos: prev.photos
              ? prev.photos.filter((_, i) => i !== index)
              : [],
          }
        : prev,
    )
  }

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Restaurant Management
      </Typography>

      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleAddNewRestaurant}
        sx={{ mb: 3 }}
      >
        Add New Restaurant
      </Button>

      <List>
        {restaurants.map((restaurant) => (
          <Card key={restaurant.id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">{restaurant.name}</Typography>
              <Typography variant="body2" color="textSecondary">
                Address: {restaurant.address}
              </Typography>
              <Typography variant="body2">{restaurant.description}</Typography>
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
                onClick={() => handleDeleteRestaurant(restaurant.id)}
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        ))}
      </List>

      {/* Add/Edit Restaurant Form Dialog */}
      <Dialog
        open={isFormVisible}
        onClose={() => setIsFormVisible(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {selectedRestaurant?.id ? 'Edit Restaurant' : 'Add New Restaurant'}
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
                  (prev) => prev && { ...prev, contactInfo: e.target.value },
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
                  (prev) => prev && { ...prev, description: e.target.value },
                )
              }
              fullWidth
              multiline
              rows={4}
            />
            <Typography variant="h6">Photos</Typography>
            <Button variant="contained" component="label">
              Upload Photos
              <input type="file" hidden multiple onChange={handleFileChange} />
            </Button>
            <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              {selectedRestaurant?.photos?.map((photo, index) => (
                <Box
                  key={index}
                  sx={{ position: 'relative', width: 100, height: 100 }}
                >
                  <img
                    src={photo}
                    alt={`Restaurant photo ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: 4,
                    }}
                  />
                  <IconButton
                    color="error"
                    onClick={() => handleRemovePhoto(index)}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      backgroundColor: 'white',
                      padding: '2px',
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}
            </Box>
          </Box>
        </DialogContent>
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
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

export default RestaurantManagement
