import { Box, Grid2 as Grid, ListItemText, Typography, Chip, Button, Avatar, Stack, Tooltip } from "@mui/material";
import {
    SiJavascript, SiTypescript, SiReact, SiNodedotjs, SiGraphql,
    // SiDiscover 
    // @ts-ignore
} from "react-icons/si";
import SlideIn from "@theme/animations/SlideIn";
import SocialBar from "@components/custom/SocialBar/SocialBar";
import headshotCropped from "@assets/headshot-cropped.png";
import { motion } from "framer-motion";
import DateTimeLabel from "@components/custom/DateTimeLabel/DateTimeLabel";
// import AnimatedButton from "@theme/animations/AnimatedButton";

const MotionButton = motion(Button as any);

const techIcons = [
    { icon: <SiJavascript />, label: "JavaScript" },
    { icon: <SiTypescript />, label: "TypeScript" },
    { icon: <SiReact />, label: "React" },
    { icon: <SiNodedotjs />, label: "Node.js" },
    { icon: <SiGraphql />, label: "GraphQL" },
    //   { icon: <SiDiscover />, label: "Discover" },
];

export default function HeroSection() {
    return (
        <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 8 }} order={2}>
                <SlideIn>
                    <Typography variant="h2" fontWeight={400}>
                        Michael Woodward
                    </Typography>

                    <Box display="flex" alignItems="center" gap={2} mt={1}>
                        <Typography variant="h4" fontWeight={500}>
                            Web Developer
                        </Typography>
                        <Chip
                            label={<i>est. 2020</i>}
                            sx={{
                                fontSize: "0.875rem",
                                fontStyle: "italic",
                                bgcolor: "grey.800",
                                color: "white",
                            }}
                        />
                    </Box>

                    <Stack direction="row" spacing={2} mt={2}>
                        {techIcons.map((tech, idx) => (
                            <Tooltip key={idx} title={tech.label} arrow>
                                <Box sx={{ fontSize: 24, color: "text.secondary" }}>{tech.icon}</Box>
                            </Tooltip>
                        ))}
                    </Stack>

                    <ListItemText 
                        secondary={(
                            <a
                                href="https://www.discover.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: "#F6A623", textDecoration: "none", fontWeight: 600, fontSize: "24px" }}
                            >
                                Discover Financial Services
                            </a>
                        )} 
                        primary={<Typography typography="h6">Applications Engineer <span style={{ color: "#999" }}>@</span></Typography>}
                    />
                    {/* <Typography variant="h6" mt={4}>
                        Applications Engineer{" "}
                        <span style={{ color: "#999" }}>@</span>{" "}
                        <a
                            href="https://www.discover.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "#F6A623", textDecoration: "none", fontWeight: 600 }}
                        >
                            Discover Financial Services
                        </a>
                    </Typography> */}

                    <Typography variant="h6" color="text.secondary">
                        Based in Chicago, Illinois, USA <span style={{ fontSize: "14px" }}><DateTimeLabel /> CST</span>
                    </Typography>

                    {/* <Box mt={2}>
                        <SocialBar />
                    </Box> */}

                    <Stack direction="row" spacing={2} mt={2}>
                        <MotionButton
                            variant="outlined"
                            size="large"
                            whileHover={{ scale: 1.1 }}
                            component="a"
                            href="https://docs.google.com/document/d/1XRXuKHKSs5A1Kh2XkxHu-qxJpbrd527_ug9ycvp7u2o/edit?usp=sharing"
                            target="_blank"
                        >
                            View Resume
                        </MotionButton>
                        <SocialBar />
                        {/* <MotionButton
                            variant="contained"
                            size="large"
                            href="https://blog.woodwardwebdev.com"
                            // @ts-ignore
                            target="_blank"
                            whileHover={{
                                scale: 1.1
                            }}
                        >
                            Read Blog
                        </MotionButton> */}
                    </Stack>
                </SlideIn>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }} order={1}>
                <SlideIn>
                    <Box textAlign="center">
                        <Avatar
                            src={headshotCropped}
                            sx={{ width: 200, height: 200, mx: "auto", boxShadow: 3 }}
                        />
                        <Typography
                            variant="subtitle1"
                            fontStyle="italic"
                            mt={2}
                            px={2}
                            color="text.secondary"
                            textAlign="center"
                        >
                            "I offer web development consultation and build tailored software solutions that help
                            small businesses solve big problems."
                        </Typography>
                    </Box>
                </SlideIn>
            </Grid>
        </Grid>
    );
}
