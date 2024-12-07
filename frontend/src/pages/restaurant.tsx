import {
  Box,
  Button,
  Divider,
  Grid2,
  Card,
  TextareaAutosize,
  Typography,
  List,
  ListItem,
} from '@mui/material'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Header from '../Components/Home/Header'
import StarIcon from '@mui/icons-material/Star'
import ReviewItem from '../Components/Restaurant/ReviewItem'
import { useState, useEffect } from 'react'

interface FetchRestaurantData {
  setRestaurantData: React.Dispatch<React.SetStateAction<any>>;
  restaurantId: any;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

const fetchRestaurantData = ({ setRestaurantData, restaurantId, setError }: FetchRestaurantData) => {
  fetch(`http://localhost:8080/api/restaurants/search/${restaurantId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((json) => {
      setError('');
      setRestaurantData(json);
      console.log(json);
    })
    .catch((e) => {
      setError(e.toString());
      setRestaurantData([]);
    });
};

const testReviews = [
  {
    user: {
      name: 'Brandon Llanes',
      img:
        'https://media.licdn.com/dms/image/v2/C5603AQFEfnRKb5rOcA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1622597713152?e=1735776000&v=beta&t=cMOaSPN8uqkh_rbhu6NWPiUgDlq1tN7rWWCo8bQ02DM',
    },
    rating: 5,
    content:
      "Outstanding NY style pizza. I'd give a 9/10 for the pizza but ambiance is a 10/10 as you never see the cool outdoor patio tables with a TV to boot. California weather with NY pizza--makes a very hard combo to beat. Cheese pizza was great with nice thin crispy crust that surprisingly held up well when held--this is the first NY pizza test. Some stringy cheese but not that much (I think they needed a bit more mozzarella). Zangy tomato sauce was perfect. My only ask is in the dough taste--it was missing a tad bit of that yeasty punch that is so common in NY. We'll be back hoping to find that elusive NY dough...this checked off nearly all the boxes. Great job to the crew here!",
  },
  {
    user: {
      name: 'John Smith',
      img:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    },
    rating: 5,
    content:
      "This place brings me LIFE! Service, food, vibes, everything is on point. Their food is so fresh, full of flavor, and loadedddd. Can't wait to come back.",
  },
]

export default function RestaurantPage() {
  const [restaurantData, setRestaurantData] = useState({});
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();

  // Fetch restaurant data once the component mounts
  useEffect(() => {
    fetchRestaurantData({ setRestaurantData, restaurantId: searchParams.get('id'), setError });
  }, [searchParams.get('id')]);  // Run only when restaurantId changes

  const handleStarClick = (rating: number) => {
    console.log(`Star ${rating} clicked!`)
    // Perform any action, e.g., set the rating state
  }
  const navigate = useNavigate()

  return (
    <Box sx={{ height: '100%' }}>
      <Header />
      <Box sx={{ marginTop: '4rem' }}>
        {/* image header with dark overlay */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '40vh', // Define a height for the image section
            backgroundImage: `url("${restaurantData.photo}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: 'white',
            display: 'flex', // Enables flexbox layout
            alignItems: 'flex-end', // Aligns content at the vertical bottom
          }}
        >
          {/* Dark overlay */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black
              zIndex: 1, // Places the overlay above the image
            }}
          />

          {/* Content goes on top of overlay */}
          <Box
            sx={{
              position: 'relative',
              zIndex: 2, // Ensures content is above the overlay
              padding: '2rem',
              marginLeft: '1rem',
            }}
          >
            <h1 style={{ fontSize: '3rem' }}>{restaurantData.name}</h1>
            
            <Box>
            {restaurantData.rating
              ? Array.from({ length: Math.floor(restaurantData.rating) }).map((_, index) => (
                  <StarIcon key={index} />
                ))
              : ''}
          </Box>

            <h3 style={{ fontSize: '1.5rem' }}>
              {restaurantData.price ? '$'.repeat(restaurantData.price) : ''} {restaurantData.cuisine}
            </h3>

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
        <Button
          variant="contained"
          onClick={() =>
            navigate('/review', {
              state: { restaurantName: restaurantData.name },
            })
          }
        >
          Write a Review
        </Button>

        <Divider sx={{ marginTop: '2rem', marginBottom: '2rem' }} />

        <h2>Location and Hours</h2>
        {restaurantData.address && (() => {
          const [street, cityState] = restaurantData.address.split(/,(.+)/); // Split on first comma
          return (
            <>
              <p>{street.trim()}</p>
              <p>{cityState.trim()}</p>
            </>
          );
        })()}
        <p>{restaurantData.zipCode}</p>
        <Typography sx = {{fontWeight: 'bold'}}>{restaurantData.hours}</Typography>

        <Divider sx={{ marginTop: '2rem', marginBottom: '2rem' }} />

        <h2>About the Business</h2>
        <p>{restaurantData.description}</p>

        <Divider sx={{ marginTop: '2rem', marginBottom: '2rem' }} />

        <h2>Reviews</h2>
        {/* Review section */}
        <Card sx={{ padding: '2rem', marginTop: '2rem' }}>
          <Typography variant="h5" sx={{ marginBottom: '1rem' }}>
            Write Your Review
          </Typography>
          <TextareaAutosize
            minRows={4} // Initial rows
            maxRows={10} // max rows
            placeholder="Your Review"
            style={{
              width: '97%',
              padding: '16.5px 14px',
              marginBottom: '1rem',
              font: 'inherit',
              resize: 'none',
            }}
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
                    onClick={() => handleStarClick(index + 1)}
                    sx={{ minWidth: '3rem', width: '3rem' }} // Set custom width
                  >
                    <StarIcon />
                  </Button>
                ))}
            </Box>
            <Button variant="contained">Submit Review</Button>
          </Box>

          {/* Responsive mobile view for Review */}
          <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
            <Box sx={{ display: 'flex' }}>
              <Typography variant="h6">Rating:</Typography>
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <Button
                    key={index}
                    onClick={() => handleStarClick(index + 1)}
                    sx={{ minWidth: '2rem', width: '2rem' }} // Set custom width
                  >
                    <StarIcon />
                  </Button>
                ))}
            </Box>
            <Button variant="contained">Submit Review</Button>
          </Box>
        </Card>

        <Divider sx={{ marginTop: '2rem', marginBottom: '2rem' }} />

        <Card sx={{ height: '30vh' }}>
          <Grid2 container>
            <Grid2 size={6}>Overall Rating</Grid2>
            <Grid2 size={6}>Distribution of Reviews</Grid2>
          </Grid2>
        </Card>

        {/* List of Reviews */}
        <List>
          {restaurantData.reviewID && restaurantData.reviewID.length > 0 ? (
            restaurantData.reviewID.map((item, index) => (
              <ListItem sx={{ padding: 0, marginTop: '1rem' }} key={index}>
                <ReviewItem
                  user={item.user}
                  rating={item.rating}
                  content={item.content}
                />
              </ListItem>
            ))
          ) : (
            <Typography variant="body1" sx={{ textAlign: 'center', marginTop: '1rem' }}>
              No reviews yet, be the first to review!
            </Typography>
          )}
        </List>

      </Box>
    </Box>
  )
}
