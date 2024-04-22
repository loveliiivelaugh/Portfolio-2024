// Packages
import { forwardRef } from 'react';
import axios from 'axios';
import {
    Box,
    TextField, Typography, IconButton,
    InputAdornment, InputLabel,
    Toolbar, Drawer, Divider, List, ListItem, ListItemButton,
    CircularProgress, Tabs, Tab, ListItemText,
    ListItemIcon,
    Backdrop
} from '@mui/material';

// Icons
import { Edit, Email, Lock } from '@mui/icons-material';
import SendIcon from '@mui/icons-material/Send';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import { useMutation, useQuery } from '@tanstack/react-query';

// Services
import { cms } from '../../../utilities/cms';
import { useChatStore } from "../store";
import { queries } from "../api";

// import 'react-lazy-load-image-component/src/effects/opacity.css';

// import notionIcon from '../../assets/notion_icon.png';
const notionIcon = null;


const hostname = import.meta.env.VITE_HOSTNAME;

const ChatDrawer = forwardRef((props, ref) => {
    const chat = useChatStore();
    const mutation = useMutation(queries(chat).modifyDb2());
    const availableModels = useQuery(queries(chat).readFromDb('models'))
    const ingestedFiles = useQuery(queries(chat).getIngestedFilesQuery);
    // const cb = (data) => {
    //     console.log("getChatsQuery: in callback: ", data)
    //     // handleChatSelection(data.data[0]);
    //     return data;
    // }
    const getChatsQuery = useQuery(queries(chat).readFromDb('chats'));
    const { 
        data, 
        isLoading: chatSessionsIsLoading, 
        isFetching: chatSessionsFetching,
        refetch: refetchChatSessions,
    } = getChatsQuery;

    let chatSessions = data?.data

    let isSomethingWrong = (!availableModels.data || !ingestedFiles.data || !chatSessions);
    if (isSomethingWrong) 
        return <Backdrop />;

    if (chatSessionsIsLoading || chatSessionsFetching) {
      return <CircularProgress />
    }

    const handleNewSession = async (e) => {
        e?.preventDefault();

        await mutation.mutate({
            method: "post",
            endpoint: "create_row",
            table: "chats",
            payload: {
                session_name: chat.activeChat?.session_name,
                messages: []
            }
        }, {
            onError: console.error,
            onSuccess: (response) => {
                chat.setMessages(response.messages || []);
                chat.handleDrawer(false)
                chat.setDrawerView("read")
            }
        });
        await refetchChatSessions();

    }

    const deleteChatSession = async (session) => {
        console.log("deleteChatSession: ", session)
    }

    const handleChange = (e) => {
        chat.handleActiveChat({ 
            ...chat?.activeChat, 
            session_name: e.target.value 
        })
    }

    const handleDownload = (message) => {
        const link = document.createElement('a');
        link.download = 'ai-family-image.png';
        link.href = message?.imageSrc;
        link.click();
    }

    const handleChatSelection = async (selection) => {
        chat.handleDrawer(false);
        chat.handleActiveChat(selection);
        console.log('handleChatSelection: ', selection, data, chat)

        // use selection.session_id to query for the chat history
        // const response = await readOne.refetch({ table: 'chats', id: selection.session_id });
        const uri = `${hostname}/api/system/read_one_row?table=chats&id=${selection.session_id}`
        const response = await axios(uri);
        console.log("READONEROW response: ", response)

        chat.setMessages(response.data.messages || [])

        refetchChatSessions();

        // // props.scrollChatToBottom();
        // chat.createAlert({
        //     type: "success",
        //     message: `${selection?.session_name} selected`
        // })
    }

    const handleExportToNotion = async () => {
        try {
            // Create Notion Page with chats as page content
            const response = await createPage({ 
                title: chat?.activeChat?.session_name, 
                content: chat?.messages || [] 
            });

            // Add the new Notion page name and page id to saved in database
            await add({
                table: 'blogs',
                payload: {
                    page_id: response?.data?.id,
                    name: chat?.activeChat?.session_name
                }
            });

            // // Trigger Success Alert
            // actions.createAlert({ 
            //     type: "success", 
            //     message: `${chat?.activeChat?.session_name} Exported to Notion` 
            // });

            // Create PDF
            const pdf = await actions.createPdf(chat?.messages
                .map(message => `${message?.sender}: ${message?.text}`)
                .join('\n') || '');

            console.log("pdf: ", pdf);
            const formData = new FormData();
            formData.append('file', pdf?.blob, `${chat?.activeChat?.session_name}.pdf`);

            // Upload PDF to PrivateGPT
            const uploadResponse = await ingestDocument(formData);

            console.log("uploadResponse: ", uploadResponse);

            // // Trigger Success Alert
            // actions.createAlert({ 
            //     type: "success", 
            //     message: `Ingested ${chat?.activeChat?.session_name} to PrivateGPT` 
            // });

        } catch (error) {
            console.error(error);
            // Trigger Error Alert
            actions.createAlert({ type: "error", message: error?.messager || "An error occurred" });
        }
    }

    const handleAddAttachment = async () => {

        const attachmentInput = document.createElement('input');

        attachmentInput.setAttribute('type', 'file');
        attachmentInput.click();

        attachmentInput.onchange = async () => {

            const file = attachmentInput.files[0];

            const formData = new FormData();

            formData.append('pdf', file);

            // Ingest is not working all the way yet. 
            // Upload to server is working but ingest to PrivateGPT is not
            const uri = `${hostname}/api/llms/ingest-files`;

            const response = await fetch(uri, {
                method: "post",
                body: formData
            });

            console.log("response: ", response);
        };
    };
    

    return (
        <Drawer open={chat.drawerOpen} onClose={() => chat.handleDrawer(false)} anchor='bottom'>
            <Box sx={{ maxHeight: 700, height: "auto", textAlign: "right", overflow: "auto" }}>
                {{
                    "0": ( // Chat sessions
                    <List>
                        <Toolbar sx={{ justifyContent: "space-between" }}>
                            <Typography variant="h6" p={1}>
                            {chat.drawerView === "add" ? "Add Chat Session" : "Chat Sessions"}
                            </Typography>
                            {(chat.drawerView !== "add") && (
                                <IconButton onClick={() => {
                                    chat.handleDrawer(false)
                                    chat.setDrawerView("add")
                                    chat.handleDrawer(true)
                                }} color="inherit"> 
                                    <AddIcon />
                                </IconButton>
                            )}
                        </Toolbar>
                        <Divider />
                        {chat.drawerView === "add" ? (
                            <Box component="form" sx={{ width: "100%", p: 1 }} onSubmit={handleNewSession}>
                                <InputLabel>
                                    Chat Name
                                </InputLabel>
                                <TextField
                                    id="chat-name-textfield"
                                    type="text"
                                    name="chat-name"
                                    fullWidth
                                    placeholder='Name the chat session'
                                    onChange={handleChange}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    color="primary"
                                                    aria-label="send"
                                                    size="small"
                                                    type="submit"
                                                >
                                                    <SendIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Box>
                        ) : chatSessions
                            && chatSessions.map((session, index) => (
                            <ListItem
                                key={index} 
                                sx={{ 
                                    borderBottom: 'solid 1px rgba(0,0,0,0.1)', 
                                    '&:hover': { background: "rgba(0,0,0,0.1)" }
                                }}
                            >
                                <ListItemButton onClick={() => handleChatSelection(session)}>
                                    <ListItemText primary={session?.session_name} secondary={session.date} />
                                </ListItemButton>
                                <IconButton size="small" color="error" onClick={() => deleteChatSession(session)}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItem>
                        ))}
                    </List>
                    ),
                    "1": ( // Available Models
                        <List>
                            <Toolbar sx={{ justifyContent: "space-between" }}>
                                <Typography variant="h6" px={1}>
                                    Available Models
                                </Typography>
                                <Typography variant="subtitle2" px={1}>
                                    Choose a default model to use
                                </Typography>
                            </Toolbar>
                            <Divider />
                            {
                                availableModels?.isLoading 
                                ? <CircularProgress /> 
                                : [
                                    // available models coming directly from Ollama
                                    ...availableModels ? availableModels?.data?.data : [],
                                    // Have to add non-Ollama models manually
                                    { name: "PrivateGPT", value: "PrivateGPT" },
                                    { name: "Llama 2 Online", value: "Llama 2:online" },
                                    { name: "Llama 2 Functions", value: "Llama 2:functions" },
                                ].map((model, index) => (
                                <ListItem
                                    key={index} 
                                    sx={{ 
                                        borderBottom: 'solid 1px rgba(0,0,0,0.1)',
                                        flexDirection: "column",
                                        '&:hover': { background: "rgba(0,0,0,0.1)" }
                                    }}
                                >
                                    <ListItemButton onClick={() => chat.setDefaultModel(model?.name)}>
                                        <ListItemText 
                                            primary={model?.name} 
                                            secondary={cms.ai_chat.available_models
                                                .find(({ name }) => (name === model?.name))
                                                ?.description 
                                                || 'No description'
                                            }

                                            secondaryTypographyProps={{
                                                onDoubleClick: (event) => {
                                                    console.log("ListItemText Description.onDoubleClick: ", event)
                                                }
                                            }}
                                        />
                                        {["dolphin", "Online"].includes(model?.name) && (
                                            <ListItemIcon>
                                                <Lock />
                                            </ListItemIcon>
                                        )}
                                    </ListItemButton>
                                    {/* <ListItemButton>
                                        Docs
                                    </ListItemButton> */}
                                </ListItem>
                            ))}
                        </List>
                    ),
                    "2": ( // Ingested Files (Local Files)
                        <List>
                            <Toolbar sx={{ justifyContent: "space-between" }}>
                                <Typography variant="h6" p={1}>
                                    Ingested Files
                                </Typography>
                                <IconButton onClick={handleAddAttachment} color="inherit"> 
                                    <AddIcon />
                                </IconButton>
                            </Toolbar>
                            <Divider />
                            {ingestedFiles.isLoading 
                                ? <CircularProgress />
                                :  (!ingestedFiles.data?.data || !ingestedFiles.data?.data.length)
                                    ? (
                                    <ListItem sx={{ textAlign: "center" }}>
                                        <Typography variant="body1" p={1}>
                                            No files have been ingested yet
                                        </Typography>
                                    </ListItem>
                                ) : ingestedFiles.data?.data.map((file, index) => (
                                    <ListItem
                                        key={index}
                                        sx={{
                                            borderBottom: 'solid 1px rgba(0,0,0,0.1)',
                                            '&:hover': { background: "rgba(0,0,0,0.1)" }
                                        }}
                                    >
                                        <ListItemButton>
                                            <ListItemText primary={file?.doc_metadata?.file_name} />
                                        </ListItemButton>
                                        <IconButton size="small" color="error" onClick={() => deleteDocument(file?.doc_id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItem>
                                ))
                            }
                        </List>
                    ),
                    "3": ( // Chat Settings
                        <List>
                            <Toolbar sx={{ justifyContent: "space-between" }}>
                                <Typography variant="h6" p={1}>
                                    Settings
                                </Typography>
                            </Toolbar>
                            <Divider />
                            {[
                                {
                                    name: "Export to Notion",
                                    icon: <img src={notionIcon} alt="notion icon" style={{ width: 24, height: 24 }} />,
                                    action: handleExportToNotion
                                },
                                {
                                    name: "Export to Google Drive",
                                    icon: <DownloadIcon />
                                },
                                {
                                    name: "Download",
                                    icon: <DownloadIcon />,
                                    action: handleDownload
                                },
                                {
                                    name: "Email",
                                    icon: <Email />
                                },
                                {
                                    name: "Share",
                                    icon: <ShareIcon />
                                },
                                {
                                    name: "Clear Messages",
                                    icon: <DeleteIcon />,

                                },
                                {
                                    name: "Feature Request",
                                    icon: <HelpCenterIcon />,
                                },
                                {
                                    name: "Report Bug",
                                    icon: <HelpCenterIcon />,
                                },
                                {
                                    name: "Help",
                                    icon: <HelpCenterIcon />,
                                },

                            ].map((setting, index) => (
                                    <ListItem
                                        key={index}
                                        sx={{
                                            borderBottom: 'solid 1px rgba(0,0,0,0.1)',
                                            '&:hover': { background: "rgba(0,0,0,0.1)" }
                                        }}
                                    >
                                        <ListItemButton onClick={setting?.action}>
                                            <ListItemIcon>
                                                {setting.icon}
                                            </ListItemIcon>
                                            <ListItemText primary={setting.name} />
                                        </ListItemButton>
                                    </ListItem>
                                ))
                            }
                        </List>
                    ),
                    "4": ( // Group Sessions (Experimental)
                        <List>
                            <Toolbar sx={{ justifyContent: "space-between" }}>
                                <Typography variant="h6" p={1}>
                                    Group Sessions (Experimental)
                                </Typography>
                                <IconButton onClick={() => {
                                    chat.handleDrawer(false)
                                    chat.handleDrawerView("add")
                                    chat.handleDrawer(true)
                                }} color="inherit"> 
                                    <AddIcon />
                                </IconButton>
                            </Toolbar>
                            <Divider />
                            <ListItemButton>
                                <ListItem>
                                    <ListItemText primary="Test Group Sessions" secondary="*Experimental" />
                                </ListItem>
                            </ListItemButton>
                        </List>
                    )
                }[chat.selectedOptionsTab]}
            </Box>

            <Tabs 
                value={parseInt(chat.selectedOptionsTab)}
                onChange={(e) => chat.handleSelectedOptionsTab(e.target.id)} 
                aria-label="chat options tabs"
                centered
            >
                {['Sessions', 'Models', 'Files', 'Settings', 'Group Sessions']
                    .map((label, index) => (
                        <Tab key={index} label={label} id={index} />
                    ))
                }
            </Tabs>

        </Drawer>
    )
})

export default ChatDrawer;