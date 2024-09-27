import { INotificationProps } from '@/safira-app/interfaces/Notification';

const notificationType = {
  CYCLE_END: 'CYCLE_END',
  OBJECTIVE_END: 'OBJECTIVE_END',
  KEY_RESULT_END: 'KEY_RESULT_END',
  ADDED_ON_ACTION: 'ADDED_ON_ACTION',
  ADDED_ON_OBJECTIVE: 'ADDED_ON_OBJECTIVE',
  ADDED_ON_KEY_RESULT: 'ADDED_ON_KEY_RESULT',
  CYCLE_LATE: 'CYCLE_LATE',
  OBJECTIVE_LATE: 'OBJECTIVE_LATE',
  KEY_RESULT_LATE: 'KEY_RESULT_LATE',
  ACTION_LATE: 'ACTION_LATE',
  REMOVED_FROM_OBJECTIVE: 'REMOVED_FROM_OBJECTIVE',
  REMOVED_FROM_KEY_RESULT: 'REMOVED_FROM_KEY_RESULT',
  REMOVED_FROM_ACTION: 'REMOVED_FROM_ACTION',
};

export function createOKRBrowserNotificationFactory(notification: INotificationProps) {
  const { common } = notification;

  switch (notification.type) {
    case notificationType.CYCLE_END:
      return `Você chegou ao final do ciclo "${common?.title}". Informe o resultado.`;

    case notificationType.OBJECTIVE_END:
      return `Você chegou ao final do objetivo "${common?.title}". Informe o resultado.`;

    case notificationType.KEY_RESULT_END:
      return `Você chegou ao final do resultado-chave "${common?.title}". Informe o resultado.`;

    case notificationType.ADDED_ON_OBJECTIVE:
      return `Você foi adicionado(a) no objetivo "${common?.title}".`;

    case notificationType.ADDED_ON_KEY_RESULT:
      return `Você foi adicionado(a) no resultado-chave "${common?.title}".`;

    case notificationType.ADDED_ON_ACTION:
      return `Você foi adicionado(a) na ação "${common?.title}".`;

    case notificationType.CYCLE_LATE:
      return `O ciclo "${common?.title}" está atrasado.`;

    case notificationType.OBJECTIVE_LATE:
      return `O objetivo "${common?.title}" está atrasado.`;

    case notificationType.KEY_RESULT_LATE:
      return `O resultado-chave "${common?.title}" está atrasado.`;

    case notificationType.ACTION_LATE:
      return `A ação "${common?.title}" está atrasada.`;

    case notificationType.REMOVED_FROM_OBJECTIVE:
      return `Você foi removido(a) do objetivo "${common?.title}".`;

    case notificationType.REMOVED_FROM_KEY_RESULT:
      return `Você foi removido(a) do resultado-chave "${common?.title}".`;

    case notificationType.REMOVED_FROM_ACTION:
      return `Você foi removido(a) da ação "${common?.title}".`;

    default:
      return '';
  }
}
