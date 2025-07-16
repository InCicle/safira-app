import { IPermission } from '@/services/api/permissions';
import { createContext } from 'react';

interface PermissionsContext {
  companySelected: string | undefined;
  companyId: string;
  isLoading: boolean;
  requestFinished: boolean;
  managerPermission: boolean;
  permissions: IPermission[] | null;
  checkPermission: (slugs: string[]) => boolean;
}

export const PermissionsContext = createContext<PermissionsContext>(
  {} as PermissionsContext,
);
