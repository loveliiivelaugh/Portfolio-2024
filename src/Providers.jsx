import { Suspense, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Keycloak from 'keycloak-js';
import axios from 'axios';

// import { SmoothScroll } from './theme/SmoothScroll.jsx';
import { KeycloakProvider } from './Keycloak/KeycloakProvider';
import { PageTransitionWrapper, ThemeProvider } from './theme/ThemeProvider';

const paths = {
    "hostname": import.meta.env.VITE_HOSTNAME
};

const queryClient = new QueryClient();

export const Providers = ({ children }) => {
    const [keycloakInstance, setKeycloakInstance] = useState(null);

    // On Apps First Load
    useEffect(() => {
        (async () => {
            // Initialize Server Client with Basic Auth
            const client = axios.create({
                baseURL: paths.hostname,
                timeout: 5000,
                headers: {
                    "Content-Type": "application/json",
                },
                auth: JSON.parse(import.meta.env.VITE_BASIC_AUTH)
            });

            // Set global access to server client
            window.client = client;

            // Initialize Keycloak
            const instance = new Keycloak(JSON.parse(import.meta.env.VITE_KEYCLOAK_CONFIG));
            setKeycloakInstance(instance);

        })();
    }, []);

    return (
        <ThemeProvider>
            <PageTransitionWrapper>
                {/* <SmoothScroll></SmoothScroll> */}
                <QueryClientProvider client={queryClient}>
                    <Suspense fallback="loading...">
                        {keycloakInstance && (
                            <KeycloakProvider keycloakInstance={keycloakInstance}>
                                {children}
                            </KeycloakProvider>
                        )}
                    </Suspense>
                </QueryClientProvider>
            </PageTransitionWrapper>
        </ThemeProvider>
    )
};