import { BottomNavigation, BottomNavigationAction } from "@mui/material";

const BottomNav = ({ items = [], sx }) => {
    return (
        <BottomNavigation
            showLabels
            // value={props.tab}
            // onChange={handleNavChange}
            sx={{ ...sx, zIndex: 100 }}
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
    )
}

export default BottomNav