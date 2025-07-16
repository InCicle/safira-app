import React, { createContext, useContext, useEffect, useState } from 'react';

import { AxiosInstance } from 'axios';
import { links } from '@/utils/links';
import { IUser } from '@/interfaces/User';
import { IMe } from '@/interfaces/Me';
import { NotificationProps } from '@/services/api/notifications';
import { ISetState } from '@/interfaces/SetState';

export interface HeaderProviderProps {
  user: IUser;
  profiles?: IMe;
  companySelected?: string;
  api: AxiosInstance;
  signOut: () => void;
}

export interface NotificationsDataProps {
  currentPage: number;
  data: Array<NotificationProps>;
  size: number;
  total: number;
  totalPage: number;
}

export interface HeaderContextProps extends HeaderProviderProps {
  setUser: ISetState<IUser>;
  setProfiles: ISetState<IMe>;
  setCompanySelected: ISetState<string>;
  setProduction: ISetState<boolean>;
  notificationsData: NotificationsDataProps;
  setNotificationsData: ISetState<NotificationsDataProps>;
  updateNotificationItem: (data: NotificationProps) => void;
}

export interface Props {
  value: HeaderProviderProps;
}

const HeaderContext = createContext<HeaderContextProps>(
  {} as HeaderContextProps,
);

const HeaderProvider: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  value,
}) => {
  const { api, signOut } = value;
  const [user, setUser] = useState(value.user);
  const [profiles, setProfiles] = useState(value.profiles);
  const [companySelected, setCompanySelected] = useState(value.companySelected);
  const [notificationsData, setNotificationsData] =
    useState<NotificationsDataProps>({
      currentPage: 1,
      data: [],
      size: 0,
      total: 0,
      totalPage: 0,
    });

  const updateNotificationItem = (data: NotificationProps) => {
    /**
     * This function updates a notification item in the notificationsData data array.
     * Then it marks the notification provided on params as readed.
     *
     * params:
     *  data: notification object with new values
     *
     * return: void
     */
    const notificationIndex = notificationsData.data.findIndex((item) => {
      return item.id === data.id;
    });
    if (notificationIndex !== -1) {
      // Notification found
      const newArray = [...notificationsData.data];
      newArray[notificationIndex] = data;
      setNotificationsData((oldState) => ({
        ...oldState,
        data: newArray,
      }));

      // Mark notification as readed
      api.patch(`${links.api.notifications_v1}/notifications/${data.id}`);
    }
  };

  useEffect(() => {
    if (value.user) setUser(value.user);
    if (value.profiles) setProfiles(value.profiles);
    if (value.companySelected) setCompanySelected(value.companySelected);
  }, [value]);

  const context = {
    user,
    setUser,
    profiles,
    setProfiles,
    companySelected,
    setCompanySelected,
    notificationsData,
    setNotificationsData,
    api,
    signOut,
    updateNotificationItem,
  } as HeaderContextProps;

  return (
    <HeaderContext.Provider value={context}>{children}</HeaderContext.Provider>
  );
};

function useHeaderProvider() {
  const context = useContext(HeaderContext);
  return context;
}

export { HeaderContext, HeaderProvider, useHeaderProvider };
