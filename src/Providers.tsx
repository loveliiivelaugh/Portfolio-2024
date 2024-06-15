import { Suspense } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
// import Keycloak from 'keycloak-js';

// import { SmoothScroll } from './theme/SmoothScroll.jsx';
// import { KeycloakProvider } from './Keycloak/KeycloakProvider';
import { PageTransitionWrapper, ThemeProvider } from './theme/ThemeProvider';
import { SupabaseAuthProvider } from './components/Auth/Auth';
import { client, queries } from './config/api';


const queryClient = new QueryClient();

// On Apps First Load
const InitConfigProvider = ({ children, session }: { children: any, session: any }) => {
    // Set auth token for authenticated client
    let authToken = `userAuthToken=${session?.access_token}&appId=${import.meta.env.VITE_APP_ID}`;
    (client as any).defaults.headers.common["auth-token"] = authToken;

    // Get Theme Config
    const themeConfigQuery = useQuery(queries.getThemeQuery());

    // Initialize Keycloak *Will come back to this*
    // const [keycloakInstance, setKeycloakInstance] = useState(null);
    
    // // Initialize Keycloak
    // const instance = new Keycloak(JSON.parse(import.meta.env.VITE_KEYCLOAK_CONFIG));
    // setKeycloakInstance(instance);

    return ({
        pending: "Uninitialized...",
        loading: "Loading App Theme Configuration...",
        success: children(themeConfigQuery.data),
        error: "Something went wrong..."
    }[themeConfigQuery.status]);
};


export const Providers = ({ children }: any) => {
    return (
        <SupabaseAuthProvider>
            {(session: any) => (
                <QueryClientProvider client={queryClient}>
                    <Suspense fallback="Loading App Theme Configuration...">
                        <InitConfigProvider session={session}>
                            {(themeConfig: any) => (
                                <ThemeProvider themeConfig={themeConfig}>
                                    <PageTransitionWrapper>
                                        {/* <SmoothScroll></SmoothScroll> */}
                                            {children}
                                        {/* <KeycloakProvider keycloakInstance={keycloakInstance}>
                                        </KeycloakProvider> */}
                                    </PageTransitionWrapper>
                                </ThemeProvider>
                            )}
                        </InitConfigProvider>
                    </Suspense>
                </QueryClientProvider>
            )}
        </SupabaseAuthProvider>
    )
};