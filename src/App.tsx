import { useEffect, useState } from 'react';
import { 
  InputAdornment, TextField, Box, Grid, 
  IconButton, Typography, Autocomplete,
  Stack, Chip, Drawer,
  List, ListItem, ListItemIcon, ListItemButton, ListItemText, 
  AppBar,
  Toolbar,
  Avatar
} from '@mui/material';
import AppsIcon from '@mui/icons-material/Apps';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { ArrowLeft, CalendarMonth } from '@mui/icons-material';
import { motion } from 'framer-motion';
import moment from 'moment';
import { useQuery } from '@tanstack/react-query';

import DocsPage from './components/Docs/DocsPage.js'
import GithubAdmin from './components/GithubAdmin/GithubAdmin.js';
import Admin from './components/Admin/Admin.js';
import Changelog from './components/Changelog/Changelog.js'

import { useAppStore } from './store/index.js';
import { queries } from './config/api';


export const DateTimeLabel = () => {
  const timeString = moment().format('MMMM Do YYYY, h:mm:ss a');
  const [timeLabel, setTimeLabel] = useState(timeString);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLabel(moment().format('MMMM Do YYYY, h:mm:ss a'));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Typography variant="body1" component="p" p={1}>
      {timeLabel}
      <IconButton color="inherit">
        <CalendarMonth />
      </IconButton>
    </Typography>
  )
};

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


const AppLauncherPage = () => {
    const appStore = useAppStore();
    // Get content from CMS
    const contentQuery = useQuery(queries.getContentQuery());

    const isDevEnvironment = (import.meta.env.MODE === "development");

    function handleClick(app: AppType) {
      if (app.url) {
        (window as any).location.href = isDevEnvironment
          ? app.dev_url
          : app.url;
      }
      else appStore.setAppView(app.name);
    };

    return contentQuery.isLoading ? "Loading..." : (
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.5 }}
        style={{ maxWidth: "100vw" }}
      >
        <AppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <IconButton aria-label="Apps" color='inherit' onClick={() => appStore.setDrawerOpen(!appStore.drawerOpen)}>
              <ArrowLeft />
            </IconButton>
            <Autocomplete
              disablePortal
              id="app"
              options={appStore.cms.apps}
              fullWidth
              onLoadedData={() => {}}
              loading={false}
              loadingText="Loading..."
              noOptionsText="No options"
              autoComplete
              getOptionLabel={(option: { name: string }) => option.name}
              size='small'
              // sx={{ my: 2 }}
              renderOption={(props, option: AppType) => {
                console.log("option: ", option, props);
                return (
                  <Stack 
                    direction="row" 
                    spacing={1} 
                    p={1} 
                    sx={{ 
                      cursor: "pointer", 
                      "&:hover": { backgroundColor: "rgba(33,33,33,0.1)" } 
                    }} 
                    onClick={() => handleClick(option)}
                  >
                    <IconButton>
                      {option?.icon}
                    </IconButton>
                    <Typography variant="body1" p={1}>
                      {option?.name}
                    </Typography>
                  </Stack>
                )
              }}
              renderInput={(params) => (
                <Box ref={params.InputProps.ref}>
                  <TextField
                    type="text"
                    // {...params.inputProps}
                    placeholder="Search by app name"
                    size='small'
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconButton aria-label="Apps" color='inherit' onClick={() => handleClick({ name: "home" })}>
                            <AppsIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton color="inherit">
                            <SearchIcon />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Box>
              )}
          />

          <Avatar sx={{ ml: 2, bgcolor: "secondary.main" }}>
            M
          </Avatar>
          </Toolbar>
        </AppBar>

        <Drawer
          // variant="temporary"
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
            {/* <AppList appsList={cms.appsList} /> */}
            <List>
              {contentQuery.data.apps.map((app: AppType, index: number) => (
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
        {({

      home: (
        
        <Grid container mt={6} p={2} sx={{ minHeight: "100vh", width: "100vw", paddingLeft: appStore.drawerOpen ? "256px" : 0 }}>
          <Grid id="dashboard-title" item sm={12} textAlign="right">
            <DateTimeLabel />
          </Grid>

          <Grid item sm={12} md={6}>
            {/* <Weather /> */}
          </Grid>

          <Grid item sm={12} md={12}>
          </Grid>
            {/* <Calendar /> */}

          <Grid item sm={12}>
            <Box sx={{ height: "auto"}}>
              {/* <Map /> */}
            </Box>
          </Grid>

          {/* <Box mb={2} sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #ccc' }}>
            <Typography variant="h4" gutterBottom>
              {cms.home.title}
            </Typography>
          </Box>

          <Typography variant="subtitle2" gutterBottom>
            {cms.home.subtitle}
          </Typography> */}

          <Grid container spacing={2} my={1}>
            {['Most Popular', 'Recent', 'Alphabetical', 'Category', <FilterListIcon />].map((filter, index) => (
              <Grid key={index} item>
                <Chip component={IconButton} label={filter} />
              </Grid>
            ))}
          </Grid>
          <Typography variant="subtitle1" p={1} px={2}>
            {contentQuery.data?.home.launcherText}
          </Typography>

          {/* App Grid Container */}
          <Grid container spacing={3} mt={1}>
            {contentQuery.data.apps.map((app: AppType, index: number) => (
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

          {/* Footer */}
          <Box sx={{ flexGrow: 1, my: 6, textAlign: 'center' }}>
            <Typography variant="subtitle1">
              Woodward Software Toolbox
            </Typography>
            <Typography variant="subtitle1">
              {contentQuery.data.home.footerText}
            </Typography>
            <Typography variant="subtitle1">
              Privacy / Terms of Use / Cookies
            </Typography>
            {/* <google-cast-launcher style={{ color: "#fff", fontSize: "24px" }}>
              Cast
            </google-cast-launcher> */}

          </Box>

      </Grid>
    ),
    "Admin Dashboard": <Admin />,
    Storage: <></>,
    Github: <GithubAdmin />,
    Docs: <DocsPage />,
    Changelog: <Changelog />
  }[appStore.appView])}
  </motion.div>
    )
};



const App = () => {
  return (
      <AppLauncherPage />
  );
}

export default App;
