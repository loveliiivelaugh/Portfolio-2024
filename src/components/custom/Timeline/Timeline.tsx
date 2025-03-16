import { animate, stagger } from "motion";
// import MuiTimeline from "../Layout/MuiTimeline";
import { Box, Grid2 as Grid, ListItemButton, TextField, Typography } from "@mui/material";

import { timelineEventsData } from "./timelineData";
import aegean200bceMap from "../../../utilities/assets/aegean_200bce.jpg";
import mediterranean218bceMap from "../../../utilities/assets/mediterranean_218bce.jpg";
import "./timeline.css";
import { useNavigate } from "react-router-dom";

export const TimelineOverview = () => {
    return (
        <Grid size={3}>
            <Typography variant="h5">~ Overview</Typography>
            <div>
                <ul className="timeline">
                    {timelineEventsData.map((item, index) => (
                        <li key={index}>
                            <ListItemButton href={`/timeline/${item.id}`}>
                                {item.label}
                            </ListItemButton>
                        </li>
                    ))}
                </ul>
            </div>
        </Grid>
    );
};

const Timeline = () => {
    const navigate = useNavigate();
    animate([
        ["ul", { opacity: 1 }],
        ["li", { x: [-20, 0] }, { delay: stagger(.2) }]
    ]);

    return (
        <Grid container>
            <Grid size={12}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h3">
                        Personal Web App Notebook
                    </Typography>
                    <TextField label="Search" variant="outlined" sx={{ p: 2, width: "50%" }} />
                </Box>
                <Typography variant="h5">
                    Prehistory | Ancient History | Alt History | World Religions | Ancient Languages | Philosophy
                </Typography>
                <Typography variant="h6">
                    A Modern Interactive Blog by Michael Woodward
                </Typography>
            </Grid>
            <Grid size={12} sx={{ textAlign: "center" }}>
                <Typography variant="h4" gutterBottom>
                    <a>Timeline</a> · <a onClick={() => navigate("/books")}>Books</a> · <a>Maps</a> · <a>Websites</a> · <a>YouTube</a>
                </Typography>
            </Grid>
            <TimelineOverview />
            <Grid size={9}>
                <Typography variant="h5">
                    Prehistory · Ancient History · Early History ~ Timeline
                </Typography>

                <div style={{ border: "1px solid rgba(255,255,255,0.2)", borderRadius: "8px", padding: "8px" }}>
                    <p>Map of Aegean Region 200 BCE (Modern day Greece)</p>
                    <img src={aegean200bceMap}></img>
                    <p>Source <a href="https://www.thoughtco.com/maps-of-ancient-greece-4122979" target="_blank">https://www.thoughtco.com/maps-of-ancient-greece-4122979</a></p>
                </div>
                <div style={{ border: "1px solid rgba(255,255,255,0.2)", borderRadius: "8px", padding: "8px" }}>
                    <p>Map of Mediterranean 218 BCE</p>
                    <img src={mediterranean218bceMap} style={{ width: "100%"}}></img>
                    <p>Source <a href="https://www.worldhistory.org/image/283/map-of-the-mediterranean-218-bce/" target="_blank">https://www.worldhistory.org/image/283/map-of-the-mediterranean-218-bce/</a></p>
                </div>
                {/* <MuiTimeline timelineEvents={timelineEventsData} />  */}
            </Grid>
        </Grid>
    );
};

export default Timeline;