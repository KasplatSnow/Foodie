// src/LoginForm.tsx
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom' // Update to useNavigate
import { useForm, SubmitHandler } from 'react-hook-form'
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Tabs,
  Tab,
} from '@mui/material'
interface FormData {
  email: string
  password: string
  role: string
}

import { LoginContext } from '../../context/login'

// Environment variable to configure API URL
// const LOGIN_API_URL = process.env.REACT_APP_API_LOGIN_URL;

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()
  const [role, setRole] = useState<string>('user')

  const loginContext = React.useContext(LoginContext);

  const navigate = useNavigate() // Use useNavigate instead of useHistory

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log('Logging in as:', data)
    // static for now
    loginContext.setId("123");
    loginContext.setAccessToken("Test Access Token");
    loginContext.setUserName("TestUser");

    /* IDEALLY WE RETURN THESE INFO ON LOGIN SUCCESS TO STORE
    loginContext.setId(json.data.login.id)
    loginContext.setAccessToken(json.data.login.accessToken)
    loginContext.setUserName(json.data.login.name)
    */

    if (data.role !== 'owner') {
      navigate('/home')
    } else {
      navigate('/user-dashboard')
    }
  }

  //   const onSubmit = async (data) => {
  //     try {
  //       const response = await fetch(`${LOGIN_API_URL}`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(data),
  //       });

  //       if (response.ok) {
  //         const responseData = await response.json();
  //         console.log("Login successful:", responseData);
  //         // Handle login success (e.g., redirect, store token)
  //         reset(); // Reset the form
  //       } else {
  //         console.error("Login failed");
  //       }
  //     } catch (error) {
  //       console.error("Error during login:", error);
  //     }
  //   };

  // Redirect to registration page
  const handleRegister = () => {
    navigate('/register')
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    console.log(event.target)
    setRole(newValue)
  }
  return (
    <div>
      <Box
        display="flex"
        height="100vh"
        sx={{
          backgroundImage: `url('https://foodie.sysco.com/wp-content/uploads/2024/08/Sysco_Panchetta-64.jpg')`,
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
            {/* <Container maxWidth="sm"> */}
            <h2>Login</h2>
            <Tabs
              value={role}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab value="user" label="User" />
              <Tab value="owner" label="Owner" />
            </Tabs>
            <Box sx={{ mt: 2 }}>
              {role === 'user' ? (
                <Typography variant="body1">
                  You are logging in as a User
                </Typography>
              ) : (
                <Typography variant="body1">
                  You are logging in as an Owner
                </Typography>
              )}
            </Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
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
                  helperText={errors.email ? errors.email.message : ''}
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
                  })}
                  error={!!errors.password}
                  helperText={errors.password ? errors.password.message : ''}
                />
              </div>

              <div style={{ marginTop: '16px' }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Login
                </Button>
                <Typography variant="body2" style={{ marginTop: 20 }}>
                  If you don't have an account,{' '}
                  <Button onClick={handleRegister} color="primary">
                    register
                  </Button>
                </Typography>
              </div>
            </form>
          </Paper>
        </Box>
      </Box>
    </div>
  )
}

export default LoginForm
