import { CollaboratorsInterface, MeCompany } from "safira-app/interfaces/Me";
import { IUser } from "safira-app/interfaces/User";

export function hasManagerPermissions(
  user: IUser,
  checkPermission: (permissions: string[]) => boolean,
  selectedCompany?: CollaboratorsInterface,
) {
  const isPerson = user.type === 'PERSON';
  const isManagerCompetence = selectedCompany?.is_manager_competence;
  const isManagerInCheck = selectedCompany?.is_manager_in_check;
  const hasVacationsPermission = checkPermission(['managers_vacations_list']);
  const hasOccurrencesPermission = checkPermission(['managers_list_occurrences']);
  return isPerson && (isManagerCompetence || isManagerInCheck || hasVacationsPermission || hasOccurrencesPermission);
}