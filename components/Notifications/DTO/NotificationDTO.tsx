import { NotificationProps } from 'safira-app/services/notifications';
import { NotificationImageBox } from '../SubComponents';
import {
  createBrowserNotification,
  createDropdownNotification,
  createToastNotification,
} from '../Factories/notificationFactory';

export class NotificationDTO {
  notification: NotificationProps | null = null;

  constructor(notification: NotificationProps) {
    this.notification = notification;
  }

  toDropdown() {
    if (!this.notification) return <></>;

    return createDropdownNotification(this.notification);
  }

  toToast() {
    if (!this.notification) return null;

    return {
      NotificationImageBox: <NotificationImageBox notification={this.notification} />,
      NotificationComponent: createToastNotification(this.notification),
    };
  }

  toBrowserAPI() {
    if (!this.notification) return null;

    return createBrowserNotification(this.notification);
  }
}
