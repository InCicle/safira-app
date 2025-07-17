import { IMe } from '@/interfaces/Me';
import { api } from '@/services/api';
import { links } from '@/utils/links';
import { AxiosResponse } from 'axios';

export async function getMe(): Promise<IMe> {
  const response: AxiosResponse<IMe> = await api.get(`${links.api.schedule}/auth/me`);
  return response.data;
}

export async function getProfile(username: string) {
  return api.get(`${links.api.social}/profile/name/search?search=${username}`);
}
