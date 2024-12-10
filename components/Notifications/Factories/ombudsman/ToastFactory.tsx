import React, { useEffect, useState } from 'react';

import { NotificationProps } from 'safira-app/services/notifications';
import { reduceString } from 'safira-app/utils/reduceString';

import {
  NotificationContainer,
  NotificationContentText,
  NotificationHighlight,
} from '../_abstract/ToastNotificationAbstract';
import { getStatus } from 'safira-app/utils/getStatus';

interface IProps {
  notificationItem: NotificationProps;
}

const notificationType = {
  TICKET_RECEIVED: 'TICKET_RECEIVED',
  TICKET_CHANGE_STATUS: 'TICKET_CHANGE_STATUS',
  TICKET_NEW_MESSAGE: 'TICKET_NEW_MESSAGE',
};

const OmbudsmanToastNotificationFactory: React.FC<React.PropsWithChildren<IProps>> = ({ notificationItem }) => {
  const [notification] = useState(notificationItem);

  const createNotificationMessage = (notification: NotificationProps): string => {
    const { common } = notification;

    switch (notification.type) {
      case notificationType.TICKET_RECEIVED:
        return `Nova comunicação recebida: ${reduceString(common.content || '', 50)}`;
      case notificationType.TICKET_CHANGE_STATUS:
        return `O status da sua comunicação com a ${common.company_name} foi atualizado para ${getStatus(
          common.new_status,
        )}`;
      case notificationType.TICKET_NEW_MESSAGE:
        return `Uma nova mensagem foi enviada sobre a comunicação ${common.communication_id}`;
      default:
        return '';
    }
  };

  const getNotificationAction = (notification: NotificationProps): string => {
    switch (notification.type) {
      case notificationType.TICKET_RECEIVED:
        return 'Levará para a visualização da comunicação';
      case notificationType.TICKET_CHANGE_STATUS:
      case notificationType.TICKET_NEW_MESSAGE:
        return 'Levará o usuário para a tela da comunicação';
      default:
        return '';
    }
  };

  const renderActions = () => {
    const message = createNotificationMessage(notification);
    const action = getNotificationAction(notification);

    return (
      <NotificationContainer>
        <NotificationContentText>
          <NotificationHighlight>{message}</NotificationHighlight>
          <br />
          <small>{action}</small>
        </NotificationContentText>
      </NotificationContainer>
    );
  };

  useEffect(() => {
    renderActions();
  }, [notification]); // eslint-disable-line

  return <React.Fragment>{renderActions()}</React.Fragment>;
};

export default OmbudsmanToastNotificationFactory;
