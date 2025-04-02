import {
    Box,
    Typography,
    Avatar,
    Card,
    CardContent,
    Rating,
} from "@mui/material";
import { motion } from "framer-motion";

const testimonials = [
    {
        name: "Elena Morris",
        role: "Product Manager, Openfit",
        quote:
            "Michael was one of the best engineers I’ve worked with. Thoughtful, quick, and totally reliable when it came to turning designs into fully functional UIs.",
        rating: 5,
        avatar: "https://i.pravatar.cc/150?img=47",
        linkedin: "https://linkedin.com",
    },
    {
        name: "Luis Ramirez",
        role: "CTO, CraftIQ",
        quote:
            "His frontend architecture made it easy for our whole team to build and scale confidently. WoodwardStudio delivers like an agency but with the personal touch.",
        rating: 5,
        avatar: "https://i.pravatar.cc/150?img=49",
        linkedin: "https://linkedin.com",
    },
    {
        name: "Danielle Tran",
        role: "Startup Founder, Muziq",
        quote:
            "He built our entire scheduling system in weeks, and it worked flawlessly from day one. Fast, modern, scalable — exactly what we needed.",
        rating: 5,
        avatar: "https://i.pravatar.cc/150?img=52",
        linkedin: "https://linkedin.com",
    },
];

const fadeInVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.15, duration: 0.5 },
    }),
};

const TestimonialsSection = () => {
    return (
        <Box component="section" maxWidth="1200px" mx="auto">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 },
                }}
            >
                <Typography variant="h4" fontWeight={600} mb={1}>
                    What Others Say
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" mb={6}>
                    Kind words from past collaborators and clients.
                </Typography>
            </motion.div>

            <Box
                sx={{
                    display: { xs: "flex", md: "grid" },
                    gridTemplateColumns: { md: "repeat(3, 1fr)" },
                    gap: 4,
                    overflowX: { xs: "auto", md: "initial" },
                    scrollSnapType: { xs: "x mandatory", md: "none" },
                    pb: { xs: 4, md: 0 },
                }}
            >
                {testimonials.map((t, i) => (
                    <motion.div
                        key={t.name}
                        variants={fadeInVariant}
                        initial="hidden"
                        whileInView="visible"
                        custom={i}
                        viewport={{ once: true }}
                        style={{
                            scrollSnapAlign: "start",
                            minWidth: "90%",
                            marginRight: "16px",
                        }}
                    >
                        <Card
                            sx={{
                                height: "100%",
                                borderRadius: 3,
                                boxShadow: 4,
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <CardContent>
                                <Typography variant="body1" mb={2}>
                                    “{t.quote}”
                                </Typography>

                                <Box display="flex" alignItems="center" mt="auto" gap={2}>
                                    <Avatar
                                        src={t.avatar}
                                        alt={t.name}
                                        sx={{
                                            filter: (theme) =>
                                                theme.palette.mode === "dark" ? "brightness(1.1)" : "none",
                                        }}
                                    />
                                    <Box>
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            {t.name}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {t.role}
                                        </Typography>
                                        <Rating
                                            value={t.rating}
                                            readOnly
                                            size="small"
                                            sx={{ mt: 0.5 }}
                                        />
                                        {t.linkedin && (
                                            <Box mt={0.5}>
                                                <Typography
                                                    component="a"
                                                    href={t.linkedin}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    sx={{
                                                        fontSize: "0.75rem",
                                                        color: "primary.main",
                                                        textDecoration: "none",
                                                        "&:hover": { textDecoration: "underline" },
                                                    }}
                                                >
                                                    View on LinkedIn ↗
                                                </Typography>
                                            </Box>
                                        )}
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </Box>
        </Box>
    );
};

export default TestimonialsSection;
