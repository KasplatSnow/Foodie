import { Box, Grid2 } from "@mui/material"
import Header from "../Components/Header"

export default function SearchPage() {
    return (
        <Box>
            <Header/>
            
            <Grid2 container spacing={2}>
                <Grid2 size={6}>
                    Left
                </Grid2>
                <Grid2 size={6}>
                    Right
                </Grid2>
            </Grid2>
        </Box>
    )
}