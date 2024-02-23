
import { 
  Box, Button, Grid, Typography,
  Container, Divider,
  Avatar, List, ListItem, ListItemText, Toolbar, IconButton
} from '@mui/material'
import {
  Timeline, TimelineItem, TimelineSeparator, TimelineConnector, 
  TimelineContent, TimelineDot
} from '@mui/lab'
import { FaLinkedin } from "react-icons/fa";
import TextSnippetIcon from '@mui/icons-material/TextSnippet';

import { cms } from './utilities/cms';
import headshot from './assets/images/headshot-cropped.png'
// import './App.css';


const workHistory = [ 
  { 
    name: "MedPro",
    role: "Salesforce Administrator",
    period: "January 2019 - March 2020",
    responsibilities: "Admin responsibilities"
  },
  { 
    name: "3vue",
    role: "Front End React Developer",
    period: "June 2021 - April 2022",
    responsibilities: "Build and maintain dashboards for business intelligence solutions."
  }, 
  { 
    name: "Charter",
    role: "JavaScript Developer II",
    period: "June 2022 - Current",
    responsibilities: "JavaScript developer working in Automation department. Projects focused on frontend development mostly with React and Angular. Also working on backend development with NodeJS and Python."
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
    <Box sx={{ minHeight: "100vh" }}>
      <Box sx={{ height: '24vh', width: '100%', background: '#232323' }}>
        {/* Hero Section */}
        <Typography variant="h4" sx={{ color: "#Fff", px: 2, pt: 6 }}>
          Woodward Software
        </Typography>
        <Typography variant="body1" sx={{ color: "#Fff", px: 2 }}>
          Automation. AI Integration. Mobile Web App Development.
        </Typography>
      </Box>
      <List size="small">
        <Typography variant="h3" sx={{ color: "#333", px: 2 }}>
          Services
        </Typography>
        <Grid container>
          {[
            [
            "Web Development",
            "Mobile Development",
            "UI/UX Design",
            "Data Science",
            "Data Analytics",
            "Data Management",
            'Servers & Infrastructure',
          ],
          [
            "Data Engineering",
            "Data Visualization",
            "Automation",
            "AI & Machine Learning",
            "Software Engineering",
            "Software Consultation",
            "Business Intelligence",
            "Database Management",
          ]
        ].map((array, index) => (
            <Grid item xs={12} sm={6} key={index}>
              {array.slice(0, 4).map(item => (
                <ListItem >
                  <ListItemText primary={item} secondary={item} />
                </ListItem>
              ))}
            </Grid>
          ))
        }
        </Grid>
      </List>
      <Divider />

        <Grid item xs={12} sm={12} md={12} p={2} sx={{ background: "#333", color: "#fff"}}>
          <Typography variant="h3">Availability</Typography>
          <Typography variant="body1">
            Have an idea for an app? Need help with a website? 
          </Typography>
          <Typography variant="subtitle2">
            I am available for hire interested in flexible remote contract work
          </Typography>
          {/* Schedule a demo */}
          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <Button 
              variant="contained" 
              color="primary" 
              href="https://calendly.com/woodward-michael-a/15min"
              target='_blank'
              rel="noreferrer"
            >
              Schedule a Demo
            </Button>
            <Button 
              variant="outlined" 
              color="primary"
              href="https://trello.com/b/LGHXvZNL/kanban-template"
              target='_blank'
              rel="noreferrer"
            >
              See Projects Board
            </Button>
          </Box>
        </Grid>

      <Divider />

      {/* Blog */}
        <Toolbar />
        <Grid item xs={12} sx={{ color: "#333", textAlign: "center" }}>
          {cms.app.blog.posts.map((post, i) => (
            <Container maxWidth="sm" key={i}>
              {post.image && 
                <img src={post.image} alt="FamilyApps" style={{ 
                  height: 780, 
                  width: 340, 
                  borderRadius: 14, 
                  border: '8px solid #333', 
                  marginTop: 24 
                  }} 
                  />
              }
              <Typography variant="h5" py={2}>
                {post.title}
              </Typography>
              <Divider />
              <Typography variant="body1">
                {post.body}
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                2/21/2024
              </Typography>
              <Button variant="outlined" color="primary" size='small' mb={2}>
                Read More
              </Button>
            </Container>
          ))}
        </Grid>
      <Toolbar />
      <Divider />

      {/* About Me */}
        <Grid item xs={12} sm={12} md={12} p={2} sx={{ color: "#333" }}>
          <Typography variant="h5" sx={{ color: "#333" }} >
            <pre>whoami</pre>
          </Typography>
          <Typography variant="body1">
            {`
              I am a dedicated software engineer specializing in software automation, driven by a fervent desire to craft user-friendly and practical applications suitable for regular use. Presently, I serve as a full-time software engineer for a leading Fortune 500 company, embracing remote work from my base in Chicago, Illinois.
              
              My journey as a developer is marked by perpetual growth and exploration of emerging technologies and contemporary trends. I thrive on continuous learning, constantly seeking fresh opportunities to enhance my skills and expertise. Beyond my professional pursuits, I am also a committed father, balancing my roles with enthusiasm and dedication.
            `}
          </Typography>
        </Grid>

        <Grid item md={12} p={4} sx={{ color: "#Fff", background: '#232323' }}>
          {/* <Box sx={{ width: "100px", mx: "auto", textAlign: "center" }}>
          </Box> */}
            <Avatar src={headshot} sx={{ height: '100px', width: '100px' }} />
          <Box>
            <Typography variant="h2">Michael Woodward</Typography>
            <Typography variant="h4">Software Developer</Typography>
            <Typography variant="subtitle1">JavaScript, React, Node, SQL</Typography>
            <Typography variant="h6">Chicago, Illinois, USA</Typography>
            <Typography variant="body1">
              michaelwoodward.business@proton.me
            </Typography>
            <Typography variant="body1">
              (555) 555-5555
            </Typography>
            <Box>
              <IconButton sx={{ color: "#fff"}}>
                <FaLinkedin />
              </IconButton>
              <IconButton sx={{ color: "#fff"}}>
                <TextSnippetIcon />
              </IconButton>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={12} p={2} sx={{ background: "#333", color: "#fff"}}>
          <Typography variant="h3">Contact Me</Typography>
          <Typography variant="body1">
            Have an idea for an app? Need help with a website? 
          </Typography>
          <Typography variant="subtitle2">
            I am available for hire interested in flexible remote contract work
          </Typography>
          {/* Schedule a demo */}
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
            <Button variant="contained" color="secondary">Email</Button>
            <Button variant="outlined" color="primary">Text</Button>
            <Button variant="outlined" color="primary">Chat AI</Button>
          </Box>
        </Grid>

      </Box>
    </>
  );
}

export default App;