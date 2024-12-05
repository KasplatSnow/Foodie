import React, { useState } from 'react'
import {
  AppBar,
  Tabs,
  Tab,
  Toolbar,
  Box,
  MenuItem,
  Menu,
  Button,
  IconButton,
  Avatar,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const [value, setValue] = useState(0)
  const [
    profileMenuAnchor,
    setProfileMenuAnchor,
  ] = useState<null | HTMLElement>(null) // Profile dropdown
  const [isLoggedIn, setIsLoggedIn] = useState(false) // Login state
  const [userRole, setUserRole] = useState<'customer' | 'owner' | null>(null) // User role

  const navigate = useNavigate()

  // Handle tab change
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
    if (newValue === 0) navigate('/home')
    if (newValue === 1) navigate('/mapsearch')
    if (newValue === 2) navigate('/review')
    if (newValue === 3 && userRole === 'owner') navigate('/your-business')
  }

  // Handle profile dropdown
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProfileMenuAnchor(event.currentTarget)
  }

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null)
  }

  // Redirect to profile page based on user role
  const handleProfileNavigation = () => {
    if (userRole === 'customer') {
      navigate('/profile') // Redirect to customer profile
    } else if (userRole === 'owner') {
      navigate('/profile/owner') // Redirect to owner profile
    }
    handleProfileMenuClose()
  }

  // Simulate login
  const handleLogin = (role: 'customer' | 'owner') => {
    setIsLoggedIn(true)
    setUserRole(role)

    // Redirect based on role
    if (role === 'customer') {
      navigate('/customer-home') // Customer's home page
    } else if (role === 'owner') {
      navigate('/owner-dashboard') // Owner's dashboard
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false) // Simulate logout
    setUserRole(null) // Clear user role
    setProfileMenuAnchor(null) // Close profile menu
    navigate('/login') // Redirect to login page
  }

  return (
    <AppBar position="absolute" sx={{ backgroundColor: '#F6F6F6' }}>
      <Toolbar>
        {/* Logo */}
        <img
          src="https://www.pngkey.com/png/detail/382-3824883_fit-foodie-finds.png"
          alt="Logo"
          style={{
            height: '70px',
            width: 'auto',
            marginRight: '10px',
            cursor: 'pointer',
          }}
          onClick={() => navigate('/home')}
        />

        {/* Navigation Tabs */}
        <Box sx={{ marginLeft: 'auto' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="inherit"
            TabIndicatorProps={{ style: { display: 'none' } }}
          >
            <Tab label="Home" sx={{ color: '#6D6D6D', fontWeight: 'bold' }} />
            <Tab label="Search" sx={{ color: '#6D6D6D', fontWeight: 'bold' }} />
            <Tab
              label="Write a Review"
              sx={{ color: '#6D6D6D', fontWeight: 'bold' }}
            />

            {/* Conditionally render "Your Business" tab for owners */}
            {userRole === 'owner' && (
              <Tab
                label="Your Business"
                sx={{
                  color: '#6D6D6D',
                  fontWeight: 'bold',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    border: '3px solid #CA898E',
                  },
                }}
              />
            )}
          </Tabs>
        </Box>

        {/* Right Side: Login/Profile */}
        <Box>
          {isLoggedIn ? (
            <>
              <IconButton onClick={handleProfileMenuOpen}>
                <Avatar
                  alt="User Avatar"
                  src="https://img.freepik.com/premium-vector/social-media-logo_1305298-29989.jpg?semt=ais_hybrid"
                />
              </IconButton>
              <Menu
                anchorEl={profileMenuAnchor}
                open={Boolean(profileMenuAnchor)}
                onClose={handleProfileMenuClose}
              >
                <MenuItem onClick={handleProfileNavigation}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                handleLogin('customer') // Simulate login as customer
                navigate('/login') // Redirect to login page
              }}
            >
              Sign In
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
