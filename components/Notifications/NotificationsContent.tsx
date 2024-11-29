import React, { useCallback, useState } from 'react';
import { Skeleton, Stack, Typography } from '@mui/material';
import { Waypoint } from 'react-waypoint';

import { useNotifications } from 'safira-app/hooks/useNotifications';

import NotificationItem from './SubComponents/NotificationItem';
import IncicleModulesDropdown from './SubComponents/IncicleModulesDropdown';
import MoreOptionsDropdown from './SubComponents/MoreOptionsDropdown';

import { NotificationFilterOptions } from './enums';
import { NotificationFiltersType } from './types';
import { NotificationWrapper } from './style';
import { translation } from 'safira-app/utils/translation';
import { useTranslation } from 'react-i18next';

const NotificationsContent: React.FC = () => {
  const { notifications, notificationsReqData, params, isLoading, updateNotifications } = useNotifications();
  const { t } = useTranslation();

  const [notificationFilters, setNotificationFilters] = useState<NotificationFiltersType>({
    type: NotificationFilterOptions.ALL,
    module_filter: '',
  });

  const showSkeleton = !!notificationsReqData.length || isLoading;

  const handleLoadMoreContent = useCallback(() => {
    if (!isLoading) {
      updateNotifications({ page: (params?.page || 1) + 1 });
    }
  }, [isLoading, params]); // eslint-disable-line

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ padding: '0 15px' }}>
        <Typography variant="h6" fontSize={14}>
          {translation(t, 'notifications')}
        </Typography>

        <MoreOptionsDropdown />
      </Stack>

      <IncicleModulesDropdown
        notificationFilters={notificationFilters}
        setNotificationFilters={setNotificationFilters}
      />

      <NotificationWrapper>
        <Typography variant="body2" sx={{ padding: '0 15px', color: '#959595', fontSize: '11px' }}>
          {translation(t, notificationFilters.type === NotificationFilterOptions.ALL ? 'all' : 'unread')}
        </Typography>

        {notifications.map(item => (
          <NotificationItem key={item._id} data={item} />
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

        {/* @ts-ignore */}
        <Waypoint topOffset="-80px" onEnter={handleLoadMoreContent}>
          <Stack direction="row" justifyContent="center" alignItems="center" padding={1.5} height={70}>
            {showSkeleton ? (
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
                <Typography sx={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'gray', opacity: 0.5 }}>
                  {t('this_is_all')}
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
