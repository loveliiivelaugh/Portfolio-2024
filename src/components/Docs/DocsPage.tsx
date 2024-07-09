"use client"

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
    Box, Drawer, Grid, List, ListItem, ListItemButton, 
    ListItemText, Toolbar, Typography 
} from '@mui/material';
import { motion } from 'framer-motion';

import MarkdownWrapper from '../Layout/Markdown';
import { paths, queries } from '../../config/api';


const microservices = [
    { name: "Getting Started" },
    { name: "Installation" },
    { name: "Portfolio24" },
    { name: "App Depot" },
    { name: "Smart Camera" },
    { name: "AI Chat" },
    { name: "Open Fitness" },
    { name: "Open Web UI" },
    { name: "Home Server" },
    { name: "Keycloak Instance" },
    { name: "Wordpress Instance" },
    { name: "PhpAdmin" },
    { name: "MySQL Database" },
    { name: "Private GPT" },
    { name: "PostgresSQL Database" },
    { name: "PgAdmin" },
    { name: "Ollama" },
    { name: "Redis" },
    { name: "Deployment" },
];

const mainBoxStyle = { 
    zIndex: 1, 
    marginLeft: "280px", 
    height: "100vh", 
    padding: "20px", 
    width: "calc(100% - 280px)", 
    overflow: "auto" 
};

const DocsPage = () => {
    const notionQuery = useQuery(queries.query(paths.getNotion));
    const [, setActiveDocs] = useState<string | null>(null);

    function handleClick(service: { name: string }) {
        setActiveDocs(service.name)
    };

    return (
        <Grid container component={motion.div}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
        >
            <Typography variant='h2'>DocsPage</Typography>
            <Drawer
                anchor="left"
                variant="persistent"
                open={true}
                sx={{ zIndex: 0 }}
            >
                <Box
                    sx={{ width: 250 }}
                    component={List}
                    dense
                >
                    <Toolbar />
                    {microservices.map((microservice: { name: string }, index: number) => (
                        <ListItem key={index}>
                            <ListItemButton onClick={() => handleClick(microservice)}>
                                <ListItemText primary={microservice.name} />
                            </ListItemButton>
                        </ListItem>
                    ))}

                </Box>

            </Drawer>
            <Box sx={mainBoxStyle}>
                {notionQuery.isLoading
                    ? "Loading Content..."
                    : notionQuery.isSuccess && (
                        <>
                            <img src={notionQuery.data.images[0]} alt="Microservice Communication Flow Chart" style={{ width: "100%", borderRadius: "10px" }}/>
                            <MarkdownWrapper>
                                {notionQuery.data.markdown}
                            </MarkdownWrapper>
                        </>
                    )
                }
            </Box>
        </Grid>
    )
}

export default DocsPage
