import { api } from '@/services/api';
import { IPermission } from './types';
import { links } from '@/utils/links';

export async function getAllPermissions(): Promise<IPermission[]> {
  const response = await api.get(links.api.core + '/user/permissions');

  return response.data;
}
