import { Box, Divider, Grid2, ListItemButton } from "@mui/material"
import Header from "../Components/Header"
import ListItem from "../Components/Search/ListItem";

const testList = [
    {
      name: 'test1',
      description: 'Place that sells food',
      image: 'https://content.sportslogos.net/logos/34/828/full/san_jose_state_spartans_logo_primary_dark_2018_sportslogosnet-9968.png',
    },
    {
      name: 'test2',
      description: 'Another place that sells food',
      image: 'https://content.sportslogos.net/logos/34/828/full/san_jose_state_spartans_logo_primary_dark_2018_sportslogosnet-9968.png',
    },
    {
      name: 'test3',
      description: 'Last place Last placeLast placeLast placeLast placeLast placeLast placeLast placeLast placeLast placeLast placeLast placeLast place',
      image: 'https://content.sportslogos.net/logos/34/828/full/san_jose_state_spartans_logo_primary_dark_2018_sportslogosnet-9968.png',
    }
];

export default function SearchPage() {
    return (
        <Box sx = {{height: '100%', display: 'flex', flexDirection: 'column'}}>
            <Header />
            
            <Grid2 container spacing={2} sx = {{height: '100%'}}>
                <Grid2 size={6}>
                    <Box sx = {{height: '100%', display: 'flex', flexDirection: 'column'}}>
                        <Box sx = {{height: '20%'}}>
                            Filtering
                        </Box>
                        <Divider></Divider>
                        
                        {/* List of Items */}
                        <Box sx={{ height: '80%', overflowY: 'auto' }}>
                        {testList.map((item, index) => (
                            <ListItemButton component="a" href="#simple-list" sx = {{ height: '35%' }}>
                                <ListItem index = {index} name = {item.name} description = {item.description} img = {item.image} />
                            </ListItemButton>
                        ))}
                        </Box>

                    </Box>
                </Grid2>
                
                <Grid2 size={6}>
                    <Box sx = {{height: '100%', backgroundColor: 'blue'}}>
                        Map
                    </Box>
                </Grid2>
            </Grid2>
        </Box>
    )
}