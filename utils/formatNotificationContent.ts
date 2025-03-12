import { NotificationProps } from '../services/notifications';
import { htmlDecode } from './htmlDecode';

export function formatNotificationContent(notification: NotificationProps): NotificationProps {
  if (!notification?.common?.content && typeof notification?.common?.content !== 'string') return notification;

  return {
    ...notification,
    common: {
      ...notification?.common,
      content: htmlDecode(notification.common?.content),
    },
  };
}
