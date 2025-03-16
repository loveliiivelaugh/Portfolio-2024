import React from "react";
import {
    Container,
    Typography,
    Card,
    CardContent,
    Grid,
    List,
    ListItem,
    ListItemText,
    Divider,
    Avatar,
    Box,
    Chip,
    Link,
} from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import ComputerIcon from "@mui/icons-material/Computer";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";

const Resume: React.FC = () => {
    return (
        <Container maxWidth="md" sx={{ my: 4 }}>
            {/* Header Section */}
            <Card sx={{ borderRadius: 3, mb: 3, boxShadow: 2 }}>
                <CardContent>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <Avatar sx={{ width: 100, height: 100 }}>
                                <ComputerIcon fontSize="large" />
                            </Avatar>
                        </Grid>
                        <Grid item xs>
                            <Typography variant="h4" fontWeight="bold">
                                Michael Woodward
                            </Typography>
                            <Typography variant="body1" color="textSecondary">
                                Full Stack Web Developer | React Specialist
                            </Typography>
                            <Box mt={1}>
                                <Chip icon={<LocationOnIcon />} label="Chicago, Illinois, USA" sx={{ mr: 1 }} />
                                <Chip icon={<PhoneIcon />} label="(555) 555 - 5555" sx={{ mr: 1 }} />
                                <Chip icon={<EmailIcon />} label="jobs.woodward@gmail.com" />
                            </Box>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            {/* Experience Section */}
            <Card sx={{ borderRadius: 3, mb: 3, boxShadow: 2 }}>
                <CardContent>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        <WorkIcon sx={{ verticalAlign: "middle", mr: 1 }} /> Experience
                    </Typography>
                    <Divider sx={{ mb: 2 }} />

                    {[
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
                        },
                    ].map((job, index) => (
                        <Box key={index} mb={2}>
                            <Typography variant="h6" fontWeight="bold">
                                {job.company}
                            </Typography>
                            <Typography variant="subtitle1" color="primary">
                                {job.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {job.period}
                            </Typography>
                            <List>
                                {job.details.map((point, i) => (
                                    <ListItem key={i} sx={{ pl: 0 }}>
                                        <ListItemText primary={`• ${point}`} />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    ))}
                </CardContent>
            </Card>

            {/* Skills Section */}
            <Card sx={{ borderRadius: 3, mb: 3, boxShadow: 2 }}>
                <CardContent>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        <ComputerIcon sx={{ verticalAlign: "middle", mr: 1 }} /> Skills
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                        {[
                            "HTML", "CSS", "SASS", "React", "JavaScript", "TypeScript", "Redux", "Zustand",
                            "Angular", "Node.js", "Express", "GraphQL", "PostgreSQL", "MongoDB", "AWS",
                            "Docker", "Git", "Jira", "Microservices", "Unit Testing",
                        ].map((skill, index) => (
                            <Chip key={index} label={skill} color="primary" variant="outlined" />
                        ))}
                    </Box>
                </CardContent>
            </Card>

            {/* Education Section */}
            <Card sx={{ borderRadius: 3, mb: 3, boxShadow: 2 }}>
                <CardContent>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        <SchoolIcon sx={{ verticalAlign: "middle", mr: 1 }} /> Education
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Typography variant="h6" fontWeight="bold">
                        Northwestern University, Chicago, Illinois
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Full Stack Coding Certificate (March 2021 - June 2021)
                    </Typography>
                </CardContent>
            </Card>

            {/* Social Links */}
            <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
                <CardContent>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        🌐 Social Profiles
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Box>
                        <Link href="https://www.linkedin.com/in/michaelanthonywoodward" target="_blank" sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                            <LinkedInIcon sx={{ mr: 1 }} color="primary" /> LinkedIn Profile
                        </Link>
                        <Link href="https://trailblazer.me/id/michaelawoodward" target="_blank" sx={{ display: "flex", alignItems: "center" }}>
                            🏆 Trailblazer Profile (112 Badges)
                        </Link>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
};

export default Resume;
