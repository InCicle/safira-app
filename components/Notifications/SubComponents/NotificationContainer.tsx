import React from 'react';
import { MenuItem, Stack, Box } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import { useHeaderProvider } from '@/safira-app/contexts/HeaderContext';
import { NotificationProps } from '@/safira-app/services/notifications';
import RenderAvatar from '@/safira-app/components/RenderAvatar';
import { incicleNotificationModules } from '@/safira-app/utils/modules';
import { links } from '@/safira-app/config/links';

interface IProps {
  notification?: NotificationProps;
  url?: string;
  onClick?: (ev?: any) => void;
}

const markAsReaded = (e: any, notification: NotificationProps, api: any, url?: string) => {
  e.preventDefault();
  api
    .patch(`${links.api.notifications_v1}/notifications/${notification.id}`)
    .then((response: any) => {
      if (response.status === 204 && url) {
        window.location.href = url;
      }
    })
    .catch(() => {
      if (url) {
        window.location.href = url;
      }
    });
};

export const NotificationContainer: React.FC<React.PropsWithChildren<IProps>> = ({
  notification,
  url,
  onClick,
  children,
}) => {
  const { api } = useHeaderProvider();

  function handleClick(ev?: any) {
    if (onClick) {
      onClick(ev);
    }

    if (notification) {
      markAsReaded(ev, notification, api, url);
    }

    if (!url) return;

    // redirect to the same domain instead of reload window
    const currentUrl = new URL(window.location.href);
    const notificationUrl = new URL(url);

    const currentDomain = `${currentUrl.hostname}`;
    const notificationDomain = `${notificationUrl.hostname}`;
    if (currentDomain === notificationDomain) {
      ev.preventDefault();
      const newUrl = `${notificationUrl.origin}${notificationUrl.pathname}`;
      window.history.replaceState(null, '', newUrl);
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

          {!!notification?.module && (
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
                src={incicleNotificationModules.find(incicleModule => incicleModule.slug === notification.module)?.icon}
                alt={notification.module}
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
