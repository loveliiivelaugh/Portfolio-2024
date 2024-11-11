import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { PageTransitionWrapper, ThemeProvider } from '../theme/ThemeProvider';
import { AuthProvider } from '../components/Auth/Auth3';

const queryClient = new QueryClient();

export const Providers = ({ children }: any) => {
    return (
        <AuthProvider>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider>
                    <PageTransitionWrapper>
                        {children}
                    </PageTransitionWrapper>
                </ThemeProvider>
            </QueryClientProvider>
        </AuthProvider>
    );
};