import { NotificationProps } from '@/services/api/notifications';
import { Box } from '@mui/material';
import { RenderAvatar } from '@/components/renderAvatar';
import { FilterModules } from '@/utils/modules';

export const NotificationImage: React.FC<{
  notification: NotificationProps;
}> = ({ notification }) => {
  return (
    <Box sx={{ position: 'relative' }}>
      <RenderAvatar src={notification.sender.avatar_url} />

      {Boolean(notification.module) && (
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
              FilterModules.find(
                (module) => module.slug === notification.module,
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
