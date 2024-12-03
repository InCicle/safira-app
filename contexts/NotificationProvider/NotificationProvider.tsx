import React, { createContext, useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import { Manager } from 'socket.io-client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosInstance, AxiosResponse } from 'axios';

import { useHTMLHead } from 'safira-app/hooks/useHTMLHead';
import { useRender } from 'safira-app/hooks/useRender';
import { IUser } from 'safira-app/interfaces/User';
import { decode } from 'safira-app/utils/crypto';
import { links } from 'safira-app/config/links';
import {
  DEFAULT_NOTIFICATION_PARAMS,
  getNotifications,
  NotificationParamsType,
  NotificationProps,
  NotificationWrapper,
} from 'safira-app/services/notifications';
import NotificationUseCase from './NotificationUseCase';

type SetState<T = any> = React.Dispatch<React.SetStateAction<T>>;

interface NotificationSocketProviderProps {
  api: AxiosInstance;
  user: IUser;
}

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

  updateNotifications(params: NotificationParamsType): void;
  updateNotificationItem(data: NotificationProps): void;
}

const manager = new Manager(links.api.notification);
const socket = manager.socket('/');
const NOTIFICATION_NAME = 'notifications';

export const NotificationContext = createContext<NotificationContextType>({} as any);

const NotificationProvider: React.FC<React.PropsWithChildren<NotificationSocketProviderProps>> = ({
  api,
  user,
  children,
}) => {
  const { fn } = useRender();
  const { defineFavicon, definePageTitle } = useHTMLHead();
  const queryClient = useQueryClient();

  const [dropdownOpened, setDropdownOpened] = useState(false);
  const [badgeIsInvisible, setBadgeIsInvisible] = useState(true);
  const [notificationViewCount, setNotificationViewCount] = useState(0);
  const [allNotifications, setAllNotifications] = useState<NotificationProps[]>([]);
  const [params, setParams] = useState<NotificationParamsType>(DEFAULT_NOTIFICATION_PARAMS);

  const paramsFallbackRef = useRef<NotificationParamsType>(DEFAULT_NOTIFICATION_PARAMS);

  const notificationUseCase = new NotificationUseCase({
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

  const notificationKey = [NOTIFICATION_NAME, params];

  const notificationsQuery = useQuery({
    queryKey: notificationKey,
    queryFn: () => getNotifications(api, params),
    placeholderData: state => state,
    retry: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });

  // eslint-disable-next-line
  const { error, isLoading } = notificationsQuery;
  const notificationsResponse = notificationsQuery.data;
  const notifications = notificationsResponse?.data?.data || [];
  const lastPage = notificationsQuery.data?.data?.totalPages || 0;

  function updateNotifications(newParams: NotificationParamsType) {
    paramsFallbackRef.current = { ...params };

    const perPage = newParams.perPage || params.perPage || 0;
    // Don't call next page if notifications request is empty
    if (!(notifications.length < perPage)) {
      setParams(prev => ({ ...prev, ...newParams }));
    }
  }

  function updateNotificationItem(data: NotificationProps) {
    api.patch(`${links.api.notification}/notifications/${data._id}`);

    setAllNotifications(old => {
      const newArr = old.map(item => {
        if (item._id === data._id) return data;
        return item;
      });

      return newArr;
    });
  }

  function notifier(notification: NotificationProps) {
    const queryKey = [NOTIFICATION_NAME, DEFAULT_NOTIFICATION_PARAMS];

    notificationUseCase.notify(notification);
    queryClient.setQueryData(queryKey, (prev: AxiosResponse<NotificationWrapper>) => {
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
    const { openDropdownKey, closeDropdownKey } = notificationUseCase.initializeEvents();

    fn('create socket', createSocketConnection);
    addSocketEvents();

    return () => {
      removeSocketEvents();
      notificationUseCase.clearEvents({ openDropdownKey, closeDropdownKey });
    };
  }, [notificationUseCase]); // eslint-disable-line

  // handle request error
  useEffect(() => {
    const sameParams = JSON.stringify(paramsFallbackRef.current) === JSON.stringify(params);

    if (error && !sameParams) {
      setParams(paramsFallbackRef.current);
    }
  }, [error]); // eslint-disable-line

  // concat new notifications
  useEffect(() => {
    const paramsFallback = paramsFallbackRef.current;
    const resetState = params.module !== paramsFallback.module || params.read !== paramsFallback.read;
    notificationUseCase.update(notifications, notificationsResponse?.data?.saw, resetState ? 'reset' : 'none');
  }, [notifications]); // eslint-disable-line

  // on notification load
  useEffect(() => {
    if (allNotifications.length && !dropdownOpened) {
      fn('notification load', () => notificationUseCase.executeBrowserTab());
    }
  }, [allNotifications, dropdownOpened]); // eslint-disable-line

  // on page load
  useEffect(() => {
    fn('first load', () => notificationUseCase.requestPermission());
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

        updateNotificationItem,
        updateNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
