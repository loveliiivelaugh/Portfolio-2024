import React from 'react'
import { Box, Drawer, Grid, Typography } from '@mui/material'

import { useChatStore } from '../store'
import { color } from 'framer-motion';


const ToolsWindowDrawer = () => {
    const chat = useChatStore();
    return (
        <Drawer open={chat.toolsWindowDrawer} anchor="right">
            <Box sx={{ width: "80vw", height: "100vh", justifyContent: "center" }}>
                <Grid container>
                    <Grid item xs={12} p={2}>
                        <Typography variant="h5">Tools Window</Typography>
                    </Grid>
                    <Grid item xs={12} p={2}>
                        <iframe src="https://www.youtube.com/embed/9bZkp7q19f0" width="640" height="480"></iframe>
                    </Grid>
                </Grid>
            </Box>
        </Drawer>
    )
}

export default ToolsWindowDrawer