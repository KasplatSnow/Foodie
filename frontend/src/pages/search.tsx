import { Box, Divider, Grid2 } from "@mui/material"
import Header from "../Components/Header"

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
                        <Box>
                            List of restaurants
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