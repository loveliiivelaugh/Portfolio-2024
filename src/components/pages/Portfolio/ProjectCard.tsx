import React from 'react';
import { useState, useRef } from "react";
import { Chip, ListItem, ListItemButton, ListItemIcon } from "@mui/material";
import { Box, Card, CardContent, Typography, Button, Stack } from '@mui/material';
import { motion, AnimatePresence } from "framer-motion";
// @ts-ignore
import { useSwipeable } from "react-swipeable";
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

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, imageUrl, tech, link, github }) => {
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
                    {description.split(".")[0]}. 
                    {/* {description.split(".")?.[1] && (
                        <Tooltip title={description}>
                            <Typography variant="body1" color="text.primary" sx={{ "&:hover": { cursor: "pointer" }}}>
                                Read More.
                            </Typography>
                        </Tooltip>
                    )} */}
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2, gap: 1 }}>
                    {tech.map((tag, i) => (
                        <Box
                            component={Chip}
                            key={i}
                            // sx={{
                            //     borderRadius: 2, 
                            //     bgcolor: 'primary.light',
                            //     color: 'primary.contrastText',
                            //     fontSize: 12,
                            //     fontWeight: 500,
                            // }}
                            label={tag}
                        />
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
                {github && (
                    <ListItem>
                        <ListItemIcon>
                            {/* <GithubIcon /> */}
                        </ListItemIcon>
                        <ListItemButton
                            component="a"
                            href={github}
                            target="_blank"
                        >
                            View Source
                        </ListItemButton>
                    </ListItem>
                )}
            </CardContent>
        </MotionCard>
    );
};

export default ProjectCard;

type Project = {
  name: string;
  description: string;
  thumb: string;
  live: string;
};

interface CarouselProps {
  projects: Project[];
};

export const ShowcaseCarousel: React.FC<CarouselProps> = ({ projects }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const scrollInterval = useRef<NodeJS.Timeout | null>(null);

  const loopIndex = (index: number) => (index + projects.length) % projects.length;

  const handleNext = () => {
    setDirection("right");
    setStartIndex((prev) => loopIndex(prev + 1));
  };

  const handlePrev = () => {
    setDirection("left");
    setStartIndex((prev) => loopIndex(prev - 1));
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
    // preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const startHoverScroll = (dir: "left" | "right") => {
    stopHoverScroll();
    scrollInterval.current = setInterval(() => {
      dir === "right" ? handleNext() : handlePrev();
    }, 1800);
  };

  const stopHoverScroll = () => {
    if (scrollInterval.current) clearInterval(scrollInterval.current);
  };

  // Select 2 projects to show
  const visibleProjects = [
    projects[startIndex % projects.length],
    projects[(startIndex + 1) % projects.length],
  ];

  return (
    <>
    
    {/* <Box sx={{ width: "100%", display: "flex", justifyContent: "center", textAlign: "center", gap: 1 }}>
        {projects.map((project, index) => (
            <>
            <Box
                key={index}
                sx={{
                    width: 4,
                    height: 4,
                    verticalAlign: "middle",
                    borderRadius: "50%",
                    bgcolor: index === startIndex ? "primary.main" : "grey.600"
                }}
            />
            <Typography 
                key={index}
                color={[projects.length - 1, startIndex].includes(index) ? "#777" : "textSecondary"} 
                variant={[projects.length - 1, startIndex].includes(index) ? "body1" : "h6"} 
                sx={{
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    '&:hover': {
                        color: "primary.main",
                        fontWeight: 500
                    }
                }}
            >
                {project.name}
            </Typography>
            </>
        ))}
    </Box> */}
    <Box
        component={motion.div}
        layout
        sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "end",
            textAlign: "center",
            gap: { xs: 1, md: 2 },
            mb: 2,
            position: "relative",
            overflow: "hidden",
            minHeight: "2.5rem",
        }}
    >
        <AnimatePresence initial={false} mode="popLayout">
            {[-1, 0, 1, 2].map((offset) => {
            const index = (startIndex + offset + projects.length) % projects.length;
            const project = projects[index];
            const isMain = offset === 0 || offset === 1;
            const isActive = offset === 0;
            const isFaded = offset === -1 || offset === 2;

            return (
                <motion.div
                key={project.name}
                layout
                initial={{ opacity: 0, y: offset > 0 ? 20 : -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: offset > 0 ? -20 : 20 }}
                transition={{ duration: 0.4 }}
                >
                <Typography
                    variant={isMain ? "h6" : "body2"}
                    color={isFaded ? "text.disabled" : isActive ? "text.primary" : "text.secondary"}
                    fontWeight={isActive ? 600 : 400}
                    sx={{
                    cursor: "pointer",
                    mx: 1,
                    "&:hover": { color: "primary.main" },
                    }}
                    onClick={() => {
                    setDirection(offset < 0 ? "left" : "right");
                    setStartIndex(index);
                    }}
                >
                    {project.name}
                </Typography>
                </motion.div>
            );
            })}
        </AnimatePresence>
    </Box>

    <Box
      {...swipeHandlers}
      position="relative"
      width="100%"
      overflow="hidden"
      onMouseLeave={stopHoverScroll}
    >
      {/* Hover zones */}
      <Box
        onMouseEnter={() => startHoverScroll("left")}
        sx={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "5%",
          zIndex: 10,
          cursor: "w-resize",
        }}
      />
      <Box
        onMouseEnter={() => startHoverScroll("right")}
        sx={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: "5%",
          zIndex: 10,
          cursor: "e-resize",
        }}
      />

      {/* Carousel container */}
      <Box
        display="flex"
        component={motion.div}
        key={startIndex}
        initial={{ x: direction === "right" ? "100%" : "-100%", opacity: 0 }}
        animate={{ x: "0%", opacity: 1 }}
        exit={{ x: direction === "right" ? "-100%" : "100%", opacity: 0 }}
        transition={{ type: "tween", duration: 0.5 }}
      >
        {visibleProjects.map((project) => (
          <Box
            key={project.name}
            width={{ xs: "100%", md: "50%" }}
            px={2}
          >
            <ProjectCard
              title={project.name}
              description={project.description}
              imageUrl={project.thumb || "https://picsum.photos/400"}
              tech={["React", "Supabase", "Zustand", "Framer Motion"]}
              link={project.live}
            />
          </Box>
        ))}
      </Box>

      {/* Dots indicator */}
      <Box display="flex" justifyContent="center" mt={2} gap={1}>
        {projects.map((_, idx) => (
          <Box
            key={idx}
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              bgcolor: idx === startIndex % projects.length ? "primary.main" : "grey.600",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </Box>
    </Box>
    </>
  );
};
