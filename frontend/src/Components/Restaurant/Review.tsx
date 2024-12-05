import React, { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Rating,
  Snackbar,
} from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../Auth/AuthContext' // Import the useAuth hook

interface Review {
  id: string
  name: string
  comment: string
  rating: number
  date: string // To display the submission date
}

const SubmitReviewPage: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([])
  const [name, setName] = useState('')
  const [comment, setComment] = useState('')
  const [rating, setRating] = useState<number | null>(null)
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()
  const { isLoggedIn } = useAuth()

  // Retrieve restaurant name from state
  const restaurantName = location.state?.restaurantName || 'Restaurant'

  const handleSubmit = () => {
    if (!isLoggedIn) {
      alert('You must be logged in to submit a review.')
      navigate('/login')
      return
    }

    if (!name || !comment || !rating) {
      alert('Please fill in all fields before submitting your review.')
      return
    }

    const newReview: Review = {
      id: Date.now().toString(), // Generate a unique ID
      name,
      comment,
      rating,
      date: new Date().toLocaleString(),
    }

    setReviews((prevReviews) => [newReview, ...prevReviews])
    setName('')
    setComment('')
    setRating(null)
    setSnackbarOpen(true)
  }

  useEffect(() => {
    console.log('Current Reviews:', reviews)
  }, [reviews])

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 4 }}>
      {/* Display the restaurant name */}
      <Typography variant="h4" gutterBottom>
        Submit Your Review for {restaurantName}
      </Typography>

      {/* Review Form */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
        <TextField
          label="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />
        <TextField
          label="Your Review"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          multiline
          rows={4}
          fullWidth
        />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography>Rating:</Typography>
          <Rating
            value={rating}
            onChange={(e, newValue) => setRating(newValue)}
          />
        </Box>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit Review
        </Button>
      </Box>

      {/* Reviews List */}
      <Typography variant="h5" gutterBottom>
        Reviews
      </Typography>
      {reviews.length === 0 && (
        <Typography>No reviews yet. Be the first to submit!</Typography>
      )}
      {reviews.map((review) => (
        <Card key={review.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{review.name}</Typography>
            <Typography variant="body2" color="textSecondary">
              {review.date}
            </Typography>
            <Rating value={review.rating} readOnly />
            <Typography variant="body2" sx={{ mt: 1 }}>
              {review.comment}
            </Typography>
          </CardContent>
        </Card>
      ))}

      {/* Snackbar for success message */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Review submitted successfully!"
      />
    </Box>
  )
}

export default SubmitReviewPage
