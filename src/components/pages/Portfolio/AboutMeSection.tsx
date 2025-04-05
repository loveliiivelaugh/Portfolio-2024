// AboutMe.tsx

import { motion } from "framer-motion";
import { Typography, Box } from "@mui/material";

export default function AboutMe() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Box maxWidth="md" mx="auto" py={6} px={3}>
        <Typography variant="h2" gutterBottom>
          About Me
        </Typography>
        <Typography variant="body1" paragraph>
          I'm Michael Woodward — a full-stack software engineer and founder of <strong>WoodwardStudio</strong>, where I build and deploy modern, enterprise-grade applications from the ground up.
        </Typography>
        <Typography variant="body1" paragraph>
          With over 5 years of experience in professional software engineering, I bring deep technical expertise and a systems-thinking approach to every project. My work spans the full stack — from server provisioning and API design to polished, animated React UIs.
        </Typography>
        <Typography variant="body1" paragraph>
          I specialize in a fully typed, modern stack:
          <strong> Bun, Hono, GraphQL, Drizzle ORM, Supabase, PostgreSQL, TypeScript, Zustand, Vite, React, MUI, Framer Motion</strong> — all deployed via CI/CD pipelines with Docker, Cloudflare, and Render or Netlify. I also maintain a private component framework called <strong>woodward-studio</strong> to accelerate development across my apps.
        </Typography>
        <Typography variant="body1" paragraph>
          Beyond code, I’m passionate about holistic product development: I run a personal blog, build SaaS tools for small businesses, and maintain automated workflows with <strong>n8n</strong> and custom AI pipelines. My focus is on building secure, scalable, well-documented systems that are a joy to use and maintain.
        </Typography>
        <Typography variant="body1" paragraph>
          Whether you're a startup looking for your first MVP, or a business in need of a trusted engineering partner — I'm here to help bring your vision to life.
        </Typography>
      </Box>
    </motion.section>
  );
}
