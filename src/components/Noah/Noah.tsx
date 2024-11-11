import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import { LazyLoadImage, LazyLoadComponent } from 'react-lazy-load-image-component';

import { queries, paths } from "../../config/api";
import MarkdownWrapper from "../Layout/Markdown";

const Noah = () => {
    const getNoahsAppConfig = useQuery(queries.query(paths.getNoahsAppConfig));

    console.log("getNoahsAppConfig: ", getNoahsAppConfig)

    return ({
        pending: "Getting Noah's App Configuration... A really sweet loading screen coming soon😉",
        loading: "Loading...",
        success: <NoahPageSuccessContent data={getNoahsAppConfig.data} />,
        error: "Something went wrong..."
    }[getNoahsAppConfig.status]);
}

export default Noah

const NoahPageSuccessContent = (props: { data: any }) => {
    const { data } = props;

    const [videoIndex, setVideoIndex] = useState(data.videos.length - 1);

    console.log("data: ", data)
    return (
        <Grid container spacing={2}>
            <Grid item sm={12}>
                {data.images.map((image: string) => (
                    <LazyLoadImage src={`data:image/jpeg;base64,${image}`} alt="image" style={{ width: "100%", height: "auto" }} />
                ))}
                <Divider />
            </Grid>
            <Grid item sm={6}>
                <Grid container component={Container} maxWidth="md">
                    <Grid item sm={12} sx={{ textAlign: "center" }}>
                        <Typography variant="h2">Hi! I'm Noah😎</Typography>
                    </Grid>
                    <Grid item sm={12} sx={{ textAlign: "center" }}>
                        <Typography variant="h5">11 years old -- Student Athlete -- Basketball (Year 4)</Typography>
                    </Grid>
                    <Grid item sm={12} sx={{ textAlign: "center" }}>
                        <MarkdownWrapper>
                            {data.markdown}
                        </MarkdownWrapper>
                    </Grid>
                </Grid>
            </Grid>
            
            <Grid item sm={6} p={2}>
                <LazyLoadComponent>
                    {data.videos && (
                        <video src={`data:video/mp4;base64,${data.videos[videoIndex]}`} autoPlay loop controls style={{ width: "100%", height: "80vh", borderRadius: "16px" }} />
                    )}
                </LazyLoadComponent>
                <Box sx={{ textAlign: "center", display: "flex", justifyContent: "center", gap: 2, mt: 1 }}>
                    <button onClick={() => setVideoIndex(videoIndex - 1)} disabled={videoIndex === 0}>Previous</button>
                    <button onClick={() => setVideoIndex(videoIndex + 1)} disabled={videoIndex === data.videos.length - 1}>Next</button>
                </Box>
            </Grid>

            <Grid item sm={12} py={4}>
                <Divider />
                <Typography variant="h3" sx={{ textAlign: "center" }}>Contact</Typography>
                <Typography variant="body1" sx={{ textAlign: "center" }}>My dad is my agent 😎</Typography>
                <Typography variant="body1" sx={{ textAlign: "center" }}>Michael Woodward</Typography>
                <Typography variant="body1" sx={{ textAlign: "center" }}>business@email.athlete</Typography>
                <Typography variant="body1" sx={{ textAlign: "center" }}>555 - 123 - 4567</Typography>
            </Grid>

        </Grid>
    )
}