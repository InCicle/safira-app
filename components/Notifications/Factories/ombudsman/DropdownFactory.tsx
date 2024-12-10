import React, { useEffect } from 'react';
import { NotificationProps } from 'safira-app/services/notifications';
import { links } from 'safira-app/config/links';

import {
  NotificationContainer,
  NotificationContentText,
  NotificationHighlight,
} from '../_abstract/NotificationAbstract';
import { getStatus } from 'safira-app/utils/getStatus';

interface Props {
  notificationItem: NotificationProps;
}

const notificationType = {
  TICKET_RECEIVED: 'TICKET_RECEIVED',
  TICKET_CHANGE_STATUS: 'TICKET_CHANGE_STATUS',
  TICKET_NEW_MESSAGE: 'TICKET_NEW_MESSAGE',
};

const OmbudsmanDropdownNotificationFactory: React.FC<Props> = ({ notificationItem }) => {
  function renderActions() {
    switch (notificationItem.type) {
      case notificationType.TICKET_RECEIVED:
        return (
          <NotificationContainer
            url={`${links.web.ombudsman}/#/dashboard/communications/${notificationItem.common.ticket_id}`}
            notification={notificationItem}
          >
            <NotificationContentText notification={notificationItem}>
              Nova comunicação recebida:{' '}
              <NotificationHighlight>{notificationItem.common.ticket_name}</NotificationHighlight>
            </NotificationContentText>
          </NotificationContainer>
        );
      case notificationType.TICKET_CHANGE_STATUS:
        return (
          <NotificationContainer
            url={`${links.web.ombudsman}/#/dashboard/communications/${notificationItem.common.ticket_id}`}
            notification={notificationItem}
          >
            <NotificationContentText notification={notificationItem}>
              O status da sua comunicação com a{' '}
              <NotificationHighlight>{notificationItem.sender.name}</NotificationHighlight> foi atualizado para{' '}
              <NotificationHighlight>{getStatus(notificationItem.common.ticket_status)}</NotificationHighlight>
            </NotificationContentText>
          </NotificationContainer>
        );
      case notificationType.TICKET_NEW_MESSAGE:
        return (
          <NotificationContainer
            url={`${links.web.ombudsman}/#/dashboard/communications/${notificationItem.common.ticket_id}`}
            notification={notificationItem}
          >
            <NotificationContentText notification={notificationItem}>
              Uma nova mensagem foi enviada sobre a comunicação{' '}
              <NotificationHighlight>{notificationItem.common.ticket_name}</NotificationHighlight>
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

export default OmbudsmanDropdownNotificationFactory;
