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

import { useNavigate } from 'react-router-dom' // Update to useNavigate

interface FormData {
  name: string
  username: string
  email: string
  password: string
  role: string
  businessName?: string
  businessAddress?: string
}
// Environment variables to configure API URL
// const API_URL = process.env.REACT_APP_API_URL;

const RegisterForm: React.FC = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      role: '',
      businessName: '',
      businessAddress: '',
    },
  })
  const navigate = useNavigate()

  const [role, setRole] = useState('')
  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data)
    // Handle form submission (e.g., send data to the server)
  }
  // Function to handle form submission
  // const onSubmit = async (data) => {
  //   try {
  //     const response = await fetch(`${API_URL}`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     });

  //     if (response.ok) {
  //       console.log("Registration successful:", data);
  //       reset(); // Reset the form on successful submission
  //     } else {
  //       console.error("Registration failed");
  //     }
  //   } catch (error) {
  //     console.error("Error during registration:", error);
  //   }
  // };

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
                <FormControl fullWidth error={!!errors.role}>
                  <InputLabel>Role</InputLabel>
                  <Select
                    {...register('role', { required: 'Role is required' })}
                    value={role}
                    onChange={handleRoleChange}
                  >
                    <MenuItem value="owner">Owner</MenuItem>
                    <MenuItem value="user">User</MenuItem>
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
