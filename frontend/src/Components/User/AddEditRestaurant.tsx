import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  TextField,
  Button,
} from '@mui/material'

// Add Restaurant Form Component
const AddRestaurantForm: React.FC<{
  onClose: () => void
  onSave: (data: any) => void
}> = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    zipCode: '',
    phoneNumber: '',
    hours: '',
    description: '',
    cuisine: '',
    photo: '',
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    const data = {
      ...formData,
      cuisine: formData.cuisine.split(',').map((c) => c.trim()),
      photo: formData.photo.split(',').map((p) => p.trim()),
    }
    onSave(data)
    onClose()
  }

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Restaurant</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Restaurant Name"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            fullWidth
          />
          <TextField
            label="Email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            fullWidth
          />
          <TextField
            label="Address"
            value={formData.address}
            onChange={(e) => handleChange('address', e.target.value)}
            fullWidth
          />
          <TextField
            label="Zip Code"
            value={formData.zipCode}
            onChange={(e) => handleChange('zipCode', e.target.value)}
            fullWidth
          />
          <TextField
            label="Phone Number"
            value={formData.phoneNumber}
            onChange={(e) => handleChange('phoneNumber', e.target.value)}
            fullWidth
          />
          <TextField
            label="Hours"
            value={formData.hours}
            onChange={(e) => handleChange('hours', e.target.value)}
            fullWidth
          />
          <TextField
            label="Description"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            fullWidth
            multiline
            rows={2}
          />
          <TextField
            label="Cuisine (comma-separated)"
            value={formData.cuisine}
            onChange={(e) => handleChange('cuisine', e.target.value)}
            fullWidth
          />
          <TextField
            label="Photos (comma-separated)"
            value={formData.photo}
            onChange={(e) => handleChange('photo', e.target.value)}
            fullWidth
          />
        </Box>
      </DialogContent>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </Box>
    </Dialog>
  )
}

// Edit Restaurant Form Component
const EditRestaurantForm: React.FC<{
  restaurant: any
  onClose: () => void
  onSave: (data: any) => void
}> = ({ restaurant, onClose, onSave }) => {
  const [formData, setFormData] = useState(restaurant)

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  console.log("RESTAURANT", restaurant)

  const handleSave = () => {
    console.log("EDIT", formData);
    const data = {
      ...formData,
      cuisine: formData.cuisine.split(',').map((c: string) => c.trim()),
      photo: formData.photo.split(',').map((p: string) => p.trim()),
    }
    onSave(data)
    onClose()
  }

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Restaurant</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Restaurant Name"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            fullWidth
          />
          <TextField
            label="Email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            fullWidth
          />
          <TextField
            label="Address"
            value={formData.address}
            onChange={(e) => handleChange('address', e.target.value)}
            fullWidth
          />
          <TextField
            label="Zip Code"
            value={formData.zipCode}
            onChange={(e) => handleChange('zipCode', e.target.value)}
            fullWidth
          />
          <TextField
            label="Phone Number"
            value={formData.phoneNumber}
            onChange={(e) => handleChange('phoneNumber', e.target.value)}
            fullWidth
          />
          <TextField
            label="Hours"
            value={formData.hours}
            onChange={(e) => handleChange('hours', e.target.value)}
            fullWidth
          />
          <TextField
            label="Description"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            fullWidth
            multiline
            rows={2}
          />
          <TextField
            label="Cuisine (comma-separated)"
            value={formData.cuisine.join(', ')}
            onChange={(e) => handleChange('cuisine', e.target.value)}
            fullWidth
          />
          <TextField
            label="Photos (comma-separated)"
            value={formData.photo.join(', ')}
            onChange={(e) => handleChange('photo', e.target.value)}
            fullWidth
          />
        </Box>
      </DialogContent>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Box>
    </Dialog>
  )
}

export { AddRestaurantForm, EditRestaurantForm }
