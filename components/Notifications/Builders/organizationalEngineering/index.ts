import { NotificationProps } from 'safira-app/services/notifications';

const notificationType = {
  EMPLOYEE_LINK_REQUEST: 'EMPLOYEE_LINK_REQUEST',
  EMPLOYEE_LINK_ANSWER: 'EMPLOYEE_LINK_ANSWER',
  EMPLOYEE_UNLINK: 'EMPLOYEE_UNLINK',
  EMPLOYEE_LINK_CANCELED: 'EMPLOYEE_LINK_CANCELED',
  CORPORATE_FEEDBACK: 'CORPORATE_FEEDBACK',
  PAYSLIP_RECEIVED: 'PAYSLIP_RECEIVED',
};

export function createOrganizationalEngineeringBrowserNotificationFactory(notification: NotificationProps) {
  const { sender } = notification;

  switch (notification.type) {
    case notificationType.EMPLOYEE_LINK_REQUEST:
      return `${sender.name} convidou você para vincular-se como colaborador.`;

    case notificationType.EMPLOYEE_LINK_ANSWER:
      return `${sender.name} ${
        notification.common.content === 'ACCEPTED' ? 'aceitou' : 'recusou'
      } o convite de vinculação.`;

    case notificationType.EMPLOYEE_UNLINK:
      return `Você foi desvinculado da empresa ${sender.name}.`;

    case notificationType.EMPLOYEE_LINK_CANCELED:
      return `A empresa ${notification.sender.name} cancelou o convite de vinculação.`;

    case notificationType.CORPORATE_FEEDBACK:
      return `${notification.sender.name} enviou um feedback que precisa da sua atenção.`;

    case notificationType.CORPORATE_FEEDBACK:
      return `${notification.sender.name} enviou um holerite para você.`;

    default:
      return ``;
  }
}
