import { Link } from "react-router-dom"
import { ThemeProvider } from "@emotion/react"
import { Avatar, Box, Card, CardContent, CardMedia, Chip, Container, CssBaseline, Grid2 as Grid, List, ListItemText, Stack, Toolbar, Tooltip, Typography, createTheme } from "@mui/material";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ThemeToggleButton } from "@theme/ThemeProvider";
import RadarChartComponent from "@components/custom/charts/Radar";
import SocialBar from "@components/custom/SocialBar/SocialBar";
import ShowcaseLinks from "@components/custom/ShowcaseLinks/ShowcaseLinks";
import useUtilityStore from "@store/utilityStore";
import headshotCropped from "@assets/headshot-cropped.png";
import { useQuery } from "@tanstack/react-query";
import { queries } from "@config/api";

// import northwesternLogo from "@assets/northwestern-logo.png";
// import discoverLogo from "@assets/discover-logo.webp";
// import spectrumLogo from "@assets/spectrum_logo.webp";
// import medproLogo from "@assets/medpro-logo.svg";
const experienceData = [
    {
        company: "Discover Financial Services, Illinois",
        title: "Application Engineer",
        period: "September 2024 - Current",
        details: [
            "Develop features using TypeScript, React, Redux, GraphQL, and Vitest.",
            "Implement microfrontend and microservices architecture.",
            "Write testable, high-quality code with 90%+ coverage w/React-Testing-Library, Jest, and Vitest.",
            "Participate in agile development, daily standups, and code reviews.",
            "Provide mentorship to junior engineers.",
            "Adhere to CI/CD Code Quality checks.",
        ],
    },
    {
        company: "Charter Communications, Austin, Texas",
        title: "JavaScript Developer",
        period: "June 2022 - September 2024",
        details: [
            "Develop enterprise applications automating field technician processes.",
            "Build seamless UI/UX using React.",
            "Convert Python to JavaScript and develop backend services with Node.js.",
            "Implement user validation rules to ensure data integrity.",
        ],
    },
    {
        company: "3vue, Woodridge, Illinois",
        title: "Front End React Web Developer",
        period: "July 2021 - April 2022",
        details: [
            "Develop business intelligence applications for health and life sciences.",
            "Integrate data visualizations using the QlikSense API.",
            "Create a reusable design system improving development speed and consistency.",
        ],
    }
];

const Home = () => {
    const { colorMode } = useUtilityStore();
    const appConfigQuery = useQuery(queries.query("/api/v1/appConfig"));
    console.log("APPCONFIG QUERY: ", appConfigQuery)
    return (
        <ThemeProvider theme={createTheme({ palette: { mode: colorMode }})}>
            <CssBaseline />
            <Grid container p={4}>
            <Container maxWidth="md">
            <Grid container p={4} sx={{ border: `1px solid ${colorMode === "dark" ? "white" : "black"}`, borderRadius: "24px" }}>
                <Grid size={12}>
                    <Toolbar sx={{ justifyContent: "end" }}>
                        <ThemeToggleButton />
                    </Toolbar>
                </Grid>
                <Grid size={8}>
                    {/* <Typography variant="h2" sx={{ fontSize: "102px", fontWeight: "700" }}>Michael Woodward</Typography> */}
                    <Typography variant="h2">Michael Woodward</Typography>
                    <span style={{ display: "flex" }}>
                        <Typography variant="h4">Web Developer</Typography>
                        <Chip label={<i>est. 2020</i>} />
                    </span>
                    <Typography variant="h6">Applications Engineer @ <a href="">Discover Financial Services</a></Typography>
                    <Typography variant="body1">JavaScript · TypeScript · React · Node · GraphQL</Typography>
                    <Stack direction={"row"} sx={{ gap: 2 }}>
                        <Link to="/portfolio">Portfolio</Link>
                        <Link to="/portfolio">Resume</Link>
                        <Link to="https://github.com/loveliiivelaugh" target="_blank">Github</Link>
                        <Link to="https://www.linkedin.com/in/michaelanthonywoodward" target="_blank">LinkedIn</Link>
                    </Stack>
                    <Typography variant="h6">Based in Chicago, Illinois, USA</Typography>
                    {/* <DateTimeLabel /> */}
                    <Stack>
                        <Typography variant="h4">Documentation</Typography>
                        Docusaurus
                        Storybook
                        Swagger
                    </Stack>
                </Grid>
                <Grid size={4}>
                    <Box sx={{ textAlign: "center", mx: "auto" }}>
                        <Avatar src={headshotCropped} sx={{ width: 200, height: 200 }} />
                        <RadarChartComponent />
                    </Box>
                </Grid>
                <Grid size={12}>
                    <Typography variant="h2">Showcase</Typography>
                    <Grid container spacing={2} p={2}>
                        {appConfigQuery.isLoading 
                            ? <></>
                            : appConfigQuery.data.cms.showcase.map((project: {
                                name: string;
                                github: string;
                                live: string;
                            }) => (
                            <Grid size={6}>
                                <Card sx={{ height: 360, width: 360 }}>
                                    <CardContent>
                                        <Typography variant="body1">{project.name}</Typography>
                                    </CardContent>
                                    <CardMedia sx={{ height: "30%" }}>
                                        <img src="" style={{ height: "100%", width: 100 }} />
                                    </CardMedia>
                                    <Box px={1}>
                                        <ShowcaseLinks github={project.github} liveDemo={project.live} />
                                    </Box>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <Stack sx={{ gap: 2 }}>
                        <Typography variant="h2">Experience</Typography>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <ListItemText 
                                    primary={<Typography variant="h5">Discover Financial Services</Typography>}
                                    secondary={<Typography variant="body1"><b>Applications Engineer</b> · <i>7 months (current)</i></Typography>}
                                />
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="h6">{experienceData[0].period}</Typography>
                                <List>
                                    {experienceData[0].details.map((detail) => <ListItemText primary={detail} />)}
                                </List>
                                <Stack direction={"row"} sx={{ gap: 2 }}>
                                    <Link to={""}>Company Site</Link>
                                    <Link to={""}>LinkedIn</Link>
                                </Stack>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <ListItemText
                                    primary={<Typography variant="h5">Spectrum</Typography>}
                                    secondary={<Typography variant="body1">JavaScript Developer II · 2 years 6 months</Typography>}
                                />
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="h6">{experienceData[1].period}</Typography>
                                <List>
                                    {experienceData[1].details.map((detail) => <ListItemText primary={detail} />)}
                                </List>
                                <Stack direction={"row"} sx={{ gap: 2 }}>
                                    <Link to={""}>Company Site</Link>
                                    <Link to={""}>LinkedIn</Link>
                                </Stack>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <ListItemText 
                                    primary={<Typography variant="h5">3vue</Typography>}
                                    secondary={<Typography variant="body1">Frontend Developer · 9 months</Typography>}
                                />
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="h6">{experienceData[2].period}</Typography>
                                <List>
                                    {experienceData[2].details.map((detail) => <ListItemText primary={detail} />)}
                                </List>
                                <Stack direction={"row"} sx={{ gap: 2 }}>
                                    <Link to={""}>Company Site</Link>
                                    <Link to={""}>LinkedIn</Link>
                                </Stack>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <ListItemText 
                                    primary={<Typography variant="h5" style={{ color: "lightblue" }}>Northwestern University</Typography>}
                                    secondary={<Typography variant="body1">Full Stack Coding Bootcamp · 3 months</Typography>}
                                />
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="h6">{experienceData[2].period}</Typography>
                                <List>
                                    {experienceData[2].details.map((detail) => <ListItemText primary={detail} />)}
                                </List>
                                <Stack direction={"row"} sx={{ gap: 2 }}>
                                    <Link to={""}>Company Site</Link>
                                    <Link to={""}>LinkedIn</Link>
                                </Stack>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <ListItemText
                                    primary={<Typography variant="h5">MedPro</Typography>}
                                    secondary={<Typography variant="body1">Salesforce Administrator · 6 months</Typography>}
                                />
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="h6">{experienceData[2].period}</Typography>
                                <List>
                                    {experienceData[2].details.map((detail) => <ListItemText primary={detail} />)}
                                </List>
                                <Stack direction={"row"} sx={{ gap: 2 }}>
                                    <Link to={""}>Company Site</Link>
                                    <Link to={""}>LinkedIn</Link>
                                </Stack>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <ListItemText 
                                    primary={<Typography variant="h5">Restaurants</Typography>}
                                    secondary={<Typography variant="body1">Bartender / Server · 10 years</Typography>}
                                />
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="h6">{experienceData[2].period}</Typography>
                                <List>
                                    {experienceData[2].details.map((detail) => <ListItemText primary={detail} />)}
                                </List>
                            </AccordionDetails>
                        </Accordion>

                    </Stack>

                    <Stack>
                        <Typography variant="h2">Pricing</Typography>
                        <Grid container spacing={2} p={2}>
                            {[
                                <ListItemText primary="Small/Simple" secondary="up to $500" />,
                                <ListItemText primary="Medium" secondary="up to $5000" />,
                                <ListItemText primary="Complex" secondary="starting at $5000" />,
                                <ListItemText primary="Custom" secondary="Call for Pricing (est $75/hr)" />,
                                <ListItemText primary="AI" secondary="Call for Pricing (est $100/hr)" />,
                                <ListItemText primary="Automation" secondary="Call for Pricing (est $50/hr)" />
                            ].map((project) => (
                                <Grid size={3}>
                                    <Card sx={{ height: 200, width: 200 }}>
                                        <CardContent>
                                            <Typography variant="body1">{project}</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Stack>

                    <Typography variant="h2">Services</Typography>
                    <Stack direction="row" px={2} gap={1}>
                        {[
                            "Application Development", "Wordpress", "CMS", "AI", "Hosting", "Data Storage",
                            "API's", "Database Management", "Server Administration", "Full Stack Software Engineering",
                            "Web Services", "SEO"
                        ].map((offering) => <Chip label={offering} />)}
                    </Stack>
                    <Toolbar />
                    <Typography variant="h2">Contact</Typography>
                    <Stack direction="row" px={2} gap={1}>
                        <Tooltip title="Click to Copy"><a>woodward.business@gmail.com</a></Tooltip> · <Link to="https://calendly.com" target="_blank">Book a Call</Link>
                    </Stack>
                    <SocialBar />
                </Grid>

                <Toolbar />
            </Grid>
            </Container>
            </Grid>
        </ThemeProvider>
    )
}

export default Home