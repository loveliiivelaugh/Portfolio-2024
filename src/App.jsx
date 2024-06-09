import React from 'react';
import { 
  InputAdornment, TextField, Box, Grid, Paper,
  IconButton, Typography, Autocomplete,
  Stack, Chip, Divider, Drawer,
  List, ListItem, ListItemIcon, ListItemButton, ListItemText, Tooltip,
  AppBar,
  Toolbar,
  Avatar
} from '@mui/material';
import AppsIcon from '@mui/icons-material/Apps';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import moment from 'moment';
import { motion } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';

import { cms } from './utilities/cms';
// import Calendar from './components/Calendar';
// import Weather from './components/Weather/Weather';
// import Map from './components/Map/Map';
import Chat from './components/Chat/Chat.jsx';
import EReader from './components/EReader/EReader.jsx';
import Camera from './components/Chat/views/CameraView.jsx';
import { create } from 'zustand';
import { ArrowLeft, CalendarMonth } from '@mui/icons-material';

import GithubAdmin from './components/GithubAdmin/GithubAdmin.jsx';
import Admin from './components/Admin/Admin.jsx';
import Fitness from './components/Fitness/Fitness.jsx';


export const DateTimeLabel = () => {
  const timeString = moment().format('MMMM Do YYYY, h:mm:ss a');
  const [timeLabel, setTimeLabel] = React.useState(timeString);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimeLabel(moment().format('MMMM Do YYYY, h:mm:ss a'));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Typography variant="body1" component="p" p={1}>
      {moment().format('dddd MMMM Do YYYY, h:mm:ss a')}
      <IconButton color="inherit">
        <CalendarMonth />
      </IconButton>
    </Typography>
  )
}

const localPort = (port) => `http://localhost:${(port || "0000")}`;

export const useAppStore = create((set) => ({
  appView: "home",
  setAppView: (appView) => set(() => ({ appView })),

  drawerOpen: false,
  setDrawerOpen: (drawerOpen) => set(() => ({ drawerOpen })),
}))

const dockerApps = [
  { name: "Github", icon: "❤️" }, 
  { name: "OpenWebUI", icon: "😎", "url": localPort("3000") },
  { name: "Notion", icon: "📝" },
  { name: "Wordpress Site", icon: "📄", "url": localPort("8000") },
  { name: "Wordpress Admin", icon: "📄", "url": "http://localhost:8000/wp-admin" },
  { name: "PHP Admin", icon: "📄", "url": localPort("8080") },
  { name: "PGAdmin", icon: "📄", "url": localPort("5050") },
  { name: "Keycloak", icon: "📄", "url": localPort("8180") },
  { name: "Perplexity", icon: "📄", "url": localPort() },
  { name: "Private GPT", icon: "📄", "url": localPort() },
  { name: "Docs", icon: "📄" },
  { name: "Changelog", icon: "📄" },
];

const AppLauncherPage = () => {
    const appStore = useAppStore();
    const [appsList, setAppsList] = React.useState(cms.apps);

    const handleClick = async (event) => {
      console.log("clickHandler: ", event)
      
      // appStore.setAppView(event.name);

      if (event.url) {
        window.location.href = event.url;
      }
      else appStore.setAppView(event.name);
    }

    // Experimenting with RSCs
    // React.useEffect(() => {
    //   (async () => {
    //     const response = await client.get('/rsc');
    //     // const stream = await response.json();
    //     const Element = React.createElement(response.data)
    //     console.log("RSC experimenting: ", response, Element)
    //   })()
    // }, [])

    return (
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
              options={cms.apps}
              fullWidth
              onLoadedData={() => {}}
              loading={false}
              loadingText="Loading..."
              noOptionsText="No options"
              autoComplete
              getOptionLabel={(option) => option.name}
              size='small'
              // sx={{ my: 2 }}
              renderOption={(props, option) => {
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
                    {...params.inputProps}
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
              {[...appsList, ...dockerApps].map((app, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      {app.icon}
                    </ListItemIcon>
                    <ListItemText primary={app.name} secondary={"In development"} />
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
          <Typography variant="subtitle1">
            {cms.home.launcherText}
          </Typography>

          <Grid container spacing={3} mt={1}>
            {[...appsList, ...dockerApps].map((app, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Paper elevation={3} style={{ textAlign: 'center', padding: '20px', cursor: 'pointer' }}>
                  <IconButton aria-label={app.name} onClick={() => handleClick(app)} sx={{ fontSize: '3rem' }}>
                    {app.icon}
                  </IconButton>
                  {/* <Typography variant="subtitle1">{app.name}</Typography>
                  <Typography variant="subtitle2">{"In development"}</Typography> */}
                  <ListItemText primary={app.name} secondary={"live"} />
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Footer */}
          <Box sx={{ flexGrow: 1, my: 6, textAlign: 'center' }}>
            <Typography variant="subtitle1">
              Woodward Software Toolbox
            </Typography>
            <Typography variant="subtitle1">
              {cms.home.footerText}
            </Typography>
            <Typography variant="subtitle1">
              Privacy / Terms of Use / Cookies
            </Typography>
            <google-cast-launcher style={{ color: "#fff", fontSize: "24px" }}>
              Cast
            </google-cast-launcher>

          </Box>

      </Grid>
    ),
    eReader: <EReader />,
    camera: <Camera />,
    AI: <Chat />,
    "Admin Dashboard": <Admin />,
    Storage: <></>,
    Fitness: <Fitness />,
    Github: <GithubAdmin />,
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
