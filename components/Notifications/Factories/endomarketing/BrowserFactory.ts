import { NotificationProps } from 'safira-app/services/notifications';
import { reduceString } from 'safira-app/utils/reduceString';

const notificationType = {
  ENDOMARKETING_COMMUNICATION: 'ENDOMARKETING_COMMUNICATION',
};

export function createEndomarketingBrowserNotificationFactory(notification: NotificationProps) {
  switch (notification.type) {
    case notificationType.ENDOMARKETING_COMMUNICATION:
      return `Comunicado "${reduceString(notification.common.content, 100)}"`;

    default:
      return '';
  }
}
