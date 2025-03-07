import { NotificationProps } from '@/safira-app/services/notifications';
import { Box } from '@mui/material';
import RenderAvatar from '@/safira-app/components/RenderAvatar';
import { incicleNotificationModules } from '@/safira-app/utils/modules';

export const NotificationImageBox: React.FC<{
  notification: NotificationProps;
}> = ({ notification }) => {
  return (
    <Box sx={{ position: 'relative' }}>
      <RenderAvatar src={notification.sender.avatar_url} />

      {!!notification.module && (
        <Box
          sx={{
            position: 'absolute',
            bottom: '-4px',
            left: '-4px',
            width: '16px',
            height: '16px',
            border: '1px solid #00568b',
            backgroundColor: '#fff',
            borderRadius: '50%',
          }}
        >
          <img
            src={
              incicleNotificationModules.find(
                (incicleModule) => incicleModule.slug === notification.module,
              )?.icon
            }
            alt={notification.module}
            style={{ width: '100%', height: 'auto' }}
          />
        </Box>
      )}
    </Box>
  );
};
