// Packages
import { useRef, useState } from 'react'
import { Document, Outline, Page, pdfjs } from 'react-pdf';
import { 
    Box, Button, Grid, 
    IconButton, MenuItem, 
    List, ListItem, ListItemButton, Popover, 
    Select, TextField, Toolbar, Tooltip, Typography 
} from '@mui/material';
import { BookmarkBorder, DownloadForOffline, Speaker, UploadFile } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';

// Utilities
import { useEReaderStore } from '../../utilities/store';
import { queries, paths, client } from "../../utilities/config/api";

// Styles
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';


// https://www.npmjs.com/package/react-pdf#configure-pdfjs-worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
).toString();

const EReader = () => {
    // Queries
    const storedBooksQuery = useQuery(queries.query(paths.sensative + `/api/v1/local/files/books`));

    return ({
        pending: "uninitialized",
        loading: "loading...",
        success: <EReaderContent storedBooksData={storedBooksQuery.data.files} />,
        error: "Something went wrong..." 
    }[storedBooksQuery.status]);
};

const EReaderContent = ({ storedBooksData }: any) => {
    // States
    const eReaderStore = useEReaderStore();

    const [selectedBook, setSelectedBook] = useState({
        title: "",
    });
    const [numPages, setNumPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);

    // Refs
    const documentRef = useRef();
    const anchorElRef = useRef();

    // Handlers
    function onDocumentLoadSuccess(props: any) {
        const { numPages } = props;

        setNumPages(numPages);
    };

    const handleBookChange = async (event: any) => {
        
        const endpoint = `/api/v1/local/book?name=${event.target.value}`;
        const bookData = (await client.get(paths.sensative + endpoint)).data;

        setSelectedBook(bookData);
    };

    const handlePageChange = (event: any) => {
        const isPrev = (event.target.id === 'previous-page-button');
        
        if (isPrev && pageNumber <= 1) return;

        if (!isPrev && pageNumber >= numPages) return;

        if (isPrev) setPageNumber(prev => prev - 1);
        else setPageNumber(prev => prev + 1);
    };

    const handleReadingAloud = async () => {
        // Clear previous speech synth
        window.speechSynthesis.cancel();

        let utterance = new SpeechSynthesisUtterance((documentRef.current as any).innerText);

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
                        {storedBooksData
                            .map((book: any) => ({ title: book, pdf: book }))
                            .map((book: { title: string; pdf: string;}) => (
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
                        <Tooltip title={btn.label} ref={btn?.ref}>
                            <IconButton onClick={btn?.handleClick}>
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
            <Document file={selectedBook as any} inputRef={documentRef.current} onLoadSuccess={onDocumentLoadSuccess}>
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