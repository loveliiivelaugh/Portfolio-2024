// CoreValues.tsx

import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { FaLightbulb, FaLaptopCode, FaCogs, FaHandshake } from "react-icons/fa";

const values = [
  {
    title: "Curiosity-Driven Learning",
    description:
      "I stay relentlessly curious and continuously explore new technologies, patterns, and best practices — always learning, never done.",
    icon: <FaLightbulb size={36} />,
  },
  {
    title: "Systems Thinking",
    description:
      "I design software like systems — everything has purpose, flow, and structure. I care about the full stack, not just the UI.",
    icon: <FaCogs size={36} />,
  },
  {
    title: "Craftsmanship",
    description:
      "Clean code, tested APIs, animated UIs — I build polished products with attention to detail from backend to frontend.",
    icon: <FaLaptopCode size={36} />,
  },
  {
    title: "Client Collaboration",
    description:
      "I believe in building with people, not just for them. Clear communication and trusted partnerships make better products.",
    icon: <FaHandshake size={36} />,
  },
];

export default function CoreValues() {
  return (
    <Box py={6}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        Core Values
      </Typography>
      <Box
        mt={4}
        display="grid"
        gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }}
        gap={4}
      >
        {values.map((val, i) => (
          <motion.div
            key={val.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            viewport={{ once: true }}
          >
            <Box
              p={4}
              borderRadius={4}
              bgcolor="background.paper"
              boxShadow={2}
              textAlign="left"
              display="flex"
              gap={3}
              alignItems="flex-start"
            >
              <Box color="primary.main" mt={0.5}>{val.icon}</Box>
              <Box>
                <Typography variant="h6">{val.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {val.description}
                </Typography>
              </Box>
            </Box>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
}
