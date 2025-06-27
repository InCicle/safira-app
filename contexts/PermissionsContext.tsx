import React, { createContext, useCallback, useContext, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
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
  isLoading: boolean;
}

const PermissionsContext = createContext<PermissionsContextProps>({} as PermissionsContextProps);

const PermissionsProvider: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  const { me } = useProfileContext();
  const { user } = useAuth();

  const companySelected = Cookies.get('companySelected');

  const getAllPermissionsList = async (companyId: string) => {
    const response = await api.get(links.api.core + '/user/permissions', {
      headers: {
        companyId,
      },
    });

    return response.data;
  };

  const { shouldFetch, targetCompanyId, collaborator, companyId } = useMemo(() => {
    if (!me) {
      return { shouldFetch: false, targetCompanyId: null, collaborator: null, companyId: undefined };
    }

    if (me?.type === 'COMPANY') {
      return { 
        shouldFetch: true, 
        targetCompanyId: me.profile_id, 
        collaborator: null,
        companyId: me.profile_id
      };
    }

    const foundCollaborator = 
      me.collaborators?.find(collaborator => collaborator.company.id === companySelected) ||
      (me.collaborators && me.collaborators[0] ? me.collaborators[0] : undefined);

    if (!foundCollaborator) {
      return { shouldFetch: false, targetCompanyId: null, collaborator: null, companyId: me.profile_id };
    }

    return { 
      shouldFetch: true, 
      targetCompanyId: foundCollaborator.company.id, 
      collaborator: foundCollaborator,
      companyId: foundCollaborator.company.id
    };
  }, [me, companySelected]);

  const {
    data: permissionsList = null,
    isLoading: permissionsLoading,
    isSuccess,
  } = useQuery({
    queryKey: ['permissions', targetCompanyId, user.type],
    queryFn: () => getAllPermissionsList(targetCompanyId!),
    enabled: shouldFetch && Boolean(targetCompanyId),
    staleTime: 1 * 60 * 1000, 
    retry: 1,
  });

  const checkPermission = useCallback(
    (slugs: string[]) => {
      if (!permissionsList) return false;
      return slugs.every(slug => 
        permissionsList.some(permission => permission.slug === slug)
      );
    },
    [permissionsList]
  );

  const managerPermission = useMemo(() => {
    if (user.type !== 'PERSON' || !permissionsList || !collaborator) {
      return false;
    }
    return hasManagerPermissions(user, checkPermission, collaborator);
  }, [user, permissionsList, collaborator, checkPermission]);

  const requestFinished = useMemo(() => {
    if (!me) return false;
    if (!shouldFetch) return true;
    
    return isSuccess || (!permissionsLoading && permissionsList === null);
  }, [shouldFetch, isSuccess, permissionsLoading, permissionsList, me]);

  const isLoading = !me || (shouldFetch && permissionsLoading);

  const context = {
    companySelected,
    checkPermission,
    companyId: companyId ?? '',
    permissionsList,
    requestFinished,
    managerPermission,
    setManagerPermission: () => {}, // No longer needed with computed value
    isLoading,
  };

  return <PermissionsContext.Provider value={context}>{children}</PermissionsContext.Provider>;
};

const usePermissions = () => useContext(PermissionsContext);

export { PermissionsProvider, usePermissions };
