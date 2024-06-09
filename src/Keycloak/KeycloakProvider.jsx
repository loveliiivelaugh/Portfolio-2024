import { createContext, useEffect } from 'react';
import { create } from 'zustand';

const useKeycloakStore = create((set) => ({
    // states
    auth: false,
    authToken: null,
    keycloakUser: null,
    setKeycloakUser: (keycloakUser) => set(() => ({ keycloakUser })),
    setAuthToken: (token) => set(() => ({ authToken: token })),
    setAuth: (auth) => set(() => ({ auth })),
}));

const KeycloakContext = createContext({});

export const KeycloakProvider = (props) => {
    const { keycloakInstance, children } = props;
    const keycloakStore = useKeycloakStore();

    console.log("keycloakInstance: ", props, keycloakInstance, keycloakStore)

    useEffect(() => {

        if (!keycloakInstance.didInitialize) keycloakInstance.init({
            onLoad: 'login-required',
            checkLoginIFrame: false
        })
        .then(async (authenticated) => {
            if (authenticated && keycloakInstance.token) {
                const jwt = keycloakInstance.token;

                // Set token as global Authorization header in Axios
                keycloakStore.setAuthToken(jwt);

                window.client.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;

                // JWT token payload
                // const payload = JSON.parse(window.atob(jwt.split('.')[1]));

                // Set keycloak user in global context.
                // You will now have access to the user through the useKeycloak hook.
                if (!keycloakStore.keycloakUser) {
                    // Authenticates Keycloak JWT and get cookie from express back end
                    
                    // const response = await axios.get(paths.get_self);
                    // const user_roles = response.data?.user_roles.map((role) => role.role_name) || [];

                    // // If response code is not between 200 - 399
                    // if ((response.status < 200) || (response.status > 399)) throw new Error("Unable to authenticate keycloak user");

                    // keycloakStore.setKeycloakUser({ 
                    //   ...payload, 
                    //   data: response?.data, 
                    //   roles: user_roles 
                    // });

                    // Set authenticated as global context
                    keycloakStore.setAuth('authenticated');
                    keycloakStore.setKeycloakUser(keycloakInstance);
                };

                keycloakStore.setAuth('success');
            };
        })
        .catch((error) => {
            console.error(error);
            keycloakStore.setAuth('failed');
        });
    
    }, []);

    if (!keycloakStore.auth) return (
        <div>Loading...</div>
    );

    if (keycloakStore.auth === 'failed') return (
        <div>Failed to authenticate</div> // <Unauthorized />
    );

    if (keycloakStore.auth === 'success') return (
        <KeycloakContext.Provider value={keycloakStore}>
            {children}
        </KeycloakContext.Provider>
    );

    else return <>Error!</>;
}