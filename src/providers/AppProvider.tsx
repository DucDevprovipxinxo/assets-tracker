'use client';
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { ReactNode } from 'react';

interface AppProviderProps {
    children: ReactNode;
}

export default function AppProvider({ children }: AppProviderProps) {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 1000 * 60 * 5,  
                gcTime: 1000 * 60 * 10,
                retry: 1,
            },
        },
    });

    const persister = createSyncStoragePersister({
        storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    });

    return (
        <>
            <PersistQueryClientProvider 
                client={queryClient}
                persistOptions={{ persister }}
            >
                {children}
            </PersistQueryClientProvider>
        </>
    );
}
