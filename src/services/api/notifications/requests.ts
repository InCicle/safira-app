import { links } from '@/utils/links';
import { NotificationHeadersType, NotificationParamsType, NotificationWrapper } from './types';
import { IHttpClient } from '@/clients/Http';
import { api } from '..';

export function getNotifications(
  params: NotificationParamsType,
  headers: NotificationHeadersType,
  apiClient?: IHttpClient,
) {
  const { page, perPage, ...rest } = params;
  const { language } = headers;
  if (apiClient)
    return apiClient.get<{ data: NotificationWrapper }>({
      url: `${links.api.notifications_v2}/notifications/me`,
      params: { ...rest, page, size: perPage },
      headers: {
        'accept-language': language,
      },
    });

  return api.get<NotificationWrapper>(`${links.api.notifications_v2}/notifications/me`, {
    params: { ...rest, page, size: perPage },
    headers: {
      'accept-language': language,
    },
  });
}

export function updateSawNotifications(arg?: any) {
  /**
   * When user opens the notifications modal, this function is called to check the most recents
   * notifications as viewed.
   */
  const { params } = arg || {};

  const response = api.get(`${links.api.notifications_v1}/notifications/saw`, {
    params,
  });
  return response;
}

export function checkAllReadNotifications() {
  /**
   * This function is used to check all notifications as readed
   */
  return api.get(`${links.api.notifications_v1}/notifications/read`);
}

export async function markAsReadNotification(id: string) {
  /**
   * This function is used to check a notification as readed
   */
  return await api.patch(`${links.api.notifications_v1}/notifications/${id}`);
}
