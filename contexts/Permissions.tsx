import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import api from 'services/api';
import { links } from 'safira-app/config/links';
import { useAuth } from 'safira-app/hooks/useAuth';
import { useProfileContext } from 'contexts/ProfileContext';

export interface PermissionObject {
  name: string;
  slug: string;
}

export interface PermissionsContextProps {
  companySelected: string | undefined;
  checkPermission: (slugs: string[]) => boolean;
  companyId: string;
  permissionsList: PermissionObject[];
  requestFinished: boolean;
  managerPermission: boolean;
  setManagerPermission: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PermissionsContext = createContext<PermissionsContextProps>({} as PermissionsContextProps);

const PermissionsProvider: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  const [permissionsList, setPermissionsList] = useState<PermissionObject[]>([]);
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

  const checkPermission = (slugs: string[]) => {
    const hasPermission = slugs.every(slug => permissionsList.some(permission => permission.slug === slug));
    return hasPermission;
  };

  useEffect(() => {
    const collaborator =
      me?.collaborators?.find(collaborator => collaborator.company.id === companySelected) ||
      (me?.collaborators[0] ? me?.collaborators[0] : undefined);

    if (!collaborator && user.type !== 'COMPANY') {
      setRequestFinished(true);
      return;
    }

    getAllPermissionsList(collaborator?.company.id ?? user.profile_id)
      .then(response => {
        setPermissionsList(response);
        if (user.type === 'PERSON') {
          const hasVacationPermission = response.some(permission => permission.slug === 'managers_vacations_list');
          const has360Permission = collaborator?.company.is_manager_competence;
          const hasInCheckPermission = collaborator?.company.is_manager_in_check;
          setManagerPermission(has360Permission || hasVacationPermission||hasInCheckPermission);
        }

        setRequestFinished(true);
      })
      .catch(() => {
        setRequestFinished(true);
      });
  }, [companySelected, me]); // eslint-disable-line

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
