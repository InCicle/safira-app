import { IHttpClient } from '@/clients/Http';
import { IMe } from '@/interfaces/Me';
import { IProfile } from '@/interfaces/Profile';
import { links } from '@/utils/links';
import { api } from '..';
import { AxiosResponse } from 'axios';

export async function getMe(): Promise<IMe> {
  const response: AxiosResponse<IMe> = await api.get(`${links.api.schedule}/auth/me`);
  return response.data;
}

export async function getProfile(username: string, apiClient?: IHttpClient) {
  if (apiClient)
    return await apiClient.get<{ data: IProfile[] }>({
      url: `${links.api.social}/profile/name/search?search=${username}`,
    });
  return await api.get<IProfile[]>(`${links.api.social}/profile/name/search?search=${username}`);
}
