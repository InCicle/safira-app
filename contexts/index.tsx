import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC, PropsWithChildren } from 'react';
import { AuthProvider } from './AuthContext';
import { ProfileProvider } from './ProfileContext';
import { PermissionsProvider } from './PermissionsContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnMount: false, refetchOnReconnect: false, refetchOnWindowFocus: false },
  },
});

export const MainProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ProfileProvider>
          <PermissionsProvider>{children}</PermissionsProvider>
        </ProfileProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};
