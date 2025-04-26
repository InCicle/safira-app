import React, { useCallback, useRef } from 'react';
import { Skeleton, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { NotificationWrapper } from '../style';
import { NotificationItem } from './NotificationItem';
import { IncicleModulesDropdown, MoreOptionsDropdown } from '.';

import { translation } from '@/safira-app/utils/translation';
import { useNotifications } from '@/safira-app/hooks/useNotifications';
import { NotificationsReadOptions } from '@/safira-app/services/queries/notifications';
import { useIntersectionObserver } from '@/safira-app/hooks/useIntersectionObserver';

export const NotificationsContent: React.FC = () => {
  const { notifications, params, isLoading, fetchNotifications, hasNextPage, isFetchingNextPage } = useNotifications();
  const { t } = useTranslation();

  const showLoading = isLoading || isFetchingNextPage || hasNextPage;

  const handleLoadMoreContent = useCallback(() => {
    if (!isLoading && hasNextPage) fetchNotifications({ page: params.page + 1 });
  }, [isLoading, params]); // eslint-disable-line

  const observerRef = useRef<HTMLDivElement | null>(null);
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

      <IncicleModulesDropdown />

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

export default NotificationsContent;
