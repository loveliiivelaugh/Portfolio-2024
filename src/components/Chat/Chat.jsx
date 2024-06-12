import { forwardRef, useRef } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Box, CircularProgress, Typography } from '@mui/material';
import { motion } from 'framer-motion';

import ChatTextField from './layout/ChatTextField';
import ChatDrawer from './layout/ChatDrawer';
// import ToolsWindowDrawer from './layout/ToolsWindowDrawer';
import { ChatView, CameraView, ImageView, VoiceView } from './views';

import { queries } from './api';
import { useChatStore } from './store'


const hostname = import.meta.env.VITE_HOSTNAME;

const Chat = forwardRef((props, ref) => {
    const chatStore = useChatStore();
    const query = useQuery(queries(chatStore).readFromDb('chats'));
    const serverMutation = useMutation(queries(chatStore).postToServer())
    const braveSearchQuery = useQuery(queries(chatStore).getBraveSearchQuery)
    // get one session from chat history to prepopulate the chat 
    const sessionQuery = useQuery(queries(chatStore).readOneFromDb());
    console.log("sessionQuery: ", sessionQuery)


    const textFieldRef = useRef();

    const getMetaData = () => ({
        model: chatStore.defaultModel,
        session_id: chatStore.activeChat?.session_id,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString()
    });


    const handleSendMessage = async () => {
        const { inputMessage } = chatStore;

        console.log('handleSendMessage.input: ', inputMessage)
        if (inputMessage.trim() !== '') {
            if (['/create', '/chat', '/imagine', '/internet'].includes(inputMessage)) {
                chatStore.handleMode(inputMessage.split('/')[1] || 'chat');
                chatStore.clearInput();
            }
            else if (chatStore.mode === "internet") {
                // make request to brave search api
                const response = await braveSearchQuery.refetch({ query: inputMessage });
                console.log("BraveSearchQuery response: ", response)

                // const summaries = Promise.all(response.data.map(async (item) => {
                //     const summary = await puppeteerQuery.refetch();
                // }))

                // Open Tools Window Drawer
                chatStore.setToolsWindowDrawer(true);

                // Build response message in UI of Drawer

                // Use AI to determine which links to use

                // Make text query with the information from the search results

                // Reset isInternetQuery
                chatStore.setIsInternetQuery(false);
            }
            else {
                const message = {
                    ...getMetaData(),
                    text: inputMessage, 
                    sender: 'user' 
                };

                // Add user's message to the chat state
                chatStore.addMessage(message);

                // Define success handler callback -- Add response message to store
                const handleSuccess = (result) => chatStore
                    .addMessage({
                        ...getMetaData(),
                        sender: 'bot',
                        text: result?.response,
                        model: result?.model,
                        ...result?.image && { imageSrc: result.image }
                    });

                // Combining updating database and making request to llm
                // Only need to send the current message and conversation id
                // Will query the running messages from the backend
                await serverMutation.mutate({
                    url: `${hostname}/api/llms/postChat`,
                    payload: {
                        chatMode: chatStore.mode,
                        id: chatStore.activeChat.id,
                        message
                    }
                }, { onError: console.error, onSuccess: handleSuccess });

                // Refetch Chat Query to align chat state with multiple db updates
                query.refetch();
            }
            // // auto-scroll the container to the bottom
            // scrollChatToBottom();
        }
        // Clear the input
        chatStore.clearInput()
    };

    const handleSendPicture = async () => {
        const { imageSrc, inputMessage } = chatStore;
        if (imageSrc) {
            // Add user's message to the chat
            chatStore.addMessage({
                ...getMetaData(),
                text: inputMessage, 
                imageSrc, 
                sender: 'user' 
            });
            
            // Define success handler callback -- Add response message to store
            const handleSuccess = (result) => chatStore
                .addMessage({
                    ...getMetaData(),
                    sender: 'bot',
                    text: result?.response,
                    model: result?.model,
                    ...result?.image && { imageSrc: result.image }
                });

            // Combining updating database and making request to llm
            // Only need to send the current message and conversation id
            // Will query the running messages from the backend
            await serverMutation.mutate({
                url: `${hostname}/api/llms/postChat`,
                payload: {
                    id: chatStore.activeChat.id,
                    message: ({
                        ...getMetaData(),
                        sender: 'user',
                        text: inputMessage,
                        model: 'llava:7b-v1.6',
                        imageSrc: imageSrc,
                        visionMode: chatStore.visionMode
                    })
                }
            }, { onError: console.error, onSuccess: handleSuccess });

            // Reset
            chatStore.handleImageSrc(null);
            chatStore.handleImageClassification(null);
            // Reset view
            chatStore.handleView("chat");
        }
        // Clear the input

        // // auto-scroll the container to the bottom
        // scrollChatToBottom();
    };

    const handleKeyPress = (event) => {
        console.log("key pressed: ", event, textFieldRef);

        if ((event.shiftKey && event.key === 'Enter')) 
            chatStore.handleInput(chatStore.inputMessage + '\n');
        else if (event.key === 'Enter' && chatStore.imageSrc) handleSendPicture();
        else if (event.key === 'Enter') handleSendMessage();
        else if (event.key === 'Escape') {
            chatStore.handleImageSrc(null);
            // Reset view
            chatStore.handleView("chat");
        }
    };

    let isGettingThingsReady = (
        query.isLoading 
        || query.isFetching
        || sessionQuery.isLoading
        || sessionQuery.isFetching
    );

    const imageViewProps = {
        inputMessage: chatStore.inputMessage,
        setInputMessage: chatStore.handleInput,
        handleSendPicture
    };

    const chatViewProps = {
        ...imageViewProps,
        chatSessionsFetching: isGettingThingsReady,
        isLoading: isGettingThingsReady,
        handleSendMessage
    };

    const chatTextFieldProps = {
        ...imageViewProps,
        handleKeyPress,
        textFieldRef,
    };

    const views = {
        chat: <ChatView {...chatViewProps} />,
        voice: <VoiceView />,
        camera: <CameraView />,
        image: <ImageView {...imageViewProps} />,
        launching: (
            <motion.div>
                <Box sx={{ height: '100vh', width: '100vw', background: '#333', pt: "50%", textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ color: 'white' }}>
                        Getting things ready
                    </Typography>
                    {/* <SparklesCore /> */}
                    <CircularProgress />
                </Box>
            </motion.div>
        ) 
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            style={{ width: "100vw" }}
        >
            {isGettingThingsReady 
                ? views["launching"]
                : views[chatStore.view] || views['chat']
            }
            <ChatDrawer />
            {/* <ToolsWindowDrawer /> */}
            {["chat", "image"].includes(chatStore.view) && 
                <ChatTextField {...chatTextFieldProps} />
            }
        </motion.div>
    )
});

export default Chat