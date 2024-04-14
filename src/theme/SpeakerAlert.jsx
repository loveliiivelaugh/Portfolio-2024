
import { useEffect, useRef } from 'react';
import './SpeakerAlert.css';
import { Box } from '@mui/material';

export const SpeakerAlert = () => {
    const containerRef = useRef();
    useEffect(() => {
        const audio = new Audio( 'https://dl.dropboxusercontent.com/s/h8pvqqol3ovyle8/tom.mp3' );
        audio.muted = true;
    
        audio
            .play()
            .then(() => {
                // already allowed
                containerRef.current.remove();
                resetAudio();
            })
            .catch(() => {
                // need user interaction
                containerRef.current.addEventListener('click', ({ target }) => {
                    if (target.matches('button')) {
                        const allowed = (target.value === "1");
                        if (allowed) audio
                            .play()
                            .then(resetAudio);
                        containerRef.current.remove();
                    }
                });
            });
    
        document
            .getElementById('btn')
            .addEventListener('click', (e) => {
                if (audio.mute) console.log( 'silent notification' )
                else audio.play();
            });
    
        function resetAudio() {
            audio.pause();
            audio.currentTime = 0;
            audio.muted = false;
        }
        
    }, [])

    return (
        <>
            <Box class="alert" ref={containerRef}>
                <p>This webpage would like to play sounds</p>
                <p class="buttons">
                    <button value="0">Block</button>
                    <button value="1">Allow</button>
                </p>
            </Box>
            <button id="btn">Check Speaker</button>
        </>
    )
}