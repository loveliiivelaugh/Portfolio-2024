import { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';

import AuthForm from './AuthForm';
import { useAppStore, useSupabaseStore } from '../../utilities/store';
import { client, paths } from '../../utilities/config/api';



const useAppConfig = async () => {
    const appStore = useAppStore();
    const [appConfigIsLoading, setAppConfigIsLoading] = useState(true);

    async function getAndSetAppConfig() {
        const appConfigQuery = (await client.get(paths.getAppConfig)).data;
        appStore.setAppConfig(appConfigQuery);
        setAppConfigIsLoading(false);
        return appConfigQuery
    };

    return {
        getAndSetAppConfig,
        appConfigIsLoading
    };
}

export async function handleSignOut() {

    const result = await client.get(paths.logout);

    localStorage.removeItem("jwt");

    if (result.data) return true;

    return false
}

export function AuthProvider({ children }: any) {
    const supabaseStore = useSupabaseStore();
    const appConfigHook = useAppConfig();
    const [loginType, setLoginType] = useState<"signin" | "guest" | null>("signin");

    async function handleSuccess(data: any) {
        localStorage.setItem("jwt", data.jwt);

        supabaseStore.setSession({ ...data });
        
        (client as any).defaults.headers.common["Authorization"] = `Bearer ${data.jwt}`;
        
        (await appConfigHook).getAndSetAppConfig();
    };

    async function handleGuestSignIn() {
        // Can change this to anonymous login
        const response = await client.post(paths.login, {
            email: import.meta.env.VITE_GUEST_LOGIN_EMAIL,
            password: import.meta.env.VITE_GUEST_LOGIN_PASSWORD
        });

        if (response.data) handleSuccess(response.data);
    };

    async function handleSubmit(form: { email: string, password: string }) {
        // trycatch
        const response = await client.post(paths.login, form);

        if (response.data) handleSuccess(response.data);
    };

    useEffect(() => {
        const jwt = localStorage.getItem("jwt");

        if (jwt) {
            client.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

            client.post(paths.protected, { token: jwt })
                .then((response: any) => {

                    if (response.data.status === "success") handleSuccess({ ...response.data.user.data, jwt });
                });
        };

    }, [])


    // if (!supabaseStore.session && !loginType) return (
    //     <Box sx={{ height: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center" }}>
    //         <Box sx={{ border: "1px solid white", borderRadius: 1, p: 3, display: "block" }}>
    //             <Button onClick={() => setLoginType("signin")}>Continue to Login</Button>
    //             <Button onClick={handleGuestSignIn}>Continue as Guest</Button>
    //         </Box>
    //     </Box>
    // );

    // if (!supabaseStore.session && (loginType === "signin")) {
    //     return <AuthForm handleSubmit={handleSubmit} handleCancel={() => setLoginType(null)} />
    // }

    // else if ((appConfigHook as any)?.appConfigIsLoading) "Loading App Configuration Settings..."

    // else 
    return children;
}