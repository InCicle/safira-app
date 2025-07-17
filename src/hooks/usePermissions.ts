import { useEffect } from 'react';
import { useGetPermissionsQuery } from '../services/api/permissions';

export function usePermissions() {
  const { refetch } = useGetPermissionsQuery();

  useEffect(() => {
    refetch();
  }, [refetch]);
}
