import {
    Box,
    Typography,
    Stack,
    Button,
    Divider,
    List,
    ListItem,
    useTheme,
    useMediaQuery,
    Avatar,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
// import { SiDiscover } from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

type ExperienceDataType = {
    company: string;
    position: string;
    period: string;
    details: string[];
    links: {
        companySite?: string;
        linkedin?: string;
    };
    logo?: string; // optional logo URL
};

const defaultExperienceData: ExperienceDataType[] = [
    {
        company: "Discover Financial Services, Chicago, Illinois",
        position: "Application Engineer",
        period: "September 2024 - Present",
        details: [
            "Develop features using TypeScript, React, Redux, GraphQL, and Vitest.",
            "Implement microfrontend and microservices architecture.",
            "Write testable, high-quality code with 90%+ coverage w/React-Testing-Library, Jest, and Vitest.",
            "Participate in agile development, daily standups, and code reviews.",
            "Provide mentorship to junior engineers.",
            "Adhere to CI/CD Code Quality checks.",
        ],
        links: { companySite: "", linkedin: "" },
        logo: "D"//discoverLogo,
    },
    {
        company: "Spectrum, Austin, Texas",
        position: "JavaScript Developer",
        period: "June 2022 - September 2024",
        details: [
            "Develop enterprise applications automating field technician processes.",
            "Build seamless UI/UX using React.",
            "Convert Python to JavaScript and develop backend services with Node.js.",
            "Implement user validation rules to ensure data integrity.",
        ],
        links: { companySite: "", linkedin: "" },
        logo: "S"//spectrumLogo,
    },
    {
        company: "3vue, Woodridge, Illinois",
        position: "Front End React Web Developer",
        period: "July 2021 - April 2022",
        details: [
            "Develop business intelligence applications for health and life sciences.",
            "Integrate data visualizations using the QlikSense API.",
            "Create a reusable design system improving development speed and consistency.",
        ],
        links: { companySite: "", linkedin: "" },
        logo: "3"//medproLogo,
    },
];

const AccordionListItem = (
    { company, position, period, details, links, logo }: ExperienceDataType,
    // index: number,
    _: number,
    autoExpand: boolean
) => {
    const [expanded, setExpanded] = useState(autoExpand);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            sx={{
                borderRadius: 3,
                bgcolor: theme.palette.background.paper,
                boxShadow: expanded ? 4 : 1,
                mb: 3,
                px: 3,
                py: 2,
                transition: "box-shadow 0.3s ease",
                position: "relative",
                ":hover": { boxShadow: 4 },
                ...(isMobile && {
                    borderLeft: `4px solid ${theme.palette.primary.main}`,
                    mb: 4,
                }),
            }}
            onClick={() => setExpanded((prev) => !prev)}
        >
            <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                justifyContent="space-between"
            >
                <Stack direction="row" spacing={2} alignItems="center" flex={1}>
                    {logo && <Avatar src={logo} alt={company} variant="rounded" />}
                    <Box>
                        <Typography variant="h6" fontWeight={600}>
                            {company}
                        </Typography>
                        <Typography variant="subtitle1" fontWeight={500}>
                            {position}
                        </Typography>
                    </Box>
                </Stack>
                <ExpandMore
                    style={{
                        transform: expanded ? "rotate(180deg)" : "rotate(0)",
                        transition: "transform 0.3s ease",
                    }}
                />
            </Stack>

            <AnimatePresence initial={false}>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="body2" fontWeight={500} gutterBottom>
                            {period}
                        </Typography>
                        <List dense disablePadding>
                            {details.map((item, i) => (
                                <ListItem key={i} disableGutters>
                                    <Typography variant="body2" color="text.secondary">
                                        • {item}
                                    </Typography>
                                </ListItem>
                            ))}
                        </List>
                        {(links.companySite || links.linkedin) && (
                            <Stack direction="row" spacing={2} mt={2}>
                                {links.companySite && (
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        href={links.companySite}
                                        target="_blank"
                                    >
                                        Company Site
                                    </Button>
                                )}
                                {links.linkedin && (
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        href={links.linkedin}
                                        target="_blank"
                                    >
                                        LinkedIn
                                    </Button>
                                )}
                            </Stack>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </Box>
    );
};

export const ExperienceSection2 = ({
    experienceData = defaultExperienceData,
}: {
    experienceData?: ExperienceDataType[];
}) => {
    return (
        <Box>
            {/* <Typography variant="h4" fontWeight={700} gutterBottom>
          Experience
        </Typography> */}
            {experienceData.map((item, index) =>
                AccordionListItem(item, index, index === 0)
            )}
        </Box>
    );
};
