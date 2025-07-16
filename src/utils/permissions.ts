import { MeCompany } from '@/interfaces/Me';
import { MODULE_PERMISSIONS } from './constants';
import { IPermission } from '@/services/api/permissions/types';

export type RoutePermissionType = string | (string | string[]);

export type RoutePermissions = {
  COMPANY_ACCESS: RoutePermissionType[];
  PERSON_ACCESS: RoutePermissionType[];
  PERSON_AND_COMPANY: RoutePermissionType[];
};

export const routePermissions: RoutePermissions = {
  COMPANY_ACCESS: ['COMPANY', ['PERSON', MODULE_PERMISSIONS]],
  PERSON_ACCESS: ['PERSON'],
  PERSON_AND_COMPANY: ['PERSON', 'COMPANY'],
};

export enum Permissions {
  COMPANY_ACCESS = `spa`,
  COLLABORATORS_ACCESS = 'list_collaborators',
  SECTORS_ACCESS = 'list_sectors',
  UNITS_ACCESS = 'list_units',
}

export function getCompany(
  companies: MeCompany[],
  companySelected: string | null,
) {
  return (
    companies?.find((company) => company.id === companySelected) ||
    (companies?.length > 0 ? companies[0] : undefined)
  );
}

export function verifyPersonIsManager(
  permissionsList: IPermission[],
  company: MeCompany | undefined,
) {
  const hasVacationPermission = permissionsList.some(
    (permission) => permission.slug === 'managers_vacations_list',
  );
  const has360Permission = company?.is_manager_competence;
  return has360Permission || hasVacationPermission;
}
