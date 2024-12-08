import {Box, Card } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import { useState, useEffect } from "react";

interface ReviewItemProps {
    user: number;
    rating: number;
    content: string;
}

interface FetchProfileParams {
    setUserData: React.Dispatch<React.SetStateAction<any>>;
    userID: any;
    setError: React.Dispatch<React.SetStateAction<string>>;
}

const fetchProfileData = ({ setUserData, userID, setError }: FetchProfileParams) => {
    fetch(`http://localhost:8080/api/users/getuserbyid/userID/${userID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setError('');
        setUserData(json);
        console.log(json);
      })
      .catch((e) => {
        setError(e.toString());
        setUserData([]);
      });
};

export default function ReviewItem({ user, rating, content }: ReviewItemProps) {
    const [userData, setUserData] = useState(null);  // Initialize as null instead of an empty object
    const [error, setError] = useState("");

    useEffect(() => {
        fetchProfileData({ setUserData, userID: user, setError });
    }, [user]);

    if (userData == null) {
        return;
    }

    return (
        <Card sx = {{width: '100%', height: '100%', padding: '1rem' }}>
            <Box sx = {{display: 'flex'}}>
                <img
                    src={userData.pfp}
                    alt={`${userData.username} image`}
                    style={{
                        width: '100px',
                        height: '100px',
                        objectFit: 'cover' // Ensures the image fills the container
                    }}
                />

                <Box sx = {{paddingLeft: '1rem'}}>
                    <h3>{userData.username}</h3>
                    <Box>
                        {/*Review Rating Here*/}
                        {Array.from({ length: rating }, (_, i) => (
                            <StarIcon key={i} sx = {{color: 'gold'}}/>
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
