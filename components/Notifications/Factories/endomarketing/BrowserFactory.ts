import { INotificationProps } from "@safira/interfaces/Notification";
import { reduceString } from "@safira/utils/reduceString";

const notificationType = {
  ENDOMARKETING_COMMUNICATION: "ENDOMARKETING_COMMUNICATION",
};

export function createEndomarketingBrowserNotificationFactory(notification: INotificationProps) {
  switch (notification.type) {
    case notificationType.ENDOMARKETING_COMMUNICATION:
      return `Comunicado "${reduceString(notification.common.content, 100)}"`;

    default:
      return "";
  }
}
