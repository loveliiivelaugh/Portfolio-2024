import React from "react";
import { Box, Typography, Avatar, Button, Grid2 as Grid, Card, CardMedia, CardContent } from "@mui/material";
import { Divider, List, ListItem, ListItemText } from '@mui/material';
import { motion } from "framer-motion";

// Motion Variants
const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const projects = [
    {
        title: "Brandify",
        description: "Agency Website",
        image: "https://via.placeholder.com/300x200", // Replace with actual image
    },
    {
        title: "Shiro",
        description: "Personal Portfolio",
        image: "https://via.placeholder.com/300x200",
    },
    {
        title: "Vivid",
        description: "App Showcase",
        image: "https://via.placeholder.com/300x200",
    },
    {
        title: "Capture",
        description: "Video Agency",
        image: "https://via.placeholder.com/300x200",
    },
];

const Portfolio: React.FC = () => {
    return (
        <Box sx={{ maxWidth: 900, mx: "auto", p: 3, color: "white", backgroundColor: "#121212" }}>
            {/* About Section */}
            <motion.div initial="hidden" animate="visible" variants={fadeIn}>
                <Box display="flex" alignItems="center" mb={3}>
                    <Avatar
                        src="https://via.placeholder.com/100" // Replace with actual image
                        sx={{ width: 80, height: 80, mr: 2 }}
                    />
                    <Box>
                        <Typography variant="h5" fontWeight="bold">John Smith</Typography>
                        <Typography variant="subtitle1" color="gray">Web Designer - New York, US</Typography>
                        <Typography variant="body2" color="lightgreen">🟢 Available for work</Typography>
                    </Box>
                </Box>

                <Typography variant="h6" gutterBottom>About Me</Typography>
                <Typography variant="body1" color="gray">
                    Hello, I'm John Smith, a web designer with 15 years of expertise in crafting visually stunning and
                    user-friendly digital experiences. My journey in web design began with curiosity about how websites
                    work and a desire to create something meaningful on the digital canvas.
                </Typography>

                <Box mt={2}>
                    <Button variant="contained" color="primary" sx={{ mr: 1 }}>Download CV</Button>
                    <Button variant="outlined" color="primary">Get Template</Button>
                </Box>
            </motion.div>

            {/* Projects Section */}
            <motion.div initial="hidden" animate="visible" variants={fadeIn} style={{ marginTop: "2rem" }}>
                <Typography variant="h6" gutterBottom>Some of my projects</Typography>

                <Grid container spacing={2}>
                    {projects.map((project, index) => (
                        <Grid size={{ xs: 12, sm: 6 }} key={index}>
                            <Card sx={{ backgroundColor: "#1E1E1E" }}>
                                <CardMedia component="img" height="140" image={project.image} alt={project.title} />
                                <CardContent>
                                    <Typography variant="h6" color="white">{project.title}</Typography>
                                    <Typography variant="body2" color="gray">{project.description}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </motion.div>

            <Experience />

        </Box>
    );
};

export default Portfolio;

// Experience Data
const experiences = [
    {
        location: "San Francisco, CA",
        company: "Digital Innovations Agency",
        role: "Senior Web Designer",
        period: "Jan 2019 – Present",
        responsibilities: [
            "Led the redesign of high-traffic websites, resulting in a 30% increase in user engagement.",
            "Managed a team of junior designers, providing mentorship and overseeing project timelines.",
            "Collaborated with cross-functional teams to develop innovative design solutions for diverse clients.",
            "Implemented responsive design principles to ensure optimal performance across all devices.",
        ],
    },
    {
        location: "Los Angeles, CA",
        company: "Creative Solutions Studio",
        role: "Web Designer",
        period: "Jun 2013 – Dec 2018",
        responsibilities: [
            "Designed and developed over 50 custom websites for small to medium-sized businesses.",
            "Conducted usability testing and user research to enhance site functionality and user satisfaction.",
            "Created wireframes, mockups, and prototypes to communicate design concepts effectively.",
            "Utilized HTML, CSS, and JavaScript to bring design visions to life.",
        ],
    },
    {
        location: "Austin, TX",
        company: "TechWave LLC",
        role: "Front-End Developer / Designer",
        period: "Apr 2008 – May 2013",
        responsibilities: [
            "Developed and maintained the front-end of e-commerce websites, improving site speed by 20%.",
            "Worked closely with back-end developers to integrate APIs and enhance site capabilities.",
            "Ensured websites met accessibility standards and were SEO optimized.",
            "Created visual design assets and graphics for online marketing campaigns.",
        ],
    },
    {
        location: "Seattle, WA",
        company: "Bright Ideas Web Solutions",
        role: "Junior Web Designer",
        period: "Jan 2006 – Mar 2008",
        responsibilities: [
            "Assisted in the design and development of client websites under the guidance of senior designers.",
            "Maintained and updated existing websites, ensuring they met modern web standards.",
            "Participated in client meetings to gather requirements and present design proposals.",
            "Developed basic HTML and CSS coding skills to support design projects.",
        ],
    },
];

const Experience: React.FC = () => {
    return (
        <Box sx={{ maxWidth: 900, mx: "auto", p: 3, color: "white", backgroundColor: "#121212" }}>
            <motion.div initial="hidden" animate="visible" variants={fadeIn}>
                <Typography variant="h6" gutterBottom>Experience</Typography>

                {experiences.map((exp, index) => (
                    <Box key={index} mb={3}>
                        <Typography variant="body2" color="gray">{exp.location}</Typography>
                        <Typography variant="h6" color="white">{exp.company}</Typography>
                        <Typography variant="subtitle2" color="gray">{exp.role} | {exp.period}</Typography>

                        <List sx={{ pl: 2 }}>
                            {exp.responsibilities.map((task, idx) => (
                                <ListItem key={idx} sx={{ pl: 0 }}>
                                    <ListItemText primary={`• ${task}`} primaryTypographyProps={{ color: "gray" }} />
                                </ListItem>
                            ))}
                        </List>

                        {index < experiences.length - 1 && <Divider sx={{ backgroundColor: "gray", my: 2 }} />}
                    </Box>
                ))}
            </motion.div>
        </Box>
    );
};
