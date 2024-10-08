import { Box, Grid2 } from "@mui/material"

export default function ListItem() {
    return (
        <Grid2 container spacing={2} sx = {{height: '100%'}}>
            <Grid2 size={4} sx = {{height: '100%', backgroundColor: 'blue'}}>
                <Box>
                    Image of Restaurant
                </Box>
            </Grid2>
            
            <Grid2 size={8}>
                <Box sx = {{height: '100%'}}>
                    Restaurant info
                </Box>
            </Grid2>
        </Grid2>
    )
}