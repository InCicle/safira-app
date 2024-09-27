import { AxiosInstance } from 'axios';
import { links } from '@/safira-app/config/links';
import { INotificationWrapper } from '@/safira-app/interfaces/Notification';

export type NotificationParamsType = {
  page?: number;
  perPage?: number;
  params?: {
    [key: string]: any;
  };
};

export const getNotifications = (
  api: AxiosInstance,
  { page = 1, perPage = 10, params, ...rest }: NotificationParamsType,
) => {
  const response = api.get<INotificationWrapper>(
    `${links.api.notification}/notifications/me?page=${page}&size=${perPage}`,
    { params },
  );

  return response;
};

export const updateSawNotifications = (api: AxiosInstance, arg?: any) => {
  /**
   * When user opens the notifications modal, this function is called to check the most recents
   * notifications as viewed.
   */
  const { params } = arg || {};

  const response = api.get(`${links.api.notification}/notifications/saw`, {
    params,
  });
  return response;
};
