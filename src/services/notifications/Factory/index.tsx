import { Trans } from 'react-i18next';
import { NotificationProps } from '@/services/api/notifications';
import { NotificationContentText } from '@/pages/Notifications/components/notificationContentText';
import { NotificationContainer } from '@/pages/Notifications/components/notificationContainer';
import { NotificationHighlight } from '@/pages/Notifications/components/notificationHighlight';
import { NotificationToastContainer } from '@/pages/Notifications/components/notificationToastContainer';
import { htmlDecode } from '@/utils/htmlDecode';

export function createDropdownNotification(notification: NotificationProps) {
  return (
    <NotificationContainer
      url={notification.actionUrl}
      notification={notification}
    >
      <NotificationContentText notification={notification}>
        <Trans components={{ strong: <NotificationHighlight /> }}>
          {notification.content}
        </Trans>
      </NotificationContentText>
    </NotificationContainer>
  );
}

export function createToastNotification(notification: NotificationProps) {
  return (
    <NotificationToastContainer>
      <NotificationContentText notification={notification}>
        <Trans components={{ strong: <NotificationHighlight /> }}>
          {notification.content}
        </Trans>
      </NotificationContentText>
    </NotificationToastContainer>
  );
}

export function createBrowserNotification(notification: NotificationProps) {
  return htmlDecode(notification.content);
}
