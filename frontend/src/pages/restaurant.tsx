import { Box, Button, Divider } from "@mui/material";
import Header from "../Components/Header";

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
    return (
        <Box sx={{ height: '100%' }}>
            <Header />
            <Box sx={{ height: '100%' }}>
                {/* image header with dark overlay */}
                <Box
                    sx={{
                        position: 'relative', // Allows overlay to be positioned relative to the image
                        width: '100%',
                        height: '50vh', // Define a height for the image section
                        backgroundImage: `url("${testRestaurantInfo.image}")`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        color: 'white',
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
                            marginLeft: '1rem'
                        }}
                    >
                        <h1 style={{ fontSize: '3rem' }}>{testRestaurantInfo.name}</h1>
                        <h2 style={{ fontSize: '2rem' }}>Rating</h2>
                        <h3 style={{ fontSize: '1rem' }}>Pricing Tags</h3>
                        <Button variant="contained">Write a Review</Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
