import { Box, List, Divider, Grid2, ListItemButton, Button } from "@mui/material"
import Header from "../Components/Home/Header"
import ListItem from "../Components/Search/ListItem";
import StarIcon from '@mui/icons-material/Star';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import { useNavigate } from 'react-router-dom';

const cuisineList = ['Burgers', 'Delivery', 'Chinese', 'Mexican', 'Italian', 'Thai'];

const testList = [
    {
        id: '1',
        name: 'Joe\'s Pizza',
        description: 'Famous New York-style pizza with a thin crust and fresh toppings. Family-owned since 1985.',
        categories: ['Pizza', 'Italian', 'Fast Food'],
        rating: 4.5,
        reviewCount: 200,
        image: 'https://content.sportslogos.net/logos/34/828/full/san_jose_state_spartans_logo_primary_dark_2018_sportslogosnet-9968.png',
    },
    {
        id: '2',
        name: 'Sushi Heaven',
        description: 'A traditional sushi restaurant with a modern twist. Known for the freshest sashimi and creative rolls.',
        categories: ['Sushi Bars', 'Japanese', 'Seafood'],
        rating: 4.8,
        reviewCount: 350,
        image: 'https://content.sportslogos.net/logos/34/828/full/san_jose_state_spartans_logo_primary_dark_2018_sportslogosnet-9968.png',
    },
    {
        id: '3',
        name: 'Café Bliss',
        description: 'Cozy café with a wide variety of gourmet coffees, teas, and fresh-baked pastries. Perfect for relaxing or working.',
        categories: ['Cafes', 'Coffee & Tea', 'Bakeries'],
        rating: 4.2,
        reviewCount: 180,
        image: 'https://content.sportslogos.net/logos/34/828/full/san_jose_state_spartans_logo_primary_dark_2018_sportslogosnet-9968.png',
    },
    {
        id: '4',
        name: 'Taco Fiesta',
        description: 'Vibrant taco joint serving up authentic Mexican street food. Try their famous carne asada tacos and homemade salsa.',
        categories: ['Mexican', 'Tacos', 'Street Food'],
        rating: 4.7,
        reviewCount: 450,
        image: 'https://content.sportslogos.net/logos/34/828/full/san_jose_state_spartans_logo_primary_dark_2018_sportslogosnet-9968.png',
    },
];

export default function SearchPage() {
    const navigate = useNavigate();

    const handleStarClick = (rating: number) => {
        console.log(`Star ${rating} clicked!`);
        // Perform any action, e.g., set the rating state
    };

    const handlePriceClick = (price: number) => {
        console.log(`Price ${price} clicked!`);
        // Perform any action, e.g., set the rating state
    };    

    const handleRestaurantClick = (id: string) => {
        navigate(`/restaurant?${id}`);
    }

    return (
        <Box sx = {{height: '100vh', display: 'flex', flexDirection: 'column'}}>
            <Header />
            
            <Grid2 container spacing={2} sx = {{height: '100%', marginTop: '4rem'}}>
                <Grid2 size={6}>
                    <Box sx = {{height: '90vh', display: 'flex', flexDirection: 'column'}}>
                        <Box sx = {{height: '30vh'}} mx = {{height: '20vh'}}>

                            {/* Filtering options */}
                            <Grid2 container spacing={2} sx = {{height: '100%'}}>
                                {/* Cuisines */}
                                <Grid2 size = {6}>
                                    <h3 style = {{margin: 0, marginTop: '1rem', marginLeft: '1rem'}}>Cuisines</h3>
                                    <Box sx = {{marginLeft: '1rem'}}>
                                        <Grid2 container spacing = {2}>
                                            {cuisineList.map((item, index) => (
                                                <Grid2 size = {4} key = {index}>
                                                    <Button sx = {{color: 'black'}}>
                                                        <h5 style = {{margin: 0}}>{item}</h5>
                                                    </Button>
                                                </Grid2>
                                            ))}
                                        </Grid2>
                                    </Box>
                                </Grid2>

                                {/* Rating/Price */}
                                <Grid2 size = {6}>
                                    <h3 style = {{margin: 0, marginTop: '1rem', marginLeft: '1rem'}}>Rating</h3>
                                    <Box sx={{ display: 'flex', marginLeft: '1rem'}}>
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

                                    <h3 style = {{margin: 0, marginTop: '1rem', marginLeft: '1rem'}}>Price</h3>
                                    <Box sx={{ display: 'flex', marginLeft: '1rem'}}>
                                        {Array(5).fill(0).map((_, index) => (
                                            <Button 
                                            key={index} 
                                            onClick={() => handlePriceClick(index + 1)}
                                            sx={{ minWidth: '3rem', width: '3rem' }}  // Set custom width
                                        >
                                            <LocalAtmIcon />
                                        </Button>
                                        ))}
                                    </Box>
                                </Grid2>
                            </Grid2>

                        </Box>
                        <Divider></Divider>
                        
                        {/* List of Items */}
                        <List sx={{ height: '100vh', overflowY: 'auto' }}>
                        {testList.map((item, index) => (
                            <ListItemButton component="a" sx = {{ height: '30%' }} key = {index} onClick = {() => handleRestaurantClick(item.id)}>
                                <ListItem index = {index} name = {item.name} description = {item.description} img = {item.image} />
                            </ListItemButton>
                        ))}
                        </List>

                    </Box>
                </Grid2>
                
                <Grid2 size={6}>
                    <Box sx = {{height: '100%', backgroundColor: 'blue', background: `url('https://foodie.sysco.com/wp-content/uploads/2024/08/Sysco_Panchetta-64.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
                        Map Using a temporary image until we decide on a map API or different usage for space
                    </Box>
                </Grid2>
            </Grid2>
        </Box>
    )
}