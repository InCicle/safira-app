import { AxiosInstance } from "axios";
import { links } from "app/config/links";

export const getNotifications = (api: AxiosInstance, { page = 1, perPage = 10, params = {} }: any) => {
  const response = api.get(`${links.api.notification}/notifications/me?page=${page}&size=${perPage}`, {
    params,
  });

  return response;
};

export const updateSawNotifications = (api: AxiosInstance, { params = {} }: any) => {
  /**
   * When user opens the notifications modal, this function is called to check the most recents
   * notifications as viewed.
   */
  const response = api.get(`${links.api.notification}/notifications/saw`, {
    params,
  });
  return response;
};