import { INotificationProps } from '@/safira-app/interfaces/Notification';

const notificationType = {
  ADDED_IN_ACTIVITY: 'ADDED_IN_ACTIVITY',
  ADDED_IN_PROJECT: 'ADDED_IN_PROJECT',
  REMOVED_FROM_PROJECT: 'REMOVED_FROM_PROJECT',
  ACTIVITY_EXPIRATION: 'ACTIVITY_EXPIRATION',
  COMPLETED_ACTIVITY: 'COMPLETED_ACTIVITY',
  ACTIVITY_COMMENT_QUOTE: 'ACTIVITY_COMMENT_QUOTE',
  ACTIVITY_LATE: 'ACTIVITY_LATE',
  ADDED_IN_WORKSPACE: 'ADDED_IN_WORKSPACE',
  ADDED_ADMIN_IN_WORKSPACE: 'ADDED_ADMIN_IN_WORKSPACE',
  REMOVED_ADMIN_FROM_WORKSPACE: 'REMOVED_ADMIN_FROM_WORKSPACE',
  REMOVED_FROM_WORKSPACE: 'REMOVED_FROM_WORKSPACE',
};

const messageGroup = {
  ONE_WEEK: '1 semana',
  ONE_DAY: '1 dia',
  TWO_HOURS: '2 horas',
  ONE_HOUR: '1 hora',
  THIRTY_MINUTES: '30 minutos',
  FIFTEEN_MINUTES: '15 minutos',
};

export function createProjectsBrowserNotificationFactory(notification: INotificationProps) {
  const { sender, common } = notification;

  switch (notification.type) {
    case notificationType.ADDED_IN_ACTIVITY:
      return `${sender.name} adicionou você na atividade ${common.title_activity} no projeto ${common.title_project}`;

    case notificationType.ADDED_IN_PROJECT:
      return `${sender.name} te adicionou no projeto ${common.title_project}`;

    case notificationType.ACTIVITY_EXPIRATION:
      return `${common.title_activity} vencerá em ${messageGroup[common.activity_deadline]}`;

    case notificationType.REMOVED_FROM_PROJECT:
      return `Você foi removido(a) do projeto ${common.title_project}`;

    case notificationType.COMPLETED_ACTIVITY:
      return `A atividade "${common?.title_activity}" foi marcada como concluída por ${sender.name}`;

    case notificationType.ACTIVITY_COMMENT_QUOTE:
      return `${sender.name} te marcou na atividade "${common?.title_activity}"`;

    case notificationType.ACTIVITY_LATE:
      return `A atividade "${common?.title_activity}" do projeto "${common?.title_project}" está atrasada`;

    case notificationType.ADDED_IN_WORKSPACE:
      return `${sender?.name} te adicionou como membro da área de trabalho "${common?.title_workspace}"`;

    case notificationType.ADDED_ADMIN_IN_WORKSPACE:
      return `${sender?.name} te adicionou como administrador da área de trabalho "${common?.title_workspace}"`;

    case notificationType.REMOVED_FROM_WORKSPACE:
      return `Você foi removido da área de trabalho "${common?.title_workspace}"`;

    case notificationType.REMOVED_ADMIN_FROM_WORKSPACE:
      return `Você não é mais administrador da área de trabalho "${common?.title_workspace}"`;

    default:
      return '';
  }
}
