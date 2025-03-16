import React, { useRef, useState } from "react";
import {
    AppBar,
    Avatar,
    Box,
    Card,
    CardContent,
    Container,
    Grid2 as Grid,
    Tab,
    Tabs,
    Typography,
    Button,
    TextField,
    CircularProgress,
} from "@mui/material";
import { TabPanel, TabContext } from "@mui/lab";
import { styled } from "@mui/material/styles";
import { useMutation, useQuery } from "@tanstack/react-query";
import Resume from "./Resume";
import { queries } from "../../utilities/config/api";
import { useNavigate } from "react-router-dom";

const CoverPhoto = styled(Box)({
    height: 250,
    backgroundImage: "url('https://source.unsplash.com/random/1200x400')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
});

const ProfilePic = styled(Avatar)({
    width: 120,
    height: 120,
    border: "4px solid white",
    position: "absolute",
    bottom: -60,
    left: 30,
});

const ProfilePage: React.FC = () => {
    const navigate = useNavigate();
    const [tab, setTab] = useState<string>("posts");

    const handleTabChange = (_: React.SyntheticEvent, newValue: string) => setTab(newValue);

    const postInputRef: any = useRef();
    const postsQuery = useQuery(queries.query("/database/read_db?table=posts"));
    const mutationQuery = useMutation(queries.mutate("/database/create_row"));
    const handlePost = () => {
        let payload = {
            table: "posts",
            values: {
                message: postInputRef.current.value
            }
        };
        console.log("FORM.HANDLESUBMIT: ", payload)
        mutationQuery.mutate(payload, {
            onSettled: () => {
                postsQuery.refetch();
                postInputRef.current.value = "";
            }
        });
    };
    console.log("PORTFOLIO.POSTS: ", postsQuery)

    return (
        <Container maxWidth={false}>
            {/* Cover Photo & Profile Picture */}
            <Card sx={{ mb: 3, overflow: "hidden", borderRadius: 2 }}>
                <CoverPhoto>
                    <ProfilePic src="https://source.unsplash.com/random/200x200?face" />
                </CoverPhoto>
                <CardContent sx={{ mt: 6, textAlign: "left", pl: 2 }}>
                    <Typography variant="h5" fontWeight="bold">
                        Michael Woodward
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Software Engineer | Tech Enthusiast | React Developer
                    </Typography>
                    <Button variant="contained" sx={{ mt: 1 }}>
                        Edit Profile
                    </Button>
                </CardContent>
            </Card>

            {/* Navigation Tabs */}
            <TabContext value={tab}>
                <AppBar position="static" sx={{ backgroundColor: "white", boxShadow: 1 }}>
                    <Tabs value={tab} onChange={handleTabChange} indicatorColor="primary" textColor="primary" centered>
                        <Tab label="Home" value={null} onClick={() => navigate("/")} />
                        <Tab label="Resume" value="resume" />
                        <Tab label="Posts" value="posts" />
                        <Tab label="About" value="about" />
                        <Tab label="Friends" value="friends" />
                        <Tab label="Photos" value="photos" />
                    </Tabs>
                </AppBar>

                {/* Resume Tab */}
                <TabPanel value="resume">
                    <Resume />
                </TabPanel>

                {/* Experience Tab */}
                <TabPanel value="experience">
                    
                </TabPanel>

                {/* Posts Tab */}
                <TabPanel value="posts">
                    <Card sx={{ mb: 2, p: 2 }}>
                        <TextField inputRef={postInputRef} fullWidth placeholder="What's on your mind?" variant="outlined" />
                        <Button variant="contained" sx={{ mt: 1, width: "100%" }} onClick={handlePost}>
                            Post
                        </Button>
                    </Card>
                    {postsQuery.isLoading 
                        ? <CircularProgress />
                        : postsQuery.data.map((post: any, index: number) => (
                        <Card key={index} sx={{ mb: 2, p: 2 }}>
                            <Grid container spacing={2}>
                                <Grid>
                                    <Avatar src="https://source.unsplash.com/random/100x100?face" />
                                </Grid>
                                <Grid>
                                    <Typography variant="h6">Michael Woodward</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Just now
                                    </Typography>
                                    <Typography sx={{ mt: 1 }}>
                                        {post.message}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Card>
                    )).reverse()}
                </TabPanel>

                {/* About Tab */}
                <TabPanel value="about">
                    <Typography variant="h6">About</Typography>
                    <Typography>🚀 Application Engineer at Discover Financial Services</Typography>
                    <Typography>📍 Based in Chicago, Illinois, USA</Typography>
                    <Typography>🎓 Studied at Northwestern University</Typography>
                    <Typography>📜 Professional Certificate in Full Stack Development from Northwestern University</Typography>

                    Linkedin · Github · Trailhead · Bluesky
                </TabPanel>

                {/* Friends Tab */}
                <TabPanel value="friends">
                    <Typography variant="h6">Friends</Typography>
                    <Grid container spacing={2}>
                        {[1, 2, 3, 4].map((friend) => (
                            <Grid key={friend}>
                                <Avatar src="https://source.unsplash.com/random/100x100?face" />
                                <Typography variant="body2">Friend {friend}</Typography>
                            </Grid>
                        ))}
                    </Grid>
                </TabPanel>

                {/* Photos Tab */}
                <TabPanel value="photos">
                    <Typography variant="h6">Photos</Typography>
                    <Grid container spacing={2}>
                        {[1, 2, 3, 4, 5, 6].map((photo) => (
                            <Grid key={photo}>
                                <img
                                    src={`https://source.unsplash.com/random/150x150?sig=${photo}`}
                                    alt="Random"
                                    style={{ width: "100%", borderRadius: 8 }}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </TabPanel>
            </TabContext>
        </Container>
    );
};

export default ProfilePage;
