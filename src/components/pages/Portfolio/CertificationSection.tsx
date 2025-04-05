// CertificationsSection.tsx

import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { FaUniversity, FaAws, FaSalesforce, FaCogs } from "react-icons/fa";

const certifications = [
  {
    title: "Full Stack Web Development Certification",
    provider: "Northwestern University",
    icon: <FaUniversity size={32} />,
    description:
      "Completed a rigorous professional program focused on modern web development, including JavaScript, React, Node.js, databases, and deployment best practices.",
  },
  {
    title: "Salesforce Trailhead Expertise",
    provider: "Salesforce",
    icon: <FaSalesforce size={32} />,
    description:
      "Earned over 120 Trailhead badges through Admin and Developer level study. While not formally certified, I’ve built production-grade Salesforce integrations and could pass certification exams if required.",
  },
  {
    title: "AWS Admin & Developer Level Proficiency",
    provider: "AWS (Self-Study & Homelab)",
    icon: <FaAws size={32} />,
    description:
      "Gained practical, certification-level knowledge in AWS through hands-on use in homelab and production projects — including IAM, EC2, S3, Amplify, and Elastic Beanstalk. Focused on developer tooling, automation, and infrastructure design.",
  },
  {
    title: "Self-Hosted Systems & DevOps Engineering",
    provider: "Linux-Based Homelab Environments",
    icon: <FaCogs size={32} />,
    description:
      "Built and secured terminal-only Linux systems for internal services, Dockerized environments, and CI/CD pipelines. Managed ports, hostnames, and remote access across networks with a focus on security, reliability, and production readiness.",
  }
];

export default function CertificationsSection() {
  return (
    <Box py={6}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Certifications & Technical Proficiency
      </Typography>
      <Box
        mt={4}
        display="grid"
        gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }}
        gap={4}
      >
        {certifications.map((cert, i) => (
          <motion.div
            key={cert.title}
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
              display="flex"
              gap={3}
              alignItems="flex-start"
            >
              <Box color="primary.main" mt={0.5}>
                {cert.icon}
              </Box>
              <Box>
                <Typography variant="h6">{cert.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>{cert.provider}</strong>
                </Typography>
                <Typography variant="body2" mt={1}>
                  {cert.description}
                </Typography>
              </Box>
            </Box>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
}
