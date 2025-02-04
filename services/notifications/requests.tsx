import { AxiosInstance } from 'axios';
import { links } from 'safira-app/config/links';
import { NotificationParamsType, NotificationWrapper } from './types';

export const getNotifications = (api: AxiosInstance, params: NotificationParamsType) => {
  const { page, perPage, ...rest } = params;
  return api.get<NotificationWrapper>(`${links.api.notifications_v2}/notifications/me`, {
    params: { ...rest, page, size: perPage },
  });
};

export const updateSawNotifications = (api: AxiosInstance, arg?: any) => {
  /**
   * When user opens the notifications modal, this function is called to check the most recents
   * notifications as viewed.
   */
  const { params } = arg || {};

  const response = api.get(`${links.api.notifications_v1}/notifications/saw`, {
    params,
  });
  return response;
};
