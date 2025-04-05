// StackIcons.tsx

import { Box, Typography, Tooltip } from "@mui/material";
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

export default function StackIcons() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      transition={{ staggerChildren: 0.05 }}
      viewport={{ once: true }}
    >
      <Box textAlign="center" py={6}>
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
  );
}
