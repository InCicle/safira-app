import React from 'react';

import { NotificationEvent } from 'safira-app/providers/NotificationEvent';
import { INotificationProps, MODULE_TYPES } from 'safira-app/interfaces/Notification';

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
  switch (item.module) {
    case MODULE_TYPES.social_network:
      return <SocialNetworkDropdownNotificationFactory notificationItem={item} />;

    case MODULE_TYPES.feedback:
      return <FeedbackDropdownNotificationFactory notificationItem={item} />;

    case MODULE_TYPES.schedule:
      return <ScheduleDropdownNotificationFactory notificationItem={item} />;

    case MODULE_TYPES.project:
      return <ProjectsDropdownNotificationFactory notificationItem={item} />;

    case MODULE_TYPES.endomarketing:
      return <EndomarketingDropdownNotificationFactory notificationItem={item} />;

    case MODULE_TYPES.evaluation360:
      return <EvaluationDropdownNotificationFactory notificationItem={item} />;

    case MODULE_TYPES.organizational_engineering:
      return <OrganizationalEngineeringDropdownNotificationFactory notificationItem={item} />;

    case MODULE_TYPES.personal_department:
      return <PersonalDepartmentDropdownNotificationFactory notificationItem={item} />;

    case MODULE_TYPES.group:
      return <GroupDropdownNotificationFactory notificationItem={item} />;

    case MODULE_TYPES.policy:
      return <PoliciesDropdownNotificationFactory notificationItem={item} />;

    case MODULE_TYPES.okr:
      return <OKRDropdownNotificationFactory notificationItem={item} />;

    default:
      break;
  }

  return <></>;
}

export function createToastNotification(item: INotificationProps) {
  switch (item.module) {
    case MODULE_TYPES.social_network:
      return <SocialNetworkToastNotificationFactory notificationItem={item} />;

    case MODULE_TYPES.feedback:
      return <FeedbackToastNotificationFactory notificationItem={item} />;

    case MODULE_TYPES.schedule:
      NotificationEvent.emit('update_schedule_module');
      return <ScheduleToastNotificationFactory notificationItem={item} />;

    case MODULE_TYPES.project:
      NotificationEvent.emit('update_projects_module');
      return <ProjectsToastNotificationFactory notificationItem={item} />;

    case MODULE_TYPES.endomarketing:
      return <EndomarketingToastNotificationFactory notificationItem={item} />;

    case MODULE_TYPES.evaluation360:
      return <EvaluationToastNotificationFactory notificationItem={item} />;

    case MODULE_TYPES.organizational_engineering:
      return <OrganizationalEngineeringToastNotificationFactory notificationItem={item} />;

    case MODULE_TYPES.personal_department:
      NotificationEvent.emit('update_personal_department_module');
      return <PersonalDepartmentToastNotificationFactory notificationItem={item} />;

    case MODULE_TYPES.group:
      return <GroupToastNotificationFactory notificationItem={item} />;

    case MODULE_TYPES.policy:
      return <PoliciesToastNotificationFactory notificationItem={item} />;

    case MODULE_TYPES.okr:
      return <OKRToastNotificationFactory notificationItem={item} />;

    default:
      break;
  }

  return <></>;
}

export function createBrowserNotification(item: INotificationProps) {
  switch (item.module) {
    case MODULE_TYPES.social_network:
      return createSocialNetworkBrowserNotificationFactory(item);

    case MODULE_TYPES.feedback:
      return createFeedbackBrowserFactory(item);

    case MODULE_TYPES.schedule:
      NotificationEvent.emit('update_schedule_module');
      return createScheduleBrowserNotificationFactory(item);

    case MODULE_TYPES.project:
      NotificationEvent.emit('update_projects_module');
      return createProjectsBrowserNotificationFactory(item);

    case MODULE_TYPES.endomarketing:
      return createEndomarketingBrowserNotificationFactory(item);

    case MODULE_TYPES.evaluation360:
      return createEvaluationBrowserNotificationFactory(item);

    case MODULE_TYPES.organizational_engineering:
      return createOrganizationalEngineeringBrowserNotificationFactory(item);

    case MODULE_TYPES.personal_department:
      NotificationEvent.emit('update_personal_department_module');
      return createPersonalDepartmentBrowserNotificationFactory(item);

    case MODULE_TYPES.group:
      return createGroupBrowserNotificationFactory(item);

    case MODULE_TYPES.policy:
      return createPoliciesBrowserNotificationFactory(item);

    case MODULE_TYPES.okr:
      return createOKRBrowserNotificationFactory(item);

    default:
      break;
  }

  return null;
}
