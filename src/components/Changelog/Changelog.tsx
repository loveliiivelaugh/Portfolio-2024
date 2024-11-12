import { useQuery } from "@tanstack/react-query"
import { Box, Container, Divider, Grid, List, ListItem, ListItemText, Typography } from "@mui/material";
import moment from "moment";

import MarkdownWrapper from "../Layout/Markdown";
import { queries } from "../../utilities/config/api"


// Move to back end CMS
const netlifyBadges = {
    "familyApps": `[![Netlify Status](https://api.netlify.com/api/v1/badges/1edf639c-503b-483c-ae7c-8518dcb9db10/deploy-status)](https://app.netlify.com/sites/familyapps2/deploys)`,
    "homeServer": `Deployed on Render`,
    "openFitness": `[![Netlify Status](https://api.netlify.com/api/v1/badges/17584298-1ea6-4693-88ca-dcc04f60f1be/deploy-status)](https://app.netlify.com/sites/openfitness/deploys)`,
    "aiChat": `[![Netlify Status](https://api.netlify.com/api/v1/badges/e66cd036-f62c-4452-9344-4441af1cd6f4/deploy-status)](https://app.netlify.com/sites/woodwardchat/deploys)`,
    "smartCamera": `[![Netlify Status](https://api.netlify.com/api/v1/badges/b5eb9323-f7ec-483d-a349-f0b257f5e550/deploy-status)](https://app.netlify.com/sites/smarticamera/deploys)`
}

const Changelog = () => {
    const githubQuery = useQuery(queries.githubQuery);
    console.log(githubQuery)
    return (
        <Container>
            {({
                pending: "Uninitialized...",
                loading: "Loading Changelog...",
                success: githubQuery.data && (
                    <Grid container>
                        <Grid item xs={12}>
                            {Object
                                .keys(githubQuery.data.commits)
                                .map((projectName, index) => (
                                    <Grid item xs={12} key={index} mt={10}>
                                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                            <Typography variant="h6" mt={2} color="secondary">{projectName}</Typography>
                                            <MarkdownWrapper>
                                                {netlifyBadges[projectName as keyof typeof netlifyBadges]}
                                            </MarkdownWrapper>
                                        </Box>
                                        <Divider />
                                        <List>
                                            {githubQuery.data.commits[projectName]
                                                .map((commitData: any, index: number) => (
                                                    <ListItem key={index}>
                                                        <ListItemText 
                                                            primary={commitData.commit.message} 
                                                            secondary={moment(commitData.commit.author.date).format("MMMM Do YYYY, h:mm:ss a")}
                                                        />
                                                    </ListItem>
                                            ))}
                                        </List>
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </Grid>
                ),
                error: "Something went wrong..."
            }[githubQuery.status])}
        </Container>
    )
}

export default Changelog