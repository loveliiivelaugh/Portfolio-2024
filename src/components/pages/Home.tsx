import { Link } from "react-router-dom"
import { ThemeProvider } from "@emotion/react"
import { Avatar, Chip, CssBaseline, Grid2 as Grid, List, ListItem, ListItemText, Stack, Toolbar, Typography, createTheme } from "@mui/material"
import { ThemeToggleButton } from "@theme/ThemeProvider";
import useUtilityStore from "@store/utilityStore";
import RadarChartComponent from "@components/custom/charts/Radar";
import headshotCropped from "@assets/headshot-cropped.png";
// import northwesternLogo from "@assets/northwestern-logo.png";
// import discoverLogo from "@assets/discover-logo.webp";
// import spectrumLogo from "@assets/spectrum_logo.webp";
// import medproLogo from "@assets/medpro-logo.svg";

const Home = () => {
    const { colorMode } = useUtilityStore();
    return (
        <ThemeProvider theme={createTheme({ palette: { mode: colorMode }})}>
            <CssBaseline />
            <Grid container sx={{ height: "100%" }}>
                <Grid size={12} sx={{}}>
                    <Toolbar sx={{ justifyContent: "end" }}>
                        <ThemeToggleButton />
                    </Toolbar>
                </Grid>
                <Grid size={8}>
                    <Typography variant="h2">Michael Woodward</Typography>
                    <span style={{ display: "flex" }}>
                        <Typography variant="h4">Software Engineer</Typography>
                        <Chip label={<i> 4+ years</i>} />
                    </span>
                    <Typography variant="h6">Applications Engineer @ <a href="">Discover Financial Services</a></Typography>
                    <Typography variant="body1">JavaScript · TypeScript · React · Node · GraphQL</Typography>
                    <Stack direction={"row"} sx={{ gap: 2 }}>
                        <Link to="/portfolio">Portfolio</Link>
                        <Link to="/portfolio">Resume</Link>
                        <Link to="https://github.com/loveliiivelaugh" target="_blank">Github</Link>
                        <Link to="https://www.linkedin.com/in/michaelanthonywoodward" target="_blank">LinkedIn</Link>
                    </Stack>
                    <Stack sx={{ gap: 2 }}>
                        <List>
                            <ListItem>
                                {/* <ListItemAvatar>
                                    <img src={discoverLogo} style={{ height: 50, width: 50, borderRadius: "60px" }} />
                                </ListItemAvatar> */}
                                <ListItemText 
                                    primary={<Typography variant="h5">Discover Financial Services</Typography>}
                                    secondary={<Typography variant="body1">Applications Engineer</Typography>}
                                />
                                <ListItemText 
                                    secondary={<Typography variant="body1">7 months and counting</Typography>}
                                />
                            </ListItem>
                            <ListItem>
                                {/* <ListItemAvatar>
                                    <img src={spectrumLogo} style={{ height: 50, width: 50, borderRadius: "60px" }} />
                                </ListItemAvatar> */}
                                <ListItemText
                                    primary={<Typography variant="h5">Spectrum</Typography>}
                                    secondary={<Typography variant="body1">JavaScript Developer II</Typography>}
                                />
                                <ListItemText
                                    secondary={<Typography variant="body1">2 years 6 months</Typography>}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText 
                                    primary={<Typography variant="h5">3vue</Typography>}
                                    secondary={<Typography variant="body1">Frontend Developer</Typography>}
                                />
                                <ListItemText 
                                    secondary={<Typography variant="body1">1 year</Typography>}
                                />
                            </ListItem>
                            <ListItem>
                                {/* <ListItemAvatar>
                                    <img src={northwesternLogo} style={{ height: 50, width: 50, borderRadius: "60px" }} />
                                </ListItemAvatar> */}
                                <ListItemText 
                                    primary={<Typography variant="h5" style={{ color: "lightblue" }}>Northwestern</Typography>}
                                    secondary={<Typography variant="body1">Full Stack Coding Bootcamp</Typography>}
                                />
                                <ListItemText 
                                    secondary={<Typography variant="body1">3 months</Typography>}
                                />
                            </ListItem>
                            <ListItem>
                                {/* <ListItemAvatar>
                                    <img src={medproLogo} style={{ height: 50, width: 50, borderRadius: "60px" }} />
                                </ListItemAvatar> */}
                                <ListItemText
                                    primary={<Typography variant="h5">MedPro</Typography>}
                                    secondary={<Typography variant="body1">Salesforce Administrator</Typography>}
                                />
                                <ListItemText 
                                    secondary={<Typography variant="body1">6 months</Typography>}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText 
                                    primary={<Typography variant="h5">Restaurants</Typography>}
                                    secondary={<Typography variant="body1">Bartender / Server</Typography>}
                                />
                                <ListItemText 
                                    secondary={<Typography variant="body1">10 years</Typography>}
                                />
                            </ListItem>
                        </List>
                    </Stack>
                </Grid>
                <Grid size={4}>
                    <Avatar src={headshotCropped} sx={{ width: 200, height: 200 }} />
                    <RadarChartComponent />
                </Grid>
            </Grid>
        </ThemeProvider>
    )
}

export default Home