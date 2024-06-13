"use client"

import { useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar } from '@mui/material';

import MarkdownWrapper from '../Layout/Markdown';


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
]
const DocsPage = () => {
    const [activeDocs, setActiveDocs] = useState(null as any | null);

    function handleClick(service: any) {
        setActiveDocs(service.name)
    };

    return (
        <div>
            <h1>DocsPage</h1>
            <Drawer
                anchor="left"
                open={true}
                sx={{ zIndex: 0 }}
                hideBackdrop
            >
                <Box
                    sx={{ width: 250 }}
                    role="presentation"
                    component={List}
                    dense
                    // onClick={toggleDrawer(false)}
                    // onKeyDown={toggleDrawer(false)}
                >
                    <Toolbar />
                    {microservices.map((microservice: any, index: number) => (
                        <ListItem key={index}>
                            <ListItemButton onClick={() => handleClick(microservice)}>
                                <ListItemText primary={microservice.name} />
                            </ListItemButton>
                        </ListItem>
                    ))}

                </Box>
                
            </Drawer>
            <Box sx={{ marginLeft: "280px" }}>
                {(console.log({activeDocs}) as any)}
                <MarkdownWrapper>
                    `# Family Apps Suite Docs
                    Supported Microservices

                    App Hub PWA includes Github data, docs, and changelog.
                    FamilyApps: [FamilyApps](https://familyapps2.netlify.app/)

                    - App Hub / Launchpad

                    PWA Features data visualizations, charting and connected PostgresSQL database
                    OpenFitness: [Open Fitness](https://openfitness.netlify.app/)

                    - Fitness + Nutrition Tracking

                    PWA Features web UI to interact with various open source LLMs through multiple modals
                    AiChat: [AiChat]()

                    - Multi Modal interface to interact with open source LLMs

                    PWA features camera access and functionality with embedded AI and machine learning capabilities
                    SmartCamera: [Smart Camera](https://smartcamera.netlify.app/)

                    - Web app supporting AI embedded camera functionality

                    Database
                    Supabase - PostgresSQL database

                    `


                </MarkdownWrapper>
            </Box>
        </div>
    )
}

export default DocsPage