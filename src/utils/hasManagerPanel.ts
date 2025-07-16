import { CollaboratorsInterface } from '@/interfaces/Me';
import { IUser } from '@/interfaces/User';

export function hasManagerPermissions(
  user: IUser,
  checkPermission: (permissions: string[]) => boolean,
  selectedCollaborator?: CollaboratorsInterface,
) {
  const isPerson = user.type === 'PERSON';
  const isManagerCompetence = selectedCollaborator?.is_manager_competence;
  const isManagerInCheck = selectedCollaborator?.is_manager_in_check;
  const hasVacationsPermission = checkPermission(['managers_vacations_list']);
  const hasOccurrencesPermission = checkPermission([
    'managers_list_occurrences',
  ]);
  return (
    isPerson &&
    (isManagerCompetence ||
      isManagerInCheck ||
      hasVacationsPermission ||
      hasOccurrencesPermission)
  );
}
