import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { PageTransitionWrapper, ThemeProvider } from '../theme/ThemeProvider';
import { SupabaseAuthProvider } from '../components/Auth/Auth';

const queryClient = new QueryClient();

export const Providers = ({ children }: any) => {
    return (
        <SupabaseAuthProvider>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider>
                    <PageTransitionWrapper>
                        {children}
                    </PageTransitionWrapper>
                </ThemeProvider>
            </QueryClientProvider>
        </SupabaseAuthProvider>
    );
};