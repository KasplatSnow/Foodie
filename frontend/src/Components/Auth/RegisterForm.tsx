// src/RegistrationForm.js
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Typography,
  Paper,
  Box,
} from '@mui/material'
import { REACT_APP_GOOGLE_API_KEY } from '../../constants'

import { useNavigate } from 'react-router-dom' // Update to useNavigate

interface FormData {
  name: string
  username: string
  email: string
  password: string
  address: string
  phoneNumber: string
  role: string
  businessName?: string
  businessAddress?: string
  lat?: number
  lng?: number
}

// Environment variables to configure API URL
// const API_URL = process.env.REACT_APP_API_URL;

const RegisterForm: React.FC = () => {
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      address: '',
      phoneNumber: '',
      role: '',
      businessName: '',
      businessAddress: '',
    },
  })
  const navigate = useNavigate()

  const [role, setRole] = useState('')
  // Handle register submit
  const onSubmit = async (data: FormData) => {
    let coordinate = { lat: undefined, lng: undefined }

    if (data.role === 'owner' && data.businessAddress) {
      coordinate = await convertAddress(data.businessAddress)
    }

    const newData = {
      ...data,
      lat: coordinate.lat,
      lng: coordinate.lng,
    }

    console.log(JSON.stringify(data))
    try {
      const response = await fetch(`http://localhost:8080/api/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      })

      if (response.ok) {
        console.log('Registration successful:', newData)
        reset() // Reset the form on successful submission
      } else {
        console.error('Registration failed')
      }
    } catch (error) {
      console.error('Error during registration:', error)
    }
  }
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

  const handleRoleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value)
  }
  console.log(watch('username', '')) // Default to an empty string

  const handleLoginRedirect = () => {
    navigate('/login') // Redirect to the login page
  }
  return (
    <div>
      <Box
        display="flex"
        height="100vh"
        sx={{
          backgroundImage: `url(https://images.unsplash.com/photo-1490818387583-1baba5e638af?q=80&w=3732&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Box
          flex={1}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Paper elevation={3} style={{ padding: 20, width: '20%' }}>
            <h2>Register</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <TextField
                  label="Username"
                  variant="outlined"
                  fullWidth
                  {...register('username', {
                    required: 'Username is required',
                  })}
                  error={!!errors.username}
                />
              </div>
              <div style={{ marginTop: '16px' }}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: 'Email is invalid',
                    },
                  })}
                  error={!!errors.email}
                />
              </div>
              <div style={{ marginTop: '16px' }}>
                <TextField
                  label="Password"
                  variant="outlined"
                  type="password"
                  fullWidth
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  })}
                  error={!!errors.password}
                />
              </div>
              <div style={{ marginTop: '16px' }}>
                <TextField
                  label="Address"
                  variant="outlined"
                  fullWidth
                  {...register('address', {
                    required: 'Address is required',
                  })}
                  error={!!errors.address}
                />
              </div>
              <div style={{ marginTop: '16px' }}>
                <TextField
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                  {...register('phoneNumber', {
                    required: 'Phone Number is required',
                  })}
                  error={!!errors.phoneNumber}
                />
              </div>
              <div style={{ marginTop: '16px' }}>
                <FormControl fullWidth error={!!errors.role}>
                  <InputLabel>Role</InputLabel>
                  <Select
                    {...register('role', { required: 'Role is required' })}
                    value={role}
                    onChange={handleRoleChange}
                  >
                    <MenuItem value="BUSINESS">Owner</MenuItem>
                    <MenuItem value="USER">User</MenuItem>
                  </Select>
                </FormControl>
              </div>
              {role === 'owner' && (
                <>
                  <div style={{ marginTop: '16px' }}>
                    <TextField
                      label="Business Name"
                      variant="outlined"
                      fullWidth
                      {...register('businessName', {
                        required: 'Business Name is required',
                      })}
                      error={!!errors.businessName}
                    />
                  </div>
                  <div style={{ marginTop: '16px' }}>
                    <TextField
                      label="Business Address"
                      variant="outlined"
                      fullWidth
                      {...register('businessAddress', {
                        required: 'Business Address is required',
                      })}
                      error={!!errors.businessAddress}
                    />
                  </div>
                </>
              )}
              <div style={{ marginTop: '16px' }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Register
                </Button>
              </div>
              <Typography variant="body2" style={{ marginTop: 20 }}>
                Already have an account?{' '}
                <Button onClick={handleLoginRedirect} color="primary">
                  Log in
                </Button>
              </Typography>
            </form>
          </Paper>
        </Box>
      </Box>
    </div>
  )
}

export default RegisterForm
