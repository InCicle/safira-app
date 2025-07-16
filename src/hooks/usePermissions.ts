import { PermissionsContext } from '@/contexts/Permissions/Context';
import { useContext } from 'react';

export function usePermissions() {
  const context = useContext(PermissionsContext);
  if (!context) {
    throw new Error('usePermissions must be used within a PermissionsProvider');
  }
  return context;
}
