import React from 'react';
import { FilterModules } from '@/utils/modules';
import CircleIcon from '@mui/icons-material/Circle';
import { MenuItem, Stack, Box } from '@mui/material';
import { RenderAvatar } from '@/components/renderAvatar';
import { markAsReadNotification, NotificationProps } from '@/services/api/notifications';

interface NotificationContainerProps {
  notification?: NotificationProps;
  url?: string;
  onClick?: (ev?: any) => void;
}

export const NotificationContainer: React.FC<React.PropsWithChildren<NotificationContainerProps>> = ({
  url,
  onClick,
  children,
  notification,
}) => {
  function markAsRead(e: any, notification: NotificationProps, url?: string) {
    e.preventDefault();
    markAsReadNotification(notification.id)
      .then((response: any) => {
        if (response.status === 204 && url && typeof window !== 'undefined') window.location.href = url;
      })
      .catch(() => {
        if (typeof window === 'undefined' || !url) return;
        window.location.href = url;
      });
  }

  function handleClick(ev?: any) {
    if (onClick) {
      onClick(ev);
    }

    if (notification) {
      markAsRead(ev, notification, url);
    }
  }

  return (
    <MenuItem
      style={{
        whiteSpace: 'normal',
        paddingTop: '10px',
        paddingBottom: '10px',
        backgroundColor: notification?.saw ? 'initial' : '#EEEEEE',
      }}
      sx={{
        '&:hover': {
          backgroundColor: '#F2F3F4!important',
        },
      }}
      component={url ? 'a' : 'div'}
      href={url}
      onClick={handleClick}
    >
      <Stack direction="row" style={{ width: '100%' }} alignItems="center">
        <Box sx={{ position: 'relative' }}>
          {notification && <RenderAvatar src={notification?.sender.avatar_url} />}

          {Boolean(notification?.module) && (
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
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img
                src={FilterModules.find(module => module.slug === notification?.module)?.icon}
                alt={notification?.module}
                style={{ width: '100%', height: 'auto' }}
              />
            </Box>
          )}
        </Box>
        <Stack direction="column" spacing={1} style={{ width: '100%', marginRight: '10px' }}>
          {children}
        </Stack>
        {!notification?.read && <CircleIcon sx={{ fill: '#00adcb', width: 10 }} />}
      </Stack>
    </MenuItem>
  );
};
