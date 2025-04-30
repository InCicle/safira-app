import { FC, PropsWithChildren, Suspense } from 'react';
import { Container, Skeleton, Stack } from '@mui/material';
import { useAuth } from '@/safira-app/hooks/useAuth';
import { useProfile } from '@/safira-app/hooks/useProfile';
import Header from '@/safira-app/pages/Header';

export const DefaultMainLayout: FC<PropsWithChildren> = ({ children }) => {
  const { me } = useProfile();
  const { user } = useAuth();

  return (
    <>
      {me && user && (
        <Suspense
          fallback={
            <Skeleton
              width="100%"
              height="55px"
              variant="rectangular"
              animation="wave"
              sx={{ backgroundColor: '#fff' }}
            />
          }
        >
          <Header />
        </Suspense>
      )}

      <Stack direction="row" gap={1} width="100%" height="calc(100% - 55px)" position="relative">
        <Stack direction="column" width="100%" height="100%" sx={{ overflow: 'auto' }}>
          <Container component="main" sx={{ my: 2 }}>
            {children}
          </Container>
        </Stack>
      </Stack>
    </>
  );
};
