import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Box, Button, Grid, TextField } from '@mui/material';
import { create } from 'zustand';


interface SupabaseStoreTypes {
    session: any
    setSession: (session: any) => void
}

export const useSupabaseStore = create<SupabaseStoreTypes>((set) => ({
    session: null,
    setSession: (session: any) => set(() => ({ session })),
}));

const {
    VITE_SUPABASE_URL: supabaseUrl,
    VITE_SUPABASE_PUBLIC_KEY: supabaseAnonKey,
    VITE_GUEST_LOGIN_EMAIL: email,
    VITE_GUEST_LOGIN_PASSWORD: password,
} = import.meta.env;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function SupabaseAuthProvider({ children }: any) {
    const supabaseStore = useSupabaseStore();
    
    const [userType, setUserType] = useState<"admin" | "guest" | null>("admin");

    async function handleGuestSignIn() {
        setUserType("guest");
        await supabase.auth.signInWithPassword({ email, password });
    };

    async function handleSubmit(e: any) {
        e.preventDefault();

        // console.log("handleSubmit: ", e)
        setUserType("admin");
        await supabase.auth.signInWithPassword({
            email: e.target.email.value,
            password: e.target.password.value,
        });
    };

    useEffect(() => {
        supabase.auth
            .getSession()
            .then(({ data: { session } }: { data: { session: any } }) => {
                supabaseStore.setSession(session)
            });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
            
            if (!session) setUserType(null);

            supabaseStore.setSession(session)
        })

        return () => subscription.unsubscribe()
    }, [])

    // console.log({ supabaseStore, userType })

    if (!supabaseStore.session && !userType) return (
        <Box sx={{ height: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Box sx={{ border: "1px solid white", borderRadius: 1, p: 3, display: "block" }}>
                <Button onClick={() => setUserType("admin")}>Continue as Admin</Button>
                <Button onClick={handleGuestSignIn}>Continue as Guest</Button>
                {/* <Button onClick={() => supabase.auth.signOut()}>Sign out</Button> */}
            </Box>
        </Box>
    )

    if (!supabaseStore.session && (userType === "admin")) {
        return (
            <Box
                sx={{ 
                    display: "flex", 
                    justifyContent: "center", 
                    alignItems: "center", 
                    minHeight: "100vh",
                    width: "100vw" 
                }}
            >
                <Box sx={{ border: "1px solid white", borderRadius: 2, p: 3, display: "block" }}>
                    <Grid container
                        component="form"
                        onSubmit={handleSubmit}
                    >
                        <Grid item xs={12}>
                            <TextField
                                id="email"
                                type='email'
                                label="Email"
                                variant="outlined"
                                autoComplete="email"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="password"
                                type='password'
                                label="Password"
                                variant="outlined"
                                autoComplete="current-password"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end", gap: 2, pt: 2 }}>
                            <Button variant="outlined" color="error" onClick={() => setUserType(null)}>Cancel</Button>
                            <Button variant="outlined" type="submit">Submit</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        )
    }
    else return children;
}