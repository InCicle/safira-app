import React, { useEffect, useState } from 'react';

import { NotificationProps } from 'safira-app/services/notifications';
import { links } from 'safira-app/config/links';
import { reduceString } from 'safira-app/utils/reduceString';

import {
  NotificationContainer,
  NotificationContentText,
  NotificationHighlight,
} from '../_abstract/NotificationAbstract';

interface IProps {
  notificationItem: NotificationProps;
}

const notificationType = {
  ENDOMARKETING_COMMUNICATION: 'ENDOMARKETING_COMMUNICATION',
};

// @ts-ignore
const EndomarketingDropdownNotificationFactory: React.FC<React.PropsWithChildren<IProps>> = ({ notificationItem }) => {
  // @ts-ignore
  const [notification] = useState(notificationItem);

  const renderActions = () => {
    switch (notificationItem.type) {
      case notificationType.ENDOMARKETING_COMMUNICATION:
        return (
          <NotificationContainer
            url={`${links.web.social}/publication/${notification.common.publication_id}`}
            notification={notificationItem}
          >
            <NotificationContentText notification={notification}>
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

export default EndomarketingDropdownNotificationFactory;
