import { Box, Typography, Chip, Button, Grid2 as Grid, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { SiWordpress, SiDatabricks, SiServerfault, SiE } from "react-icons/si";
import { MdWeb, MdStorage, MdAppSettingsAlt } from "react-icons/md";
import { FaDatabase, FaCode } from "react-icons/fa";
import SocialBar from "@components/custom/SocialBar/SocialBar";

const services = [
  { label: "Application Development", icon: <MdAppSettingsAlt /> },
  { label: "Web Development", icon: <MdWeb /> },
  { label: "WordPress", icon: <SiWordpress /> },
  { label: "CMS", icon: <SiDatabricks /> },
  { label: "AI", icon: <SiDatabricks /> },
  { label: "Hosting", icon: <SiServerfault /> },
  { label: "Data Storage", icon: <MdStorage /> },
  { label: "API Development", icon: <FaCode /> },
  { label: "Database Management", icon: <FaDatabase /> },
  { label: "Server Admin", icon: <SiServerfault /> },
  { label: "Full Stack Dev", icon: <MdWeb /> },
  { label: "Web Services", icon: <MdWeb /> },
  { label: "SEO", icon: <SiE /> },
];

export default function ServicesSection() {
  const theme = useTheme();

  return (
    <Box component="section" py={6}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <Typography variant="h4" fontWeight={600} gutterBottom>
          Services
        </Typography>

        <Box
          display="flex"
          flexWrap="wrap"
          gap={2}
          mt={2}
          mb={6}
        >
          {services.map((service, i) => (
            <Chip
              key={i}
              icon={service.icon}
              label={service.label}
              sx={{
                px: 2,
                py: 1,
                fontSize: "0.875rem",
                fontWeight: 500,
                bgcolor: theme.palette.grey[900],
                color: theme.palette.common.white,
                borderRadius: "999px",
                "& svg": { fontSize: "1rem" }
              }}
            />
          ))}
        </Box>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
        style={{ paddingTop: "48px 0 24px" }}
      >
        <Typography variant="h4" fontWeight={600} gutterBottom>
          Let’s Build Something
        </Typography>

        <Grid container spacing={3} alignItems="center" mt={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Button
              fullWidth
              variant="outlined"
              href="mailto:hello@woodwardwebdev.com"
              onClick={() => navigator.clipboard.writeText("hello@woodwardwebdev.com")}
              sx={{
                fontWeight: 600,
                fontSize: "0.95rem",
                py: 1.5,
                textTransform: "uppercase",
                borderRadius: 2,
              }}
            >
              hello@woodwardwebdev.com
            </Button>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Button
                fullWidth
                variant="contained"
                color="primary"
                component="a"
                href="https://calendly.com/mwoodward1-woodwardwebdev/30min"
                target="_blank"
                sx={{
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    py: 1.5,
                    textTransform: "uppercase",
                    borderRadius: 2,
                }}
            >
              Book a Free Consultation
            </Button>
          </Grid>
        </Grid>

        <Box mt={4} sx={{ display: "flex", justifyContent: "space-between" }}>
          <SocialBar />
          <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
            Made with ❤️ by Michael Woodward © 2025
          </Typography>
        </Box>
      </motion.div>
    </Box>
  );
}
