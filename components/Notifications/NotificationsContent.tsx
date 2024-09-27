import React, { useState } from 'react';
import { Skeleton, Stack, Typography } from '@mui/material';
import { Waypoint } from 'react-waypoint';

import { useNotifications } from '@/safira-app/hooks/useNotifications';

import NotificationItem from './SubComponents/NotificationItem';
import IncicleModulesDropdown from './SubComponents/IncicleModulesDropdown';
import MoreOptionsDropdown from './SubComponents/MoreOptionsDropdown';

import { NotificationFilterOptions } from './enums';
import { NotificationFiltersType } from './types';
import { NotificationWrapper } from './style';

const NotificationsContent: React.FC = () => {
  const { notifications, notificationParams, updateNotifications } = useNotifications();

  const [loading, setLoading] = useState(true);
  const [answerHasNewContent, setAnswerHasNewContent] = useState(true);
  const [notificationFilters, setNotificationFilters] = useState<NotificationFiltersType>({
    type: NotificationFilterOptions.ALL,
    module_filter: '',
  });

  function handleLoadMoreContent() {
    setLoading(true);

    updateNotifications({ page: (notificationParams?.page || 1) + 1 }, ({ data }) => {
      setAnswerHasNewContent(Boolean(data.length));
      setLoading(Boolean(data.length));
    });
  }

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ padding: '0 15px' }}>
        <Typography variant="h6" fontSize={14}>
          Notificações
        </Typography>

        <MoreOptionsDropdown />
      </Stack>

      <IncicleModulesDropdown
        notificationFilters={notificationFilters}
        setNotificationFilters={setNotificationFilters}
      />

      <NotificationWrapper>
        <Typography variant="body2" sx={{ padding: '0 15px', color: '#959595', fontSize: '11px' }}>
          {notificationFilters.type === NotificationFilterOptions.ALL ? 'Todas' : 'Não lidas'}
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
            Não há notificações no momento
          </Typography>
        )}

        {/* @ts-ignore */}
        <Waypoint topOffset="-80px" onEnter={handleLoadMoreContent}>
          <Stack direction="row" justifyContent="center" alignItems="center" padding={1.5} height={70}>
            {answerHasNewContent || loading ? (
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
                  Isso é tudo!
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
