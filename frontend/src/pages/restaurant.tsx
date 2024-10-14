import { Box, Button, Divider, Grid2, Card, TextField, Typography } from "@mui/material";
import Header from "../Components/Header";
import StarIcon from '@mui/icons-material/Star';

const testRestaurantInfo = {
    id: '1',
    name: 'Joe\'s Pizza',
    description: 'Famous New York-style pizza with a thin crust and fresh toppings. Family-owned since 1985.',
    categories: ['Pizza', 'Italian', 'Fast Food'],
    rating: 4.5,
    reviewCount: 200,
    image: 'https://www.foodandwine.com/thmb/Wd4lBRZz3X_8qBr69UOu2m7I2iw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg',
};

export default function RestaurantPage() {
    const handleStarClick = (rating: number) => {
        console.log(`Star ${rating} clicked!`);
        // Perform any action, e.g., set the rating state
    };

    return (
        <Box sx={{ height: '100%' }}>
            <Header />
            <Box>
                {/* image header with dark overlay */}
                <Box
                    sx={{
                        position: 'relative',
                        width: '100%',
                        height: '40vh', // Define a height for the image section
                        backgroundImage: `url("${testRestaurantInfo.image}")`,
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
                        <h1 style={{ fontSize: '3rem' }}>{testRestaurantInfo.name}</h1>
                        <h2 style={{ fontSize: '2rem' }}>Rating</h2>
                        <h3 style={{ fontSize: '1.5rem' }}>Pricing Tags</h3>
                    </Box>
                </Box>
            </Box>

            <Box sx={{ marginLeft: '3rem', marginTop: '2rem', marginRight: '3rem', paddingBottom: '3rem' }}>
                <Button variant='contained'>
                    Write a Review
                </Button>

                <Divider sx={{ marginTop: '2rem', marginBottom: '2rem' }} />

                <h2>Location and Hours</h2>

                <Divider sx={{ marginTop: '2rem', marginBottom: '2rem' }} />

                <h2>About the Business</h2>
                <p>{testRestaurantInfo.description}</p>

                <Divider sx={{ marginTop: '2rem', marginBottom: '2rem' }} />

                <h2>Reviews</h2>
                {/* Review section */}
                <Card sx={{ padding: '2rem', marginTop: '2rem' }}>
                    <Typography variant="h5" sx={{ marginBottom: '1rem' }}>
                        Write Your Review
                    </Typography>
                    <TextField
                        label="Your Review"
                        variant="outlined"
                        multiline
                        rows={4}
                        fullWidth
                        sx={{ marginBottom: '1rem' }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex'}}>
                            <Typography variant="h6">Rating:</Typography>
                            {Array(5).fill(0).map((_, index) => (
                                <Button 
                                    key={index} 
                                    onClick={() => handleStarClick(index + 1)}
                                    sx={{ minWidth: '3rem', width: '3rem' }}  // Set custom width
                                >
                                    <StarIcon />
                                </Button>
                            ))}
                        </Box>
                        <Button variant="contained">Submit Review</Button>
                    </Box>
                </Card>

                <Divider sx={{ marginTop: '2rem', marginBottom: '2rem' }} />

                <Card sx={{ height: '30vh'}}>
                    <Grid2 container>
                        <Grid2 size={6}>
                            Overall Rating
                        </Grid2>
                        <Grid2 size={6}>
                            Distribution of Reviews
                        </Grid2>
                    </Grid2>
                </Card>
            </Box>
        </Box>
    );
}
