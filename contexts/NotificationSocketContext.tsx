import React, { createContext, useEffect, useState } from 'react';
import { AxiosInstance } from 'axios';
import { Manager } from 'socket.io-client';
import Cookies from 'js-cookie';

import { links } from 'safira-app/config/links';
import { IUser } from 'safira-app/interfaces/User';
import { decode } from 'safira-app/utils/crypto';
import { useHTMLHead } from 'safira-app/hooks/useHTMLHead';
import { useRender } from 'safira-app/hooks/useRender';
import { INotificationProps, INotificationWrapper } from 'safira-app/interfaces/Notification';
import { getNotifications, NotificationParamsType } from 'safira-app/services/notifier/notifications';

import { NotificationUseCase } from 'safira-app/usecases/NotificationUseCase';

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

interface NotificationSocketProviderProps {
  api: AxiosInstance;
  user: IUser;
}

interface NotificationContextProps {
  api: AxiosInstance;
  notificationViewCount: number;

  badgeAsInvisible: boolean;
  setBadgeAsInvisible: SetState<boolean>;

  dropdownOpened: boolean;

  notifications: INotificationProps[];
  setNotifications: SetState<INotificationProps[]>;

  notificationParams: NotificationParamsType;
  setNotificationParams: SetState<NotificationParamsType>;

  updateNotifications(params: NotificationParamsType, onResponse?: (data: INotificationWrapper) => void): void;
  updateNotificationItem(data: INotificationProps): void;
}

const defaultParams: NotificationParamsType = {
  page: 1,
  perPage: 10,
};

const manager = new Manager(links.api.notification);
const socket = manager.socket('/');

export const NotificationSocketContext = createContext<NotificationContextProps>({} as any);

const NotificationSocketProvider: React.FC<React.PropsWithChildren<NotificationSocketProviderProps>> = ({
  api,
  user,
  children,
}) => {
  const { uniqueCall } = useRender();
  const { defineFavicon, definePageTitle } = useHTMLHead();

  const [dropdownOpened, setDropdownOpened] = useState(false);
  const [badgeAsInvisible, setBadgeAsInvisible] = useState(true);
  const [notifications, setNotifications] = useState<INotificationProps[]>([]);
  const [notificationParams, setNotificationParams] = useState(defaultParams);
  const [notificationViewCount, setNotificationViewCount] = useState(0);

  const notificationUseCase = new NotificationUseCase({
    api,
    dropdownOpened,
    notificationViewCount,
    setBadgeAsInvisible,
    setDropdownOpened,
    setNotifications,
    setNotificationViewCount,
    defineFavicon,
    definePageTitle,
  });

  function updateNotifications(params: NotificationParamsType, onResponse?: (data: INotificationWrapper) => void) {
    getNotifications(api, params).then(response => {
      notificationUseCase.update(response.data.data, response.data?.saw);

      if (response.data.data.length) {
        setNotificationParams(old => ({ ...old, ...params }));
      }

      if (onResponse) {
        onResponse(response.data);
      }
    });
  }

  function updateNotificationItem(data: INotificationProps) {
    /**
     * This function updates a notification item in the notifications data array.
     * Then it marks the notification provided on params as readed.
     *
     * params:
     *  data: notification object with new values
     *
     * return: void
     */

    setNotifications(old => {
      const newArr = old.map(item => {
        if (item._id === data._id) return data;
        return item;
      });

      return newArr;
    });

    api.patch(`${links.api.notification}/notifications/${data._id}`);
  }

  function createSocketConnection() {
    uniqueCall('create-notification-socket-connection', () => {
      const decodedToken = decode(Cookies.get('authToken') || '');

      socket.io.open();
      socket.emit('join room', user?.id, decodedToken);
    });
  }

  function addSocketEvents() {
    socket.on(user.id, notificationUseCase.notify);
  }

  function removeSocketEvents() {
    socket.removeListener(user.id, notificationUseCase.notify);
  }

  // create socket connection and apply notification events
  useEffect(() => {
    const { openDropdownKey, closeDropdownKey } = notificationUseCase.initializeEvents();

    createSocketConnection();
    addSocketEvents();

    return () => {
      removeSocketEvents();
      notificationUseCase.clearEvents({ openDropdownKey, closeDropdownKey });
    };
  }, [notificationUseCase]); // eslint-disable-line

  // on notification load
  useEffect(() => {
    if (notifications.length && !dropdownOpened) {
      uniqueCall('notification-load', () => {
        notificationUseCase.executeBrowserTab();
      });
    }
  }, [notifications, dropdownOpened]); // eslint-disable-line

  // on page load
  useEffect(() => {
    uniqueCall('on-first-load', () => {
      updateNotifications(defaultParams);
      notificationUseCase.requestPermission();
    });
  }, []); // eslint-disable-line

  return (
    <NotificationSocketContext.Provider
      value={{
        api,
        notificationViewCount,
        dropdownOpened,

        badgeAsInvisible,
        setBadgeAsInvisible,

        notifications,
        setNotifications,

        notificationParams,
        setNotificationParams,

        updateNotificationItem,
        updateNotifications,
      }}
    >
      {children}
    </NotificationSocketContext.Provider>
  );
};

export default NotificationSocketProvider;
