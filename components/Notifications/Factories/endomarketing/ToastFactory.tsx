import React, { useEffect, useState } from 'react';

import { INotificationProps } from '@/safira-app/interfaces/Notification';
import { reduceString } from '@/safira-app/utils/reduceString';

import {
  NotificationContainer,
  NotificationContentText,
  NotificationHighlight,
} from '../_abstract/ToastNotificationAbstract';

interface IProps {
  notificationItem: INotificationProps;
}

const notificationType = {
  ENDOMARKETING_COMMUNICATION: 'ENDOMARKETING_COMMUNICATION',
};

// @ts-ignore
const EndomarketingToastNotificationFactory: React.FC<React.PropsWithChildren<IProps>> = ({ notificationItem }) => {
  // @ts-ignore
  const [notification] = useState(notificationItem);

  const renderActions = () => {
    switch (notificationItem.type) {
      case notificationType.ENDOMARKETING_COMMUNICATION:
        return (
          <NotificationContainer>
            <NotificationContentText>
              Comunicado:{' '}
              <NotificationHighlight>"{reduceString(notification.common.content, 100)}"</NotificationHighlight>
            </NotificationContentText>
          </NotificationContainer>
        );

      default:
        return <></>;
    }
  };

  useEffect(() => {
    renderActions();
  }, [notification]); // eslint-disable-line
  return <React.Fragment>{renderActions()}</React.Fragment>;
};

export default EndomarketingToastNotificationFactory;
