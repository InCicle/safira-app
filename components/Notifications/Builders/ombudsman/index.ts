import { reduceString } from '@/safira-app/utils/reduceString';
import { NotificationProps } from '@/safira-app/services/notifications';

const statusMap: Record<string, string> = {
  PENDING: 'Pendente',
  IN_PROGRESS: 'Em Andamento',
  COMPLETED: 'Concluído',
  ARCHIVED: 'Arquivado',
};


const notificationType = {
  TICKET_RECEIVED: 'TICKET_RECEIVED',
  TICKET_CHANGE_STATUS: 'TICKET_CHANGE_STATUS',
  TICKET_NEW_MESSAGE: 'TICKET_NEW_MESSAGE',
};

export function createOmbudsmanBrowserNotificationFactory(notification: NotificationProps) {
  const { common } = notification;

  switch (notification.type) {
    case notificationType.TICKET_RECEIVED:
      return `Nova comunicação recebida: ${reduceString(common.content || '', 50)}`;

    case notificationType.TICKET_CHANGE_STATUS:
      return `O status da sua comunicação com a ${common.company_name} foi atualizado para ${statusMap[common.new_status.toUpperCase()] || common.new_status}`;

    case notificationType.TICKET_NEW_MESSAGE:
      return `Uma nova mensagem foi enviada sobre a comunicação ${common.communication_id}`;

    default:
      return '';
  }
}
