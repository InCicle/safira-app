import { IMe } from '@/interfaces/Me';
import { api } from '@/services/api';
import { links } from '@/utils/links';

export async function getMe(): Promise<{
  data: IMe;
}> {
  return api.get(`http://localhost:3000/api/me`);
}

export async function getProfile(username: string) {
  return api.get(`${links.api.social}/profile/name/search?search=${username}`);
}
