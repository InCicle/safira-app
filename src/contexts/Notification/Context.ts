import { ISetState } from '@/interfaces/SetState';
import { NotificationParamsType, NotificationProps } from '@/services/api/notifications';
import { createContext } from 'react';

interface NotificationContext {
  notificationViewCount: number;
  error: any;
  isLoading: boolean;
  lastPage: number;

  badgeIsInvisible: boolean;
  setBadgeIsInvisible: ISetState<boolean>;

  dropdownOpened: boolean;
  notificationsReqData: NotificationProps[];

  notifications: NotificationProps[];
  setNotifications: ISetState<NotificationProps[]>;

  params: NotificationParamsType;
  setParams: ISetState<NotificationParamsType>;

  fetchNotifications(params: NotificationParamsType): void;
  markAllAsViewed(key?: any[]): void;

  hasNextPage: boolean;
  isFetchingNextPage: boolean;

  handleOpenDropdown: () => void;
  handleCloseDropdown: () => void;
}

export const NotificationContext = createContext<NotificationContext>({} as NotificationContext);
