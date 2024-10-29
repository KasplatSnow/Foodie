import {Box, Card } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';

interface ReviewItemProps {
    user: any;
    rating: number;
    content: string;
}

export default function ReviewItem({ user, rating, content }: ReviewItemProps) {
    return (
        <Card sx = {{width: '100%', height: '100%', padding: '1rem' }}>
            <Box sx = {{display: 'flex'}}>
                <img
                    src={user.img}
                    alt={`${user.name} image`}
                    style={{
                        width: '100px',
                        height: '100px',
                        objectFit: 'cover' // Ensures the image fills the container
                    }}
                />

                <Box sx = {{paddingLeft: '1rem'}}>
                    <h3>{user.name}</h3>
                    <Box>
                        {/*Review Rating Here*/}
                        {Array.from({ length: rating }, (_, i) => (
                            <StarIcon key={i} />
                        ))}
                    </Box>
                </Box>
            </Box>

            <Box>
                <p>{content}</p>
            </Box>
        </Card>
    );
}
