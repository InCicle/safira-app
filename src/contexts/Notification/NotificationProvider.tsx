import React, { useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import { Manager } from 'socket.io-client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { useHTMLHead } from '@/hooks/useHTMLHead';
import { useRender } from '@/hooks/useRender';
import { decode } from '@/utils/crypto';
import { links } from '@/utils/links';
import {
  getNotifications,
  NotificationParamsType,
  NotificationProps,
  NotificationWrapper,
} from '@/services/api/notifications';
import NotificationService from '@/services/notifications';
import {
  DEFAULT_NOTIFICATION_PARAMS,
  NOTIFICATION_REQUEST_KEY,
} from '@/utils/constants';
import { NotificationContext } from './Context';
import { useAuth } from '@/hooks/useAuth';

const manager = new Manager(links.api.notifications_v1);
const socket = manager.socket('/');

const NotificationProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { fn } = useRender();
  const { user } = useAuth();
  const { defineFavicon, definePageTitle } = useHTMLHead();
  const queryClient = useQueryClient();

  const [dropdownOpened, setDropdownOpened] = useState(false);
  const [badgeIsInvisible, setBadgeIsInvisible] = useState(true);
  const [notificationViewCount, setNotificationViewCount] = useState(0);
  const [allNotifications, setAllNotifications] = useState<NotificationProps[]>(
    [],
  );
  const [params, setParams] = useState<NotificationParamsType>(
    DEFAULT_NOTIFICATION_PARAMS,
  );

  const paramsFallbackRef = useRef<NotificationParamsType>(
    DEFAULT_NOTIFICATION_PARAMS,
  );

  const service = new NotificationService({
    dropdownOpened,
    notificationViewCount,
    setBadgeIsInvisible,
    setDropdownOpened,
    setAllNotifications,
    setNotificationViewCount,
    defineFavicon,
    definePageTitle,
  });

  const notificationKey = [NOTIFICATION_REQUEST_KEY, params];

  const notificationsQuery = useQuery({
    queryKey: notificationKey,
    queryFn: () =>
      getNotifications(params, {
        language: user.config.default_language || 'en',
      }),
    placeholderData: (state) => state,
    retry: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });

  const { error, isLoading } = notificationsQuery;
  const notificationsResponse = notificationsQuery.data;
  const notifications = notificationsResponse?.data?.data || [];
  const lastPage = notificationsQuery.data?.data?.totalPage || 0;

  function fetchNotifications(newParams: NotificationParamsType) {
    paramsFallbackRef.current = { ...params };
    setParams((prev) => ({ ...prev, ...newParams }));
  }

  function markAllAsViewed(key?: any[]) {
    const queryKey = key || [
      NOTIFICATION_REQUEST_KEY,
      DEFAULT_NOTIFICATION_PARAMS,
    ];

    queryClient.setQueryData(
      queryKey,
      (previous: AxiosResponse<NotificationWrapper>) => {
        const prev: AxiosResponse<NotificationWrapper> = previous;
        if (!prev?.data?.data) return;

        const prevNotifications = prev?.data?.data || [];
        const newNotifications = prevNotifications.map((n) => ({
          ...n,
          saw: true,
        }));
        const newData: AxiosResponse<NotificationWrapper> = {
          ...prev,
          data: { ...prev.data, data: newNotifications },
        };

        return newData;
      },
    );
  }

  function notifier(notification: NotificationProps) {
    const queryKey = [NOTIFICATION_REQUEST_KEY, DEFAULT_NOTIFICATION_PARAMS];

    service.notify(notification);
    queryClient.setQueryData(
      queryKey,
      (previous: AxiosResponse<NotificationWrapper>) => {
        const prev: AxiosResponse<NotificationWrapper> = previous;
        if (!prev?.data?.data?.length)
          return { data: { data: [notification] } };
        prev.data.data.unshift(notification);
        return prev;
      },
    );
  }

  function createSocketConnection() {
    const decodedToken = decode(Cookies.get('authToken') || '');
    socket.io.open();
    socket.emit('join room', user?.id, decodedToken);
  }

  function addSocketEvents() {
    socket.on(user?.id, notifier);
  }

  function removeSocketEvents() {
    socket.removeListener(user?.id, notifier);
  }

  // create socket connection and apply notification events
  useEffect(() => {
    const { openDropdownKey, closeDropdownKey } = service.initializeEvents();

    fn('create socket', createSocketConnection);
    addSocketEvents();

    return () => {
      removeSocketEvents();
      service.clearEvents({ openDropdownKey, closeDropdownKey });
    };
  }, [service]); // eslint-disable-line

  // handle request error
  useEffect(() => {
    const sameParams =
      JSON.stringify(paramsFallbackRef.current) === JSON.stringify(params);

    if (error && !sameParams) {
      setParams(paramsFallbackRef.current);
    }
  }, [error]); // eslint-disable-line

  // concat new notifications
  useEffect(() => {
    const paramsFallback = paramsFallbackRef.current;
    const resetState =
      params.module !== paramsFallback.module ||
      params.read !== paramsFallback.read;
    service.update(
      notifications,
      notificationsResponse?.data?.saw,
      resetState ? 'reset' : 'none',
    );
  }, [notifications]); // eslint-disable-line

  // on notification load
  useEffect(() => {
    if (allNotifications.length && !dropdownOpened) {
      fn('notification load', () => service.executeBrowserTab());
    }
  }, [allNotifications, dropdownOpened]); // eslint-disable-line

  // on page load
  useEffect(() => {
    fn('first load', () => service.requestPermission());
  }, []); // eslint-disable-line

  return (
    <NotificationContext.Provider
      value={{
        notificationViewCount,
        dropdownOpened,
        error,
        isLoading,
        lastPage,
        notificationsReqData: notifications,

        badgeIsInvisible,
        setBadgeIsInvisible,

        notifications: allNotifications,
        setNotifications: setAllNotifications,

        params,
        setParams,

        markAllAsViewed,
        fetchNotifications,

        handleCloseDropdown: () => {
          setDropdownOpened(false);
          markAllAsViewed();
          service.handleCloseDropdown();
        },

        hasNextPage: lastPage > params.page,
        isFetchingNextPage: notificationsQuery.isFetching,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
