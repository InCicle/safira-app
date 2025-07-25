import { useGetPermissionsQuery } from '../services/api/permissions';

export function usePermissions() {
  return useGetPermissionsQuery();
}
