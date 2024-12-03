import { Box, Grid2 as Grid, Card, Typography, Avatar, List, ListItem } from "@mui/material";
import Header from "../Components/Home/Header";
import ReviewItem from "../Components/Restaurant/ReviewItem";
const testReviews = [
    {
        user: {
            name: "Brandon Llanes",
            img: "https://media.licdn.com/dms/image/v2/C5603AQFEfnRKb5rOcA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1622597713152?e=1735776000&v=beta&t=cMOaSPN8uqkh_rbhu6NWPiUgDlq1tN7rWWCo8bQ02DM"
        },
        rating: 5,
        content: "Outstanding NY style pizza. I'd give a 9/10 for the pizza but ambiance is a 10/10 as you never see the cool outdoor patio tables with a TV to boot. California weather with NY pizza--makes a very hard combo to beat. Cheese pizza was great with nice thin crispy crust that surprisingly held up well when held--this is the first NY pizza test. Some stringy cheese but not that much (I think they needed a bit more mozzarella). Zangy tomato sauce was perfect. My only ask is in the dough taste--it was missing a tad bit of that yeasty punch that is so common in NY. We'll be back hoping to find that elusive NY dough...this checked off nearly all the boxes. Great job to the crew here!"
    },
    {
        user: {
            name: "John Smith",
            img: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        },
        rating: 5,
        content: "This place brings me LIFE! Service, food, vibes, everything is on point. Their food is so fresh, full of flavor, and loadedddd. Can't wait to come back."
    },
    {
        user: {
            name: "Brandon Llanes",
            img: "https://media.licdn.com/dms/image/v2/C5603AQFEfnRKb5rOcA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1622597713152?e=1735776000&v=beta&t=cMOaSPN8uqkh_rbhu6NWPiUgDlq1tN7rWWCo8bQ02DM"
        },
        rating: 5,
        content: "Outstanding NY style pizza. I'd give a 9/10 for the pizza but ambiance is a 10/10 as you never see the cool outdoor patio tables with a TV to boot. California weather with NY pizza--makes a very hard combo to beat. Cheese pizza was great with nice thin crispy crust that surprisingly held up well when held--this is the first NY pizza test. Some stringy cheese but not that much (I think they needed a bit more mozzarella). Zangy tomato sauce was perfect. My only ask is in the dough taste--it was missing a tad bit of that yeasty punch that is so common in NY. We'll be back hoping to find that elusive NY dough...this checked off nearly all the boxes. Great job to the crew here!"
    },
    {
        user: {
            name: "John Smith",
            img: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        },
        rating: 5,
        content: "This place brings me LIFE! Service, food, vibes, everything is on point. Their food is so fresh, full of flavor, and loadedddd. Can't wait to come back."
    },
];

export default function ProfilePage() {
    return (
        <Box sx = {{height: '100%'}}>
            <Header/>

            <Box sx = {{marginTop: '0', background: `url('https://foodie.sysco.com/wp-content/uploads/2024/08/Sysco_Panchetta-64.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100%'}}>
                <Grid container spacing={2}>
                    <Grid size={4} sx = {{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <Card sx = {{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 2, width: "70%", height: {xs: '60%', md: '70%'}, marginTop: {xs: '3rem', md: '4rem'}}}>
                            <Avatar
                                alt="Profile Picture"
                                src="/path/to/your/image.jpg"
                                sx={{
                                    width: {xs: 100, md: 200},
                                    height: {xs: 100, md: 200},
                                    marginBottom: {xs: '2rem', md: '5rem'},
                                    borderRadius: 0, // Make it square
                                }}
                            />

                            
                            <Typography 
                                variant="h5" 
                                fontWeight={"bold"} 
                                sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}
                            >
                                First Last
                            </Typography>

                            <Typography 
                                variant="h6" 
                                sx={{ fontSize: { xs: '0.9rem', sm: '1rem' }, marginBottom: 1 }}
                            >
                                Email
                            </Typography>

                            <Typography 
                                variant="h6" 
                                sx={{ fontSize: { xs: '0.9rem', sm: '1rem' }, marginBottom: 1 }}
                            >
                                Address
                            </Typography>

                            <Typography 
                                variant="h6" 
                                sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
                            >
                                Phone Number
                            </Typography>
                        </Card>
                    </Grid>
                    <Grid size={8}>
                        {/* List of Reviews */}
                        <Box sx={{ maxHeight: {xs: '400px', md: '750px'}, overflowY: 'auto', padding: 1, marginTop: {xs: '2rem', md: '5rem'} }}>
                            <List>
                                {testReviews.map((item, index) => (
                                    <ListItem sx={{ padding: 0, marginTop: '1rem' }} key={index}>
                                        <ReviewItem user={item.user} rating={item.rating} content={item.content} />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}