import { NotificationProps } from '@/safira-app/services/queries/notifications';
import { NotificationImage } from '@/safira-app/pages/Notifications/components/notificationImage';

import { createBrowserNotification, createDropdownNotification, createToastNotification } from '../Factory';

export class NotificationDTO {
  notification: NotificationProps | null = null;

  constructor(notification: NotificationProps) {
    this.notification = notification;
  }

  public toDropdown() {
    if (!this.notification) return <></>;

    return createDropdownNotification(this.notification);
  }

  public toToast() {
    if (!this.notification) return null;

    return {
      NotificationImageBox: <NotificationImage notification={this.notification} />,
      NotificationComponent: createToastNotification(this.notification),
    };
  }

  public toBrowserAPI() {
    if (!this.notification) return null;

    return createBrowserNotification(this.notification);
  }
}
