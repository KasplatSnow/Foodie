import React, { ChangeEvent, useState } from 'react'
import {
  AppBar,
  Tabs,
  Tab,
  Toolbar,
  Box,
  Input,
  MenuItem,
  Menu,
  Button,
} from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import BusinessIcon from '@mui/icons-material/Business'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'
import ExploreIcon from '@mui/icons-material/Explore'

const Header = () => {
  const [value, setValue] = useState(0)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null) //dropdown

  // Handle input change
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value)
  }
  //Handle tab change
  const navigate = useNavigate()
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
    if (newValue === 0) {
      navigate('/home')
    } else if (newValue === 1) {
      navigate('/business')
    } else if (newValue === 2) {
      navigate('/review')
    } else if (newValue === 3) {
      navigate('/register')
    } else if (newValue === 4) {
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
          onClick={() => {navigate('/Home')}}
        />
        <button
          style={{
            backgroundColor: '#eeeeee',
            width: '50px',
            height: '50px',
            marginTop: '2px',
            marginLeft: '150px',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '20px 0 0 20px', // Rounded left, square right
            color: '#111',
            cursor: 'pointer',
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            version="1.1"
            aria-hidden="false"
          >
            <desc lang="en-US">Visual search</desc>
            <path d="M5 15H3v4c0 1.1.9 2 2 2h4v-2H5v-4ZM5 5h4V3H5c-1.1 0-2 .9-2 2v4h2V5Zm14-2h-4v2h4v4h2V5c0-1.1-.9-2-2-2Zm0 16h-4v2h4c1.1 0 2-.9 2-2v-4h-2v4ZM12 8c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4Zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2Z"></path>
          </svg>
        </button>

        <Input
          type="search"
          value={searchKeyword}
          onChange={handleInputChange}
          placeholder="Search your restaurants..."
          disableUnderline
          style={{
            marginTop: '2px',
            height: '50px',
            width: '40%',
            padding: '10px',
            backgroundColor: '#eeeeee',
          }}
        />
        <button
          style={{
            backgroundColor: '#eeeeee',
            marginTop: '2px',
            width: '50px',
            height: '50px',
            border: 'none',
            borderRadius: '0 20px 20px 0', // Rounded left, square right
            color: '#111',
            cursor: 'pointer',
          }}
          onClick={() => navigate('/search')}
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>

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
