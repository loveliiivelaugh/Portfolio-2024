// Packages
import { useRef, useState } from 'react'
import { Document, Outline, Page, pdfjs } from 'react-pdf';
import axios from 'axios';
import { 
    Box, Button, CircularProgress, Grid, 
    IconButton, InputLabel, MenuItem, 
    List, ListItem, ListItemButton, Popover, 
    Select, TextField, Toolbar, Tooltip, Typography 
} from '@mui/material';
import { BookmarkBorder, DownloadForOffline, Speaker, UploadFile } from '@mui/icons-material';
// import GoogleMapReact from 'google-map-react';
import { create } from 'zustand';
import { useQuery } from '@tanstack/react-query';

// Utilities
// import { 
//     useGetStoredBooksQuery, 
//     useIngestedDocumentsQuery, 
//     useLazyGetBookQuery, 
//     useTextToSpeechMutation
// } from '../../api/llms';
import { queries } from "../Chat/api"
 

// Styles
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';


const hostname = import.meta.env.VITE_HOSTNAME;


// https://www.npmjs.com/package/react-pdf#configure-pdfjs-worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

const useEReaderStore = create((set) => ({
    isSpeaking: true,
    downloadOptionsOpen: false,
    setOpenDownloadOptions: (value) => set(() => ({ downloadOptionsOpen: value })),
    setIsSpeaking: (value) => set(() => ({ isSpeaking: value }))
}));

const defaultProps = {
    center: {
        // Mediterranean Sea
      lat: 36.553127,
      lng: 22.048012
    },
    zoom: 5
};

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const EReader = () => {
    // States
    const eReaderStore = useEReaderStore();

    // Queries
    // const filesIngestedQuery = useIngestedDocumentsQuery();
    // const storedBooksQuery = useGetStoredBooksQuery();
    // const [getBookQuery, getBookQueryState] = useLazyGetBookQuery();
    const storedBooksQuery = useQuery(queries.readFromServer2({ endpoint: `system/stored-books` }))
    console.log("EReader.storedBooksQuery: ", storedBooksQuery)

    const [selectedBook, setSelectedBook] = useState({});
    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);

    // Refs
    const anchorElRef = useRef();
    const documentRef = useRef();
  
    // Handlers
    function onDocumentLoadSuccess(props) {
        const { numPages } = props;
        // console.log("onDocumentLoadSuccess: ", props);
        setNumPages(numPages);
    };

    const handleBookChange = async (event) => {
        const uri = `${hostname}/api/system/stored-book/${event.target.value}`;
        const book = (await axios(uri)).data;

        setSelectedBook(book);
    };

    const handlePageChange = (event) => {
        const isPrev = (event.target.id === 'previous-page-button');
        
        if (isPrev && pageNumber <= 1) return;

        if (!isPrev && pageNumber >= numPages) return;

        if (isPrev) setPageNumber(prev => prev - 1);
        else setPageNumber(prev => prev + 1);
    };

    const handleReadingAloud = async () => {
        // Clear previous speech synth
        window.speechSynthesis.cancel();

        let utterance = new SpeechSynthesisUtterance(documentRef.current.innerText);

        eReaderStore.setIsSpeaking(true);

        window.speechSynthesis.speak(utterance);
    };
    
  
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Toolbar sx={{ gap: 2 }}>
                    <Button 
                        id="previous-page-button" 
                        variant="contained" 
                        color="primary" 
                        disabled={pageNumber <= 1} 
                        onClick={handlePageChange}
                    >
                        Previous
                    </Button>
                    <Button 
                        id="next-page-button" 
                        variant="contained" 
                        color="primary" 
                        disabled={pageNumber >= numPages} 
                        onClick={handlePageChange}
                    >
                        Next
                    </Button>
                    <TextField
                        label="Search"
                        onChange={e => console.log(e.target.value)}
                    />
                    <Select
                        value={selectedBook.title}
                        onChange={handleBookChange}
                    >
                        {!storedBooksQuery.isLoading && storedBooksQuery.data
                            .map(book => ({ title: book, pdf: book }))
                            .map(book => (
                                <MenuItem value={book.title}>
                                    {book.title}
                                </MenuItem>
                            ))
                        }
                    </Select>
                    {/* {(getBookQueryState.isLoading || getBookQueryState.isFetching) && <CircularProgress />} */}
                </Toolbar>
                <Toolbar>
                    <Typography variant='body1'>
                        Page {pageNumber} of {numPages}
                    </Typography>
                    {[
                        {
                            label: 'Upload .pdf',
                            icon: <UploadFile />
                        },
                        {
                            label: 'Add Bookmark',
                            icon: <BookmarkBorder />
                        },
                        {
                            label: 'Download Page',
                            icon: <DownloadForOffline />,
                            handleClick: () => eReaderStore.setOpenDownloadOptions(true),
                            ref: anchorElRef
                        },
                        {
                            label: 'Transcribe',
                            icon: <Speaker />,
                            handleClick: handleReadingAloud
                        },
                    ].map(btn => (
                        <Tooltip title={btn.label}>
                            <IconButton variant="outlined" ref={btn?.ref} onClick={btn?.handleClick}>
                                {btn.icon}
                            </IconButton>
                        </Tooltip>
                    ))}
                    {/* Audio Controls */}
                    <Popover
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        open={eReaderStore.downloadOptionsOpen}
                        onClose={() => eReaderStore.setOpenDownloadOptions(false)}
                        anchorEl={anchorElRef.current}
                    >
                        <List>
                            {[
                                "Text (.txt)",
                                "PDF (.pdf)",
                                "Image (.jpg)"
                            ].map((listItem, index) => (
                                <ListItem key={index}>
                                    <ListItemButton>
                                        {listItem}
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Popover>
                </Toolbar>
            </Grid>
            <Document file={selectedBook} inputRef={documentRef} onLoadSuccess={onDocumentLoadSuccess} onSourceSuccess={args => console.log('onSourceSuccess: ', args)}>
            <Grid item sm={12} md={8} sx={{ textAlign: 'center' }}>
                {/* {currentTextDisplayed} */}
                {/* <Thumbnail pageNumber={pageNumber} /> */}
                    <Page pageNumber={pageNumber} />
            </Grid>
            <Grid item sm={12} md={4} p={2}>
                <Box>
                    <Outline />
                </Box>
                <TextField
                    id="notes"
                    label="Notes"
                    multiline
                    rows={14}
                    fullWidth
                    sx={{ mb: 2 }}
                />

                <TextField
                    id="chat"
                    label="Chat"
                    placeholder={"Talk about or ask questions about the text..."}
                    multiline
                    rows={14}
                    fullWidth
                />
            </Grid>
            </Document>

            {/* Google Maps */}
            {/* <Grid item xs={12}>
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_KEY }}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                >
                    <AnyReactComponent
                        lat={59.955413}
                        lng={30.337844}
                        text="My Marker"
                    />
                </GoogleMapReact>
            </div>
            </Grid> */}

        </Grid>
    );
}

export default EReader