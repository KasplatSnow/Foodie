import { Box, Grid2 as Grid, Card, Typography, Avatar, List, ListItem, CircularProgress } from "@mui/material";
import Header from "../Components/Home/Header";
import ReviewItem from "../Components/Restaurant/ReviewItem";
import { useAuth } from "../Components/Auth/AuthContext";
import { useState, useEffect } from "react";
import { Email, Phone, Person } from '@mui/icons-material'

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
      })
      .catch((e) => {
        setError(e.toString());
        setUserData([]);
      });
};

interface FetchReviewParams {
    setReviews: React.Dispatch<React.SetStateAction<any>>;
    userID: any;
    setError: React.Dispatch<React.SetStateAction<string>>;
}

const fetchReviews = ({ setReviews, userID, setError }: FetchReviewParams) => {
    fetch(`http://localhost:8080/api/review/userreviews/userID/${userID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setError('');
        setReviews(json);
        console.log(json);
      })
      .catch((e) => {
        setError(e.toString());
        setReviews([]);
      });
};

export default function ProfilePage() {
    const loginContext = useAuth();
    const [userData, setUserData] = useState(null);  // Initialize as null instead of an empty object
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState("");

    // Fetch user data once the component mounts
    useEffect(() => {
        fetchProfileData({ setUserData, userID: loginContext.userId, setError });
        fetchReviews({ setReviews, userID: loginContext.userId, setError });
    }, [loginContext.userId]);  // Run only when userId changes

    if (userData == null) {  // If userData is still null, show a loading indicator
        return (
            <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress />
                <Typography>Must be logged in</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ height: '100%' }}>
            <Header />

            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            {/* Header */}
            <Box
                sx={{
                backgroundColor: '#f5f5f5',
                padding: 2,
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Header />
            </Box>
            {/* Main Content */}
            <Box
                sx={{
                display: 'flex',
                flexGrow: 1,
                overflow: 'hidden',
                }}
            >
                {/* Left Column: Customer Info */}
                <Box
                sx={{
                    width: '25%',
                    backgroundColor: '#e3f2fd', // Light blue background
                    padding: 3,
                    borderRight: '1px solid #ddd',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                >
                {/* Avatar */}
                <Avatar
                    alt="John Doe"
                    src={userData.pfp} // Replace with a real image path
                    sx={{
                    width: 100,
                    height: 100,
                    marginBottom: 2,
                    backgroundColor: '#64b5f6', // Fallback background color
                    }}
                />

                {/* Customer Info Heading */}
                {/* <Typography variant="h6" gutterBottom>
                    Owner Info
                </Typography> */}

                {/* Business Owner info */}
                <Box
                    sx={{
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    }}
                >
                    <Typography
                    variant="body1"
                    sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                    >
                    <Person fontSize="small" color="primary" />
                    <strong>Username:</strong> {userData ? userData.username : ''}
                    </Typography>
                    <Typography
                    variant="body1"
                    sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                    >
                    <Email fontSize="small" color="primary" />
                    <strong>Email:</strong> {userData ? userData.email : ''}
                    </Typography>
                    <Typography
                    variant="body1"
                    sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                    >
                    <Phone fontSize="small" color="primary" />
                    <strong>Phone:</strong> {userData ? userData.phoneNumber : ''}
                    </Typography>
                </Box>
            </Box>
                {/* List of Reviews */}
                <Box sx={{overflowY: 'auto', padding: 1 }}>
                    <List>
                        {reviews && reviews.length > 0 ? reviews.map((item, index) => (
                            <ListItem sx={{ padding: 0, marginTop: '1rem' }} key={index}>
                                <ReviewItem user={item.userID} rating={item.rating} content={item.review_text} />
                            </ListItem>
                        )) : ''}
                    </List>
                </Box>
            </Box>
        </Box>
    </Box>
);
}
