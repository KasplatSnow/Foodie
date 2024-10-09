import { Box, List, Divider, Grid2, ListItemButton } from "@mui/material"
import Header from "../Components/Header"
import ListItem from "../Components/Search/ListItem";

const testList = [
    {
        name: 'Joe\'s Pizza',
        description: 'Famous New York-style pizza with a thin crust and fresh toppings. Family-owned since 1985.',
        categories: ['Pizza', 'Italian', 'Fast Food'],
        rating: 4.5,
        reviewCount: 200,
        image: 'https://content.sportslogos.net/logos/34/828/full/san_jose_state_spartans_logo_primary_dark_2018_sportslogosnet-9968.png',
    },
    {
        name: 'Sushi Heaven',
        description: 'A traditional sushi restaurant with a modern twist. Known for the freshest sashimi and creative rolls.',
        categories: ['Sushi Bars', 'Japanese', 'Seafood'],
        rating: 4.8,
        reviewCount: 350,
        image: 'https://content.sportslogos.net/logos/34/828/full/san_jose_state_spartans_logo_primary_dark_2018_sportslogosnet-9968.png',
    },
    {
        name: 'Café Bliss',
        description: 'Cozy café with a wide variety of gourmet coffees, teas, and fresh-baked pastries. Perfect for relaxing or working.',
        categories: ['Cafes', 'Coffee & Tea', 'Bakeries'],
        rating: 4.2,
        reviewCount: 180,
        image: 'https://content.sportslogos.net/logos/34/828/full/san_jose_state_spartans_logo_primary_dark_2018_sportslogosnet-9968.png',
    },
    {
        name: 'Taco Fiesta',
        description: 'Vibrant taco joint serving up authentic Mexican street food. Try their famous carne asada tacos and homemade salsa.',
        categories: ['Mexican', 'Tacos', 'Street Food'],
        rating: 4.7,
        reviewCount: 450,
        image: 'https://content.sportslogos.net/logos/34/828/full/san_jose_state_spartans_logo_primary_dark_2018_sportslogosnet-9968.png',
    },
    {
        name: 'Joe\'s Pizza',
        description: 'Famous New York-style pizza with a thin crust and fresh toppings. Family-owned since 1985.',
        categories: ['Pizza', 'Italian', 'Fast Food'],
        rating: 4.5,
        reviewCount: 200,
        image: 'https://content.sportslogos.net/logos/34/828/full/san_jose_state_spartans_logo_primary_dark_2018_sportslogosnet-9968.png',
    },
    {
        name: 'Sushi Heaven',
        description: 'A traditional sushi restaurant with a modern twist. Known for the freshest sashimi and creative rolls.',
        categories: ['Sushi Bars', 'Japanese', 'Seafood'],
        rating: 4.8,
        reviewCount: 350,
        image: 'https://content.sportslogos.net/logos/34/828/full/san_jose_state_spartans_logo_primary_dark_2018_sportslogosnet-9968.png',
    },
    {
        name: 'Café Bliss',
        description: 'Cozy café with a wide variety of gourmet coffees, teas, and fresh-baked pastries. Perfect for relaxing or working.',
        categories: ['Cafes', 'Coffee & Tea', 'Bakeries'],
        rating: 4.2,
        reviewCount: 180,
        image: 'https://content.sportslogos.net/logos/34/828/full/san_jose_state_spartans_logo_primary_dark_2018_sportslogosnet-9968.png',
    },
    {
        name: 'Taco Fiesta',
        description: 'Vibrant taco joint serving up authentic Mexican street food. Try their famous carne asada tacos and homemade salsa.',
        categories: ['Mexican', 'Tacos', 'Street Food'],
        rating: 4.7,
        reviewCount: 450,
        image: 'https://content.sportslogos.net/logos/34/828/full/san_jose_state_spartans_logo_primary_dark_2018_sportslogosnet-9968.png',
    }
];


export default function SearchPage() {
    return (
        <Box sx = {{height: '100vh', display: 'flex', flexDirection: 'column'}}>
            <Header />
            
            <Grid2 container spacing={2} sx = {{height: '100%'}}>
                <Grid2 size={6}>
                    <Box sx = {{height: '90vh', display: 'flex', flexDirection: 'column'}}>
                        <Box sx = {{height: '20%'}}>
                            Filtering buttons go here, waiting for backend implementation
                        </Box>
                        <Divider></Divider>
                        
                        {/* List of Items */}
                        <List sx={{ height: '100vh', overflowY: 'auto' }}>
                        {testList.map((item, index) => (
                            <ListItemButton component="a" href="#simple-list" sx = {{ height: '30%' }}>
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