import { MeCompany } from "safira-app/interfaces/Me";
import { IUser } from "safira-app/interfaces/User";

export function hasManagerPermissions(
  user: IUser,
  checkPermission: (permissions: string[]) => boolean,
  selectedCompany?: MeCompany,
) {
  return Boolean(
    user.type === 'PERSON' &&
      (selectedCompany?.is_manager_competence ||
        selectedCompany?.is_manager_in_check ||
        checkPermission(['managers_vacations_list']) ||
        checkPermission(['managers_list_occurrences']))
  );
}