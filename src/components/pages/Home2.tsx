// Home.tsx

import {
    Avatar,
    Card,
    CardContent,
    Chip,
    Container,
    CssBaseline,
    Grid2 as Grid,
    ListItemText,
    Stack,
    Tooltip,
    Typography,
    Paper,
    Button,
    useTheme,
    useMediaQuery,
    createTheme,
    ThemeProvider,
} from "@mui/material";
import { Link } from "react-router-dom";
import { ThemeToggleButton } from "@theme/ThemeProvider";
import RadarChartComponent from "@components/custom/charts/Radar";
import SocialBar from "@components/custom/SocialBar/SocialBar";
import useUtilityStore from "@store/utilityStore";
import headshotCropped from "@assets/headshot-cropped.png";
import { useQuery } from "@tanstack/react-query";
import { queries } from "@config/api";
import { ExperienceSection } from "@components/custom/AccordianListItem/AccordianListItem";
import FadeIn from "@theme/FadeIn";
import ProjectCard from "./Portfolio/ProjectCard";

const Home = () => {
    const { colorMode } = useUtilityStore();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const appConfigQuery = useQuery(queries.query("/api/v1/appConfig"));

    const docs = appConfigQuery?.data?.cms?.docs || [];
    const showcase = appConfigQuery?.data?.cms?.showcase || [];
    const experience = appConfigQuery?.data?.cms?.workExperience || [];

    return (
        <ThemeProvider theme={createTheme({ palette: { mode: colorMode } })}>
            <CssBaseline />
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
                    <Grid container spacing={4}>
                        <Grid size={12} textAlign="right">
                            <ThemeToggleButton />
                        </Grid>

                        {/* Header & Intro */}
                        <Grid size={{ xs: 12, md: 8 }}>
                            <FadeIn>
                                <Typography variant="h2" fontWeight="bold">Michael Woodward</Typography>
                                <Typography variant="h5" sx={{ mb: 1 }}>
                                    Web Developer <Chip label="est. 2020" sx={{ ml: 1 }} />
                                </Typography>
                                <Typography variant="subtitle1">
                                    Applications Engineer @{" "}
                                    <a href="https://www.discover.com" target="_blank" rel="noreferrer">
                                        Discover Financial Services
                                    </a>
                                </Typography>
                                <Typography variant="body1" sx={{ mt: 1 }}>
                                    JavaScript · TypeScript · React · Node.js · GraphQL
                                </Typography>

                                <Stack direction="row" spacing={2} mt={2} flexWrap="wrap">
                                    <Link to="/portfolio">Portfolio</Link>
                                    <Link to="/portfolio">Resume</Link>
                                    <a href="https://github.com/loveliiivelaugh" target="_blank">GitHub</a>
                                    <a href="https://www.linkedin.com/in/michaelanthonywoodward" target="_blank">LinkedIn</a>
                                </Stack>

                                <Typography variant="subtitle2" mt={2}>
                                    Based in Chicago, Illinois, USA
                                </Typography>
                            </FadeIn>
                        </Grid>

                        <Grid size={{ xs: 12, md: 4 }} textAlign="center">
                            <Avatar src={headshotCropped} sx={{ width: 200, height: 200, mx: "auto" }} />
                            <RadarChartComponent />
                        </Grid>

                        {/* Documentation */}
                        {docs.length > 0 && (
                            <Grid size={12}>
                                <Typography variant="h4" gutterBottom>Documentation</Typography>
                                <Stack>
                                    {docs.map((doc: any, idx: number) => (
                                        <ListItemText
                                            key={idx}
                                            primary={<a href={doc.link} target="_blank">{doc.name}</a>}
                                        />
                                    ))}
                                </Stack>
                            </Grid>
                        )}

                        {/* Showcase Projects */}
                        <Grid size={12}>
                            <Typography variant="h4" gutterBottom>Showcase</Typography>
                            <Grid container spacing={2}>
                                {showcase.map((project: any, idx: number) => (
                                    <Grid size={{ xs: 12, sm: 6 }} key={idx}>
                                        <ProjectCard
                                            title={project.name}
                                            description={project.description}
                                            imageUrl={project.thumb || "https://picsum.photos/400"}
                                            tech={['React', 'Supabase', 'Zustand', 'Framer Motion']}
                                            link={project.live}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>

                        {/* Experience */}
                        <Grid size={12}>
                            <Typography variant="h4" gutterBottom>Experience</Typography>
                            <ExperienceSection experienceData={experience} />
                        </Grid>

                        {/* Pricing */}
                        <Grid size={12}>
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
                        </Grid>

                        {/* Services */}
                        <Grid size={12}>
                            <Typography variant="h4" gutterBottom>Services</Typography>
                            <Stack direction="row" flexWrap="wrap" gap={1}>
                                {[
                                    "Application Development", "WordPress", "CMS", "AI", "Hosting", "Data Storage",
                                    "API Development", "Database Management", "Server Admin", "Full Stack Dev",
                                    "Web Services", "SEO"
                                ].map((service, idx) => (
                                    <Chip key={idx} label={service} />
                                ))}
                            </Stack>
                        </Grid>

                        {/* Contact */}
                        <Grid size={12}>
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
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </ThemeProvider>
    );
};

export default Home;
