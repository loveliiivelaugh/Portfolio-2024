import React from 'react';
import { Box, Drawer, Grid, Tab, Tabs, Typography } from '@mui/material';

// import EReader from '../../EReader/EReader';
import { useChatStore } from '../store';

// import json from '../api/braveSearchMock.json';
// import json from '../api/brave-search-mock-2.json';
// import SearchResultList from './SearchResultsMock';


const ToolsWindowDrawer = () => {
    const chat = useChatStore();
    const [activeTab, setActiveTab] = React.useState("0");

    // console.log({ json })

    return (
        <Drawer open={chat.toolsWindowDrawer} anchor="right" onClose={() => chat.setToolsWindowDrawer(false)}>
            <Box sx={{ width: "80vw", height: "100vh", justifyContent: "center" }}>
                <Grid container>
                    <Grid item xs={12} p={2}>
                        <Typography variant="h5">Tools Window</Typography>
                    </Grid>
                    {{
                        "0": (
                            <Grid item xs={12} p={2}>
                                {/* <EReader /> */}
                            </Grid>
                        ),
                        "1": (
                            <Grid item xs={12} p={2}>
                                {/* <iframe src="/" width="640" height="480"></iframe> */}
                                {/* <SearchResultList results={json.web.results} /> */}
                            </Grid>
                        )
                    }[activeTab]}
                </Grid>
                <Box sx={{ zIndex: 40, width: "100%", position: "fixed", bottom: 0, background: "white", borderTop: '1px solid rgba(33,33,33, 0.2)' }}>
                    <Tabs value={activeTab} onChange={(event, newValue) => {
                        console.log("tabChange: ", newValue)
                        setActiveTab(newValue)
                    }}>
                        <Tab label="E-Reader" />
                        <Tab label="Browser" />
                    </Tabs>
                </Box>
            </Box>
        </Drawer>
    )
}

export default ToolsWindowDrawer