import { INotificationProps } from '@/safira-app/interfaces/Notification';
import { reduceString } from '@/safira-app/utils/reduceString';

const notificationType = {
  HIRING_PENDING: 'HIRING_PENDING',
  HIRING_UPDATED: 'HIRING_UPDATED',
  HIRING_APPROVED: 'HIRING_APPROVED',
  HIRING_CANCELED: 'HIRING_CANCELED',
  HIRING_CANCELED_BY_CANDIDATE: 'HIRING_CANCELED_BY_CANDIDATE',
  HIRING_ACCEPTED_BY_CANDIDATE: 'HIRING_ACCEPTED_BY_CANDIDATE',
  HIRING_PENDING_DEADLINE: 'HIRING_PENDING_DEADLINE',
  NEW_HIRING: 'NEW_HIRING',
  DOCUMENT_REJECTED: 'DOCUMENT_REJECTED',
  FREE_NOTIFICATION: 'FREE_NOTIFICATION',
  NEW_DOCUMENT: 'NEW_DOCUMENT',
  CANCELED_SOLICITATION_DOCUMENT: 'CANCELED_SOLICITATION_DOCUMENT',
  NEW_SOLICITATION_DOCUMENT: 'NEW_SOLICITATION_DOCUMENT',
};

export function createPersonalDepartmentBrowserNotificationFactory(notification: INotificationProps) {
  const { sender, common } = notification;

  switch (notification.type) {
    case notificationType.HIRING_PENDING:
      return `${sender.name} precisa que você envie documentos faltantes para a continuidade da sua contratação`;

    case notificationType.HIRING_UPDATED:
      return `${sender.name} modificou os dados de sua contratação`;

    case notificationType.HIRING_APPROVED:
      return `${sender.name} concluiu seu processo de contratação. "${reduceString(common.content, 60)}"`;

    case notificationType.HIRING_CANCELED:
      return `${sender.name}: "${reduceString(common.content, 80)}"`;

    case notificationType.HIRING_CANCELED_BY_CANDIDATE:
      return `${sender.name} "${reduceString(common.content, 80)}"`;

    case notificationType.HIRING_ACCEPTED_BY_CANDIDATE:
      return `${sender.name}: Aceitou iniciar o processo de contratação como ${reduceString(
        notification.common.content,
        80,
      )}`;

    case notificationType.HIRING_PENDING_DEADLINE:
      return `O prazo limite para o cadastro de suas informações se encerra amanhã`;

    case notificationType.NEW_HIRING:
      return `${sender.name} deseja te contratar como colaborador`;

    case notificationType.DOCUMENT_REJECTED:
      return `${sender.name} rejeitou o documento "${common.document}"`;

    case notificationType.FREE_NOTIFICATION:
      return `${sender.name}: ${reduceString(common.content, 120)}`;

    case notificationType.NEW_DOCUMENT:
      return `${sender.name} te enviou um documento referente à sua contratação`;

    case notificationType.CANCELED_SOLICITATION_DOCUMENT:
      return `${sender.name} cancelou a solicitação de um documento referente à sua contratação`;

    case notificationType.NEW_SOLICITATION_DOCUMENT:
      return `${sender.name} te solicitou um novo documento referente à sua contratação`;

    default:
      return '';
  }
}
