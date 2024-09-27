import React, { useEffect } from 'react';

import { INotificationProps } from '@/safira-app/interfaces/Notification';
import { links } from '@/safira-app/config/links';

import {
  NotificationContainer,
  NotificationContentText,
  NotificationHighlight,
} from '../_abstract/NotificationAbstract';

interface Props {
  notificationItem: INotificationProps;
}

const notificationType = {
  NEW_POLICY: 'NEW_POLICY',
  POLICY_REVIEW: 'POLICY_REVIEW',
};

const PoliciesDropdownNotificationFactory: React.FC<Props> = ({ notificationItem }) => {
  function renderActions() {
    switch (notificationItem.type) {
      case notificationType.NEW_POLICY:
        return (
          <NotificationContainer
            url={`${links.web.social}/publication/${notificationItem.common.publication_id}`}
            notification={notificationItem}
          >
            <NotificationContentText notification={notificationItem}>
              A empresa <NotificationHighlight>{notificationItem.sender.name}</NotificationHighlight> adicionou uma nova
              política
            </NotificationContentText>
          </NotificationContainer>
        );
      case notificationType.POLICY_REVIEW:
        return (
          <NotificationContainer
            url={`${links.web.social}/publication/${notificationItem.common.publication_id}`}
            notification={notificationItem}
          >
            <NotificationContentText notification={notificationItem}>
              A empresa <NotificationHighlight>{notificationItem.sender.name}</NotificationHighlight> publicou uma nova
              revisão de política
            </NotificationContentText>
          </NotificationContainer>
        );
      default:
        return <></>;
    }
  }

  useEffect(() => {
    renderActions();
  }, [notificationItem]); // eslint-disable-line

  return <React.Fragment>{renderActions()}</React.Fragment>;
};

export default PoliciesDropdownNotificationFactory;
