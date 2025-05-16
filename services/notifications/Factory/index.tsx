import { NotificationEvent } from '@/safira-app/services/emitters/NotificationEvent';
import { NotificationProps } from '@/safira-app/services/queries/notifications';
import * as BrowserBuilders from '../Builders';
import { NotificationContentText } from '@/safira-app/pages/Notifications/components/notificationContentText';
import { Trans } from 'react-i18next';
import { MODULES } from '@/safira-app/interfaces/Modules';
import { NotificationContainer } from '@/safira-app/pages/Notifications/components/notificationContainer';
import { NotificationHighlight } from '@/safira-app/pages/Notifications/components/notificationHighlight';
import { NotificationToastContainer } from '@/safira-app/pages/Notifications/components/notificationToastContainer';

export function createDropdownNotification(notification: NotificationProps) {
  return (
    <NotificationContainer url={notification.actionUrl} notification={notification}>
      <NotificationContentText notification={notification}>
        <Trans components={{ strong: <NotificationHighlight /> }}>{notification.content}</Trans>
      </NotificationContentText>
    </NotificationContainer>
  );
}

export function createToastNotification(notification: NotificationProps) {
  return (
    <NotificationToastContainer>
      <NotificationContentText notification={notification}>
        <Trans components={{ strong: <NotificationHighlight /> }}>{notification.content}</Trans>
      </NotificationContentText>
    </NotificationToastContainer>
  );
}

export function createBrowserNotification(notification: NotificationProps) {
  switch (notification.module) {
    case MODULES.social_network:
      return BrowserBuilders.createSocialNetwork(notification);

    case MODULES.feedback:
      return BrowserBuilders.createFeedback(notification);

    case MODULES.schedule:
      NotificationEvent.emit('update_schedule_module');
      return BrowserBuilders.createSchedule(notification);

    case MODULES.project:
      NotificationEvent.emit('update_projects_module');
      return BrowserBuilders.createProjects(notification);

    case MODULES.endomarketing:
      return BrowserBuilders.createEndomarketing(notification);

    case MODULES.ombudsman:
      return BrowserBuilders.createOmbudsman(notification);

    case MODULES.evaluation360:
      return BrowserBuilders.createEvaluation(notification);

    case MODULES.personal_department:
      return BrowserBuilders.createPersonalDepartment(notification);

    case MODULES.admission:
      NotificationEvent.emit('update_personal_department_module');
      return BrowserBuilders.createAdmission(notification);

    case MODULES.group:
      return BrowserBuilders.createGroup(notification);

    case MODULES.policy:
      return BrowserBuilders.createPolicies(notification);

    case MODULES.okr:
      return BrowserBuilders.createOKR(notification);

    default:
      break;
  }

  return null;
}
