import React from 'react';
import { Skeleton, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { translation } from '@/safira-app/utils/translation';
import { NotificationReadOptionsType, NotificationsReadOptions } from '@/safira-app/services/queries/notifications';
import { MoreOptionsDropdown } from './moreOptionsDropdown';
import { NotificationsFilters } from './incicleModulesDropdown';
import { NotificationWrapper } from './styles';
import { NotificationItem } from './notificationItem';
import { useNotifications } from '@/safira-app/hooks/useNotifications';
import { ModulesType } from '@/safira-app/interfaces/Modules';
import { useIntersectionObserver } from '@/safira-app/hooks/useIntersectionObserver';

interface NotificationsBodyProps {
  observerRef: React.RefObject<HTMLDivElement | null>;
  showLoading: boolean;
  handleSetNotificationsModuleFilter: (module: ModulesType) => void;
  handleChangeNotificationOption: (value: NotificationReadOptionsType) => void;
  handleOpenFilters: (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleCloseFilters: () => void;
  openFilters: boolean;
  anchorElFilter: HTMLButtonElement | null;
  isLoading: boolean;
  handleLoadMoreContent: () => void;
}

export const NotificationsBody: React.FC<NotificationsBodyProps> = ({
  observerRef,
  showLoading,
  anchorElFilter,
  handleChangeNotificationOption,
  handleCloseFilters,
  handleLoadMoreContent,
  handleOpenFilters,
  handleSetNotificationsModuleFilter,
  isLoading,
  openFilters,
}) => {
  const { t } = useTranslation();
  const { params, notifications, hasNextPage, isFetchingNextPage } = useNotifications();
  useIntersectionObserver({ observerRef, hasNextPage, isFetchingNextPage, fetchNextPage: handleLoadMoreContent });
  return (
    <>
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

        <MoreOptionsDropdown />
      </Stack>

      <NotificationsFilters
        anchorEl={anchorElFilter}
        open={openFilters}
        handleChangeNotificationOption={handleChangeNotificationOption}
        handleCloseFilters={handleCloseFilters}
        handleOpenFilters={handleOpenFilters}
        handleSetNotificationsModuleFilter={handleSetNotificationsModuleFilter}
        isLoading={isLoading}
      />

      <NotificationWrapper>
        <Typography variant="body2" sx={{ padding: '0 15px', color: '#959595', fontSize: '11px' }}>
          {translation(t, params.read === NotificationsReadOptions.UNREADED ? 'unread' : 'all')}
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

        <div ref={observerRef}>
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
        </div>
      </NotificationWrapper>
    </>
  );
};
