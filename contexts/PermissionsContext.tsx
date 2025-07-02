import React, { createContext, useCallback, useContext, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { useAuth } from '@/safira-app/hooks/useAuth';
import { useProfileContext } from '@/contexts/ProfileContext';
import { hasManagerPermissions } from '../utils/hasManagerPanel';
import { MINUTE_IN_MILLISECONDS } from '../utils/constants';
import { getAllPermissionsList } from '../services/permissions/requests';
import { PermissionObject } from '../services/permissions/types';

export interface PermissionsContextProps {
  companySelected: string | undefined;
  companyId: string;
  isLoading: boolean;
  requestFinished: boolean;
  managerPermission: boolean;
  permissionsList: PermissionObject[] | null;
  checkPermission: (slugs: string[]) => boolean;
}

const PermissionsContext = createContext<PermissionsContextProps>({} as PermissionsContextProps);

const PermissionsProvider: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  const { me } = useProfileContext();
  const { user } = useAuth();

  const companySelected = Cookies.get('companySelected');


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
      return { shouldFetch: false, targetCompanyId: null, collaborator: null, companyId: undefined };
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
    queryFn: () => getAllPermissionsList(),
    enabled: shouldFetch,
    staleTime: MINUTE_IN_MILLISECONDS,
    refetchInterval: MINUTE_IN_MILLISECONDS,
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
    isLoading,
  };

  return <PermissionsContext.Provider value={context}>{children}</PermissionsContext.Provider>;
};

const usePermissions = () => useContext(PermissionsContext);

export { PermissionsProvider, usePermissions };
