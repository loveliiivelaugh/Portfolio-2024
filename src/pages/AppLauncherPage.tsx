
import { useQuery } from '@tanstack/react-query';
import { 
    Box, Grid, IconButton, Typography, Chip, Drawer,
    List, ListItem, ListItemIcon, ListItemButton, ListItemText, 
    Divider, Toolbar
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
// import Markdown from 'react-markdown'
import { motion } from 'framer-motion';

import SecurityHub from '../components/SecurityHub/SecurityHub';
import DocsPage from '../components/Docs/DocsPage'
import GithubAdmin from '../components/GithubAdmin/GithubAdmin';
import Admin from '../components/Admin/Admin';
import Changelog from '../components/Changelog/Changelog';
import { Navbar } from '../components/Layout/Navbar';
import { DateTimeLabel } from '../components/Layout/DateTimeLabel';

import { useAppStore } from '../store';
import { useSupabaseStore } from '../components/Auth/Auth';
import { queries } from '../config/api';
// import { markdown } from '../markdown';
import * as cpxHelpers from '../config/cpxHelper';
import VoiceView from '../components/Voice';


interface AppType {
    "name": string,
    "icon"?: string,
    "link"?: string,
    "url"?: string,
    "dev_url"?: string,
    "repo"?: string,
    "disabled"?: boolean,
    "category"?: string[],
    "tags"?: string[]
}  

function AppLauncherPage() {
    const contentQuery = useQuery(queries.getContentQuery());

    return ({
        pending: "Uninitialized...",
        loading: "Loading App Content...",
        success: <AppLauncherPageContent content={contentQuery.data} />,
        error: "Something went wrong..."
    }[contentQuery.status]);
};

export default AppLauncherPage;


function AppLauncherPageContent({ content }: { content: any }) {
    const appStore = useAppStore();

    const apps = [
        ...content.apps, 
        ...content.dockerApps.filter(({ disabled }: { disabled: boolean }) => !disabled)
    ];

    return (
        <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            // style={{ maxWidth: "100vw" }}
        >
            {/* Navbar */}
            <Navbar />

            {/* Side Drawer */}
            <Drawer
                anchor="left"
                open={appStore.drawerOpen}
                hideBackdrop
                sx={{
                    width: 240,
                    flexShrink: 0,
                    zIndex: 1,
                    [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {apps.map((app: AppType, index: number) => (
                            <ListItem key={index} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {app.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={app.name} secondary={!app?.disabled ? "live" : "disabled"} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>

            <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 1.5 }}
            >
                {/* App Views */}
                {({
                    "home": <HomeView content={content} apps={apps} />,
                    "Admin Dashboard": <Admin />,
                    "Storage": <></>,
                    "Github": <GithubAdmin />,
                    "Docs": <DocsPage />,
                    "Changelog": <Changelog />
                }[appStore.appView])}
            </motion.div>
        </motion.div>
    )
};

function HomeView(props: { content: any, apps: any }) {
    const appStore = useAppStore();
    const supabaseStore = useSupabaseStore();

    const { content, apps } = props;
    const isDevEnvironment = (import.meta.env.MODE === "development");
    const filterOptions = ['Most Popular', 'Recent', 'Alphabetical', 'Category', <FilterListIcon />];

    async function handleClick(app: AppType) {
        if (app.url) await cpxHelpers
            .handleNextApp({ session: supabaseStore.session, app, apps });
        else appStore.setAppView(app.name);
    };

    return (

        <Grid container mt={6} p={2} sx={{ minHeight: "100vh", width: "100vw", paddingLeft: appStore.drawerOpen ? "256px" : 0 }}>
            <Grid id="dashboard-title" item sm={12} textAlign="right">
                <DateTimeLabel />
            </Grid>

            <Grid container spacing={2} my={1}>
                {filterOptions.map((filter, index) => (
                    <Grid key={index} item>
                        <Chip component={IconButton} label={filter} />
                    </Grid>
                ))}
            </Grid>

            <Typography variant="subtitle1" p={1} px={2}>
                {content?.home.launcherText}
            </Typography>

            {/* App Grid Container */}
            <Grid container spacing={3} mt={1}>
                {apps.map((app: AppType, index: number) => (
                    <Grid
                        key={index}
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        sx={{ textAlign: 'center', padding: '20px' }}
                    >
                        <IconButton
                            aria-label={app.name}
                            disabled={app.disabled}
                            onClick={() => handleClick(app)}
                            sx={{ fontSize: '3rem' }}
                        >
                            {app.icon}
                        </IconButton>
                        <ListItemText
                            primary={app.name}
                            secondary={!app?.disabled ? "live" : "disabled"}
                        />
                        {app?.url && (
                            <Typography variant="subtitle1">
                                {app.url.split("https://")}
                            </Typography>
                        )}
                        {(isDevEnvironment && app?.dev_url) && (
                            <Typography variant="subtitle1">
                                {app.dev_url.split("http://")}
                            </Typography>
                        )}
                        {app?.repo && (
                            <Typography variant="subtitle2">
                                {app.repo}
                            </Typography>
                        )}
                    </Grid>
                ))}
            </Grid>

            <Divider />

            <Grid sm={12} sx={{ textAlign: "right", px: 4 }}>
                <VoiceView />
            </Grid>

            {/* Security Hub */}
            <Grid p={4}>
                <SecurityHub />
            </Grid>

            {/* Footer */}
            <Box sx={{ flexGrow: 1, my: 6, textAlign: 'center' }}>
                <Typography variant="subtitle1">
                    Woodward Software Toolbox
                </Typography>
                <Typography variant="subtitle1">
                    {content.home.footerText}
                </Typography>
                <Typography variant="subtitle1">
                    Privacy / Terms of Use / Cookies
                </Typography>
            </Box>

        </Grid>
    )
}