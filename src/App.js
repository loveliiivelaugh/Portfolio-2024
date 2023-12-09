
import { 
  Box, Button, Grid, Typography,
  Popover, LinearProgress,
  Card, CardMedia, CardContent, Avatar
} from '@mui/material'

import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import headshot from './assets/images/headshot-cropped.png'
import './App.css';


const workHistory = [
  { 
    name: "Charter",
    role: "JavaScript Developer II",
    period: "June 2022 - Current",
    responsibilities: "Build Software"
  }, 
  { 
    name: "3vue",
    role: "Front End React Developer",
    period: "June 2021 - April 2022",
    responsibilities: "Build and maintain dashboards for business intelligence solutions."
  }, 
  { 
    name: "MedPro",
    role: "Salesforce Administrator",
    period: "January 2019 - March 2020",
    responsibilities: "Admin responsibilities"
  },
]

function AlternateReverseTimeline() {
  return (
    <Timeline position="alternate-reverse">
    {workHistory.map(work => (
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Typography>{work.name}</Typography>
          <Typography>{work.role}</Typography>
          <Typography>{work.period}</Typography>
        </TimelineContent>
      </TimelineItem>
    ))}
    </Timeline>
  );
}

function App() {
  return (
    <>
    <Box sx={{
      height:"auto", 
      minHeight: "95vh",
      backgroundColor: '#232323',
      borderRadius: '32px',
      margin: '16px',
      cursor:"crosshair",
      p:4,
      justifyContent: 'center',
      display:"flex"
    }}>
      <Grid container>
        <Grid item md={12} p={4} sx={{ color: "#Fff" }}>
        <Box sx={{ display: 'flex' }}>
          <Avatar src={headshot} sx={{ height: '100px', width: '100px' }} />
          <Box>
            <Typography variant="h2" px={3}>Michael Woodward</Typography>
            <Typography variant="h4" px={3}>Front End React Developer</Typography>
            <Typography variant="h6" px={3}>Chicago, Illinois, USA</Typography>
          </Box>
        </Box>
          <Typography variant="body1" my={2}>
            A digital alchemist weaving pixels and code into functional art. My journey through the realms of digital design has taken me from crafting intuitive UIs to envisioning entire user experiences that resonate and delight. Dive in, explore my portfolio, and let's craft the future of digital, one pixel at a time.
          </Typography>
        </Grid>
        <Grid item sm={12} sx={{ color: "#Fff" }}>
          <Typography variant="h3">Projects</Typography>
            <Card sx={{ margin: 1, border: 'solid 1px rgba(255,255,255,0.9)', backgroundColor: "rgba(255,255,255,0)" }}>
              <CardContent sx={{color: "#fff"}}>
              <Grid container columnSpacing={2} rowSpacing={1}>
              {["Personal", "Web Shop", "Social", "Blockchain", "Data Analytics", "3D"].map(project => (
                <Grid item sm={4}>
                  <Card>
                    <CardMedia>
                      <img src="" alt="" />
                    </CardMedia>
                    <CardContent>
                      <Typography variant="body1">{project}</Typography>
                    </CardContent>
                      <Button>Live</Button>
                      <Button>Source</Button>
                  </Card>
                </Grid>
              ))}
              </Grid>
              </CardContent>
            </Card>

          <Card sx={{ backgroundColor: 'rgba(255,255,255,0.9)'}}>
            <CardContent>
              <Typography variant="h3">Education</Typography>
              <Typography variant="body1">Northwestern University</Typography>
              <Typography variant="body1">Harold Washington City College Chicago</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={4} p={4} sx={{ color: "#Fff" }}>
          <Card sx={{ backgroundColor: 'rgba(255,255,255,0.9)'}}>
            <CardContent>
              <Typography variant="h3">Skills</Typography>
              <Box sx={{display: "flex"}}>
              </Box>
                <Typography variant="body1">JavaScript</Typography>
                <LinearProgress variant="determinate" value={90} />
              <Typography variant="body1">TypeScript</Typography>
              <Typography variant="body1">React</Typography>
              <Typography variant="body1">Angular</Typography>
              <Typography variant="body1">Node</Typography>
              <Typography variant="body1">Python</Typography>
              <Typography variant="body1">Git</Typography>
              <Typography variant="body1">Jira</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={8}>
          <Card sx={{ margin: 2, border: 'solid 1px rgba(255,255,255,0.9)', backgroundColor: "rgba(255,255,255,0)" }}>
            <CardContent sx={{color: "#fff"}}>
              <Typography variant="h3">Work</Typography>
              <AlternateReverseTimeline />
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={12} sx={{ color: "#fff" }}>
          <Card sx={{ margin: 2, border: 'solid 1px rgba(255,255,255,0.9)', backgroundColor: "rgba(255,255,255,0)" }}>
            <CardContent sx={{color: "#fff"}}>
              <Typography variant="h3">Studying</Typography>
              <Typography variant="body1">Certified Cisco Network Administrator</Typography>
              <Typography variant="body1">AWS Certified Solutions Architect Associate</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={12} sx={{ color: "#fff", m: 3 }}>
          <Typography variant="h3">About</Typography>
          <Typography variant="body1">
            I have a love for technology and a never ending curiousity that continues to drive me in my intellectual and professional pursuits. I also have a 10 year old son who loves to play basketball. So I spend a good amount of time supporting him in those efforts.
          </Typography>
        </Grid>

      </Grid>
    </Box>
    <Popover
        // id={id}
        // open={open}
        // anchorEl={anchorEl}
        // onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
      <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
    </Popover>
    </>
  );
}

export default App;
