import { Box, Stack } from '@mui/material';
import { NotificationEvent } from '@/safira-app/providers/NotificationEvent';

export const NotificationContainerToast: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  function handleOpenDropdown() {
    NotificationEvent.emit('open_dropdown');
  }

  return (
    <Box
      onClick={handleOpenDropdown}
      sx={{
        maxWidth: '200px',
        margin: '0 auto',
        whiteSpace: 'normal',
        paddingTop: '10px',
        paddingBottom: '10px',
        backgroundColor: 'initial',
      }}
    >
      <Stack direction="row" style={{ width: '100%' }} alignItems="center">
        <Stack direction="column" spacing={1} style={{ width: '100%', marginRight: '10px' }}>
          {children}
        </Stack>
      </Stack>
    </Box>
  );
};
