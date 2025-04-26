import api from '@/services/api';
import { links } from '@/safira-app/config/links';

export async function getProfile(username: string) {
  return api.get(`${links.api.social}/profile/name/search?search=${username}`);
}
