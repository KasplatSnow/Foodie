import {Box, Grid2, Card } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';

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
                <Grid2 size={8} sx = {{height: '100%'}}>
                    <Box sx = {{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around'}}>
                        <h2 style = {{margin: 0}}>{index + 1}. {name}</h2>
                        <Box sx={{ display: 'flex', alignItems: 'center', margin: 0 }}>
                            {Array.from({ length: 5 }, (_, i) => (
                                <StarIcon key={i} />
                            ))}
                            5
                        </Box>
                        <h4 style = {{margin: 0}}>Open or Closed</h4>
                        <h4 style = {{margin: 0}}>Categories? $$$ Value</h4>
                        <p 
                            style={{
                                overflow: 'hidden',      // Hide any overflowing text
                                textOverflow: 'ellipsis', // Add "..." when text overflows
                                textWrap: 'nowrap',
                                margin: 0
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
