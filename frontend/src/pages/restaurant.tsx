import { Box } from "@mui/material";
import Header from "../Components/Header";

const testRestaurantInfo = {
    id: '1',
    name: 'Joe\'s Pizza',
    description: 'Famous New York-style pizza with a thin crust and fresh toppings. Family-owned since 1985.',
    categories: ['Pizza', 'Italian', 'Fast Food'],
    rating: 4.5,
    reviewCount: 200,
    image: 'https://www.foodandwine.com/thmb/Wd4lBRZz3X_8qBr69UOu2m7I2iw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg', // Replace with higher resolution image if available
};

export default function RestaurantPage() {
    return (
        <Box sx={{ height: '100%' }}>
            <Header />
            <Box sx={{ height: '100%' }}>

                {/* image header */}
                <Box sx={{ position: 'relative', width: '100%', height: '40vh' }}>
                    <img
                        src={testRestaurantInfo.image}
                        alt={`${testRestaurantInfo.name} image`}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',  // Ensures the image fills the container without distortion
                            objectPosition: 'center', // Centers the image in case of cropping
                        }}
                    />
                </Box>

                <h1>{testRestaurantInfo.name}</h1>
                <Box>
                    {/* Additional content */}
                </Box>
            </Box>
        </Box>
    );
}