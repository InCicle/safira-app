import React, { useEffect } from 'react';

import { INotificationProps } from '@/safira-app/interfaces/Notification';

import {
  NotificationContainer,
  NotificationContentText,
  NotificationHighlight,
} from '../_abstract/ToastNotificationAbstract';

interface Props {
  notificationItem: INotificationProps;
}

const notificationType = {
  NEW_POLICY: 'NEW_POLICY',
  POLICY_REVIEW: 'POLICY_REVIEW',
};

const PoliciesToastNotificationFactory: React.FC<Props> = ({ notificationItem }) => {
  function renderActions() {
    switch (notificationItem.type) {
      case notificationType.NEW_POLICY:
        return (
          <NotificationContainer>
            <NotificationContentText>
              A empresa <NotificationHighlight>{notificationItem.sender.name}</NotificationHighlight> adicionou uma nova
              política
            </NotificationContentText>
          </NotificationContainer>
        );
      case notificationType.POLICY_REVIEW:
        return (
          <NotificationContainer>
            <NotificationContentText>
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

export default PoliciesToastNotificationFactory;
