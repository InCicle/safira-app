import { NotificationEvent } from '@/safira-app/providers/NotificationEvent';
import {
  MODULE_TYPES,
  NotificationProps,
} from '@/safira-app/services/notifications';

import { createSocialNetworkBrowserNotificationFactory } from './socialNetwork';

import { createFeedbackBrowserFactory } from './feedback';

import { createScheduleBrowserNotificationFactory } from './schedule';

import { createProjectsBrowserNotificationFactory } from './projects';

import { createEndomarketingBrowserNotificationFactory } from './endomarketing';

import { createEvaluationBrowserNotificationFactory } from './evaluation';

import { createOrganizationalEngineeringBrowserNotificationFactory } from './organizationalEngineering';

import { createPersonalDepartmentBrowserNotificationFactory } from './personalDepartment';

import { createGroupBrowserNotificationFactory } from './group';

import { createPoliciesBrowserNotificationFactory } from './policies';

import { createOKRBrowserNotificationFactory } from './okr';
import { createOmbudsmanBrowserNotificationFactory } from './ombudsman';

import {
  NotificationContainer,
  NotificationContentText,
} from './_abstract/NotificationAbstract';
import { formatNotificationContent } from '@/safira-app/utils/formatNotificationContent';

export function createDropdownNotification(item: NotificationProps) {
  const notification = formatNotificationContent(item);

  return (
    <NotificationContainer
      url={notification.actionUrl}
      notification={notification}
    >
      <NotificationContentText notification={notification}>
        {notification.content}
      </NotificationContentText>
    </NotificationContainer>
  );
}

export function createToastNotification(item: NotificationProps) {
  const notification = formatNotificationContent(item);

  return (
    <NotificationContainer
      url={notification.actionUrl}
      notification={notification}
    >
      <NotificationContentText notification={notification}>
        {notification.content}
      </NotificationContentText>
    </NotificationContainer>
  );
}

export function createBrowserNotification(item: NotificationProps) {
  const notification = formatNotificationContent(item);

  switch (item.module) {
    case MODULE_TYPES.social_network:
      return createSocialNetworkBrowserNotificationFactory(notification);

    case MODULE_TYPES.feedback:
      return createFeedbackBrowserFactory(notification);

    case MODULE_TYPES.schedule:
      NotificationEvent.emit('update_schedule_module');
      return createScheduleBrowserNotificationFactory(notification);

    case MODULE_TYPES.project:
      NotificationEvent.emit('update_projects_module');
      return createProjectsBrowserNotificationFactory(notification);

    case MODULE_TYPES.endomarketing:
      return createEndomarketingBrowserNotificationFactory(notification);

    case MODULE_TYPES.ombudsman:
      return createOmbudsmanBrowserNotificationFactory(notification);

    case MODULE_TYPES.evaluation360:
      return createEvaluationBrowserNotificationFactory(notification);

    case MODULE_TYPES.organizational_engineering:
      return createOrganizationalEngineeringBrowserNotificationFactory(
        notification,
      );

    case MODULE_TYPES.personal_department:
      NotificationEvent.emit('update_personal_department_module');
      return createPersonalDepartmentBrowserNotificationFactory(notification);

    case MODULE_TYPES.group:
      return createGroupBrowserNotificationFactory(notification);

    case MODULE_TYPES.policy:
      return createPoliciesBrowserNotificationFactory(notification);

    case MODULE_TYPES.okr:
      return createOKRBrowserNotificationFactory(notification);

    default:
      break;
  }

  return null;
}
