import { Suspense, useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
// import Keycloak from 'keycloak-js';
import axios from 'axios';
// import { SmoothScroll } from './theme/SmoothScroll.jsx';
// import { KeycloakProvider } from './Keycloak/KeycloakProvider';
import { PageTransitionWrapper, ThemeProvider } from './theme/ThemeProvider';
// import { useAppStore } from './App.jsx';
const paths = {
    "hostname": import.meta.env.VITE_HOSTNAME,
    "local": "http://localhost:5001",
    "themeConfig": "/api/theme/themeConfig",
    "content": "/api/cms/content"
};
// Initialize Server Client with Basic Auth
const client = axios.create({
    baseURL: (import.meta.env.MODE === "development")
        ? paths.local
        : paths.hostname,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
    auth: {
        username: import.meta.env.VITE_BASIC_AUTH_USERNAME,
        password: import.meta.env.VITE_BASIC_AUTH_PASSWORD,
    }
});
const queryClient = new QueryClient();
// On Apps First Load
const InitConfigProvider = ({ children }) => {
    // Get Theme Config
    const themeConfigQuery = useQuery(({
        queryKey: ["themeConfig"],
        queryFn: async () => (await client.get(paths.themeConfig)).data,
    }));
    // Get content from CMS
    const contentQuery = useQuery(({
        queryKey: ["content"],
        queryFn: async () => (await client.get(paths.content)).data,
        select: (data) => {
            window.appContent = data ? data : {};
            return data;
        }
    }));
    // console.log(import.meta)
    // console.log({contentQuery})
    // Set global access to server client
    window.client = client;
    // Initialize Keycloak
    const [keycloakInstance, setKeycloakInstance] = useState(null);
    // // Initialize Keycloak
    // const instance = new Keycloak(JSON.parse(import.meta.env.VITE_KEYCLOAK_CONFIG));
    // setKeycloakInstance(instance);
    return ({
        pending: "Uninitialized...",
        loading: "Loading App Theme Configuration...",
        success: children(themeConfigQuery.data, keycloakInstance),
        error: "Something went wrong..."
    }[themeConfigQuery.status]);
};
export const Providers = ({ children }) => {
    return (<QueryClientProvider client={queryClient}>
            <Suspense fallback="Loading App Theme Configuration...">
                <InitConfigProvider>
                    {(themeConfig, keycloakInstance) => (<ThemeProvider themeConfig={themeConfig}>
                            <PageTransitionWrapper>
                                {/* <SmoothScroll></SmoothScroll> */}
                                    {children}
                                {/* <KeycloakProvider keycloakInstance={keycloakInstance}>
            </KeycloakProvider> */}
                            </PageTransitionWrapper>
                        </ThemeProvider>)}
                </InitConfigProvider>
            </Suspense>
        </QueryClientProvider>);
};
