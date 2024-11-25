import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material'

const Logout: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const navigate = useNavigate()

  // Handle client-side logout
  const handleLogout = async () => {
    try {
      //   // Optionally, make an API call to log out from the server
      //   await fetch('/api/logout', { method: 'POST', credentials: 'include' })

      // Remove auth data from local storage or session storage
      localStorage.removeItem('authToken')
      localStorage.removeItem('user')

      // Redirect the user to the login page
      navigate('/login')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <>
      {/* Logout Button */}
      <Button
        variant="contained"
        color="error"
        onClick={() => setDialogOpen(true)}
      >
        Logout
      </Button>

      {/* Confirmation Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Are you sure you want to log out?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogout} color="error">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Logout
