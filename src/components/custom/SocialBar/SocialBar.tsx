import { Box, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn, YouTube } from "@mui/icons-material";

const socialLinks = [
    { icon: <Facebook />, link: "https://www.facebook.com" },
    { icon: <Twitter />, link: "https://www.twitter.com" },
    { icon: <Instagram />, link: "https://www.instagram.com" },
    { icon: <LinkedIn />, link: "https://www.linkedin.com" },
    { icon: <YouTube />, link: "https://www.youtube.com" },
];

const SocialBar = () => {
    return (
        <Box>
            {socialLinks.map((social, index) => (
                <IconButton key={index} component="a" href={social.link} target="_blank" rel="noopener noreferrer" color="primary">
                    {social.icon}
                </IconButton>
            ))}
        </Box>
    );
};

export default SocialBar
