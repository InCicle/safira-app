import { FC, PropsWithChildren } from 'react';
import { Container, Stack } from '@mui/material';
import Header from '@/pages/Header';
import { useMe } from '@/hooks/useMe';
import { usePermissions } from '@/hooks/usePermissions';

export const DefaultMainLayout: FC<PropsWithChildren> = ({ children }) => {
  useMe();
  usePermissions();
  return (
    <>
      <Header />
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
