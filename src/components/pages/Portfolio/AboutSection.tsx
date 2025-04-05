// AboutSection.tsx
import { useIsMobile } from "@lib/useIsMobile";
import { Box, Typography, Button, useTheme, Tooltip } from "@mui/material";
import { motion } from "framer-motion";

import {
    SiReact,
    SiTypescript,
    SiBun,
    SiGraphql,
    SiPostgresql,
    SiSupabase,
    SiMui,
    SiFramer,
    SiDocker,
    SiVite,
    //   SiZustand,
    SiOpenapiinitiative,
} from "react-icons/si";

const stack = [
    { name: "React", icon: <SiReact size={32} /> },
    { name: "TypeScript", icon: <SiTypescript size={32} /> },
    { name: "Bun", icon: <SiBun size={32} /> },
    { name: "GraphQL", icon: <SiGraphql size={32} /> },
    { name: "PostgreSQL", icon: <SiPostgresql size={32} /> },
    { name: "Supabase", icon: <SiSupabase size={32} /> },
    { name: "MUI", icon: <SiMui size={32} /> },
    { name: "Framer Motion", icon: <SiFramer size={32} /> },
    { name: "Docker", icon: <SiDocker size={32} /> },
    { name: "Vite", icon: <SiVite size={32} /> },
    //   { name: "Zustand", icon: <SiZustand size={32} /> },
    { name: "OpenAPI", icon: <SiOpenapiinitiative size={32} /> },
];

export default function AboutSection() {
    const theme = useTheme();
    const isMobile = useIsMobile();
    return (
        <Box component="section" py={4} px={isMobile ? 0 : 3}>
            {/* About Me */}
            <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <Box maxWidth="md" mx="auto">
                    <Typography variant="h4" fontWeight={540} gutterBottom>
                        About Me
                    </Typography>
                    <Typography variant="body1">
                        I'm Michael Woodward — a full-stack software engineer and founder of <strong>michael.woodwardwebdev.com</strong>, where I build and deploy modern, enterprise-grade applications from the ground up.
                    </Typography>
                    <Typography variant="body1">
                        With over 5 years of professional experience, I bring deep technical expertise and a systems-thinking approach to every project. From bare metal servers to animated UI, I cover the full spectrum of product engineering.
                    </Typography>
                    <Typography variant="body1">
                        I specialize in a fully typed, modern stack:
                        <strong> Bun, Hono, GraphQL, Drizzle ORM, Supabase, PostgreSQL, TypeScript, Zustand, Vite, React, MUI, Framer Motion</strong> — all deployed with CI/CD pipelines, containerized environments, and monitored via Cloudflare and Uptime Kuma.
                    </Typography>
                    <Typography variant="body1">
                        Beyond coding, I build automated systems, document with OpenAPI and Swagger, and blog about engineering practices. Whether you’re launching your first MVP or scaling your operations — I can help you do it with style and stability.
                    </Typography>
                </Box>
            </motion.div>

            {/* Stack Icons */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                transition={{ staggerChildren: 0.05 }}
                viewport={{ once: true }}
            >
                <Box textAlign="center" pt={10}>
                    <Typography variant="h4" gutterBottom>
                        My Stack
                    </Typography>
                    <Box
                        display="flex"
                        flexWrap="wrap"
                        justifyContent="center"
                        gap={3}
                        mt={3}
                    >
                        {stack.map(({ name, icon }, index) => (
                            <motion.div
                                key={name}
                                whileHover={{ scale: 1.2 }}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Tooltip title={name} arrow>
                                    <Box>{icon}</Box>
                                </Tooltip>
                            </motion.div>
                        ))}
                    </Box>
                </Box>
            </motion.div>

            {/* Call to Action */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <Box
                    mt={12}
                    p={6}
                    bgcolor={theme.palette.mode === "light" ? "primary.main" : "grey.900"}
                    borderRadius={6}
                    //   color="primary.contrastText"
                    textAlign="center"
                >
                    <Typography variant="h4" gutterBottom>
                        Let’s Build Something Great Together
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Whether it's an MVP, a full-stack SaaS platform, or a polished frontend — I'm ready to help bring your product to life.
                    </Typography>
                    <Button
                        variant="outlined"
                        color="primary"
                        size="large"
                        href="mailto:hello@woodwardwebdev.com"
                        onClick={() => navigator.clipboard.writeText("hello@woodwardwebdev.com")}
                    >
                        Get In Touch
                    </Button>
                </Box>
            </motion.div>
        </Box>
    );
}
