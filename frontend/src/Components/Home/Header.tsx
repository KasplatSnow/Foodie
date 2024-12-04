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
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import BusinessIcon from '@mui/icons-material/Business'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'
import ExploreIcon from '@mui/icons-material/Explore'

const Header = () => {
  const [value, setValue] = useState(0)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null) //dropdown

  //Handle tab change
  const navigate = useNavigate()
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
    if (newValue === 0) {
      navigate('/home')
    } else if (newValue === 1) {
      navigate('/business')
    } else if (newValue === 2) {
      navigate('/mapsearch')
    } else if (newValue === 3) {
      navigate('/review')
    } else if (newValue === 4) {
      navigate('/register')
    } else if (newValue === 5) {
      navigate('/login')
    }
  }

  // Handle dropdown menu opening
  const handleDropdownClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget) // Set the anchor for the dropdown
  }

  // Close dropdown menu
  const handleCloseDropdown = () => {
    setAnchorEl(null)
  }

  // Handle dropdown item click
  const handleMenuItemClick = (path: string) => {
    navigate(path) // Navigate to the selected path
    handleCloseDropdown() // Close the dropdown
  }

  return (
    <AppBar position="absolute" sx={{ backgroundColor: '#F6F6F6' }}>
      <Toolbar>
        <img
          src="https://www.pngkey.com/png/detail/382-3824883_fit-foodie-finds.png"
          alt="Logo"
          className="logo"
          style={{
            height: '70px',
            width: 'auto',
            marginRight: '10px',
            background: 'none',
          }}
          onClick={() => {
            navigate('/Home')
          }}
        />

        <Box sx={{ marginLeft: 'auto' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="inherit"
            TabIndicatorProps={{
              style: {
                display: 'none', // Hides the indicator
              },
            }}
          >
            <Tab
              label="Home"
              sx={{
                color: '#6D6D6D',
                fontWeight: 'bold',
                borderRadius: '4px',
                '&:hover': {
                  backgroundColor: 'transparent',
                  border: '3px solid #CA898E', // Light blue border on hover
                },
              }}
            />

            <Button
              onClick={handleDropdownClick} // Open dropdown on click
              sx={{
                color: '#6D6D6D',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: 'transparent',
                  border: '3px solid #CA898E', // Light blue border on hover
                },
                '&.Mui-selected': {
                  color: 'blue', // Color when selected
                },
              }}
            >
              Business
            </Button>
            <Tab
              label="Search"
              sx={{
                color: 'black',
                fontWeight: 'bold',
                borderRadius: '4px',
                '&:hover': {
                  backgroundColor: 'transparent',
                  border: '3px solid #AD343E', // Light blue border on hover
                },
              }}
            />
            <Tab
              label="Write a Review"
              sx={{
                color: 'black',
                fontWeight: 'bold',
                borderRadius: '4px',
                '&:hover': {
                  backgroundColor: 'transparent',
                  border: '3px solid #AD343E', // Light blue border on hover
                },
              }}
            />
            <Tab
              label="Register"
              sx={{
                color: 'black',
                fontWeight: 'bold',
                borderRadius: '4px',
                '&:hover': {
                  backgroundColor: 'transparent',
                  border: '3px solid #AD343E', // Light blue border on hover
                },
              }}
            />
            <Tab
              label="Login"
              sx={{
                color: 'black',
                fontWeight: 'bold',
                borderRadius: '4px',
                '&:hover': {
                  backgroundColor: 'transparent',
                  border: '3px solid #AD343E', // Light blue border on hover
                },
              }}
            />
          </Tabs>
        </Box>
        {/* Dropdown Menu for Business */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseDropdown}
        >
          <MenuItem onClick={() => handleMenuItemClick('/business/add')}>
            <BusinessIcon sx={{ mr: 1, padding: '5px 20px' }} /> Add a Business
          </MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('/business/claim')}>
            <VerifiedUserIcon sx={{ mr: 1, padding: '5px 20px' }} /> Claim Your
            Business
          </MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('/business/explore')}>
            <ExploreIcon sx={{ mr: 1, padding: '5px 20px' }} /> Explore More
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}

export default Header
