import { ThemeProvider } from "@emotion/react"
import { 
    Avatar, Box, Button, Card, CardContent, Chip, CircularProgress, 
    Container, CssBaseline, Grid2 as Grid, ListItem, ListItemIcon, 
    ListItemText, Stack, Toolbar, Tooltip, Typography, createTheme
} from "@mui/material";
import { ThemeToggleButton } from "@theme/ThemeProvider";
import SocialBar from "@components/custom/SocialBar/SocialBar";
// import ShowcaseLinks from "@components/custom/ShowcaseLinks/ShowcaseLinks";
import useUtilityStore from "@store/utilityStore";
import headshotCropped from "@assets/headshot-cropped.png";
// import { useQuery } from "@tanstack/react-query";
// import { queries } from "@config/api";
import { ExperienceSection } from "@components/custom/AccordianListItem/AccordianListItem";
// import FadeIn from "@theme/FadeIn";
import ProjectCard from "./Portfolio/ProjectCard";
import { cms } from "@config/../data/cms";
import SlideIn from "@theme/animations/SlideIn";
// import { useNavigate } from "react-router-dom";


// import northwesternLogo from "@assets/northwestern-logo.png";
// import discoverLogo from "@assets/discover-logo.webp";
// import spectrumLogo from "@assets/spectrum_logo.webp";
// import medproLogo from "@assets/medpro-logo.svg";

// TODO: New Reusable Component
// *QueryWrapper family
const getData = (query: any, dataTarget: string, onSuccess: (data: any) => JSX.Element) => {
    if (query.isLoading) return <CircularProgress />;
    if (!query.isSuccess || !query.data) return null;

    const properties = dataTarget.split('.');
    let returnData = query.data;
    
    for (const prop of properties) {
        if (!returnData) return null; // if undefined/null, exit early
        returnData = returnData[prop];
    }

    return onSuccess(returnData);
};

const Home = () => {
    const { colorMode } = useUtilityStore();
    // const navigate = useNavigate();
    // const appConfigQuery = useQuery(queries.query("/api/v1/appConfig"));
    // *mock config query for prod for now
    const appConfigQuery = {
        data: { cms },
        isLoading: false,
        isSuccess: true
    };

    let isMobile = false;
    let hidePricing = true;

    return (
        <ThemeProvider theme={createTheme({ palette: { mode: colorMode }})}>
            <CssBaseline />
            <Container maxWidth="md">

                <Grid 
                    container 
                    p={4} 
                    spacing={2} 
                    sx={{ 
                        maxWidth: "100vw", 
                        border: `1px solid ${colorMode === "dark" ? "white" : "black"}`, 
                        borderRadius: "24px",
                        mb: 4
                    }}
                >
                    
                    <Grid size={12}>
                        <Toolbar sx={{ justifyContent: "end" }}>
                            <ThemeToggleButton />
                        </Toolbar>
                    </Grid>

                    <Grid size={{ sm: 12, md: 8 }}>
                        <SlideIn>
                            <Typography variant="h2">Michael Woodward</Typography>
                            <span style={{ display: "flex" }}>
                                <Typography variant="h4">Web Developer</Typography>
                                <Chip label={<i>est. 2020</i>} />
                            </span>
                            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                                JavaScript · TypeScript · React · Node · GraphQL
                            </Typography>
                            {/* <Stack direction={"row"} sx={{ gap: 2 }}>
                                <Link to="/portfolio">Portfolio</Link>
                                <Link to="/portfolio">Resume</Link>
                                <Link to="https://github.com/loveliiivelaugh" target="_blank">Github</Link>
                                <Link to="https://www.linkedin.com/in/michaelanthonywoodward" target="_blank">LinkedIn</Link>
                            </Stack> */}
                            <Typography variant="h6">
                                Applications Engineer <span style={{ color: "#999" }}>@</span> <a href="" style={{ textDecoration: "none", color: "orange" }}>Discover Financial Services</a>
                            </Typography>
                            <Typography variant="h6">Based in Chicago, Illinois, USA</Typography>
                            {/* <DateTimeLabel /> */}
                            <SocialBar />
                            <Box sx={{ display: "flex", justifyContent: "end", gap: 2, px: 4 }}>
                                <Button variant="outlined">View Resume</Button>
                                <Button variant="contained" component="a" href="https://michaelwoodward-blog.netlify.app" target="_blank">
                                    Read Blog
                                </Button>
                            </Box>
                        </SlideIn>
                    </Grid>

                    <Grid size={{ sm: 12, md: 4 }}>
                        <SlideIn>
                            <Box sx={{ textAlign: "center", mx: "auto" }}>
                                <Avatar src={headshotCropped} sx={{ width: 200, height: 200 }} />
                            </Box>
                            <Typography variant="subtitle2" mt={2} p={1} mr={2} textAlign="left">
                                <i>"I offer web development consultation and build tailored software solutions that help small busineses solve big problems."</i>
                            </Typography>
                        </SlideIn>
                    </Grid>

                    <Grid size={12}>
                        <SlideIn>
                            <Typography variant="h2">Showcase</Typography>
                            <Grid container spacing={2} p={2}>
                                {getData(appConfigQuery, "cms.showcase", (data: any) => data.map((project: {
                                        name: string;
                                        description: string;
                                        thumb: string;
                                        live: string;
                                    }) => (
                                    <Grid size={{ sm: 12, md: 6 }}>
                                        <ProjectCard
                                            title={project.name}
                                            description={project.description}
                                            imageUrl={project.thumb || "https://picsum.photos/400"}
                                            tech={['React', 'Supabase', 'Zustand', 'Framer Motion']}
                                            link={project.live}
                                        />
                                    </Grid>
                                )))}
                            </Grid>
                        </SlideIn>
                    </Grid>
                    
                    <Grid size={12}>
                        <SlideIn>
                            <Typography variant="h4">Documentation</Typography>
                            <Stack direction="row" justifyContent="start">
                                {getData(appConfigQuery, "cms.docs", (data: any) => data.map((document: {
                                    name: string;
                                    description: string;
                                    link: string;
                                }, index: number) => (
                                    <ListItem key={index}>
                                        <ListItemText  
                                            primary={<a href={document.link} target="_blank">{document.name}</a>}
                                            secondary={document.description ?? "Woodward-Studio Application Framework Documentation"}
                                        />
                                        <ListItemIcon>

                                        </ListItemIcon>
                                    </ListItem>
                                )))}
                            </Stack>
                        </SlideIn>
                    </Grid>

                    {/* Experience */}
                    <Grid size={12}>
                        <SlideIn>
                            <Typography variant="h4" gutterBottom>Experience</Typography>
                            <ExperienceSection />
                        </SlideIn>
                    </Grid>

                    {/* Pricing */}
                    {!hidePricing && (
                        <Grid size={12}>
                            <SlideIn>
                                <Typography variant="h4" gutterBottom>Pricing</Typography>
                                <Grid container spacing={2}>
                                    {[
                                        { label: "Small/Simple", cost: "up to $500" },
                                        { label: "Medium", cost: "up to $5,000" },
                                        { label: "Complex", cost: "starting at $5,000" },
                                        { label: "Custom", cost: "Call for Pricing ($75/hr)" },
                                        { label: "AI", cost: "Call for Pricing ($100/hr)" },
                                        { label: "Automation", cost: "Call for Pricing ($50/hr)" },
                                    ].map((item, idx) => (
                                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={idx}>
                                            <Card>
                                                <CardContent>
                                                    <Typography variant="h6">{item.label}</Typography>
                                                    <Typography>{item.cost}</Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>
                            </SlideIn>
                        </Grid>
                    )}

                    {/* Services */}
                    <Grid size={12}>
                        <SlideIn>
                            <Typography variant="h4" gutterBottom>Services</Typography>
                            <Stack direction="row" flexWrap="wrap" gap={1}>
                                {[
                                    "Application Development", "Web Development", "WordPress", "CMS", "AI", "Hosting", "Data Storage",
                                    "API Development", "Database Management", "Server Admin", "Full Stack Dev",
                                    "Web Services", "SEO"
                                ].map((service, idx) => (
                                    <Chip key={idx} label={service} />
                                ))}
                            </Stack>
                        </SlideIn>
                    </Grid>

                    {/* Contact */}
                    <Grid size={12}>
                        <SlideIn>
                            <Typography variant="h4" gutterBottom>Let’s Build Something</Typography>
                            <Stack direction={isMobile ? "column" : "row"} gap={2} alignItems="center">
                                <Tooltip title="Click to copy">
                                    <Button variant="outlined" onClick={() => navigator.clipboard.writeText("woodward.business@gmail.com")}>
                                        woodward.business@gmail.com
                                    </Button>
                                </Tooltip>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    component="a"
                                    href="https://calendly.com"
                                    target="_blank"
                                >
                                    Book a Free Consultation
                                </Button>
                            </Stack>
                            <SocialBar />
                        </SlideIn>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    )
}

export default Home