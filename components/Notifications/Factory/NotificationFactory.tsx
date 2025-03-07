import { NotificationEvent } from '@/safira-app/providers/NotificationEvent';
import {
  MODULE_TYPES,
  NotificationProps,
} from '@/safira-app/services/notifications';

import { createSocialNetworkBrowserNotificationFactory } from '../Builders/socialNetwork';

import { createFeedbackBrowserFactory } from '../Builders/feedback';

import { createScheduleBrowserNotificationFactory } from '../Builders/schedule';

import { createProjectsBrowserNotificationFactory } from '../Builders/projects';

import { createEndomarketingBrowserNotificationFactory } from '../Builders/endomarketing';

import { createEvaluationBrowserNotificationFactory } from '../Builders/evaluation';

import { createOrganizationalEngineeringBrowserNotificationFactory } from '../Builders/organizationalEngineering';

import { createPersonalDepartmentBrowserNotificationFactory } from '../Builders/personalDepartment';

import { createGroupBrowserNotificationFactory } from '../Builders/group';

import { createPoliciesBrowserNotificationFactory } from '../Builders/policies';

import { createOKRBrowserNotificationFactory } from '../Builders/okr';
import { createOmbudsmanBrowserNotificationFactory } from '../Builders/ombudsman';

import {
  NotificationContainer,
  NotificationContentText,
  NotificationHighlight,
  NotificationContainerToast,
} from '../SubComponents';
import { formatNotificationContent } from '@/safira-app/utils/formatNotificationContent';
import { Trans } from 'react-i18next';

export function createDropdownNotification(item: NotificationProps) {
  const notification = formatNotificationContent(item);

  return (
    <NotificationContainer
      url={notification.actionUrl}
      notification={notification}
    >
      <NotificationContentText notification={notification}>
        <Trans
        components={{ strong: <NotificationHighlight /> }}>
        {notification.content}</Trans>
      </NotificationContentText>
    </NotificationContainer>
  );
}

export function createToastNotification(item: NotificationProps) {
  const notification = formatNotificationContent(item);

  return (
    <NotificationContainerToast>
      <NotificationContentText notification={notification}>
       <Trans
        components={{ strong: <NotificationHighlight /> }}>
        {notification.content}</Trans>
      </NotificationContentText>
    </NotificationContainerToast>
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

    case MODULE_TYPES.personal_department:
      return createOrganizationalEngineeringBrowserNotificationFactory(
        notification,
      );

    case MODULE_TYPES.admission:
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
