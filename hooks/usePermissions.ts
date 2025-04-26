import { useContext } from 'react';
import { PermissionsContext } from '../contexts/PermissionsContext';

export const usePermissions = () => {
  return useContext(PermissionsContext);
};
