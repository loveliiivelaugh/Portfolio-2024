import { useState } from 'react';
import Markdown from 'react-markdown'
import { 
  Box, Button, Grid, Typography,
  Container, Divider,
  Modal,
  Avatar, List, ListItem, ListItemText, Toolbar, IconButton, Tooltip, ListItemButton, TextField
} from '@mui/material'
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import LaunchIcon from '@mui/icons-material/Launch';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { FaLinkedin } from "react-icons/fa";
import CloseIcon from '@mui/icons-material/Close';

import { cms } from './utilities/cms';
import headshot from './assets/images/headshot-cropped.png'





const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
};

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [form, setForm] = useState({})

  const handleReadMore = (post) => {
    setSelectedPost(post);
    setModalOpen(true);
  };

  const handleSchedule = () => {
    setModalOpen(true);
    setSelectedPost({ schedule_form: true });
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
    setModalOpen(false);
  };

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.id]: e.target.value }));

  const formData = [
    {
        id: 'name',
        key: 'name',
        label: 'Your Name',
        variant: 'outlined',
        value: form['name'],
        onChange: handleChange,
        placeholder: 'Enter your name',
        type: 'input',
    },
    {
        id: 'email',
        key: 'email',
        label: 'Email address',
        variant: 'outlined',
        value: form['email'],
        onChange: handleChange,
        placeholder: 'Enter your email address',
        type: 'input',
    },
    {
        id: 'companyName',
        key: 'companyName',
        label: 'Company Name',
        variant: 'outlined',
        value: form['companyName'],
        onChange: handleChange,
        placeholder: 'Enter your company name',
        type: 'input',
    },
    {
        id: 'companyUrl',
        key: 'companyUrl',
        label: 'Company URL',
        variant: 'outlined',
        value: form['companyUrl'],
        onChange: handleChange,
        placeholder: 'Enter your company URL',
        type: 'input',
    },
    {
        id: 'servicesNeeded',
        key: 'servicesNeeded',
        label: 'What Services Do You Need?',
        variant: 'outlined',
        value: form['servicesNeeded'],
        onChange: handleChange,
        placeholder: 'Enter the services needed',
        type: 'input',
    },
    {
        id: 'budget',
        key: 'budget',
        label: 'Our Budget is',
        variant: 'outlined',
        value: form['budget'],
        onChange: handleChange,
        placeholder: 'Enter your budget',
        type: 'input',
    },
    {
        id: 'copywriteStatus',
        key: 'copywriteStatus',
        label: 'What is your copywrite status',
        variant: 'outlined',
        value: form['copywriteStatus'],
        onChange: handleChange,
        placeholder: 'Enter your copywrite status',
        type: 'input',
    },
    {
        id: 'designStatus',
        key: 'designStatus',
        label: 'What is your design status',
        variant: 'outlined',
        value: form['designStatus'],
        onChange: handleChange,
        placeholder: 'Enter your design status',
        type: 'input',
    },
    {
        id: 'deadline',
        key: 'deadline',
        label: 'Our deadline is',
        variant: 'outlined',
        value: form['deadline'],
        onChange: handleChange,
        placeholder: 'Enter your deadline',
        type: 'input',
    },
    {
        id: 'description',
        key: 'description',
        label: 'Project Description',
        variant: 'outlined',
        value: form['description'],
        onChange: handleChange,
        placeholder: 'Give a brief explanation of the project in mind',
        type: 'input',
    },
];

const handleSubmit = (e) => {
  e.preventDefault();
  console.log("Submitted Form: ", form);

  const link = document.createElement("a");
  link.href="https://calendly.com/woodward-michael-a/15min"
  link.target='_blank'
  link.rel="noreferrer"
  link.click();

  // Send form data to server to send email with data
  setForm({});

  setModalOpen(false);
}

  return (
    <>

    <Modal open={modalOpen}>
      <Box sx={style}>
        <Toolbar sx={{ justifyContent: "end" }}>
          <IconButton onClick={handleCloseModal}>
            <CloseIcon />
          </IconButton>
        </Toolbar>

        {selectedPost?.schedule_form
          ? (
            <Box component="form" onSubmit={handleSubmit}>
              <Typography variant="h4" gutterBottom>
                Project Details
              </Typography>
              <Grid container spacing={2} mb={2}>
                {formData.map(fieldProps => (
                  <Grid item xs={12}>
                    <TextField {...fieldProps} fullWidth />
                  </Grid>
                ))}
              </Grid>
              <Divider />
              <Box sx={{ display: "flex", justifyContent: "right", gap: 2, mt: 2 }}>
                <Button variant="outlined" color="primary" onClick={() => setModalOpen(false)}>
                  Back
                </Button>
                <Button variant="contained" color="primary" type={"submit"}>
                  Confirm
                </Button>
              </Box>
            </Box>
          ) : (
            <>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h4" gutterBottom>
                  {selectedPost?.title}
                </Typography>
                {selectedPost?.image && (
                  <img 
                    src={selectedPost?.image} 
                    alt="project thumbnail" 
                    style={{ 
                      width: 160, 
                      height: 320, 
                      border: '8px solid rgba(0, 0, 0, 1)', 
                      borderRadius: "10px" 
                    }} 
                  />
                )}
              </Box>
              <Markdown>
                {selectedPost?.body}
              </Markdown>
              {selectedPost?.type.includes("project") && (
                <Box sx={{ textAlign: "right" }}>
                  <Tooltip title="Source Code">
                    <IconButton href={selectedPost?.github} target='_blank' noreferrer>
                      <GitHubIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="View Demo">
                    <IconButton href={selectedPost?.url} target='_blank' noreferrer>
                      <LaunchIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              )}
            </>
          )}
      </Box>
    </Modal>

    <Box sx={{ minHeight: "100vh" }}>
      <Box sx={{ height: '24vh', width: '100%', background: '#232323' }}>
        {/* Hero Section */}
        <Typography variant="h4" sx={{ color: "#Fff", px: 2, pt: 6 }}>
          Woodward Digital Services
        </Typography>
        <Typography variant="body1" sx={{ color: "#Fff", px: 2 }}>
          Web Design and Development
        </Typography>
      </Box>
      <List size="small">
        <Typography variant="h3" sx={{ color: "#333", px: 2 }}>
          Services
        </Typography>
        <Grid container>
          {[
            {
              primary: "Web Development",
              secondary: "Websites - Web Apps - Servers & Infrastructure"
            },
            {
              primary: "Mobile Development",
              secondary: "Mobile Apps"
            },
            {
              primary: "UI / UX Design",
              secondary: "User first design"
            }
          ].map((service, index) => (
            <Grid item xs={12} key={index}>
              <ListItem >
                <ListItemText {...service} />
              </ListItem>
            </Grid>
          ))}
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
              onClick={handleSchedule}
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
              See Demo Project
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
                  height: 420,
                  width: 200, 
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
              <Typography variant="body1" textAlign={"left"}>
                {post.body}
              </Typography>
              <Box textAlign={"right"}>
                <Typography variant="subtitle2" gutterBottom>
                  Wednesday, Februrary 21, 2024
                </Typography>
                <Box sx={{ display: "flex", justifyContent: post.type.includes('project') ? "space-between" : "right" }}>
                  {post.type.includes('project') && (
                    <Box>
                      <Tooltip title="Source Code">
                        <IconButton href={post.github} target='_blank' noreferrer>
                          <GitHubIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="View Demo">
                        <IconButton href={post.url} target='_blank' noreferrer>
                          <LaunchIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  )}
                  <Button variant="outlined" color="primary" onClick={() => handleReadMore(post)}>
                    Read More
                  </Button>
                </Box>
              </Box>
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
            <Typography variant="h4">Web Developer</Typography>
            <Typography variant="subtitle1">JavaScript, React, Node, SQL</Typography>
            <Typography variant="h6">Chicago, Illinois, USA</Typography>
            <Typography variant="body1">
              michaelwoodward.business@proton.me
            </Typography>
            <Typography variant="body1">
              (555) 555-5555
            </Typography>
            <Box>
              <IconButton sx={{ color: "#fff"}} href="https://www.linkedin.com/in/michaelanthonywoodward/" target="_blank" rel="noreferrer">
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
