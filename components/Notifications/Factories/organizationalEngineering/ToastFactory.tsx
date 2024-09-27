import React, { useEffect, useState } from 'react';
import {
  NotificationContainer,
  NotificationContentText,
  NotificationHighlight,
} from '../_abstract/ToastNotificationAbstract';
import { INotificationProps } from '@/safira-app/interfaces/Notification';

interface IProps {
  notificationItem: INotificationProps;
}

const notificationType = {
  EMPLOYEE_LINK_REQUEST: 'EMPLOYEE_LINK_REQUEST',
  EMPLOYEE_LINK_ANSWER: 'EMPLOYEE_LINK_ANSWER',
  EMPLOYEE_UNLINK: 'EMPLOYEE_UNLINK',
  EMPLOYEE_LINK_CANCELED: 'EMPLOYEE_LINK_CANCELED',
  CORPORATE_FEEDBACK: 'CORPORATE_FEEDBACK',
};

const OrganizationalEngineeringToastNotificationFactory: React.FC<React.PropsWithChildren<IProps>> = ({
  notificationItem,
}) => {
  // @ts-ignore
  const [notification] = useState(notificationItem);

  const renderActions = () => {
    switch (notificationItem.type) {
      case notificationType.EMPLOYEE_LINK_REQUEST:
        return (
          <NotificationContainer>
            <NotificationContentText>
              <NotificationHighlight>{notification.sender.name}</NotificationHighlight> convidou você para vincular-se
              como colaborador.
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.EMPLOYEE_LINK_ANSWER:
        return (
          <NotificationContainer>
            <NotificationContentText>
              <NotificationHighlight>{notification.sender.name}</NotificationHighlight>{' '}
              {notification.common.content === 'ACCEPTED' ? 'aceitou' : 'recusou'} o convite de vinculação
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.EMPLOYEE_UNLINK:
        return (
          <NotificationContainer>
            <NotificationContentText>
              Você foi desvinculado da empresa <NotificationHighlight>{notification.sender.name}</NotificationHighlight>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.EMPLOYEE_LINK_CANCELED:
        return (
          <NotificationContainer>
            <NotificationContentText>
              A empresa <NotificationHighlight>{notification.sender.name}</NotificationHighlight> cancelou o convite de
              vinculação
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.CORPORATE_FEEDBACK:
        return (
          <NotificationContainer>
            <NotificationContentText>
              <NotificationHighlight>{notification.sender.name}</NotificationHighlight> enviou um feedback que precisa
              da sua atenção.
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

export default OrganizationalEngineeringToastNotificationFactory;
