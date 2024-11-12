import { Card, CardContent, Container, Divider, Grid2 as Grid, Toolbar } from "@mui/material";
import Typed from "typed.js"
import { CardFooter, CardHeader, CardTitle } from '@components/ui/card';
import packageJsonContents from '../../../package.json';
import "./App.css";
import FormContainer from "@components/framework/forms/FormContainer";
import { useEffect, useRef } from "react";


const features = [
    {
        name: 'Websites 🖥️',
        url: 'https://cherrytopframework.com',
        thumbnail: '',
    },
    {
        name: 'Applications 📱',
        url: 'https://cherrytopframework.com',
        thumbnail: '',
    },
    {
        name: 'Services 🌎',
        url: 'https://cherrytopframework.com',
        thumbnail: '',
    },
    {
        name: 'APIs 📦',
        url: 'https://cherrytopframework.com',
        thumbnail: '',
    },
    {
        name: 'Databases 🗄️',
        url: 'https://cherrytopframework.com',
        thumbnail: '',
    },
    {
        name: 'Security 🛡️',
        url: 'https://cherrytopframework.com',
        thumbnail: '',
    },
    {
        name: 'Documentation 📝',
        url: 'https://cherrytopframework.com',
        thumbnail: '',
    },
    {
        name: 'Networking 📡',
        url: 'https://cherrytopframework.com',
        thumbnail: '',
    },
    {
        name: 'Automation 🤖',
        url: 'https://cherrytopframework.com',
        thumbnail: '',
    },
    {
        name: 'Integrated AI 🔌',
        url: 'https://cherrytopframework.com',
        thumbnail: '',
    },
    {
        name: 'Design 🎨',
        url: 'https://cherrytopframework.com',
        thumbnail: '',
    },
    {
        name: 'Systems Architecture 🏗️',
        url: 'https://cherrytopframework.com',
        thumbnail: '',
    },
];


function AppLauncherPage() {
    const subtitleRef = useRef(null);
    
    useEffect(() => {
        const typed = new Typed(subtitleRef.current, {
            strings: ["A software engineering company", "Made with ❤️ topped with cherries 🍨🍒", "A software engineering company"],
            typeSpeed: 50,
            backDelay: 4000,
            // showCursor: false
        });

        typed.start();
        // Destroy Typed instance during cleanup to stop animation
        return () => typed.destroy();
    }, []);

    return (
        <Container maxWidth='md' className='intro' sx={{  }}>
            <div className="banner">
                <h1>Cherrytopframework 🍒</h1>
                {/* <h2>A software engineering company</h2> */}
                <h2 ref={subtitleRef}></h2>
                {/* <p>Made with ❤️ topped with cherries 🍨🍒</p> */}
            </div>
            <Divider />
            <div style={{ padding: "32px 96px" }}>
                <h3>About the Founder</h3>
                <p>
                    Hi there 👋, I'm M, (like the letter 😎). I'm a professional application's engineer building software solutions for businesses for over 5 years. Adopting new technologies and passionately building software solutions is the main focus at Cherrytopframework. Having delivered work for multiple startup's and Fortune 500 companies has afforded me the skill and expertise required to offer consultation and build quality software solutions to meet small business needs.
                </p>
                <p>
                    With services that range from building small landing page's, assisting with website builder's, offering consultation, to building and maintaining server's, implementing security, building fullstack application's, and much more. The world is in short supply of professional software solutions for small businesses, and I am here to help you find the right solution for your business!
                </p>
                <p>
                    A small software engineering business that is focused on helping fellow small businesses!
                </p>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <p style={{ fontSize: '2em' }}>🤝</p>
                </div>
            </div>
            <CtaSection />
            <Divider color="inherit" />

            <Grid container spacing={2} m={2} my={4}>
                <Grid size={12}>
                    <h2>Service's We Offer</h2>
                </Grid>
                {features.map((app: any, index: number) => (
                    <Grid key={index} size={3}>
                        <Card elevation={8} sx={{ background: '#001', color: '#dee', p: 2, borderRadius: '16px' }}>
                            <CardHeader>
                                {/* <img src={app.thumbnail || '/default-icon.png'} alt={app.name} className="app-icon" /> */}
                            </CardHeader>
                            <CardContent>
                                <CardTitle>{app.name}</CardTitle>
                            </CardContent>
                            <CardFooter>
                                <a href={app.url} target='_blank' rel="noopener noreferrer" className="open-link">Open</a>
                            </CardFooter>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Divider />
            <CtaSection />

            <div style={{ padding: "32px 96px" }}>
                <h1>Featured Project 💫</h1>
                <img src="placeholder.png" alt="coming soon" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                <p>Coming Soon! 🚀</p>
                <a>Explore the Client Portal</a> ✅
                <h3>Have a question or want to build something?</h3>
            </div>

            <div style={{ padding: "32px 96px", border: '1px solid #eee', borderRadius: '8px', textAlign: 'center' }}>
                <h2>Leave your contact information below and we'll reach out to you! 🍻</h2>
                <FormContainer schema={{
                    table: "Name",
                    columns: [
                        {
                            name: "name",
                            label: "Name",
                            type: "text",
                            required: true
                        },
                        {
                            name: "email",
                            label: "Email",
                            type: "email",
                            required: true
                        },
                        {
                            name: "work",
                            label: "Type of Work?",
                            type: "text",
                            required: true
                        }
                    ]
                }} />
            </div>

            <Toolbar />

            <div>
                <h2>Want to get to know us better?</h2>
                <div style={{ textAlign: 'center' }}>
                    <p><a>Blog</a> · <a>LinkedIn</a> · <a>Instagram</a> · <a>X</a> · <a>Discord</a></p>
                    <p><a>inquiries@cherrytopframework.pro</a></p>
                </div>
            </div>
            <Toolbar />
        </Container>
    );
};

export default AppLauncherPage;

const CtaSection = () => {
    return (
        <div style={{ padding: "32px 96px", border: '1px solid #eee', borderRadius: '8px' }}>
            <h3>Cherrytopframework 🍒</h3>
            <p>☎️ Schedule a quick 15 minute call to learn more about <b>Cherrytopframework</b> 🍒</p>
            {/* todo => UPDATE THIS TO scheduling@cherrytopframework.pro */}
            <a href="https://calendly.com/woodward-michael-a" target="_blank">Calendly</a>
        </div>
    );
};


const Demo = () => {
    return (
        <>
            <p>Take Note** Strict Stack Webpack React Typescript Vitest (Tailwind | MUI)</p>
            <p>Version 0.1.0</p>
            <p>Coming Soon! v2 will be a more refined version than v1. Lots of packages that are outdated or not used anymore in favor of more modern technologies.</p>
            <p>Should probably include basic routing and starter tests in v2</p>
            <p>The intention of this app is to provide a quick starting point to building front end apps within Cherrytopframework</p>
            <p>Please review the package's that are included before starting</p>
            <pre>{JSON.stringify(packageJsonContents.dependencies, null, 2)}</pre>
            <pre>{JSON.stringify(packageJsonContents.devDependencies, null, 2)}</pre>
        </>
    )
}