import { FC, PropsWithChildren } from 'react';
import { Container, Stack } from '@mui/material';
import Header from '@/pages/Header';
import { useAuthStore } from '@/store/useAuthStore';
import { useProfileStore } from '@/store/useProfileStore';
import { usePermissionsStore } from '@/store/usePermissionsStore';

export const DefaultMainLayout: FC<PropsWithChildren> = ({ children }) => {
  const { user } = useAuthStore();
  const { me, companyId, setCompanyId } = useProfileStore();
  const { checkPermission, permissions } = usePermissionsStore();
  return (
    <>
      <Header
        user={user}
        me={me}
        companyId={companyId}
        setCompanyId={setCompanyId}
        checkPermission={checkPermission}
        permissions={permissions}
        apiClient={undefined}
      />
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
