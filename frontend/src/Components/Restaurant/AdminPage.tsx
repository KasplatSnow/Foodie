import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { Delete } from '@mui/icons-material'
import Header from '../Home/Header'
import { useAuth } from '../Auth/AuthContext'
import { Restaurant } from './mockRestaurant'
// import { mockRestaurant, Restaurant } from './mockRestaurant'

interface FetchRestaurantParams {
  setRestaurants: any
  setError: React.Dispatch<React.SetStateAction<string>>
}

const fetchRestaurantsDataFromDB = async ({
  setRestaurants,
  setError,
}: FetchRestaurantParams) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/restaurants/allrestaurants`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      },
    )

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`)
    }

    const data = await response.json()
    setRestaurants(data)
    setError('')
  } catch (error) {
    console.error('Error fetching restaurants:', error)
    setError('Failed to fetch restaurants from the database.')
    setRestaurants([])
  }
}

// interface DeleteRestaurantParam {
//   restaurantID: any
//   setError: React.Dispatch<React.SetStateAction<string>>
// }

const deleteRestaurant = async (
  restaurantID: string,
  setError: React.Dispatch<React.SetStateAction<string>>,
  onSuccess: () => void,
) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/admin/deleterestaurant/restaurantID/${restaurantID}`,
      {
        method: 'DELETE', // Ensure this matches your backend implementation
        headers: { 'Content-Type': 'application/json' },
      },
    )

    if (!response.ok) {
      throw new Error(`Failed to delete restaurant: ${response.statusText}`)
    }

    onSuccess() // Trigger the callback to update UI
    setError('')
  } catch (error) {
    console.error('Error deleting restaurant:', error)
    setError('Failed to delete the restaurant.')
  }
}

const AdminPage: React.FC = () => {
  const { userRole, isLoggedIn } = useAuth()
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(
    [],
  )
  const [searchInput, setSearchInput] = useState('')
  const [open, setOpen] = useState(false)
  const [
    restaurantToDelete,
    setRestaurantToDelete,
  ] = useState<Restaurant | null>(null)
  const [error, setError] = useState('')

  const handleOpenDialog = (restaurant: Restaurant) => {
    setRestaurantToDelete(restaurant)
    setOpen(true)
  }

  const handleCloseDialog = () => {
    setOpen(false)
    setRestaurantToDelete(null)
  }

  const handleConfirmDelete = async () => {
    if (restaurantToDelete) {
      await deleteRestaurant(restaurantToDelete.restaurantID, setError, () => {
        setRestaurants((prev) =>
          prev.filter(
            (restaurant) =>
              restaurant.restaurantID !== restaurantToDelete.restaurantID,
          ),
        )
        setFilteredRestaurants((prev) =>
          prev.filter(
            (restaurant) =>
              restaurant.restaurantID !== restaurantToDelete.restaurantID,
          ),
        )
      })

      setRestaurantToDelete(null)
      setOpen(false)
    }
  }

  useEffect(() => {
    fetchRestaurantsDataFromDB({ setRestaurants, setError })
  }, [])

  useEffect(() => {
    setFilteredRestaurants(restaurants)
  }, [restaurants])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const param = e.target.value.toLowerCase()
    setSearchInput(param)

    const filtered = restaurants.filter(
      (restaurant) =>
        restaurant.name.toLowerCase().includes(param) ||
        restaurant.address.toLowerCase().includes(param) ||
        restaurant.zipCode.includes(param),
    )
    setFilteredRestaurants(filtered)
  }

  const columns: GridColDef[] = [
    { field: 'restaurantID', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'address', headerName: 'Address', width: 200 },
    { field: 'zipCode', headerName: 'Zip Code', width: 100 },
    { field: 'hours', headerName: 'Hours', width: 200 },
    { field: 'phoneNumber', headerName: 'Phone', width: 150 },
    { field: 'rating', headerName: 'Rating', width: 100 },
    { field: 'cuisine', headerName: 'Cuisine', width: 170 },
    // {
    //   field: 'edit',
    //   headerName: 'Edit',
    //   width: 80,
    //   renderCell: (params: GridRenderCellParams) => (
    //     <IconButton
    //       color="primary"
    //       onClick={() => alert(`Edit Restaurant: ${params.row.name}`)}
    //     >
    //       <Edit />
    //     </IconButton>
    //   ),
    // },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 80,
      renderCell: (params: GridRenderCellParams) => (
        <IconButton
          color="error"
          onClick={() =>
            handleOpenDialog(
              restaurants.find(
                (restaurant) =>
                  restaurant.restaurantID === params.row.restaurantID,
              )!,
            )
          }
        >
          <Delete />
        </IconButton>
      ),
    },
    // { field: 'closed', headerName: 'Closed', width: 170 },
  ]

  const rows = filteredRestaurants.map((restaurant) => ({
    id: restaurant.restaurantID,
    restaurantID: restaurant.restaurantID,
    name: restaurant.name,
    address: restaurant.address,
    zipCode: restaurant.zipCode,
    rating: restaurant.rating,
    price: restaurant.price,
    cuisine: restaurant.cuisine,
    hours: restaurant.hours,
    phoneNumber: restaurant.phoneNumber,
  }))

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box
        sx={{
          width: '100%',
          backgroundColor: '#fff',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Header />
      </Box>
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          marginTop: '60px',
          paddingBottom: '40px',
        }}
      >
        {isLoggedIn && userRole === 'admin' ? (
          <Box
            sx={{
              width: '80%',
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography variant="h4" gutterBottom align="center">
              Manage Restaurants
            </Typography>

            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search by Name or Location"
              value={searchInput}
              onChange={handleSearch}
              sx={{ marginBottom: '16px' }}
            />

            <DataGrid
              rows={rows}
              columns={columns}
              autoHeight
              checkboxSelection
              disableRowSelectionOnClick
              sx={{
                '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: '#f5f5f5',
                  fontWeight: 'bold',
                },
                '& .MuiDataGrid-cell': {
                  alignItems: 'center',
                },
              }}
            />

            <Dialog open={open} onClose={handleCloseDialog}>
              <DialogTitle>Confirm Delete</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Are you sure you want to delete{' '}
                  <strong>{restaurantToDelete?.name}</strong>?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog} color="primary">
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirmDelete}
                  color="error"
                  variant="contained"
                >
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        ) : (
          <Typography
            variant="h4"
            color="error"
            sx={{
              marginTop: '100px',
              textAlign: 'center',
            }}
          >
            Access Denied. Admins Only.
          </Typography>
        )}
      </Box>
    </Box>
  )
}

export default AdminPage
