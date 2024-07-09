import { useEffect, useRef, useState } from "react"
import { 
    Box, Container, Fab, Grid, IconButton, InputLabel, 
    MenuItem, Popover, Select, Typography 
} from "@mui/material"
import Mic from "@mui/icons-material/Mic"
import MicOffIcon from '@mui/icons-material/MicOff';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import { styled } from "@mui/material/styles"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

// Services
// import ThreeDotsWave from "../theme/ThreeDotsWave"
// import { SpeakerAlert } from "../theme/SpeakerAlert"


const commands: any = [];
// const commands = [
//     {
//       command: 'I would like to order *',
//       callback: (food) => console.log(`Your order is for: ${food}`)
//     },
//     {
//       command: 'The weather is :condition today',
//       callback: (condition) => console.log(`Today, the weather is ${condition}`)
//     },
//     {
//       command: 'My top sports are * and *',
//       callback: (sport1, sport2) => console.log(`#1: ${sport1}, #2: ${sport2}`)
//     },
//     {
//       command: 'Pass the salt (please)',
//       callback: () => console.log('My pleasure')
//     },
//     {
//       command: ['Hello', 'Hi'],
//       callback: ({ command }) => console.log(`Hi there! You said: "${command}"`),
//       matchInterim: true
//     },
//     {
//       command: ['Aurora'],
//       callback: ({ command }) => console.log(`Hi there! You said: "${command}"`),
//       matchInterim: true
//     },
//     {
//       command: 'Beijing',
//       callback: (command, spokenPhrase, similarityRatio) => console.log(`${command} and ${spokenPhrase} are ${similarityRatio * 100}% similar`),
//       // If the spokenPhrase is "Benji", the message would be "Beijing and Benji are 40% similar"
//       isFuzzyMatch: true,
//       fuzzyMatchingThreshold: 0.2
//     },
//     {
//       command: ['eat', 'sleep', 'leave'],
//       callback: (command) => console.log(`Best matching command: ${command}`),
//       isFuzzyMatch: true,
//       fuzzyMatchingThreshold: 0.2,
//       bestMatchOnly: true
//     },
//     {
//       command: 'clear',
//       callback: ({ resetTranscript }) => resetTranscript()
//     }
// ]

const VoiceContainer = styled(Box)(() => ({
    height: window.innerHeight - 200,
    width: '100vw',
    justifyContent: 'center',
}));

const VoiceView = () => {
    const {
        transcript,
        listening,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition({ commands });
    console.log({transcript, listening });
    // const [speechToText, speechToTextResponse] = useTextToSpeechMutation();
    const [submitted, ] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [, setMediaRecorder] = useState(null)
    const [voiceWidgetOpen, setVoiceWidgetOpen] = useState(false)
    const [audioChunks, setAudioChunks] = useState([])
    const [selectedVoice, setSelectedVoice] = useState("Daniel");

    const voiceWidgetRef = useRef();

    const handleMic = () => listening 
        ? SpeechRecognition.stopListening() 
        : SpeechRecognition.startListening({ continuous: true, language: 'en-US' });
    // const handleMic = () => SpeechRecognition.startListening({ continuous: true, language: 'en-US' });
    const submitText = async (file: any) => {
        console.log("submitText: ", file);
        setIsSubmitting(true);
        // actions.addMessage({
        //     ...actions.getMetaData(), 
        //     text: transcript, 
        //     sender: 'user',
        // });
        // const response = await postChat({
        //     ...actions.getMetaData(), 
        //     prompt: transcript, 
        //     model: 'whisper',
        //     file: file // audio file > server > Whisper > Ollama > Elevenlabs > app
        // });
        // actions.addMessage({
        //     ...actions.getMetaData(), 
        //     text: response?.data, 
        //     sender: 'bot' 
        // });
        setIsSubmitting(false);
        // // resonse.transcription Need to play this audio file
        // const audio = new Audio(response?.transcription);
        // if (audio) audio.play();
        // console.log("Voice response: ", response, postChatResponse);
        // Add text to speech
        // const synth = window.speechSynthesis;
        
        // const utterance = new SpeechSynthesisUtterance(response?.data);
        // utterance.voice = synth.getVoices().find(voice => voice.name === selectedVoice);
        // synth.speak(utterance);
    }

    // const addAudioElement = (blob: any) => {
    //     console.log("addAudioElement: ", blob);
    //     const url = URL.createObjectURL(blob);
    //     const audio = document.createElement("audio");
    //     audio.src = url;
    //     console.log("addAudioElement: ", url);
    //     audio.controls = true;
    //     document.body.appendChild(audio);
    // };

    const configureMediaRecorder = (mediaRecorder: any) => {
        // these two dont work. need a different way to do it
        mediaRecorder.ondataavailable = (e: any) => audioChunks.push(e.data as never);

        mediaRecorder.onstop = () => {
            console.log("recorder stopped");

            console.log("audioChunks: ", audioChunks);
            const blob = new Blob(audioChunks, { type: "audio/ogg; codecs=opus" });
            // Create a File from the Blob
            const file = new File([blob], 'audioFile.ogg', { type: "audio/ogg" });

            console.log("file: ", file);
            submitText(file);
            setAudioChunks([]);
            const audioURL = window.URL.createObjectURL(blob);
            console.log("audioURL: ", audioURL);
            // audio.src = audioURL;
        };
    }

    const handleVoiceChange = (event: any) => {
        console.log("handleVoiceChange: ", event.target.value);
        setSelectedVoice(event.target.value);
    }

    // useEffect(() => {
    //     if (listening) {
    //         SpeechRecognition.startListening();
    //         (mediaRecorder as any).start();
            
    //         // console.log("Ready to receive a color command.");
    //     } else {
    //         SpeechRecognition.stopListening();
    //         console.log("Speech recognition has stopped.", transcript);
    //         // (mediaRecorder as any).stop();

    //         console.log("audioChunks: ", audioChunks);
    //         const blob = new Blob(audioChunks, { type: "audio/ogg; codecs=opus" });
    //         // Create a File from the Blob
    //         const file = new File([blob], 'audioFile.ogg', { type: "audio/ogg" });

    //         console.log("file: ", file);
    //         submitText(file);
    //         setAudioChunks([]);

    //         // if (transcript) submitText();
    //         resetTranscript();
    //     }
    // }, [listening]);

    useEffect(() => {

        (async () => {
            const audioStream = await navigator.mediaDevices
                .getUserMedia({ audio: true })
                // Error callback
                .catch(console.error);

            const recorder = new MediaRecorder(audioStream as MediaStream);
            configureMediaRecorder(recorder);
            setMediaRecorder(recorder as any);
        })()
    }, [])


    return (
        <>
            <Box ref={voiceWidgetRef}>
                <Fab color="primary" aria-label="add">
                    <IconButton onClick={() => setVoiceWidgetOpen(!voiceWidgetOpen)} size="large">
                        {listening ? <MicOffIcon /> : <Mic />}
                    </IconButton>
                </Fab>
            </Box>
            <Popover 
                open={voiceWidgetOpen} 
                onClose={() => setVoiceWidgetOpen(false)}
                anchorEl={voiceWidgetRef.current}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'right',
                }}
            >
                <Grid container sx={{ display: "flex", p: 2 }}>
                    <Grid item sm={12}>
                        <Typography variant="h4" gutterBottom>
                            {(!listening && !isSubmitting) && "Start Speaking"}
                            {(listening && !isSubmitting) && "Listening..."}
                            {isSubmitting && "Submitting..."}
                        </Typography>
                        {(!browserSupportsSpeechRecognition) && (
                            <span>Browser doesn't support speech recognition.</span>
                        )}
                    </Grid>
                    <Grid item sm={12} sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Box>
                            <p>Microphone: {listening ? 'on' : 'off'}</p>
                            <p>{transcript}</p>
                            <p>{submitted && submitted}</p>
                        </Box>
                        <Box>
                            <IconButton onClick={handleMic} size="large">
                                {listening ? <MicOffIcon /> : <Mic />}
                            </IconButton>
                            <InputLabel>
                                Mic
                            </InputLabel>
                        </Box>
                    </Grid>
                    <Grid item sm={12} sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Select
                            value={selectedVoice}
                            onChange={handleVoiceChange}
                            fullWidth
                        >
                            {window.speechSynthesis.getVoices().map((voice) => (
                                <MenuItem value={voice.name}>{voice.name} ({voice.lang})</MenuItem>
                            ))}
                        </Select>
                        <Box pl={2}>
                            <IconButton onClick={() => {}} size="large">
                                <KeyboardIcon />
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>
            </Popover>
        </>
    ) || (
        <Grid container sx={{ mt: 8, px: 2 }}>
            <VoiceContainer>
                <Container maxWidth="sm" sx={{ textAlign: "center" }}>
                    <Typography variant="h5" mt={1}>
                        Under Construction 😎
                    </Typography>
                    <Typography variant="subtitle1">
                        Please be patient. 😅
                    </Typography>
                    {/* <LazyLoadImage 
                        loading="lazy"
                        src={constructionImage} 
                        alt="construction" 
                        style={{ borderRadius: '8px', maxHeight: window.innerHeight - 400 }}
                    /> */}
                    {/* <ThreeDotsWave isLoading={true || isSubmitting} /> */}
                    <Typography variant="h4" gutterBottom>
                        {(!listening && !isSubmitting) && "Start Speaking"}
                        {(listening && !isSubmitting) && "Listening..."}
                        {isSubmitting && "Submitting..."}
                    </Typography>
                    {(!browserSupportsSpeechRecognition) && (
                        <span>Browser doesn't support speech recognition.</span>
                    )}
                    <div>
                        <p>Microphone: {listening ? 'on' : 'off'}</p>
                        <p>{transcript}</p>
                        <p>{submitted && submitted}</p>
                    </div>

                    <div>
                        {/* <SpeakerAlert /> */}
                    </div>
                    {/* <AudioRecorder 
                        onRecordingComplete={addAudioElement}
                        audioTrackConstraints={{
                            noiseSuppression: true,
                            echoCancellation: true,
                        }} 
                        downloadOnSavePress={true}
                        downloadFileExtension="webm"
                    /> */}
                    <Box mt={8} mb={2}>
                        <IconButton onClick={handleMic} size="large">
                            {listening ? <MicOffIcon /> : <Mic />}
                        </IconButton>
                        <InputLabel>
                            Mic
                        </InputLabel>
                    </Box>
                    <Select
                        value={selectedVoice}
                        onChange={handleVoiceChange}
                    >
                        {window.speechSynthesis.getVoices().map((voice) => (
                            <MenuItem value={voice.name}>{voice.name} ({voice.lang})</MenuItem>
                        ))}
                    </Select>
                    <Box>
                        <IconButton onClick={() => {}} size="large">
                            <KeyboardIcon />
                        </IconButton>
                        <InputLabel>
                            Chat
                        </InputLabel>
                    </Box>
                    
                </Container>
            </VoiceContainer>
        </Grid>
    )
}

export default VoiceView