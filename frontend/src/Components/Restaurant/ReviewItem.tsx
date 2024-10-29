import {Box, Card, Grid2 } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';

interface ReviewItemProps {
    user: any;
    rating: number;
    content: string;
}

export default function ReviewItem({ user, rating, content }: ReviewItemProps) {
    return (
        <Card sx = {{width: '100%', height: '100%' }}>


            <Box>
                {/*Review Rating Here*/}
                {Array.from({ length: rating }, (_, i) => (
                    <StarIcon key={i} />
                ))}
            </Box>

            <Box>
                <p>{content}</p>
            </Box>
        </Card>
    );
}
