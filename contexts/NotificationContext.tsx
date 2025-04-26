import React, { createContext, useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import { Manager } from 'socket.io-client';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosInstance, AxiosResponse } from 'axios';

import { useHTMLHead } from '@/safira-app/hooks/useHTMLHead';
import { useRender } from '@/safira-app/hooks/useRender';
import { decode } from '@/safira-app/utils/crypto';
import { links } from '@/safira-app/config/links';
import {
  getNotifications,
  NotificationParamsType,
  NotificationProps,
  NotificationWrapper,
} from '@/safira-app/services/queries/notifications';
import NotificationService from '../services/notifications';
import { DEFAULT_NOTIFICATION_PARAMS, NOTIFICATION_REQUEST_KEY } from '../utils/constants';
import api from '@/services/api';
import { useAuth } from '../hooks/useAuth';

type SetState<T = any> = React.Dispatch<React.SetStateAction<T>>;

interface NotificationContextType {
  api: AxiosInstance;
  notificationViewCount: number;
  error: any;
  isLoading: boolean;
  lastPage: number;

  badgeIsInvisible: boolean;
  setBadgeIsInvisible: SetState<boolean>;

  dropdownOpened: boolean;
  notificationsReqData: NotificationProps[];

  notifications: NotificationProps[];
  setNotifications: SetState<NotificationProps[]>;

  params: NotificationParamsType;
  setParams: SetState<NotificationParamsType>;

  fetchNotifications(params: NotificationParamsType): void;
  markAllAsViewed(key?: any[]): void;

  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  handleCloseDropdown(): void;
}

const manager = new Manager(links.api.notifications_v1);
const socket = manager.socket('/');

export const NotificationContext = createContext<NotificationContextType>({} as any);

const NotificationProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { fn } = useRender();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { defineFavicon, definePageTitle } = useHTMLHead();

  const [dropdownOpened, setDropdownOpened] = useState(false);
  const [badgeIsInvisible, setBadgeIsInvisible] = useState(true);
  const [notificationViewCount, setNotificationViewCount] = useState(0);
  const [allNotifications, setAllNotifications] = useState<NotificationProps[]>([]);
  const [params, setParams] = useState<NotificationParamsType>(DEFAULT_NOTIFICATION_PARAMS);

  const paramsFallbackRef = useRef<NotificationParamsType>(DEFAULT_NOTIFICATION_PARAMS);

  const notificationService = new NotificationService({
    api,
    dropdownOpened,
    notificationViewCount,
    setBadgeIsInvisible,
    setDropdownOpened,
    setAllNotifications,
    setNotificationViewCount,
    defineFavicon,
    definePageTitle,
  });

  const notificationKey = [NOTIFICATION_REQUEST_KEY];

  const notificationsQuery = useInfiniteQuery({
    queryKey: notificationKey,
    queryFn: async ({ pageParam = 1 }) =>
      getNotifications(
        api,
        { ...params, page: pageParam },
        {
          language: user.config.default_language || 'en',
        },
      ).then(res => res.data),
    initialPageParam: 1,
    getNextPageParam: (lastPage: NotificationWrapper) => {
      const nextPage = lastPage.currentPage + 1;
      return nextPage <= lastPage.totalPage ? nextPage : undefined;
    },
    staleTime: 1000 * 60 * 2, // 2 minutes
  });

  const { error, isLoading } = notificationsQuery;
  const notificationsResponse = notificationsQuery.data?.pages.flatMap(page => page.data) || [];
  const sawPages = notificationsQuery.data?.pages.flatMap(page => page.saw) || [0];
  const sawCount = sawPages.map(page => page).reduce((acc, curr) => acc + curr, 0);
  const notifications = notificationsResponse || [];
  const lastPage = notificationsQuery.data?.pages[0].totalPage || 0;

  async function fetchNotifications(newParams: NotificationParamsType) {
    if (notificationsQuery.data?.pages.some(page => page.currentPage === newParams.page)) return;

    console.log(newParams);
    console.log(notificationsQuery.data?.pageParams);

    paramsFallbackRef.current = { ...params };
    setParams(prev => ({ ...prev, ...newParams }));

    await notificationsQuery.fetchNextPage();
  }

  function markAllAsViewed(key?: any[]) {
    const queryKey = key || [NOTIFICATION_REQUEST_KEY, DEFAULT_NOTIFICATION_PARAMS];

    queryClient.setQueryData(queryKey, (previous: any) => {
      const prev: AxiosResponse<NotificationWrapper> = previous;
      if (!prev?.data?.data) return;

      const prevNotifications = prev?.data?.data || [];
      const newNotifications = prevNotifications.map(n => ({ ...n, saw: true }));
      const newData: AxiosResponse<NotificationWrapper> = {
        ...prev,
        data: { ...prev.data, data: newNotifications },
      };

      return newData;
    });
  }

  function notifier(notification: NotificationProps) {
    const queryKey = [NOTIFICATION_REQUEST_KEY, DEFAULT_NOTIFICATION_PARAMS];

    notificationService.notify(notification);
    queryClient.setQueryData(queryKey, (previous: any) => {
      const prev: AxiosResponse<NotificationWrapper> = previous;
      if (!prev?.data?.data?.length) return { data: { data: [notification] } };
      prev.data.data.unshift(notification);
      return prev;
    });
  }

  function createSocketConnection() {
    const decodedToken = decode(Cookies.get('authToken') || '');
    socket.io.open();
    socket.emit('join room', user?.id, decodedToken);
  }

  function addSocketEvents() {
    socket.on(user.id, notifier);
  }

  function removeSocketEvents() {
    socket.removeListener(user.id, notifier);
  }

  // create socket connection and apply notification events
  useEffect(() => {
    const { openDropdownKey, closeDropdownKey } = notificationService.initializeEvents();

    fn('create socket', createSocketConnection);
    addSocketEvents();

    return () => {
      removeSocketEvents();
      notificationService.clearEvents({ openDropdownKey, closeDropdownKey });
    };
  }, [notificationService]); // eslint-disable-line

  // handle request error
  useEffect(() => {
    const sameParams = JSON.stringify(paramsFallbackRef.current) === JSON.stringify(params);

    if (error && !sameParams) setParams(paramsFallbackRef.current);
  }, [error]); // eslint-disable-line

  // concat new notifications
  useEffect(() => {
    if (notifications.length === allNotifications.length) return;
    notificationService.update(notifications, sawCount || 0);
  }, [notifications]); // eslint-disable-line

  // on notification load
  useEffect(() => {
    if (allNotifications.length && !dropdownOpened) {
      fn('notification load', () => notificationService.executeBrowserTab());
    }
  }, [allNotifications, dropdownOpened]); // eslint-disable-line

  // on page load
  useEffect(() => {
    fn('first load', () => notificationService.requestPermission());
  }, []); // eslint-disable-line

  return (
    <NotificationContext.Provider
      value={{
        api,
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

        hasNextPage: notificationsQuery.hasNextPage,
        isFetchingNextPage: notificationsQuery.isFetchingNextPage,
        handleCloseDropdown: notificationService.handleCloseDropdown,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
