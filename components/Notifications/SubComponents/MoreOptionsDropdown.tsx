import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';

import { IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DoneIcon from '@mui/icons-material/Done';
import ComputerIcon from '@mui/icons-material/Computer';

import { useNotifications } from '@/safira-app/hooks/useNotifications';
import { links } from '@/safira-app/config/links';

type AnchorButton = EventTarget & HTMLButtonElement;

const MoreOptionsDropdown: React.FC = () => {
  const { api, setNotifications } = useNotifications();

  const [anchorEl, setAnchorEl] = useState<AnchorButton | null>(null);

  const open = Boolean(anchorEl);

  function handleOpenDropdown(ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    setAnchorEl(ev.currentTarget);
  }

  function handleCloseDropdown() {
    setAnchorEl(null);
  }

  function handleCheckAllReaded() {
    /**
     * This function is used to check all notifications as readed
     */
    api.get(`${links.api.notification}/notifications/read`);
    // Set notifications as viewed
    setNotifications(old =>
      old?.map(notification => {
        notification.read = true;
        return notification;
      }),
    );
  }

  return (
    <>
      <IconButton onClick={handleOpenDropdown}>
        <MoreHorizIcon sx={{ width: 20, height: 20 }} />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseDropdown}
        PaperProps={{
          elevation: 0,
          sx: { boxShadow: '0 0px 8px 1px rgba(0, 0, 0, 0.1)' },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem key={uuid()} sx={{ fontSize: '14px' }} onClick={handleCheckAllReaded}>
          <ListItemIcon>
            <DoneIcon fontSize="small" sx={{ width: 18, height: 18 }} />
          </ListItemIcon>
          Marcar todas como lidas
        </MenuItem>

        <MenuItem component="a" href={`${links.web.social}/notifications`} sx={{ fontSize: '14px' }}>
          <ListItemIcon>
            <ComputerIcon fontSize="small" sx={{ width: 18, height: 18 }} />
          </ListItemIcon>
          Abrir notificações
        </MenuItem>
      </Menu>
    </>
  );
};

export default MoreOptionsDropdown;
