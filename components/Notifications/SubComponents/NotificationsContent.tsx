import React, { useCallback } from 'react';
import { Skeleton, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Waypoint } from 'react-waypoint';

import { useNotifications } from 'safira-app/hooks/useNotifications';

import { NotificationItem, IncicleModulesDropdown, MoreOptionsDropdown } from '.';

import { translation } from 'safira-app/utils/translation';
import { NotificationFilterOptions } from 'safira-app/services/notifications';
import { NotificationWrapper } from '../style';

export const NotificationsContent: React.FC = () => {
  const { notifications, notificationsReqData, params, isLoading, fetchNotifications } = useNotifications();
  const { t } = useTranslation();

  const perPage = params.perPage || 0;
  const hasMoreContent = !(notificationsReqData.length < perPage);
  const showLoading = isLoading || hasMoreContent;

  const handleLoadMoreContent = useCallback(() => {
    if (!isLoading && hasMoreContent) {
      fetchNotifications({ page: (params?.page || 1) + 1 });
    }
  }, [isLoading, params]); // eslint-disable-line

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

      <IncicleModulesDropdown />

      <NotificationWrapper>
        <Typography variant="body2" sx={{ padding: '0 15px', color: '#959595', fontSize: '11px' }}>
          {translation(t, params.read === NotificationFilterOptions.UNREADED ? 'unread' : 'all')}
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

        <Waypoint topOffset="-80px" onEnter={handleLoadMoreContent}>
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
        </Waypoint>
      </NotificationWrapper>
    </>
  );
};

export default NotificationsContent;
