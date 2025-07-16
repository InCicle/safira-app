import React, { FC } from 'react';
import { Badge, IconButton } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { NotificationsMenu } from '../components/notificationsMenu';
import { NotificationsReadOptions } from '@/services/api/notifications';
import { MODULES } from '@/interfaces/Modules';

interface NotificationsViewProps {
  anchorRef: React.RefObject<HTMLButtonElement>;
  badgeIsInvisible: boolean;
  open: boolean;
  handleOpenMenu: (ev) => void;
  handleCloseMenu: (ev) => void;
  showNotificationsLoading: boolean;
  observerNotificationsRef: React.RefObject<HTMLDivElement | null>;
  handleChangeNotificationsOption: (value: NotificationsReadOptions) => void;
  anchorElFilter: HTMLButtonElement | null;
  handleOpenFilters: (
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
  handleCloseFilters: () => void;
  handleSetModuleFilter: (module: MODULES) => void;
  anchorElOptions: HTMLButtonElement | null;
  handleCloseOptions: () => void;
  handleCheckAllRead: () => void;
  handleOpenOptions: (
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
  isLoading: boolean;
  handleLoadMoreContent: () => void;
}

export const NotificationsView: FC<NotificationsViewProps> = ({
  open,
  anchorRef,
  isLoading,
  anchorElFilter,
  badgeIsInvisible,
  showNotificationsLoading,
  handleOpenMenu,
  handleCloseMenu,
  handleChangeNotificationsOption,
  handleCloseFilters,
  handleOpenFilters,
  handleSetModuleFilter,
  anchorElOptions,
  handleCloseOptions,
  handleCheckAllRead,
  handleOpenOptions,
}) => {
  return (
    <>
      <IconButton
        ref={anchorRef}
        size="medium"
        sx={{ width: 35, height: 35 }}
        onClick={handleOpenMenu}
      >
        <Badge
          color="error"
          variant="dot"
          invisible={badgeIsInvisible}
          badgeContent=" "
          overlap="circular"
        >
          <NotificationsIcon sx={{ width: 25, height: 25 }} />
        </Badge>
      </IconButton>

      <NotificationsMenu
        open={open}
        anchorRef={anchorRef}
        handleCloseMenu={handleCloseMenu}
        showLoading={showNotificationsLoading}
        anchorElFilter={anchorElFilter}
        handleChangeNotificationsOption={handleChangeNotificationsOption}
        handleCloseFilters={handleCloseFilters}
        handleOpenFilters={handleOpenFilters}
        handleSetModuleFilter={handleSetModuleFilter}
        isLoading={isLoading}
        handleOpenOptions={handleOpenOptions}
        handleCloseOptions={handleCloseOptions}
        handleCheckAllRead={handleCheckAllRead}
        anchorElOptions={anchorElOptions}
      />
    </>
  );
};
