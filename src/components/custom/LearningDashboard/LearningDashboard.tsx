import React, { useState } from "react";
import {
    AppBar,
    Box,
    CssBaseline,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    Paper,
    Grid2 as Grid,
    Button,
    Divider
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import DescriptionIcon from '@mui/icons-material/Description';
import AssignmentIcon from '@mui/icons-material/Assignment';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";

interface Lesson {
    id: number;
    title: string;
    videoUrl: string;
    description: string;
    resources: Array<{
        title: string;
        type: string;
        url: string;
    }>;
}

const lessons: Lesson[] = [
    {
        id: 1,
        title: "Lesson 1: Introduction",
        videoUrl: "https://example.com/video1.mp4",
        description: "This introductory lesson covers the fundamental concepts you need to know to get started.",
        resources: [
            { title: "Lesson Notes", type: "pdf", url: "#" },
            { title: "Practice Exercise", type: "exercise", url: "#" },
        ]
    },
    {
        id: 2,
        title: "Lesson 2: Advanced Topics",
        videoUrl: "https://example.com/video2.mp4",
        description: "Dive deep into advanced concepts and real-world applications.",
        resources: [
            { title: "Advanced Guide", type: "pdf", url: "#" },
            { title: "Coding Challenge", type: "exercise", url: "#" },
        ]
    },
    {
        id: 3,
        title: "Lesson 3: Summary",
        videoUrl: "https://example.com/video3.mp4",
        description: "Review everything we've learned and prepare for the final project.",
        resources: [
            { title: "Summary Notes", type: "pdf", url: "#" },
            { title: "Final Project", type: "exercise", url: "#" },
        ]
    },
];

const drawerWidth = 240;

const LearningDashboard: React.FC = () => {
    const [selectedLesson, setSelectedLesson] = useState<Lesson>(lessons[0]);
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleLessonClick = (lesson: Lesson) => {
        setSelectedLesson(lesson);
        setMobileOpen(false);
    };

    const drawer = (
        <Box>
            <Typography variant="h6" sx={{ p: 2, textAlign: "center" }}>
                Course Content
            </Typography>
            <Divider />
            <List>
                {lessons.map((lesson) => (
                    <ListItem
                        key={lesson.id}
                        onClick={() => handleLessonClick(lesson)}
                        // selected={selectedLesson?.id === lesson.id}
                    >
                        <ListItemIcon>
                            <DescriptionIcon />
                        </ListItemIcon>
                        <ListItemText primary={lesson.title} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            <CssBaseline />
            
            {/* Top Navigation Bar */}
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        <Link to="/">
                            Learning Platform
                        </Link>
                    </Typography>
                    <Button color="inherit">Dashboard</Button>
                    <Button color="inherit">My Courses</Button>
                    <Button color="inherit">Profile</Button>
                </Toolbar>
            </AppBar>

            {/* Responsive Drawer */}
            <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>

            {/* Main Content Area */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 0,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    mt: '64px', // Height of AppBar
                }}
            >
                {/* Video Player Section */}
                <Box sx={{ width: '100%', bgcolor: 'black', aspectRatio: '16/9' }}>
                    {selectedLesson && (
                        <ReactPlayer
                            url={selectedLesson.videoUrl}
                            controls
                            width="100%"
                            height="100%"
                            style={{ aspectRatio: '16/9' }}
                        />
                    )}
                </Box>

                {/* Content Below Video */}
                <Box sx={{ p: 3 }}>
                    <Grid container spacing={3}>
                        {/* Left Column - Lesson Information */}
                        <Grid size={{ sm: 12, md: 8 }}>
                            <Typography variant="h4" gutterBottom>
                                {selectedLesson.title}
                            </Typography>
                            <Typography variant="body1" paragraph>
                                {selectedLesson.description}
                            </Typography>
                        </Grid>

                        {/* Right Column - Resources and Tools */}
                        <Grid size={{ sm: 12, md: 4 }}>
                            <Paper elevation={3} sx={{ p: 2 }}>
                                <Typography variant="h6" gutterBottom>
                                    Learning Resources
                                </Typography>
                                <List>
                                    {selectedLesson.resources.map((resource, index) => (
                                        <ListItem key={index} component="a" href={resource.url}>
                                            <ListItemIcon>
                                                {resource.type === 'pdf' ? <DescriptionIcon /> : <AssignmentIcon />}
                                            </ListItemIcon>
                                            <ListItemText primary={resource.title} />
                                        </ListItem>
                                    ))}
                                    <ListItem>
                                        <ListItemIcon>
                                            <QuestionAnswerIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Q&A Discussion" />
                                    </ListItem>
                                </List>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
};

export default LearningDashboard;
