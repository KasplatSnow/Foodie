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
import { useAuth } from '../Auth/AuthContext' // Import useAuth hook

const Header = () => {
  const [value, setValue] = useState(0)
  const [
    profileMenuAnchor,
    setProfileMenuAnchor,
  ] = useState<null | HTMLElement>(null) // Profile dropdown

  const navigate = useNavigate()
  const { isLoggedIn, userRole, logIn, logOut } = useAuth() // Access AuthContext

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
                <MenuItem
                  onClick={() => {
                    logOut()
                    navigate('/home')
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                logIn('customer')
                navigate('/login')
              }}
            >
              Log In
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
