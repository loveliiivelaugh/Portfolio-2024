import { colors } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { grey, blue, orange } from "@mui/material/colors";

// Theme Configuration file to be used in multiple front end ...
// ... microservices applications to maintain consistent theme ...
// ... across all applications. 

const themeConfig = {
    // Light theme
    light: {
        palette: {
            type: "light",
            primary: {
                // Use hue from colors or hex
                // main: colors.indigo["900"],
                main: "#ccc",
                // Uncomment to specify light/dark
                // shades instead of automatically
                // calculating from above value.
                light: "#4791db",
                dark: "#115293",
            },
            secondary: {
                main: colors.pink["500"],
            },
            background: {
                // Background for <body>
                // and <Section color="default">
                default: "#f5f5f5",
                // Background for elevated
                // components (<Card>, etc)
                paper: "#fefefe",
            },
            text: {
                primary: colors.grey["900"],
                secondary: colors.grey["700"],
                disabled: colors.grey["500"],
            },
            divider: alpha(colors.grey[900], 0.2),
            action: {
                active: alpha(colors.grey[900], 0.54),
                hover: alpha(colors.grey[900], 0.04),
                selected: alpha(colors.grey[900], 0.08),
                disabled: alpha(colors.grey[900], 0.26),
                disabledBackground: alpha(colors.grey[900], 0.12),
            },
            contrastThreshold: 3,
            info: {
                main: "#50AAFF",
                contrastText: "#fff",
            }
        },
    },

    // // Dark theme
    // dark: {
    //     border: {
    //         default: "1px solid #333",
    //         hover: "1px solid #777",
    //         active: "1px solid #999",
    //         main: "1px solid rgba(80, 170, 255, 0.8)",
    //     },
    //     palette: {
    //         type: "dark",
    //         divider: alpha(colors.grey[900], 0.8),
    //         primary: {
    //             // Same as in light but we could
    //             // adjust color hue if needed
    //             // main: colors.indigo["500"],
    //             main: "#333",
    //         },
    //         secondary: {
    //             main: colors.grey["100"],
    //         },
    //         tertiary: {
    //             main: "rgba(80, 170, 255, 0.8)", // #50AAFF hex conversion
    //         },
    //         background: {
    //             default: colors.grey["800"],
    //             // paper: colors.grey["800"],
    //             paper: alpha(colors.grey[800], 1),
    //         },
    //         text: {
    //             primary: colors.grey["100"],
    //             secondary: colors.grey["500"],
    //             disabled: colors.grey["300"],
    //         },
    //         button: {
    //             primary: colors.grey["100"],
    //             secondary: colors.grey["500"],
    //             disabled: colors.grey["300"],
    //         },
    //         info: {
    //             main: colors.blue["500"],
    //             contrastText: colors.grey["100"],
    //         }

    //     },
    // },

    palette: {
        mode: "dark",
        primary: {
            main: "#50AAFF", // Brightened for contrast
        },
        secondary: {
            main: orange[400],
        },
        background: {
            default: "#0F1117",
            paper: "#181A20",
        },
        divider: alpha(grey[700], 0.6),
        text: {
            primary: grey[100],
            secondary: grey[400],
            disabled: grey[600],
        },
        info: {
            main: blue[500],
            contrastText: grey[100],
        },
    },
    typography: {
        fontFamily: `"Inter", "Helvetica", "Arial", sans-serif`,
        h1: {
            fontFamily: `"Pacifico", cursive`,
            fontSize: "2.75rem",
            fontWeight: 500,
        },
        h2: { fontWeight: 700 },
        h3: { fontWeight: 600 },
        h4: { fontWeight: 600 },
        h5: { fontWeight: 500 },
        h6: { fontWeight: 500 },
        body1: { fontSize: "1rem" },
        body2: { fontSize: "0.875rem" },
        button: {
            textTransform: "none",
            fontWeight: 500,
        },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiPaper: {
            defaultProps: {
                elevation: 2,
            },
            styleOverrides: {
                rounded: {
                    borderRadius: 16,
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    padding: "0.6rem 1.4rem",
                },
            },
        },
    },
    // Values for both themes
    common: {
        typography: {
            fontSize: 14,
            fontFamily: `"Inter", "Helvetica", "Arial", sans-serif`,
            h1: { fontFamily: `"Pacifico", cursive` }, // Logo/title headers
            h2: { fontWeight: 700 },
            h3: { fontWeight: 600 },
            body1: { fontWeight: 400 },
            button: { textTransform: "none", fontWeight: 500 },
            // Uncomment to make button lowercase
            // button: { textTransform: "none" },
        },
        breakpoints: {
            values: {
                xs: 0,
                sm: 600,
                md: 960,
                lg: 1200,
                xl: 1920,
            },
        },
        // Override component styles
        overrides: {
            // Global styles
            MuiCssBaseline: {
                "@global": {
                    "#root": {
                        // Flex column that is height
                        // of viewport so that footer
                        // can push self to bottom by
                        // with auto margin-top
                        minHeight: "100vh",
                        display: "flex",
                        flexDirection: "column",
                        // Prevent child elements from
                        // shrinking when content
                        // is taller than the screen
                        // (quirk of flex parent)
                        "& > *": {
                            flexShrink: 0,
                        },
                    },
                },
            },
        },
    },
};

export { themeConfig };