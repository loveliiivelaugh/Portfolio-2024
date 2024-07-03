import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

import { PageTransitionWrapper, ThemeProvider } from '../theme/ThemeProvider';
import { SupabaseAuthProvider, useSupabaseStore } from '../components/Auth/Auth';
import { client, queries } from '../config/api';
import { encodeJWT } from '../config/jwt';


// ?? For Websocket Session ID
// const sessionID = uuidv4();

const queryClient = new QueryClient();

// On Apps First Load
const InitConfigProvider = ({ children }: { children: any }) => {
    const supabaseStore = useSupabaseStore();
    // Get Theme Config
    const appConfigQuery = useQuery(queries.getAppConfigQuery());

    // TODO:  Move to SupabaseAuthProvider
    // Encode JWT to enable authentication across microservices
    const token = encodeJWT(supabaseStore.session);
    (client as any).defaults.headers.common["Authorization"] = `Bearer ${token}`;

    // ?? TODO: FOLLOWING COMING SOON
    // const youtubeQuery = useQuery(queries.getYouTubeData)
    // console.log({ youtubeQuery })
    
    // // Websocket client.ts ?? In progress ??
    // const websocketClient = hc('http://localhost:5001');
    // const ws = websocketClient.ws.$ws(0);

    // ws.addEventListener('open', () => {
    //     setInterval(() => {
    //         ws.send(JSON.stringify({
    //             timestamp: new Date().toString(), 
    //             id: 1, 
    //             appID: "FamilyApps",
    //             sessionID
    //         }))
    //     }, 1000);
    // });

    // Initialize Keycloak *Will come back to this*
    // const [keycloakInstance, setKeycloakInstance] = useState(null);
    
    // // Initialize Keycloak
    // const instance = new Keycloak(JSON.parse(import.meta.env.VITE_KEYCLOAK_CONFIG));
    // setKeycloakInstance(instance);

    return ({
        pending: "Uninitialized...",
        loading: "Loading App Theme Configuration...",
        success: children(appConfigQuery.data?.themeConfig),
        error: "Something went wrong..."
    }[appConfigQuery.status]);
};


export const Providers = ({ children }: any) => {
    return (
        <SupabaseAuthProvider>
            <QueryClientProvider client={queryClient}>
                <InitConfigProvider>
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
            </QueryClientProvider>
        </SupabaseAuthProvider>
    )
};