import { Box, Grid2 as Grid, Card, Typography, Avatar, List, ListItem, CircularProgress } from "@mui/material";
import Header from "../Components/Home/Header";
import ReviewItem from "../Components/Restaurant/ReviewItem";
import { useAuth } from "../Components/Auth/AuthContext";
import { useState, useEffect } from "react";

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

    if (userData && userData.reviewID && userData.reviewID.length <= 0) {
        return (
            <Box sx={{ height: '100%' }}>
                <Header />

                <Box sx={{ marginTop: '0', background: `url('https://foodie.sysco.com/wp-content/uploads/2024/08/Sysco_Panchetta-64.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Card sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 2, width: "40%", height: { xs: '70%', md: '100%' }, marginTop: { xs: '3rem', md: '4rem' } }}>
                        <Avatar
                            alt="Profile Picture"
                            src={userData.profilePicture || "/path/to/your/image.jpg"}  // Assuming profilePicture exists in the user data
                            sx={{
                                width: { xs: 100, md: 200 },
                                height: { xs: 100, md: 200 },
                                marginBottom: { xs: '2rem', md: '2rem' },
                                borderRadius: 0, // Make it square
                            }}
                        />
                        <Typography
                            variant="h6"
                            fontWeight={"bold"}
                            sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' }, marginBottom: { xs: '2rem', md: '2rem' }, }}
                        >
                            No Reviews Yet
                        </Typography>

                        <Typography
                            variant="h5"
                            fontWeight={"bold"}
                            sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}
                        >
                            {userData.username}
                        </Typography>

                        <Typography
                            variant="h6"
                            sx={{ fontSize: { xs: '0.9rem', sm: '1rem' }, marginBottom: 1 }}
                        >
                            {userData.email}
                        </Typography>

                        <Typography
                            variant="h6"
                            sx={{ fontSize: { xs: '0.9rem', sm: '1rem' }, marginBottom: 1 }}
                        >
                            {userData.address || 'No address available'}
                        </Typography>

                        <Typography
                            variant="h6"
                            sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
                        >
                            {userData.phoneNumber || 'No phone number available'}
                        </Typography>
                    </Card>
                </Box>
            </Box>
        );
    }

    return (
        <Box sx={{ height: '100%' }}>
            <Header />

            <Box sx={{ marginTop: '0', background: `url('https://foodie.sysco.com/wp-content/uploads/2024/08/Sysco_Panchetta-64.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100%' }}>
                <Grid container spacing={2}>
                    <Grid size={4} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Card sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 2, width: "70%", height: { xs: '60%', md: '70%' }, marginTop: { xs: '3rem', md: '4rem' } }}>
                            <Avatar
                                alt="Profile Picture"
                                src={userData.profilePicture || "/path/to/your/image.jpg"}
                                sx={{
                                    width: { xs: 100, md: 200 },
                                    height: { xs: 100, md: 200 },
                                    marginBottom: { xs: '2rem', md: '5rem' },
                                    borderRadius: 0, // Make it square
                                }}
                            />
                            <Typography
                                variant="h5"
                                fontWeight={"bold"}
                                sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}
                            >
                                {userData.username}
                            </Typography>

                            <Typography
                                variant="h6"
                                sx={{ fontSize: { xs: '0.9rem', sm: '1rem' }, marginBottom: 1 }}
                            >
                                {userData.email}
                            </Typography>

                            <Typography
                                variant="h6"
                                sx={{ fontSize: { xs: '0.9rem', sm: '1rem' }, marginBottom: 1 }}
                            >
                                {userData.address || 'No address available'}
                            </Typography>

                            <Typography
                                variant="h6"
                                sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
                            >
                                {userData.phoneNumber || 'No phone number available'}
                            </Typography>
                        </Card>
                    </Grid>
                    <Grid size={8}>
                        {/* List of Reviews */}
                        <Box sx={{ maxHeight: { xs: '400px', md: '750px' }, overflowY: 'auto', padding: 1, marginTop: { xs: '2rem', md: '5rem' } }}>
                            <List>
                                {reviews && reviews.length > 0 ? reviews.map((item, index) => (
                                    <ListItem sx={{ padding: 0, marginTop: '1rem' }} key={index}>
                                        <ReviewItem user={item.user} rating={item.rating} content={item.review_text} />
                                    </ListItem>
                                )) : ''}
                            </List>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}
