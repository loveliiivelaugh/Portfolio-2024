import { useCallback, useEffect, useRef, useState } from "react"
import Webcam from "react-webcam"
import { Box, IconButton, FormControlLabel, Switch, Stack } from "@mui/material"
import { styled } from "@mui/material/styles"
import CameraIcon from "@mui/icons-material/Camera"
import AppsIcon from "@mui/icons-material/Apps"
import { motion } from "framer-motion"

import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as blazeface from '@tensorflow-models/blazeface';

import VisionToggle from "../../Layout/ToggleButton";
import BottomNav from "../../Layout/BottomNav";
import { useChatStore } from "../store"


const compareLandmarks = (landmarks1, landmarks2) => {

    if (landmarks2?.probability[0] > 0.5) {
        
        const isInRange = value => ((value >= 0.6) && (value <= 1.4));
        
        const isTopLeftMatch = landmarks1.topLeft.every((value, index) => isInRange(value / landmarks2.topLeft[index]));
        const isBottomRightMatch = landmarks1.bottomRight.every((value, index) => isInRange(value / landmarks2.bottomRight[index]));
        const isLandmarksMatch = landmarks1.landmarks.every((landmark1, index) => landmark1.every((value, i) => isInRange(value / landmarks2.landmarks[index][i])));
        
        return (isTopLeftMatch && isBottomRightMatch && isLandmarksMatch);
    }
    else return false
};



const WebcamContainer = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100vw',
    background: '#111',
}));

const defaultVideoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "environment",
};

const Camera = (props) => {
    const chat = useChatStore();
    const [videoConstraints, setVideoConstraints] = useState(defaultVideoConstraints);
    
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const videoRef = useRef(null);

    const [ssdModel, setSsdModel] = useState(null);
    const [blazefaceModel, setBlazefaceModel] = useState(null);
    const [detectInterval, setDetectInterval] = useState(null);


    const capture = useCallback(async () => {
        const imageSrc = webcamRef.current.getScreenshot();
        // // Classify Image // No await -- runs in background and populates redux
        // actions.classifyImage(imageSrc);
        // Save image
        chat.handleImageSrc(imageSrc);
        // Update view
        chat.handleView("image");
    }, [webcamRef]);

    const detectFaces = async () => {
        // Get canvas context
        let ctx = canvasRef.current?.getContext('2d');
        if (ctx) {
            // Set canvas size
            ctx.canvas.width = webcamRef.current.props.width;
            ctx.canvas.height = webcamRef.current.props.height;
            // draw the video first
            ctx.drawImage(videoRef.current, 0, 0, 640, 480);

            // console.log(ssdModel, ctx)
            
            const imageSrc = webcamRef.current.getScreenshot();
            const image = new Image();
            image.src = imageSrc;

            // Facial Recognition
            if (ssdModel) {
                const objectDetected = await ssdModel.detect(image);
                const facialRecognition = await blazefaceModel.estimateFaces(image);
        
                // const isMichaelsFace = compareLandmarks(michaelsFacialLandmarks, facialRecognition[0]);
                // if (isMichaelsFace) {
                //     ctx = {}
                //     console.log({ detectInterval })
                //     clearInterval(detectInterval);
                //     actions.setIsAuthenticated(true)
                //     // navigate('/')
                // }
                console.log({objectDetected, facialRecognition, isMichaelsFace});

                objectDetected.forEach((detection) => {
                    const x = detection.bbox[0];
                    const y = detection.bbox[1];
                    const width = detection.bbox[2];
                    const height = detection.bbox[3];
                    ctx.strokeStyle = 'red';
                    
                    if (detection.score.toFixed(2) > 0.8) 
                        ctx.strokeRect(x, y, width, height);
                
                    ctx.font = '16px Arial';
                    ctx.fillStyle = 'white';
                    
                    if (detection.score.toFixed(2) > 0.8) 
                        ctx.fillText(`${detection.class} ${detection.score.toFixed(2)}`, x, y);
                })
            }

        }
    };

    const startDetecting = () => {
        const detectInterval = setInterval(detectFaces, 20)
        setDetectInterval(detectInterval)
    }

    const loadModels = async () => {
        const ssd = await cocoSsd.load();
        const blazefaceModel = await blazeface.load();
        return { blazefaceModel, ssd };
    };

    const handleDoubleClick = (event) => {
        console.log("Camera handleDoubleClick: ", event)
        setVideoConstraints(prev => ({ 
            ...prev, 
            facingMode: prev.facingMode === "user" 
                ? "environment" 
                : "user"
        }))
    };

    useEffect(() => {
        // // If the camera is reopened from the image view, ...
        // // ... reset the image classification
        // actions.handleImageClassification(null);
        
        loadModels()
            .then(({ ssd, blazefaceModel }) => {
                console.log("after model is loaded: ", ssd, blazefaceModel)
                setSsdModel(ssd);
                setBlazefaceModel(blazefaceModel);

                startDetecting();
            })
            .catch(error => console.error("Error loading SSD model: ", error))

        return () => {
            clearInterval(detectInterval);
        }

    }, [])

    const webcamProps = {
        ref: webcamRef,
        audio: false,
        height: window.innerHeight,
        width: window.innerWidth,
        screenshotFormat: "image/jpeg",
        videoConstraints
    };

    return (
        <WebcamContainer onDoubleClick={(event) => {
            console.log("WebcamContainer onDoubleClick: ", event)
        }}>
            <Webcam {...webcamProps}>
                {() => (
                    <>
                        {/* <motion.div>
                            <Box onDoubleClick={handleDoubleClick} sx={{ height: '100vh', width: '100vw', position: 'absolute', bottom: 0, right: 0, background: 'rgba(0,0,0,0.2)' }}>
                                <canvas ref={canvasRef} style={{ height: '100%', width: '100%', position: 'absolute', bottom: 0, right: 0, zIndex: 1 }} />
                                <video ref={videoRef} style={{ height: '100%', width: '100%', position: 'absolute', bottom: 0, right: 0, zIndex: 10 }} />
                                <Stack sx={{ color: "#fff",mt:10, p: 2, background: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(8px)', borderRadius: '10px', maxWidth: 250, mx: 2 }}>
                                    {[
                                        "Image Classification",
                                        "Object Detection",
                                        "Image Segmentation",
                                        "Facial Recognition",
                                    ].map((item, index) => (
                                        <FormControlLabel
                                            control={<Switch checked={true} />}
                                            onChange={() => {}}
                                            label={item}
                                            key={index}
                                        />
                                    ))}
                                </Stack>
                            </Box>
                        </motion.div> */}
                        {!props?.hideBottomControls && (
                            <BottomNav
                                items={{
                                    "Chat": (
                                        <IconButton onClick={() => chat.handleView("chat")}>
                                            <AppsIcon />
                                        </IconButton>
                                    ),
                                    [`${chat.visionMode} mode`]: <VisionToggle />,
                                    "Camera": (
                                        <IconButton onClick={capture}>
                                            <CameraIcon />
                                        </IconButton>
                                    ),
                                }}
                            />
                        )}
                    </>
                )}
            </Webcam>
        </WebcamContainer>
    )
}

export default Camera;