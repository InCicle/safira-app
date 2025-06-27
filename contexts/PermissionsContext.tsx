import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { api } from '@/services/api';
import { links } from '@/safira-app/config/links';
import { useAuth } from '@/safira-app/hooks/useAuth';
import { useProfileContext } from '@/contexts/ProfileContext';
import { hasManagerPermissions } from '../utils/hasManagerPanel';

export interface PermissionObject {
  name: string;
  slug: string;
}

export interface PermissionsContextProps {
  companySelected: string | undefined;
  checkPermission: (slugs: string[]) => boolean;
  companyId: string;
  permissionsList: PermissionObject[] | null;
  requestFinished: boolean;
  managerPermission: boolean;
  setManagerPermission: React.Dispatch<React.SetStateAction<boolean>>;
}

const PermissionsContext = createContext<PermissionsContextProps>({} as PermissionsContextProps);

const PermissionsProvider: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  const [permissionsList, setPermissionsList] = useState<PermissionObject[] | null>(null);
  const [requestFinished, setRequestFinished] = useState(false);
  const [managerPermission, setManagerPermission] = useState<boolean>(false);
  const { me } = useProfileContext();

  const { user } = useAuth();

  const companySelected = Cookies.get('companySelected');
  const companyId = user.type === 'PERSON' && companySelected ? companySelected : user.profile_id;

  const getAllPermissionsList = async (companyId: string) => {
    const response = await api.get(links.api.core + '/user/permissions', {
      headers: {
        companyId,
      },
    });

    return response.data;
  };

  const checkPermission = useCallback(
    (slugs: string[]) => {
      const hasPermission = slugs.every(slug => permissionsList?.some(permission => permission.slug === slug));
      return hasPermission;
    },
    [permissionsList]
  );

  const fetchPermissions = useCallback(async () => {
    const collaborator =
      me?.collaborators?.find(collaborator => collaborator.company.id === companySelected) ||
      (me?.collaborators && me?.collaborators[0] ? me?.collaborators[0] : undefined);

    if (!collaborator && user.type !== 'COMPANY') {
      setRequestFinished(true);
      return;
    }

    const companyId = me?.type === 'COMPANY' ? user.profile_id : collaborator?.company.id;

    try {
      const response = await getAllPermissionsList(companyId!);

      setPermissionsList(response);
      if (user.type === 'PERSON') {
        const hasAuthorization = hasManagerPermissions(user, checkPermission, collaborator);
        setManagerPermission(hasAuthorization);
      }

      setRequestFinished(true);
    } catch {
      setRequestFinished(true);
    }
  }, [checkPermission, companySelected, me?.collaborators, me?.type, user]);

  useEffect(() => {
    fetchPermissions();
  }, [fetchPermissions]); 

  const context = {
    companySelected,
    checkPermission,
    companyId,
    permissionsList,
    requestFinished,
    managerPermission,
    setManagerPermission,
  };

  return <PermissionsContext.Provider value={context}>{children}</PermissionsContext.Provider>;
};

const usePermissions = () => useContext(PermissionsContext);

export { PermissionsProvider, usePermissions };
