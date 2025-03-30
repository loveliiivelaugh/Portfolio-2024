import React from 'react';
import { Box, Card, CardContent, Typography, Button, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

export interface ProjectCardProps {
    title: string;
    description: string;
    imageUrl: string;
    tech: string[];
    link: string;
    github?: string;
    thumb?: string;
};

const MotionCard = motion(Card as any);

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, imageUrl, tech, link }) => {
    return (
        <MotionCard
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            sx={{ maxWidth: 360, borderRadius: 4, boxShadow: 3, overflow: 'hidden' }}
        >
            <LazyLoadImage 
                effect="opacity" 
                src={imageUrl} 
                alt="Captured image" 
                height="180"
                width={'100%'}
            />
            {/* <CardMedia
                component="img"
                height="180"
                image={imageUrl}
                alt={`${title} thumbnail`}
            /> */}
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {description}
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
                    {tech.map((tag, i) => (
                        <Box
                            key={i}
                            sx={{
                                px: 1.5,
                                py: 0.5,
                                borderRadius: 2,
                                bgcolor: 'primary.light',
                                color: 'primary.contrastText',
                                fontSize: 12,
                                fontWeight: 500,
                            }}
                        >
                            {tag}
                        </Box>
                    ))}
                </Stack>
                <Button
                    variant="contained"
                    size="small"
                    href={link}
                    target="_blank"
                    fullWidth
                >
                    View Project
                </Button>
            </CardContent>
        </MotionCard>
    );
};

export default ProjectCard;
