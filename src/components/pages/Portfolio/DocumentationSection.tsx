import { Box, Typography, Card, CardContent, useTheme } from "@mui/material";
import { motion } from "framer-motion";

const tools = [
  {
    name: "Storybook",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/storybook/storybook-original.svg",
    description: [
      "Component library with live documentation",
      "UI contracts + behavior validation",
      "Integrated with tests and design systems",
    ],
    color: "#ff4785",
    href: "https://storybook.js.org/"
  },
  {
    name: "Docusaurus",
    logo: "https://docusaurus.io/img/docusaurus_keytar.svg",
    description: [
      "Framework docs & architecture specs",
      "Perfect for onboarding engineers",
      "Versioned content with custom theming",
    ],
    color: "#2648FF",
    href: "https://docusaurus.io/"
  },
  {
    name: "Swagger",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swagger/swagger-original.svg",
    description: [
      "Auto-generated API documentation",
      "Live endpoints and request builders",
      "Based on OpenAPI + Supabase contracts",
    ],
    color: "#85EA2D",
    href: "https://swagger.io/"
  },
];

const itemVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const DocumentationSection = () => {
  const theme = useTheme();

  return (
    <Box sx={{ py: 10, px: 2, maxWidth: "1200px", mx: "auto" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Typography variant="h3" fontWeight={600} mb={1}>
          Documentation
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" mb={6}>
          Enterprise-grade technical documentation workflows
        </Typography>
      </motion.div>

      <Box display="flex" flexWrap="wrap" justifyContent="center" gap={4}>
        {tools.map((tool, i) => (
          <motion.div
            key={tool.name}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariant}
            style={{ width: 300 }}
          >
            <Card
              sx={{
                height: "100%",
                bgcolor: theme.palette.background.paper,
                borderRadius: 4,
                boxShadow: 3,
                textAlign: "center",
                transition: "transform 0.3s ease",
                ":hover": {
                  transform: "translateY(-4px)",
                },
              }}
              component="a"
              href={tool.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <CardContent>
                <Box
                  component="img"
                  src={tool.logo}
                  alt={tool.name}
                  sx={{
                    height: 60,
                    mb: 2,
                    mx: "auto",
                    filter: "drop-shadow(0 0 4px rgba(0,0,0,0.2))",
                  }}
                />
                <Typography
                  variant="h6"
                  fontWeight={600}
                  color="text.primary"
                  mb={1}
                >
                  {tool.name}
                </Typography>
                {tool.description.map((line, idx) => (
                  <Typography
                    key={idx}
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: "0.875rem" }}
                  >
                    {line}
                  </Typography>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
};

export default DocumentationSection;
