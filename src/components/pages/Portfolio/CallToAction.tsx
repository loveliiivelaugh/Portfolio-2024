// CallToAction.tsx
import { Box, Button, Typography } from "@mui/material";
import { motion } from "framer-motion";

export default function CallToAction() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
        >
            <Box
                bgcolor="primary.main"
                color="primary.contrastText"
                borderRadius={4}
                p={5}
                textAlign="center"
                mt={8}
            >
                <Typography variant="h4" gutterBottom>
                    Let’s Build Something Great Together
                </Typography>
                <Typography variant="body1">
                    Whether it's an MVP, full-stack SaaS, or custom internal tools — I'm here to help you launch and scale with confidence.
                </Typography>
                <Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    href="mailto:hello@woodwardwebdev.com"
                    onClick={() => navigator.clipboard.writeText("hello@woodwardwebdev.com")}
                >
                    Get In Touch
                </Button>
            </Box>
        </motion.div>
    );
};
