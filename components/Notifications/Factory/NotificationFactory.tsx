import { NotificationEvent } from '@/safira-app/providers/NotificationEvent';
import { NotificationProps } from '@/safira-app/services/queries/notifications';

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
import { MODULES } from '@/safira-app/interfaces/Modules';

export function createDropdownNotification(item: NotificationProps) {
  const notification = formatNotificationContent(item);

  return (
    <NotificationContainer url={notification.actionUrl} notification={notification}>
      <NotificationContentText notification={notification}>
        <Trans components={{ strong: <NotificationHighlight /> }}>{notification.content}</Trans>
      </NotificationContentText>
    </NotificationContainer>
  );
}

export function createToastNotification(item: NotificationProps) {
  const notification = formatNotificationContent(item);

  return (
    <NotificationContainerToast>
      <NotificationContentText notification={notification}>
        <Trans components={{ strong: <NotificationHighlight /> }}>{notification.content}</Trans>
      </NotificationContentText>
    </NotificationContainerToast>
  );
}

export function createBrowserNotification(item: NotificationProps) {
  const notification = formatNotificationContent(item);

  switch (item.module) {
    case MODULES.social_network:
      return createSocialNetworkBrowserNotificationFactory(notification);

    case MODULES.feedback:
      return createFeedbackBrowserFactory(notification);

    case MODULES.schedule:
      NotificationEvent.emit('update_schedule_module');
      return createScheduleBrowserNotificationFactory(notification);

    case MODULES.project:
      NotificationEvent.emit('update_projects_module');
      return createProjectsBrowserNotificationFactory(notification);

    case MODULES.endomarketing:
      return createEndomarketingBrowserNotificationFactory(notification);

    case MODULES.ombudsman:
      return createOmbudsmanBrowserNotificationFactory(notification);

    case MODULES.evaluation360:
      return createEvaluationBrowserNotificationFactory(notification);

    case MODULES.personal_department:
      return createOrganizationalEngineeringBrowserNotificationFactory(notification);

    case MODULES.admission:
      NotificationEvent.emit('update_personal_department_module');
      return createPersonalDepartmentBrowserNotificationFactory(notification);

    case MODULES.group:
      return createGroupBrowserNotificationFactory(notification);

    case MODULES.policy:
      return createPoliciesBrowserNotificationFactory(notification);

    case MODULES.okr:
      return createOKRBrowserNotificationFactory(notification);

    default:
      break;
  }

  return null;
}
