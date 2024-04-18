// Packages
import { useMemo } from 'react';
import { createTheme, CssBaseline, IconButton } from '@mui/material';
import { ThemeProvider as MuiThemeProvider } from '@emotion/react';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import { motion } from "framer-motion"

// Utitlities
import { themeConfig } from './themeConfig';


export const useColorMode = () => {
  const ThemeToggleButton = () => (
    <IconButton onClick={() => {}} p={2} color="inherit">
      {theme === 'light' ? <NightsStayIcon /> : <LightModeIcon />}
    </IconButton>
  )

  return [theme, toggle, ThemeToggleButton]
}


const useTheme = ({ mode }) => useMemo(() => createTheme({
  ...themeConfig,
  ...themeConfig[mode],
}), [mode])

export const ThemeProvider = ({ children }) => {
  // const system = useSelector((state) => state.system)
  const theme = useTheme({ mode: 'dark' })

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
        {children}
    </MuiThemeProvider>
  )
}

export const PageTransitionWrapper = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={{
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { 
          opacity: 0,
          transition: { duration: 0.35 }
        }
      }}
    >
      {children}
    </motion.div>
  )
}
