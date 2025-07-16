import React, { useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { hasManagerPermissions } from '@/utils/hasManagerPanel';
import { MINUTE_IN_MILLISECONDS } from '@/utils/constants';
import { getAllPermissions } from '@/services/api/permissions';
import { PermissionsContext } from './Context';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';

const PermissionsProvider: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const { me } = useProfile();
  const { user } = useAuth();

  const companySelected = Cookies.get('companySelected');

  const { shouldFetch, targetCompanyId, collaborator, companyId } =
    useMemo(() => {
      if (!me) {
        return {
          shouldFetch: false,
          targetCompanyId: null,
          collaborator: null,
          companyId: undefined,
        };
      }

      if (me?.type === 'COMPANY') {
        return {
          shouldFetch: true,
          targetCompanyId: me.profile_id,
          collaborator: null,
          companyId: me.profile_id,
        };
      }

      const foundCollaborator =
        me.collaborators?.find(
          (collaborator) => collaborator.company.id === companySelected,
        ) ||
        (me.collaborators && me.collaborators[0]
          ? me.collaborators[0]
          : undefined);

      if (!foundCollaborator) {
        return {
          shouldFetch: false,
          targetCompanyId: null,
          collaborator: null,
          companyId: undefined,
        };
      }

      return {
        shouldFetch: true,
        targetCompanyId: foundCollaborator.company.id,
        collaborator: foundCollaborator,
        companyId: foundCollaborator.company.id,
      };
    }, [me, companySelected]);

  const {
    data: permissionsList = null,
    isLoading: permissionsLoading,
    isSuccess,
  } = useQuery({
    queryKey: ['permissions', targetCompanyId, user.type],
    queryFn: () => getAllPermissions(),
    enabled: shouldFetch,
    staleTime: MINUTE_IN_MILLISECONDS,
    refetchInterval: MINUTE_IN_MILLISECONDS,
  });

  const checkPermission = useCallback(
    (slugs: string[]) => {
      if (!permissionsList) return false;
      return slugs.every((slug) =>
        permissionsList.some((permission) => permission.slug === slug),
      );
    },
    [permissionsList],
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
    permissions: permissionsList,
    requestFinished,
    managerPermission,
    isLoading,
  };

  return (
    <PermissionsContext.Provider value={context}>
      {children}
    </PermissionsContext.Provider>
  );
};

export default PermissionsProvider;
