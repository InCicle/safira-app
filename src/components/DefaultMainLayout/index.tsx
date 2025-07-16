import { FC, PropsWithChildren } from 'react';
import { Container, Stack } from '@mui/material';
import Header from '@/pages/Header';

export const DefaultMainLayout: FC<PropsWithChildren> = ({ children }) => {
  // if (typeof window !== 'undefined' && window.location.pathname === '/login') return <>{children}</>;
  return (
    <>
      <Header />
      <Stack
        direction="row"
        gap={1}
        width="100%"
        height="calc(100% - 55px)"
        position="relative"
      >
        <Stack
          direction="column"
          width="100%"
          height="100%"
          sx={{ overflow: 'auto' }}
        >
          <Container component="main" sx={{ my: 2 }}>
            {children}
          </Container>
        </Stack>
      </Stack>
    </>
  );
};
