import React from 'react';

import { NotificationEvent } from '@/safira-app/providers/NotificationEvent';
import { INotificationProps, MODULE_TYPES } from '@/safira-app/interfaces/Notification';
import { formatNotificationContent } from './_abstract/NotificationAbstract';

import {
  SocialNetworkDropdownNotificationFactory,
  SocialNetworkToastNotificationFactory,
  createSocialNetworkBrowserNotificationFactory,
} from './socialNetwork';

import {
  FeedbackDropdownNotificationFactory,
  FeedbackToastNotificationFactory,
  createFeedbackBrowserFactory,
} from './feedback';

import {
  ScheduleDropdownNotificationFactory,
  ScheduleToastNotificationFactory,
  createScheduleBrowserNotificationFactory,
} from './schedule';

import {
  ProjectsDropdownNotificationFactory,
  ProjectsToastNotificationFactory,
  createProjectsBrowserNotificationFactory,
} from './projects';

import {
  EndomarketingDropdownNotificationFactory,
  EndomarketingToastNotificationFactory,
  createEndomarketingBrowserNotificationFactory,
} from './endomarketing';

import {
  EvaluationDropdownNotificationFactory,
  EvaluationToastNotificationFactory,
  createEvaluationBrowserNotificationFactory,
} from './evaluation';

import {
  OrganizationalEngineeringDropdownNotificationFactory,
  OrganizationalEngineeringToastNotificationFactory,
  createOrganizationalEngineeringBrowserNotificationFactory,
} from './organizationalEngineering';

import {
  PersonalDepartmentDropdownNotificationFactory,
  PersonalDepartmentToastNotificationFactory,
  createPersonalDepartmentBrowserNotificationFactory,
} from './personalDepartment';

import {
  GroupDropdownNotificationFactory,
  GroupToastNotificationFactory,
  createGroupBrowserNotificationFactory,
} from './group';

import {
  PoliciesDropdownNotificationFactory,
  PoliciesToastNotificationFactory,
  createPoliciesBrowserNotificationFactory,
} from './policies';

import {
  OKRDropdownNotificationFactory,
  OKRToastNotificationFactory,
  createOKRBrowserNotificationFactory,
} from './okr';

export function createDropdownNotification(item: INotificationProps) {
  const notification = formatNotificationContent(item);

  switch (notification.module) {
    case MODULE_TYPES.social_network:
      return <SocialNetworkDropdownNotificationFactory notificationItem={notification} />;

    case MODULE_TYPES.feedback:
      return <FeedbackDropdownNotificationFactory notificationItem={notification} />;

    case MODULE_TYPES.schedule:
      return <ScheduleDropdownNotificationFactory notificationItem={notification} />;

    case MODULE_TYPES.project:
      return <ProjectsDropdownNotificationFactory notificationItem={notification} />;

    case MODULE_TYPES.endomarketing:
      return <EndomarketingDropdownNotificationFactory notificationItem={notification} />;

    case MODULE_TYPES.evaluation360:
      return <EvaluationDropdownNotificationFactory notificationItem={notification} />;

    case MODULE_TYPES.organizational_engineering:
      return <OrganizationalEngineeringDropdownNotificationFactory notificationItem={notification} />;

    case MODULE_TYPES.personal_department:
      return <PersonalDepartmentDropdownNotificationFactory notificationItem={notification} />;

    case MODULE_TYPES.group:
      return <GroupDropdownNotificationFactory notificationItem={notification} />;

    case MODULE_TYPES.policy:
      return <PoliciesDropdownNotificationFactory notificationItem={notification} />;

    case MODULE_TYPES.okr:
      return <OKRDropdownNotificationFactory notificationItem={notification} />;

    default:
      break;
  }

  return <></>;
}

export function createToastNotification(item: INotificationProps) {
  const notification = formatNotificationContent(item);

  switch (item.module) {
    case MODULE_TYPES.social_network:
      return <SocialNetworkToastNotificationFactory notificationItem={notification} />;

    case MODULE_TYPES.feedback:
      return <FeedbackToastNotificationFactory notificationItem={notification} />;

    case MODULE_TYPES.schedule:
      NotificationEvent.emit('update_schedule_module');
      return <ScheduleToastNotificationFactory notificationItem={notification} />;

    case MODULE_TYPES.project:
      NotificationEvent.emit('update_projects_module');
      return <ProjectsToastNotificationFactory notificationItem={notification} />;

    case MODULE_TYPES.endomarketing:
      return <EndomarketingToastNotificationFactory notificationItem={notification} />;

    case MODULE_TYPES.evaluation360:
      return <EvaluationToastNotificationFactory notificationItem={notification} />;

    case MODULE_TYPES.organizational_engineering:
      return <OrganizationalEngineeringToastNotificationFactory notificationItem={notification} />;

    case MODULE_TYPES.personal_department:
      NotificationEvent.emit('update_personal_department_module');
      return <PersonalDepartmentToastNotificationFactory notificationItem={notification} />;

    case MODULE_TYPES.group:
      return <GroupToastNotificationFactory notificationItem={notification} />;

    case MODULE_TYPES.policy:
      return <PoliciesToastNotificationFactory notificationItem={notification} />;

    case MODULE_TYPES.okr:
      return <OKRToastNotificationFactory notificationItem={notification} />;

    default:
      break;
  }

  return <></>;
}

export function createBrowserNotification(item: INotificationProps) {
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

    case MODULE_TYPES.evaluation360:
      return createEvaluationBrowserNotificationFactory(notification);

    case MODULE_TYPES.organizational_engineering:
      return createOrganizationalEngineeringBrowserNotificationFactory(notification);

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
