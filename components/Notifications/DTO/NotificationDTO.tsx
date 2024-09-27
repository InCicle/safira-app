import React from 'react';
import { INotificationProps } from '@/safira-app/interfaces/Notification';

import { NotificationImageBox } from '../Factories/_abstract/ToastNotificationAbstract';
import {
  createBrowserNotification,
  createDropdownNotification,
  createToastNotification,
} from '../Factories/notificationFactory';

export class NotificationDTO {
  notification: INotificationProps | null = null;

  constructor(notification: INotificationProps) {
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
