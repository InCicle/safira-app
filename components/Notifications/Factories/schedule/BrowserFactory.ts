import { INotificationProps } from '@/safira-app/interfaces/Notification';
import moment from 'moment';

const notificationType = {
  NEW_EVENT_SCHEDULE_INVITATION: 'NEW_EVENT_SCHEDULE_INVITATION',
  NEW_TASK_INVITATION: 'NEW_TASK_INVITATION',
  EVENT_INVITATION_ANSWER: 'EVENT_INVITATION_ANSWER',
  EVENT_QUIT: 'EVENT_QUIT',
  EVENT_CANCELED: 'EVENT_CANCELED',
  EVENT_UPDATE: 'EVENT_UPDATE',
  TASK_INVITE_STATUS: 'TASK_INVITE_STATUS',
  TASK_STATUS_UPDATE: 'TASK_STATUS_UPDATE',
  UPCOMING_EVENT: 'UPCOMING_EVENT',
  ADDED_SCHEDULE: 'ADDED_SCHEDULE',
  NEW_EVENT: 'NEW_EVENT',
  TASK_UPDATE: 'TASK_UPDATE',
  TASK_REOPENED: 'TASK_REOPENED',
  TASK_LATE_OWNER: 'TASK_LATE_OWNER',
  TASK_LATE: 'TASK_LATE',
  TASK_SUPERVISOR: 'TASK_SUPERVISOR',
};

export function createScheduleBrowserNotificationFactory(notification: INotificationProps) {
  const { sender, common } = notification;

  function returnAlertTime(alertValue: string) {
    switch (alertValue) {
      case 'FIFTEEN_MINUTES':
        return '15 minutos';
      case 'THIRTY_MINUTES':
        return '30 minutos';
      case 'ONE_HOUR':
        return '1 hora';
      case 'TWO_HOURS':
        return '2 horas';
      case 'ONE_DAY':
        return '1 dia';
      case 'ONE_WEEK':
        return '1 semana';
      default:
        return '';
    }
  }

  function returnEventUpdate(type: 'date' | 'local' | 'hour' | 'other') {
    switch (type) {
      case 'date':
        return `a data do evento ${common.event_name} de ${moment(common.from).format('DD/MM/YYYY')} para ${moment(
          common.to,
        ).format('DD/MM/YYYY')}`;

      case 'local':
        return `o local do evento ${common.event_name} de ${common.from} para ${common.to}`;

      case 'hour':
        return `o horário do evento de ${moment(common.from).format('DD/MM/YYYY')} às ${moment(common.from).format(
          'HH:mm',
        )} para às ${moment(common.to).format('HH:mm')}`;

      case 'other':
        return `o evento "${common.event_name}"`;

      default:
        return '';
    }
  }

  switch (notification.type) {
    case notificationType.NEW_EVENT_SCHEDULE_INVITATION:
      return `${sender.name} convidou você para o evento "${common.event_name}" que acontecerá no dia ${moment(
        common.date,
      ).format('DD/MM/YYYY')} ${!notification.common.whole_day ? `às ${moment(common.date).format('HH:mm')}` : ''}.`;

    case notificationType.NEW_TASK_INVITATION:
      return `${sender.name} delegou a tarefa "${common.task_title}" ${
        common.date_hour
          ? `com vencimento em ${moment(common.date_hour).format('DD/MM/YYYY')} às ${moment(common.date_hour).format(
              'HH:mm',
            )}`
          : 'para você'
      }.`;

    case notificationType.EVENT_INVITATION_ANSWER:
      return `${sender.name} ${common.accepted ? 'aceitou' : 'recusou'} seu convite para o evento "${
        common.event_name
      }"`;

    case notificationType.EVENT_QUIT:
      return `${sender.name} saiu do evento "${common.event_name}"`;

    case notificationType.EVENT_CANCELED:
      return `${sender.name} cancelou o evento "${common.event_name}"`;

    case notificationType.EVENT_UPDATE:
      return `${sender.name} alterou ${returnEventUpdate(common.data_updated)}.`;

    case notificationType.UPCOMING_EVENT:
      return `O evento "${common.event_name}" acontecerá em ${returnAlertTime(common.event_deadline)}.`;

    case notificationType.TASK_INVITE_STATUS:
      return `${sender.name} ${common.task_invite_status === 'accepted' ? 'aceitou' : ''} ${
        common.task_invite_status === 'refused' ? 'recusou' : ''
      } a tarefa "${common.task_title}" delegada por você.`;

    case notificationType.TASK_STATUS_UPDATE:
      return `${sender.name} alterou o status da tarefa para ${common.task_status}`;

    case notificationType.ADDED_SCHEDULE:
      return `${sender.name} te adicionou na agenda "${common.schedule_name}"`;

    case notificationType.NEW_EVENT:
      return `${sender.name} adicionou um evento na agenda compartilhada "${common.schedule_name}"`;

    case notificationType.TASK_UPDATE:
      return `${sender.name} alterou a tarefa "${common.task_title}"`;

    case notificationType.TASK_REOPENED:
      return `${sender.name} reabriu a tarefa "${common.task_title}"`;

    case notificationType.TASK_LATE_OWNER:
      return `A tarefa "${common.task_title}" delegada para ${sender.name} está com status atrasada`;

    case notificationType.TASK_LATE:
      return `A tarefa "${common.task_title}" delegada por ${sender.name} está com status atrasada`;

    case notificationType.TASK_SUPERVISOR:
      return `${sender.name} te adicionou como supervisor da tarefa`;

    default:
      return '';
  }
}
