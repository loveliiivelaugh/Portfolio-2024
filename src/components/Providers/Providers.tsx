import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '../Auth/Auth3';

const queryClient = new QueryClient();

export const Providers = ({ children }: any) => {
    return (
        <AuthProvider>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </AuthProvider>
    );
};