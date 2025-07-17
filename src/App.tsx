import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DefaultMainLayout } from './components/DefaultMainLayout';
import { createInterceptor } from './utils/interceptor';
import { Settings } from 'luxon';
import { useAuthStore } from './store/useAuthStore';
import { useProfileStore } from './store/useProfileStore';

const queryClient = new QueryClient();

interface AppProps {
  children?: ReactNode;
}

function App({ children }: AppProps) {
  const { companyId } = useProfileStore();
  const { signOut, refreshToken, user } = useAuthStore();

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
        <DefaultMainLayout>{children}</DefaultMainLayout>
      </QueryClientProvider>
    );
  } catch (error) {
    console.error(error);
    const errorMessage = 'An error occurred while rendering the component';
    return <div>{errorMessage}</div>;
  }
}

export default App;
