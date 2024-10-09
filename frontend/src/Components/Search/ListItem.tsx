import {Box, Grid2, Card } from "@mui/material";

interface ListItemProps {
    index: number;
    name: string;
    description: string;
    img: string;
}

export default function ListItem({ index, name, description, img }: ListItemProps) {
    return (
        <Card sx = {{width: '100%', height: '100%' }}>
            <Grid2 container spacing={2} sx={{ height: '100%' }}>
                {/* Image Section */}
                <Grid2 size={4} sx={{ maxHeight: '100%', maxWidth: '100%' }}>
                        <img
                            src={img}
                            alt={`${name} image`}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover' // Ensures the image fills the container
                            }}
                        />
                </Grid2>

                {/* Text Section */}
                <Grid2 size={8}>
                    <Box>
                        <h3>{index + 1}. {name}</h3>
                        <p>Rating</p>
                        <p>Categories</p>
                        <p 
                            style={{
                                overflow: 'hidden',      // Hide any overflowing text
                                textOverflow: 'ellipsis', // Add "..." when text overflows
                                whiteSpace: 'nowrap',     // Prevent text from wrapping to the next line
                            }}
                        >
                            {description}
                        </p>
                    </Box>
                </Grid2>
            </Grid2>
        </Card>
    );
}
