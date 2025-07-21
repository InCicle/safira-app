import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NotificationWrapper } from './styles';
import { NotificationItem } from './notificationItem';
import { MoreOptionsMenu } from '@/components/MoreMenu';
import { Menu, Skeleton, Stack, Typography } from '@mui/material';
import { translation } from '@/utils/translation';
import { NotificationsFilters } from './notificationsFilters';
import { useNotifications } from '@/hooks/useNotifications';
import { NotificationsReadOptions } from '@/services/api/notifications';
import { v4 as uuid } from 'uuid';
import DoneIcon from '@mui/icons-material/Done';
import ComputerIcon from '@mui/icons-material/Computer';
import { ListItemIcon, MenuItem } from '@mui/material';
import { links } from '@/utils/links';
import { MODULES } from '@/interfaces/Modules';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface NotificationsMenuProps {
  open: boolean;
  anchorRef: React.RefObject<HTMLButtonElement | null>;
  handleCloseMenu: () => void;
  observerNotificationsRef: React.RefObject<HTMLDivElement | null>;
  showLoading: boolean;
  handleSetModuleFilter: (module: MODULES) => void;
  handleChangeNotificationsOption: (value: NotificationsReadOptions) => void;
  handleOpenFilters: (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleCloseFilters: () => void;
  anchorElFilter: HTMLButtonElement | null;
  isLoading: boolean;
  handleLoadMoreContent: () => void;
  anchorElOptions: HTMLButtonElement | null;
  handleCloseOptions: () => void;
  handleCheckAllRead: () => void;
  handleOpenOptions: (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const NotificationsMenu: React.FC<NotificationsMenuProps> = ({
  isLoading,
  showLoading,
  anchorElFilter,
  anchorRef,
  handleCloseMenu,
  open,
  handleOpenFilters,
  handleCloseFilters,
  handleChangeNotificationsOption,
  handleSetModuleFilter,
  anchorElOptions,
  handleCloseOptions,
  handleOpenOptions,
  handleCheckAllRead,
  handleLoadMoreContent,
  observerNotificationsRef,
}) => {
  const { t } = useTranslation();
  const { params, notifications, hasNextPage, isFetchingNextPage } = useNotifications();
  useIntersectionObserver({
    observerRef: observerNotificationsRef,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage: handleLoadMoreContent,
  });

  useEffect(() => {
    if (open) {
      handleLoadMoreContent();
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Menu
      open={open}
      onClose={handleCloseMenu}
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
      {open && (
        <div>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              padding: '0 15px',
            }}
          >
            <Typography variant="h6" fontSize={14}>
              {translation(t, 'notifications')}
            </Typography>

            <MoreOptionsMenu anchorEl={anchorElOptions} handleClose={handleCloseOptions} handleOpen={handleOpenOptions}>
              <MenuItem key={uuid()} sx={{ fontSize: '14px' }} onClick={handleCheckAllRead}>
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
            </MoreOptionsMenu>
          </Stack>

          <NotificationsFilters
            isLoading={isLoading}
            anchorEl={anchorElFilter}
            handleOpen={handleOpenFilters}
            handleClose={handleCloseFilters}
            handleSetModuleFilter={handleSetModuleFilter}
            handleChangeReadOptionReader={handleChangeNotificationsOption}
          />

          <NotificationWrapper>
            <Typography variant="body2" sx={{ padding: '0 15px', color: '#959595', fontSize: '11px' }}>
              {translation(t, params.read === NotificationsReadOptions.UNREAD ? 'unread' : 'all')}
            </Typography>

            {notifications.map(item => (
              <NotificationItem key={item.id} data={item} />
            ))}

            {!notifications.length && (
              <Typography
                sx={{
                  width: '100%',
                  fontStyle: 'italic',
                  textAlign: 'center',
                  color: '#a8a8a8',
                }}
              >
                {translation(t, 'no_notifications_yet')}
              </Typography>
            )}

            <Stack direction="row" justifyContent="center" alignItems="center" padding={1.5} height={70}>
              {showLoading ? (
                <Stack direction="row" gap={1} alignItems="center">
                  <Stack>
                    <Skeleton variant="circular" width={42} height={42} />
                  </Stack>
                  <Stack gap={1}>
                    <Skeleton variant="rectangular" width={270} height={8} sx={{ borderRadius: 50 }} />
                    <Skeleton variant="rectangular" width={100} height={8} sx={{ borderRadius: 50 }} />
                  </Stack>
                </Stack>
              ) : (
                <Stack direction="row" justifyContent="center" alignItems="center">
                  <Typography
                    sx={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      color: 'gray',
                      opacity: 0.5,
                    }}
                  >
                    {translation(t, 'this_is_all')}
                  </Typography>
                </Stack>
              )}
            </Stack>
          </NotificationWrapper>
        </div>
      )}
    </Menu>
  );
};
