// Packages
import { useMemo } from 'react';
import { createTheme, CssBaseline } from '@mui/material';
import { ThemeProvider as MuiThemeProvider } from '@emotion/react';
import { motion } from "framer-motion";
import { useAppStore } from '../store';



const useTheme = ({ mode, themeConfig }: { mode: "light" | "dark", themeConfig: any }) => useMemo(() => createTheme({
  ...themeConfig,
  ...themeConfig[mode],
}), [mode])

export const ThemeProvider = ({ children }: { children: any }) => {
  const appStore = useAppStore();
  const theme = useTheme({ 
    mode: 'dark', 
    themeConfig: appStore.appConfig?.themeConfig || { dark: "", light: "" } 
  });

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
        {children}
    </MuiThemeProvider>
  )
}

export const PageTransitionWrapper = ({ children }: any) => {
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
