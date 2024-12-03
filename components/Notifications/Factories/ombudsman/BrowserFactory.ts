import moment from 'moment';
import { reduceString } from 'safira-app/utils/reduceString';
import { NotificationProps } from 'safira-app/services/notifications';
import { getStatus } from 'safira-app/utils/getStatus';

const notificationType = {
  TICKET_RECEIVED: 'TICKET_RECEIVED',
  TICKET_CHANGE_STATUS: 'TICKET_CHANGE_STATUS',
  TICKET_NEW_MESSAGE: 'TICKET_NEW_MESSAGE',
};

export function createOmbudsmanBrowserNotificationFactory(notification: NotificationProps) {
  const { sender, common } = notification;

  switch (notification.type) {
    case notificationType.TICKET_RECEIVED:
      return `Nova comunicação recebida: ${reduceString(common.content || '', 50)}`;

    case notificationType.TICKET_CHANGE_STATUS:
      return `O status da sua comunicação com a ${common.company_name} foi atualizado para ${getStatus(
        common.new_status,
      )}`;

    case notificationType.TICKET_NEW_MESSAGE:
      return `Uma nova mensagem foi enviada sobre a comunicação ${common.communication_id}`;

    default:
      return '';
  }
}
