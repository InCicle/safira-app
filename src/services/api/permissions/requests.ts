import { api } from '@/services/api';
import { IPermission } from './types';

export async function getAllPermissions(
  companyId?: string,
): Promise<IPermission[]> {
  if (!companyId) return [];
  const response = await api.get('http://localhost:3000/api/permissions', {
    headers: { companyId },
  });
  return response.data;
}
