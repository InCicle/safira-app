import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DefaultMainLayout } from './components/DefaultMainLayout';
import AuthProvider from './contexts/Auth/Provider';
import ProfileProvider from './contexts/Profile/Provider';
import PermissionsProvider from './contexts/Permissions/Provider';
import { createInterceptor } from './utils/interceptor';
import { useAuth } from './hooks/useAuth';
import { usePermissions } from './hooks/usePermissions';
import { Settings } from 'luxon';

const queryClient = new QueryClient();

interface AppProps {
  children?: ReactNode;
}

function App({ children }: AppProps) {
  const { companyId } = usePermissions();
  const { signOut, refreshToken, user } = useAuth();

  const { interceptRequest, interceptResponse } = createInterceptor({
    signOut,
    refreshToken,
    companyId,
  });

  Settings.defaultLocale = user?.config.default_language || 'en';
  Settings.defaultZone = user?.config.default_timezone || 'UTC';

  interceptRequest();
  interceptResponse();

  try {
    return (
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ProfileProvider>
            <PermissionsProvider>
              <DefaultMainLayout>{children}</DefaultMainLayout>
            </PermissionsProvider>
          </ProfileProvider>
        </AuthProvider>
      </QueryClientProvider>
    );
  } catch (error) {
    console.error(error);
    const errorMessage = 'An error occurred while rendering the component';
    return <div>{errorMessage}</div>;
  }
}

export default App;
