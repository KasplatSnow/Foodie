import React, { useEffect } from 'react'
import {
  Box,
  Button,
  Divider,
  Card,
  TextareaAutosize,
  Typography,
  List,
  ListItem,
  CircularProgress,
} from '@mui/material'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import StarIcon from '@mui/icons-material/Star'
import Header from '../Components/Home/Header'
import ReviewItem from '../Components/Restaurant/ReviewItem'
import { useState } from 'react'
import { useAuth } from "../Components/Auth/AuthContext";
// Define types
interface Review {
  userID: number
  rating: number
  content: string
}

interface FetchRestaurantData {
  setRestaurantData: React.Dispatch<React.SetStateAction<any>>;
  restaurantId: any;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setExists: any;
}

const fetchRestaurantData = ({ setRestaurantData, restaurantId, setError, setExists }) => {
  fetch(`http://localhost:8080/api/restaurants/getrestaurant/restaurantbyid/${restaurantId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      setRestaurantData(res.json);
      if (!res.ok) {
        // If the response status is not 2xx, throw an error
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((json) => {
      setError('');
      setExists(true);
      setRestaurantData(json);
      console.log(json);
    })
    .catch((e) => {
      setError(e.toString());
      setExists(false);
    });
};

interface FetchReviewParams {
  setReviews: React.Dispatch<React.SetStateAction<any>>;
  restaurantId: any;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

const fetchReviews = ({ setReviews, restaurantId, setError }: FetchReviewParams) => {
  fetch(`http://localhost:8080/api/review/allreviews/restaurantID/${restaurantId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((json) => {
      setError('');
      setReviews(json);
    })
    .catch((e) => {
      setError(e.toString());
      setReviews([]);
    });
};

interface PostReviewParams {
  userID: any;
  restaurantID: any;
  rating: any;
  reviewText: any;
  setTriggerRefresh: any;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

const postReview = ({ userID, restaurantID, rating, reviewText, setTriggerRefresh, setError }: PostReviewParams) => {
  return fetch(`http://localhost:8080/api/review/write`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({userID, restaurantID, rating, reviewText}),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((json) => {
      setError('');
      setTriggerRefresh((prev) => {!prev});
    })
    .catch((e) => {
      setError(e.toString());
    });
};

interface PostShellReviewParams {
  shellRestaurant: any;
  review: any;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

const postShellReview = ({ shellRestaurant, review, setError }: PostShellReviewParams) => {
  const newBody = {
    "restaurant": shellRestaurant,
    "review": review
  };
  return fetch(`http://localhost:8080/api/review/createshellrestaurant`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newBody),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((json) => {
      setError('');
    })
    .catch((e) => {
      setError(e.toString());
    });
};

interface claimRestaurantParams {
  restaurantID: any;
  businessOwnerID: any;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

const claimRestaurant = ({ restaurantID, businessOwnerID, setError }: claimRestaurantParams) => {
  return fetch(`http://localhost:8080/api/restaurants/setOwner/businessOwnerId/${businessOwnerID}/restaurantID/${restaurantID}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((json) => {
      setError('');
    })
    .catch((e) => {
      setError(e.toString());
    });
};

export default function RestaurantPage() {
  const { state } = useLocation() // Access passed state
  const [restaurantData, setRestaurantData] = useState(null);
  const [searchParams] = useSearchParams();
  const [error, setError] = useState('');
  const [rating, setRating] = useState(0); // Track the selected rating
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [triggerRefresh, setTriggerRefresh] = useState(false);
  const loginContext = useAuth();
  const [imageIndex, setImageIndex] = useState(0);
  const [exists, setExists] = useState(false);

  useEffect(() => {
    fetchRestaurantData({ setRestaurantData, restaurantId: searchParams.get('id'), setError, setExists });
    fetchReviews({setReviews, restaurantId: searchParams.get('id'), setError });
  }, [searchParams.get('id'), triggerRefresh]);

  // for image swapping
  useEffect(() => {
    if (restaurantData?.photo && restaurantData.photo.length > 1) {
      const interval = setInterval(() => {
        setImageIndex((prevIndex) => (prevIndex + 1) % restaurantData.photo.length);
      }, 10000); // Change image every 10 seconds

      return () => clearInterval(interval); // Cleanup interval on component unmount
    }
  }, [restaurantData]);

  const handleStarClick = (rating: number) => {
    setRating(rating); // Update the rating state when a star is clicked
    console.log(`Star ${rating} clicked!`);
  };

  const handleSubmit = () => {
    if (exists) {
      postReview({userID: loginContext.userId, restaurantID: searchParams.get('id'), rating, reviewText, setTriggerRefresh, setError})
      .then(() => {
        setTriggerRefresh((prev) => !prev);
      });
    } else {
      // case create shell restaurant then post a review
      const shellRestaurant = {
        "name": state.name,
        "address": state.address,
        "rating": state.rating,
        "lat": state.lat,
        "lng": state.lng
      };
      
      console.log("SHELL", shellRestaurant);

      const review = {
        "userID": loginContext.userId,
        rating,
        reviewText,
        setTriggerRefresh,
        setError
      };

      console.log("REVIEW", review);
      postShellReview({shellRestaurant, review, setError})
      .then(() => {
        setTriggerRefresh((prev) => !prev);
      });
    }
  };

  const handleClaim = () => {
    claimRestaurant({restaurantID: searchParams.get('id'), businessOwnerID: loginContext.userId, setError})
    .then(() => {
      setTriggerRefresh((prev) => !prev);
    });
  }

  if (restaurantData === null) {  // If restaurantData is still null, show a loading indicator
    return (
        <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress />
            <Typography>Must be logged in</Typography>
        </Box>
    );
}

  return (
    <Box sx={{ height: '100%' }}>
      <Header />
      <Box sx={{ marginTop: '4rem' }}>
        {/* Image header with restaurant photo */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '40vh',
            backgroundImage:
              restaurantData?.photo && restaurantData.photo.length > 0
                ? `url("${restaurantData.photo[imageIndex]}")`
                : `url("${state?.photo}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: 'white',
            display: 'flex',
            alignItems: 'flex-end',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 1,
            }}
          />

          <Box
            sx={{
              position: 'relative',
              zIndex: 2,
              padding: '2rem',
              marginLeft: '1rem',
            }}
          >
            <Typography variant="h1" sx={{ fontSize: '3rem' }}>
              {restaurantData.name || state.name }
            </Typography>
            <Box>
              {restaurantData.rating
                ? Array.from({
                    length: Math.floor(restaurantData.rating),
                  }).map((_, index) => <StarIcon key={index} />)
                : Array.from({
                  length: Math.floor(state.rating),
                }).map((_, index) => <StarIcon key={index} />)}
            </Box>
            <Typography variant="h3" sx={{ fontSize: '1.5rem' }}>
              {restaurantData.price ? '$'.repeat(restaurantData.price) : '$'.repeat(state.price)}
              {restaurantData.cuisine ? ` ${restaurantData.cuisine.join(', ')}` : ''}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          marginLeft: '3rem',
          marginTop: '2rem',
          marginRight: '3rem',
          paddingBottom: '3rem',
        }}
      >
        { loginContext.userRole !== 'BUSINESS' || restaurantData.ownerID !== 1 ? '' : <Button variant = 'contained' onClick={handleClaim}>Claim Restaurant</Button>}

        <Divider sx={{ marginTop: '2rem', marginBottom: '2rem' }} />

        <Typography variant="h2">Location and Hours</Typography>
        <Typography>{restaurantData.address || state.address}</Typography>
        <Typography>{restaurantData.zipCode}</Typography>

        <Typography sx = {{fontWeight: 'bold'}}>{restaurantData.hours}</Typography>

        <Divider sx={{ marginTop: '2rem', marginBottom: '2rem' }} />

        <Typography variant="h2">About the Business</Typography>
        <Typography>{restaurantData.description}</Typography>

        <Divider sx={{ marginTop: '2rem', marginBottom: '2rem' }} />

        <Typography variant="h2">Reviews</Typography>
        {/* Review section */}
        <Card sx={{ padding: '2rem', marginTop: '2rem' }}>
          {loginContext.userId ?
          <Box>
          <Typography variant="h5" sx={{ marginBottom: '1rem' }}>
            Write Your Review
          </Typography>
          <TextareaAutosize
            minRows={4}
            maxRows={10}
            placeholder="Your Review"
            style={{
              width: '97%',
              padding: '16.5px 14px',
              marginBottom: '1rem',
              font: 'inherit',
              resize: 'none',
            }}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box sx={{ display: 'flex' }}>
              <Typography variant="h6">Rating:</Typography>
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <Button
                    key={index}
                    onClick={() => handleStarClick(index + 1)} // Set the rating on click
                    sx={{
                      minWidth: '3rem',
                      width: '3rem',
                      color: index < rating ? 'gold' : 'gray', // Gold for selected, gray for unselected
                    }}
                  >
                    <StarIcon />
                  </Button>
                ))}
            </Box>
            <Button variant="contained" onClick={handleSubmit}>Submit Review</Button>
          </Box>

          {/* Mobile view */}
          <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
            <Box sx={{ display: 'flex' }}>
              <Typography variant="h6">Rating:</Typography>
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <Button
                    key={index}
                    onClick={() => handleStarClick(index + 1)}
                    sx={{ minWidth: '2rem', width: '2rem',  color: index < rating ? 'gold' : 'gray' }}
                  >
                    <StarIcon />
                  </Button>
                ))}
            </Box>
            <Button variant="contained" onClick={handleSubmit}>Submit Review</Button>
          </Box>
          </Box>
          : <Typography sx = {{fontWeight: 'bold'}}>Must be signed in to write a review!</Typography>}
        </Card>

        <Divider sx={{ marginTop: '2rem', marginBottom: '2rem' }} />

        {/* List of Reviews */}
        <List>
          {reviews && reviews.length > 0 ? (
            reviews.map((item: Review, index: number) => (
              <ListItem sx={{ padding: 0, marginTop: '1rem' }} key={index}>
                <ReviewItem
                  user={item.userID}
                  rating={item.rating}
                  content={item.review_text}
                />
              </ListItem>
            ))
          ) : (
            <Typography
              variant="body1"
              sx={{ textAlign: 'center', marginTop: '1rem' }}
            >
              No reviews yet, be the first to review!
            </Typography>
          )}
        </List>
      </Box>
    </Box>
  )
}
