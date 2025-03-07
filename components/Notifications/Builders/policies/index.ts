import { NotificationProps } from '@/safira-app/services/notifications';

const notificationType = {
  NEW_POLICY: 'NEW_POLICY',
  POLICY_REVIEW: 'POLICY_REVIEW',
};

export function createPoliciesBrowserNotificationFactory(notification: NotificationProps) {
  const { sender } = notification;

  switch (notification.type) {
    case notificationType.NEW_POLICY:
      return `A empresa ${sender.name} adicionou uma nova política`;

    case notificationType.POLICY_REVIEW:
      return `A empresa ${sender.name} publicou uma nova revisão de política`;

    default:
      return '';
  }
}
