// Packages
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Box, Typography, List, ListItemText, Skeleton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useChatStore } from '../store';


const ImageViewContainer = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100vw',
}))

const ImageView = (props) => {
    const chat = useChatStore()
    return (
        <ImageViewContainer>
            <LazyLoadImage 
                effect="opacity" 
                loading="lazy" 
                src={chat.imageSrc}
                alt="Captured image" 
                style={{ maxWidth: '100%' }} 
            />
            <List sx={{ px: 2 }}>
                <Typography variant="subtitle2">
                    Machine Learning model <b>MobileNet</b> Image Classification
                </Typography>
                {chat.imageClassification 
                    ? chat.imageClassification
                        .map(classification => (
                            <ListItemText
                                primary={classification?.className}
                                secondary={classification?.probability.toFixed(2) + '% Probability'}
                            />
                        )) : (
                            <Skeleton variant="rectangular" width="100%" height={40} />
                        )}
            </List>
        </ImageViewContainer>
    )
}

export default ImageView