import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";

const BottomNav = ({ items = [], sx }) => {
    return (
        <Box sx={{ zIndex: 100, overflow: "auto", width: "100vh" }}>
            <BottomNavigation
                showLabels
                // value={props.tab}
                // onChange={handleNavChange}
                sx={{ ...sx }}
                // scrollButtonsAlwaysVisible
            >
                {Object
                    .keys(items)
                    .map((item, index) => (
                        <BottomNavigationAction
                            key={index} 
                            label={item} 
                            icon={items[item]}
                            sx={{ color: "#222" }}
                        />
                ))}
            </BottomNavigation>
        </Box>
    )
}

export default BottomNav