
import { 
    Box, Grid, IconButton, Typography, Chip, Drawer,
    List, ListItem, ListItemIcon, ListItemButton, ListItemText, 
    Divider, Toolbar
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { motion } from 'framer-motion';

// import SecurityHub from '../components/SecurityHub/SecurityHub';
// import GithubAdmin from '../components/GithubAdmin/GithubAdmin';
// import VoiceView from '../components/Voice';
import DocsPage from '../components/Docs/DocsPage'
import Admin from '../components/Admin/Admin';
import Changelog from '../components/Changelog/Changelog';
import PhotosApp from '../components/PhotosApp';
import Noah from '../components/Noah/Noah';
import { Navbar } from '../components/Layout/Navbar';
import { DateTimeLabel } from '../components/Layout/DateTimeLabel';

import { useAppStore, useSupabaseStore } from '../store';   
import * as cpxHelpers from '../config/cpxHelper';
import EReader from '../components/EReader/EReader';
import MarkdownWrapper from '../components/Layout/Markdown';
import packageJsonContents from '../../package.json';


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
    const appStore = useAppStore();

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "auto",
            minHeight: '100vh',
            width: "100vw",
            background: "#101020",
            color: "white",
        }}>
            <h2>A whole new world! 🌎</h2>
            <p>This is a front end starter app.</p>
            <p>Take Note** Strict Stack Webpack React Typescript Vitest (Tailwind | MUI)</p>
            <p>Version 0.1.0</p>
            <p>Coming Soon! v2 will be a more refined version than v1. Lots of packages that are outdated or not used anymore in favor of more modern technologies.</p>
            <p>Should probably include basic routing and starter tests in v2</p>
            <p>The intention of this app is to provide a quick starting point to building front end apps within Cherrytopframework</p>
            <p>Please review the package's that are included before starting</p>
            <pre>{JSON.stringify(packageJsonContents.dependencies, null, 2)}</pre>
            <pre>{JSON.stringify(packageJsonContents.devDependencies, null, 2)}</pre>
        </div>
    )
    // // Wait for auth to login and config to load
    // return !appStore.appConfig?.cms
    //     ? <p>Loading...</p> 
    //     : <AppLauncherPageContent content={appStore.appConfig.cms} />
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
                    // "Storage": <></>,
                    // "Github": <GithubAdmin />,
                    "eReader": <EReader />,
                    "Docs": <DocsPage />,
                    "Changelog": <Changelog />,
                    "Photos": <PhotosApp />,
                    "Noah": <Noah />
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
            .handleNextApp({ 
                session: supabaseStore.session?.data?.session
                    ? supabaseStore.session.data.session
                    : supabaseStore.session, // TODO: update this
                app, apps 
            });
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
                <MarkdownWrapper>

    - Deploy backend services to new provider
    - Move database from Supabase to local
    - Build a todo microfrontend
    

                </MarkdownWrapper>
                {/* <VoiceView /> */}
            </Grid>

            {/* Security Hub */}
            <Grid p={4}>
                {/* <SecurityHub /> */}
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