'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

interface AppProviderProps {
    children: ReactNode;
}

export default function AppProvider({ children }: AppProviderProps) {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                // staleTime: 1000 * 60 * 5,
                // gcTime: 0,
                // gcTime: 1000 * 60 * 60 * 2,
                retry: 1,
            },
        },
    });
    return (
        <>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </>
    );
}
