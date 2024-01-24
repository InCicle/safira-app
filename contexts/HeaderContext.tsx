import React, { createContext, useContext, useEffect, useState } from "react";

import { AxiosInstance } from "axios";
import { links } from "@safira/config/links";
import { INotificationProps } from "@safira/interfaces/Notification";
import { IUser } from "@safira/interfaces/User";
import { MeProps } from "@safira/interfaces/Me";

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export interface HeaderProviderProps {
  user: IUser;
  profiles?: MeProps;
  companySelected?: string;
  api: AxiosInstance;
  signOut: Function;
}

export interface NotificationsDataProps {
  currentPage: number;
  data: Array<INotificationProps>;
  size: number;
  total: number;
  totalPage: number;
}

export interface HeaderContextProps extends HeaderProviderProps {
  setUser: SetState<IUser>;
  setProfiles: SetState<MeProps>;
  setCompanySelected: SetState<string>;
  setProduction: SetState<boolean>;
  notificationsData: NotificationsDataProps;
  setNotificationsData: SetState<NotificationsDataProps>;
  updateNotificationItem: (data: INotificationProps) => void;
}

export interface Props {
  value: HeaderProviderProps;
}

const HeaderContext = createContext<HeaderContextProps>({} as HeaderContextProps);

const HeaderProvider: React.FC<React.PropsWithChildren<Props>> = ({ children, value }) => {
  const { api, signOut } = value;
  const [user, setUser] = useState(value.user);
  const [profiles, setProfiles] = useState(value.profiles);
  const [companySelected, setCompanySelected] = useState(value.companySelected);
  const [notificationsData, setNotificationsData] = useState<NotificationsDataProps>({
    currentPage: 1,
    data: [],
    size: 0,
    total: 0,
    totalPage: 0,
  });

  const updateNotificationItem = (data: INotificationProps) => {
    /**
     * This function updates a notification item in the notificationsData data array.
     * Then it marks the notification provided on params as readed.
     *
     * params:
     *  data: notification object with new values
     *
     * return: void
     */
    const notificationIndex = notificationsData.data.findIndex(item => {
      return item._id === data._id;
    });
    if (notificationIndex !== -1) {
      // Notification found
      const newArray = [...notificationsData.data];
      newArray[notificationIndex] = data;
      setNotificationsData(oldState => ({
        ...oldState,
        data: newArray,
      }));

      // Mark notification as readed
      api.patch(`${links.api.notification}/notifications/${data._id}`);
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

  return <HeaderContext.Provider value={context}>{children}</HeaderContext.Provider>;
};

function useHeaderProvider() {
  const context = useContext(HeaderContext);
  return context;
}

export { HeaderContext, HeaderProvider, useHeaderProvider };
