import { Box, IconButton, Tooltip } from "@mui/material";
import { GitHub, OpenInNew } from "@mui/icons-material";

const showcaseLinks = {
    github: "https://github.com/your-repo", // Replace with your GitHub repo URL
    liveDemo: "https://your-live-demo.com", // Replace with your live demo URL
};

const ShowcaseLinks = (props = showcaseLinks) => {
    return (
        <Box sx={{ position: "sticky", bottom: 0, display: "flex", gap: 0, justifyContent: "end", mt: 2 }}>
            <Tooltip title="View on GitHub">
                <IconButton component="a" href={props.github} target="_blank" rel="noopener noreferrer" color="primary">
                    <GitHub />
                </IconButton>
            </Tooltip>

            <Tooltip title="Live Demo">
                <IconButton component="a" href={props.liveDemo} target="_blank" rel="noopener noreferrer" color="secondary">
                    <OpenInNew />
                </IconButton>
            </Tooltip>
        </Box>
    );
};

export default ShowcaseLinks;
