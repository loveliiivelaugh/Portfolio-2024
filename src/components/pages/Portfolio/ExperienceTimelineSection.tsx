// ExperienceTimeline.tsx

import { Box, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";

const experiences = [
  {
    year: "2005–2010",
    title: "Early Hustle",
    description: "Worked in restaurants, retail, and various trade jobs — learning grit, people skills, and the value of hard work.",
  },
  {
    year: "2010–2015",
    title: "Hospitality & Bartending",
    description: "Built strong communication and multitasking skills in high-pressure environments while exploring early tech interests during off time.",
  },
  {
    year: "2015–2020",
    title: "Breaking into Tech",
    description: "Self-taught and driven — learned web development, system design, and programming by building real projects and working freelance.",
  },
  {
    year: "2020–Present",
    title: "Full-Stack Engineer & Founder",
    description: "Now building full-stack applications, managing cloud infrastructure, and building my own dev studio, WoodwardStudio.",
  },
];

export default function ExperienceTimeline() {
  const theme = useTheme();

  return (
    <Box py={6}>
      <Typography variant="h4" fontWeight={600} gutterBottom>
        My Journey
      </Typography>
      <Box display="flex" flexDirection="column" gap={4} mt={4}>
        {experiences.map((exp, i) => (
          <motion.div
            key={exp.year}
            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
          >
            <Box
              bgcolor={theme.palette.mode === "light" ? "grey.100" : "grey.900"}
              borderRadius={4}
              p={3}
              boxShadow={2}
            >
              <Typography variant="subtitle2" color="text.secondary">
                {exp.year}
              </Typography>
              <Typography variant="h6">{exp.title}</Typography>
              <Typography variant="body2" mt={1}>
                {exp.description}
              </Typography>
            </Box>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
}
