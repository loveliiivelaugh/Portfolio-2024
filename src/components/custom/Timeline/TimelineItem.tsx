import { useParams } from "react-router-dom";
import { Container, Typography, Box, Divider, Avatar, Grid2 as Grid, Button, Tooltip, List, ListItem, ListItemIcon, ListItemText, Modal } from '@mui/material';
import { styled } from '@mui/material/styles';
import { timelineEventsData } from "./timelineData";
import { TimelineOverview } from "./Timeline";
import { create } from "zustand";


const useTimelineStore = create((set) => ({
    currentEvent: 0,
    setCurrentEvent: (event: number) => set({ currentEvent: event }),

    openModal: false,
    setOpenModal: (open: boolean) => set({ openModal: open }),
}));

// Styled components for dot indicator
const Dot = styled('div')(({ theme, color }) => ({
    width: 12,
    height: 12,
    borderRadius: '50%',
    backgroundColor: color === 'default' ? theme.palette.grey[500] : color,
    display: 'inline-block',
    marginRight: theme.spacing(1),
}));

const RightSideNavigate = () => {
    return (
        <Box>
            {new Array(10).fill(0).map((_, index) => (
                <div key={index}>-</div>
            ))}
        </Box>
    );
};

const TimelineItem = () => {
    const timelineStore: any = useTimelineStore();
    const params: any = useParams();
    const event: any = timelineEventsData.find((event) => (event.id === parseInt(params.id)));
    const nextEvent: any = timelineEventsData.find((event) => (event.id === parseInt(params.id) + 1));
    const prevEvent: any = timelineEventsData.find((event) => (event.id === parseInt(params.id) - 1));
    
    return (
        <Container maxWidth="xl">
            <Box>
                <Tooltip title={<TimelineOverview />}>
                    <Button href="/timeline">
                        <pre><code>Back to Timeline</code></pre>
                    </Button>
                </Tooltip>
            </Box>
            <Grid container>
                <Grid size={6} order={2}>
                    <Grid container>
                        <Grid size={10}>
                            <Avatar
                                src={event.image}
                                alt={event.label}
                                variant="rounded"
                                sx={{ width: 500, height: 500, margin: 'auto', borderRadius: "24px" }}
                            />
                        </Grid>
                        <Grid size={2} sx={{ textAlign: "right" }}>
                            <RightSideNavigate />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid size={6} order={1}>
                    <Box sx={{ display: "flex", justifyContent: "center", alignevents: "center", mt: 2 }}>
                        <Dot color={event.dotColor} />
                        <Typography variant="h4">{event.label}</Typography>
                    </Box>
                    <Divider sx={{ marginY: 3 }} />
                    <Typography variant="body1">
                        {event.blogPost || "This item represents the period of prehistory, marked by archaeological findings and ancient maps."}
                    </Typography>

                    <Grid size={12}>
                        <List>
                            <ListItem>
                                <ListItemIcon>📜</ListItemIcon>
                                <ListItemText primary={<a onClick={() => timelineStore.setOpenModal(true)}>Read PDF</a>} secondary={event?.date ?? ""} />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>📚</ListItemIcon>
                                <ListItemText primary={<a href={event.primarySource} target="_blank">Buy Source</a>} secondary={event?.date ?? ""} />
                            </ListItem>
                        </List>

                        <Modal sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                            open={timelineStore.openModal}
                            onClose={() => timelineStore.setOpenModal(false)}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={{
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}>
                                <iframe src={event.pdf} width="100%" height="100%" />
                            </Box>
                        </Modal>
                    </Grid>

                </Grid>
                <Grid size={12} order={4} sx={{ textAlign: "center", p: 2, mt: 2 }}>
                    <Button href={`/timeline/${prevEvent.id}`}>
                        Previous <i>Story</i> {prevEvent.label}
                    </Button>
                    <Button href={`/timeline/${nextEvent.id}`}>
                        Next <i>Story</i> {nextEvent.label}
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default TimelineItem;