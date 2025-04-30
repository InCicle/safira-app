import React, { FC } from 'react';
import { Badge, IconButton, Menu } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { NotificationsBody } from '../components/notificationsBody';

interface NotificationsProps {
  anchorRef: React.RefObject<HTMLButtonElement | null>;
  badgeIsInvisible: boolean;
  dropdownOpened: boolean;
  handleOpenDropdown: (ev?: any) => void;
  handleCloseDropdown: (ev?: any) => void;
}

export const NotificationsView: FC<NotificationsProps> = ({
  anchorRef,
  badgeIsInvisible,
  dropdownOpened,
  handleOpenDropdown,
  handleCloseDropdown,
}) => {
  return (
    <>
      <IconButton ref={anchorRef} size="medium" sx={{ width: 35, height: 35 }} onClick={handleOpenDropdown}>
        <Badge color="error" variant="dot" invisible={badgeIsInvisible} badgeContent=" " overlap="circular">
          <NotificationsIcon sx={{ width: 25, height: 25 }} />
        </Badge>
      </IconButton>

      <Menu
        open={dropdownOpened}
        onClose={handleCloseDropdown}
        anchorEl={anchorRef.current}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        slotProps={{
          paper: {
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
          },
        }}
      >
        {dropdownOpened && <NotificationsBody />}
      </Menu>
    </>
  );
};
