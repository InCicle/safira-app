import React, { useImperativeHandle, useLayoutEffect, useRef } from 'react';
import { Badge, IconButton, Menu } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

import { NotificationEvent } from '@/safira-app/providers/NotificationEvent';
import { useNotifications } from '@/safira-app/hooks/useNotifications';
import { useQuery } from '@/safira-app/hooks/useQuery';
import { useRender } from '@/safira-app/hooks/useRender';

import NotificationsContent from './NotificationsContent';

type AnchorButton = EventTarget & HTMLButtonElement;

type NotificationsRef = {
  openDropdown(anchorEl: AnchorButton): void;
  closeDropdown(): void;
};

const Notifications: React.ForwardRefRenderFunction<NotificationsRef> = (_, ref) => {
  const { badgeAsInvisible, dropdownOpened, notifications } = useNotifications();
  const { uniqueCall } = useRender();
  const query = useQuery();

  const anchorRef = useRef<HTMLButtonElement | null>(null);

  function handleOpenDropdown(ev?: any) {
    ev?.stopPropagation();
    NotificationEvent.emit('open_dropdown');
  }

  function handleCloseDropdown(ev?: any) {
    ev?.stopPropagation();
    NotificationEvent.emit('close_dropdown');
  }

  useLayoutEffect(() => {
    if (!notifications.length) return;

    uniqueCall('open dropdown by url params', () => {
      const openNotificationDropdown = query.get('notifications') === 'open';

      if (openNotificationDropdown) {
        query.delete('notifications');
        NotificationEvent.emit('open_dropdown');
      }
    });
  }, [query, uniqueCall, notifications]);

  useImperativeHandle(ref, () => {
    return {
      openDropdown: handleOpenDropdown,
      closeDropdown: handleCloseDropdown,
    };
  });

  return (
    <>
      <IconButton ref={anchorRef} size="medium" sx={{ width: 35, height: 35 }} onClick={handleOpenDropdown}>
        <Badge color="error" variant="dot" invisible={badgeAsInvisible} badgeContent=" " overlap="circular">
          <NotificationsIcon sx={{ width: 25, height: 25 }} />
        </Badge>
      </IconButton>

      <Menu
        open={dropdownOpened}
        onClose={handleCloseDropdown}
        anchorEl={anchorRef.current}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            width: 350,
            mt: 1.5,
            '*': {
              fontSize: '1rem',
            },
            '& .MuiAvatar-root': {
              width: 40,
              height: 40,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
            '& li, & a': {
              fontFamily: '"Open Sans", sans-serif',
              fontSize: '13px',
            },
          },
        }}
      >
        {dropdownOpened && <NotificationsContent />}
      </Menu>
    </>
  );
};

export default React.forwardRef(Notifications);
