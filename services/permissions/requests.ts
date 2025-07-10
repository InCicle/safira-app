import { links } from '@/safira-app/config/links';
import { api } from '@/services/api';

export async function getAllPermissionsList() {
  const response = await api.get(links.api.core + '/user/permissions');

  return response.data;
}
