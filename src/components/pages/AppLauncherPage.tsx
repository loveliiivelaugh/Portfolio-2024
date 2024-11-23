import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Typed from "typed.js"
import { 
    Accordion, AccordionDetails, AccordionSummary, AppBar, Button,
    Card, CardContent, Container, Divider, Grid2 as Grid, Toolbar 
} from "@mui/material";
import { CardFooter, CardHeader, CardTitle } from '@components/ui/card';
import FormContainer from "@components/framework/forms/FormContainer";

import apiDiagramImage from "../../utilities/assets/api_diagram.png";
import aiLogo from "../../utilities/assets/ai-logo.png";
import "../App/App.css";


const features = [
    {
        name: 'Websites 🖥️',
        url: 'https://cherrytopframework.com',
        thumbnail: '',
        accordianContent: `
        <div>
            <p>Static websites</p>
            <p>Dynamic websites</p>
            <p>Landing Pages</p>
            <p>Wordpress</p>
        </div>
        `
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

const Keyword = ({ children }:{children: any}) => (<a style={{ cursor: 'pointer'}}><b>{children}</b></a>);

function AppLauncherPage() {
    const [activeService, setActiveService] = useState<null | any>(null);
    const subtitleRef = useRef(null);
    
    useEffect(() => {
        const typed = new Typed(subtitleRef.current, {
            strings: [
                "A software engineering company", 
                "Custom Web Applications & Automations", 
                "A software engineering company"
            ],
            typeSpeed: 50,
            backDelay: 4000,
            showCursor: false
        });

        typed.start();
        // Destroy Typed instance during cleanup to stop animation
        return () => typed.destroy();
    }, []);

    return (
        <Container maxWidth='md' className='intro' sx={{  }}>
            <AppBar>
                <Toolbar sx={{ background: "#222", display: "flex", justifyContent: "space-between" }}>
                    <Keyword>Michael Woodward 💡</Keyword>
                    <div style={{ display: "flex", gap: "8px", textAlign: "center" }}>
                        <Keyword>Home</Keyword>
                        <Keyword>Blog</Keyword>
                        <Keyword>Resume</Keyword>
                        <Keyword>
                            <Link to="/lessons">Lessons</Link>
                        </Keyword>
                    </div>
                    <Keyword>{""}</Keyword>
                </Toolbar>
            </AppBar>
            <Grid container className="banner" style={{ textAlign: "left" }}>
                <Grid size={6}>
                    <img src={aiLogo} alt="Business Headshot" style={{ width: "100%", borderRadius: "16px" }} />
                </Grid>
                <Grid size={6} sx={{ p: 2}}>
                    <h1>Michael Woodward</h1>
                    <h2 ref={subtitleRef}></h2>
                    <h3>Professional Software Engineer Solopreneur</h3>
                    <h4><i>A lean, agile, software engineering team embracing today's technologies</i></h4>
                </Grid>
            </Grid>
            <Divider />
            <div>
                <h2>Who am I?</h2>
                <p>
                    Hi👋 I'm Michael! I am a full stack software engineer with over 5 years of professional experience working in the tech industry. I have a certificate of full stack development from Northwestern University and I have performed work for 2 startup's, and 2 Fortune 500 companies, 1 national, and 1 international, where I am still employed currently. The experience I have acquired has uniquely positioned me with the skills required to plan, build, and maintain almost any software project, especially as it pertains to business and more specifically enterprise business. I specialize in building custom application's both in the front end and in the back end. I am also proficient in database architecture and engineering. Finally, but not yet exhaustively, I am also proficient in API development, AI integration's, and custom Automation's.
                </p>
                <p>I am a JavaScript (TypeScript) and React expert first, a Node and Express expert second, and additionally I have some skills in Python and Bash scripting.</p>
                <p>I am a Solopreneur and solo fullstack software engineer. My goal is to offer my skills and services to help support small businesses with the technology assistance required in today's modern marketplace.</p>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <span style={{ fontSize: '2em' }}>🤝</span>
                </div>
            </div>

            <div>
                <h2>What We Do</h2>
                <p>
                    We specialize in AI integrations, automation, web development, database and API design, and custom software solutions. Our expertise includes OpenAI (ChatGPT) integration, Google API library integration, and popular platforms like WordPress, Shopify, and Stripe. We also provide SEO services, web services administration, and self-hosting consultations. Whether it's authentication, user management, zero-trust security, or private business organization and supporting software suites, we've got you covered. From small landing pages and website builder assistance to full-stack application development and server management, we offer end-to-end solutions tailored for small businesses. Our goal is to be your one-stop shop for all your software needs—delivering professional, reliable, and scalable solutions to help your business thrive. 
                </p>
                {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <span style={{ fontSize: '2em' }}>🤝</span>
                </div> */}
            </div>

            <div>
                <h2>What are API's and why do we need them?</h2>
                <p>
                    Application Programming Interface. This is a software layer that developers voluntarily build so that two separate softwares have a means of communicating with each other. This is how we build our API's. This is also how we consume the API's of other service's that are publicly available. Some of these include <Keyword>Google's suite of API's</Keyword>, Salesforce's API's, OpenAI, APIMarketPlace, Nutritionix, and many more. See this doc for a comprehensive list of API's found all over the open internet. All of our API development comes equipped with interactive documentation, written documentation, unit tests, integration tests, and security to ensure the API's we build are performant and secure. We build API's in the RESTful and GraphQL protocols. Here are some example's 👉
                </p>
                <img src={apiDiagramImage} alt="API diagram" style={{ width: "800px", border: '2px solid #ccc' }} />
                <p>A popular trend in the marketplace today is to use tools like <Keyword>Zapier</Keyword> to achieve these integrations</p>
            </div>
            <div>
                <h2>How do we do automation?</h2>
                <a href="https://n8n.io/">n8n</a>
                <p>
                    Using a few different tools that are available in the marketplace today. Some of these include the popular tool <Keyword>n8n</Keyword>. We host our own instance of n8n and we use code and programming languages such as Python, JavaScript, and automated Bash scripts. Using these tools in combination with the available API's in the marketplace, the ability to build automation's is endless!
                    Some other notable technologies include Process Builder within the Salesforce eco system, and other mainstream low-code or no code tools like Zapier or make.com. If there is not an API available for a specific integration, then it is possible to explore custom web scraping solutions following all legal obligations.
                </p>
            </div>
            <div>
                <h2>AI Integrations?</h2>
                <p>
                    Technology is moving faster and faster especially today. AI is almost everywhere we look now a days and this is most likely only the very beginning of the age of AI. At Cherrytopframework we embrace AI as a tool that can be used to help us grow our business and help us improve our work allowing us to be more accurate and efficient. There are plenty of paid AI services available in the marketplace today such as <Keyword>OpenAI's</Keyword> ChatGPT, Claude, Google's Gemini, and many more. One of the ways that we can use these services is through the API's these companies make available to developers to use in creative ways. We are happy to build these custom AI integrations in our platform. Aside from these paid services, we also offer our own hosted AI services that allow for more flexibility in cost, and in other ways. One of the tools that we use to do this is with <Keyword>Ollama</Keyword>.
                </p>
            </div>

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
                                <Button onClick={() => activeService
                                    ? setActiveService(null)
                                    : setActiveService({...app, index})
                                }>Open</Button>
                            </CardFooter>
                        </Card>
                        {Boolean(activeService) && (activeService?.index === index) && (
                            <Accordion expanded={Boolean(activeService) && (activeService?.index === index)}>
                                <AccordionSummary
                                    expandIcon={<></>}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    {activeService?.name}
                                </AccordionSummary>
                                <AccordionDetails>
                                    {(activeService?.accordianContent)}
                                </AccordionDetails>
                            </Accordion>
                        )}
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
            <h3>Learn More</h3>
            <p>☎️ Schedule a quick 15 minute call to learn more about our services</p>
            {/* todo => UPDATE THIS TO scheduling@cherrytopframework.pro */}
            <a href="https://calendly.com/woodward-michael-a" target="_blank">Calendly</a>
        </div>
    );
};

// const SelfHostingSection = () => {
//     return (
//         <>
//             <div>
//                 <h2>What is self hosting?</h2>
//                 <p>
//                     Self hosting is the process of running your own server and hosting your own software. We provide a fully end to end service to set up private hosting for you, your home, or your business. Self hosting enables you to have full control over your own server, and to have full control over your own software. Software that is available to you when using your own hosting solutions are open source and can easily replace most if not all paid enterprise software that is commonly used for business. Self-hosting also enables using <Keyword>Home Assistant</Keyword> the most advanced open source home automation platform. This runs on your own server using your own resources so you will benefit from full privacy, security, and autonomy over your own data. Home Assistant can be integrated with Ollama to completely replace Alexa privately for free (outside of the maintenance costs of your own server) while being upgraded with AI. (Which we could connect to the internet or other IoT devices for free) There are countless more opportunities unlocked when self-hosting. Refer to this document for a comprehensive list of open source software that can be hosted with your own server for free.
//                 </p>
//                 <p>See the following to learn more about self hosting:</p>
//                 <li><Keyword>Hostinger</Keyword></li>
//                 <li><Keyword>Linode</Keyword></li>
//                 <li><Keyword>Digital Ocean</Keyword></li>
//                 <li><Keyword>AWS</Keyword></li>
//                 <li><Keyword>GCP</Keyword></li>
//                 <li><Keyword>Cloudflare</Keyword></li>
//                 <li><Keyword>Namecheap</Keyword></li>
//                 <li><Keyword>Netlify</Keyword></li>
//                 <li><Keyword>Github Pages</Keyword></li>
//                 <h2>What will it cost me to self host?</h2>
//                 <p>
//                     The answer to this really varies. At the foundation we are essentially borrowing resources from another computer (server). Depending on how many computers you have and how many cores you have, the cost will vary. Also depending on what kind of software you want to run and how many active users that will be connecting to the services among other things. High performance AI requires a lot of resources, specifically compute.
//                 </p>
//                 <p>At the very lowest end to rent a VPS (server) you can expect to pay anywhere from $5 to $15 per month.</p>
//             </div>
//             <CtaSection />
//             <Divider color="inherit" />
//         </>
//     )
// };