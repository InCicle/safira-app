import { links } from '@/utils/links';
import { NotificationHeadersType, NotificationParamsType, NotificationWrapper } from './types';
import { IHttpClient } from '@/clients/Http';

export function getNotifications(
  params: NotificationParamsType,
  headers: NotificationHeadersType,
  apiClient: IHttpClient,
) {
  const { page, perPage, ...rest } = params;
  const { language } = headers;

  return apiClient.get<NotificationWrapper>({
    url: `${links.api.notifications_v2}/notifications/me`,
    params: { ...rest, page, size: perPage },
    headers: {
      'accept-language': language,
    },
  });
}

export function updateSawNotifications(apiClient: IHttpClient, arg?: any) {
  /**
   * When user opens the notifications modal, this function is called to check the most recents
   * notifications as viewed.
   */
  const { params } = arg || {};

  const response = apiClient.get<void>({ url: `${links.api.notifications_v1}/notifications/saw`, params });
  return response;
}

export function checkAllReadNotifications(apiClient: IHttpClient) {
  /**
   * This function is used to check all notifications as readed
   */
  return apiClient.get<void>({ url: `${links.api.notifications_v1}/notifications/read` });
}

export async function markAsReadNotification(id: string, apiClient: IHttpClient) {
  /**
   * This function is used to check a notification as readed
   */
  return await apiClient.patch({ url: `${links.api.notifications_v1}/notifications/${id}` });
}
