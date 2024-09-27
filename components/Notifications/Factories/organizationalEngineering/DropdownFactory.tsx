import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';

import NotificationModal from '@/safira-app/components/Notifications/Modals/NotificationModal/NotificationModal';
import { INotificationProps } from '@/safira-app/interfaces/Notification';
import { links } from '@/safira-app/config/links';

import {
  NotificationContainer,
  NotificationContentText,
  NotificationHighlight,
} from '../_abstract/NotificationAbstract';

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

const OrganizationalEngineeringDropdownNotificationFactory: React.FC<React.PropsWithChildren<IProps>> = ({
  notificationItem,
}) => {
  // @ts-ignore
  const [notification] = useState(notificationItem);

  function invitationStatus(slug: 'accepted' | 'refused' | 'pending') {
    if (slug === 'accepted') {
      return <small style={{ marginTop: 0, display: 'block' }}>Você aceitou a vinculação</small>;
    } else if (slug === 'refused') {
      return <small style={{ marginTop: 0, display: 'block' }}>Você recusou a vinculação</small>;
    } else if (slug === 'pending') {
      return <NotificationHighlight sx={{ display: 'block' }}>Clique para aceitar</NotificationHighlight>;
    } else {
      return <></>;
    }
  }

  const renderActions = () => {
    switch (notificationItem.type) {
      case notificationType.EMPLOYEE_LINK_REQUEST:
        return (
          <NotificationContainer
            url={`${links.web.core}/accept-vinculation/${notification.common.linking_code}/${notification.common.recipient_email}`}
            notification={notificationItem}
          >
            <NotificationContentText notification={notification}>
              <NotificationHighlight>{notification.sender.name}</NotificationHighlight> convidou você para vincular-se
              como colaborador.
              {invitationStatus(notification.common.status)}
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.EMPLOYEE_LINK_ANSWER:
        return (
          <NotificationContainer url={`${links.web.department}/#/collaborators`} notification={notificationItem}>
            <NotificationContentText notification={notification}>
              <NotificationHighlight>{notification?.sender?.name}</NotificationHighlight>{' '}
              {notification?.common?.content === 'ACCEPTED' ? 'aceitou' : 'recusou'} o convite de vinculação
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.EMPLOYEE_UNLINK:
        return (
          <NotificationContainer url="#" notification={notificationItem}>
            <NotificationContentText notification={notification}>
              Você foi desvinculado da empresa <NotificationHighlight>{notification.sender.name}</NotificationHighlight>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.EMPLOYEE_LINK_CANCELED:
        return (
          <NotificationModal
            openWhenParamsMatch
            notificationParams={{
              id: notification._id,
              type: notification.type,
            }}
            title={
              <Typography fontSize="16px" textAlign="center" color="#00558E">
                A empresa {notification.sender.name} cancelou o convite de vinculação
              </Typography>
            }
            content={
              <Typography fontSize="14px">
                O convite de vinculação profissional na InCicle enviado pela{' '}
                <NotificationHighlight sx={{ fontSize: '16px' }}>{notification.sender.name}</NotificationHighlight> foi
                cancelado pela própria empresa. Favor desconsiderar o convite enviado anteriormente.
              </Typography>
            }
            renderOpener={handleOpenModal => (
              <NotificationContainer notification={notificationItem} onClick={handleOpenModal}>
                <NotificationContentText notification={notification}>
                  A empresa <NotificationHighlight>{notification.sender.name}</NotificationHighlight> cancelou o convite
                  de vinculação
                </NotificationContentText>
              </NotificationContainer>
            )}
          />
        );

      case notificationType.CORPORATE_FEEDBACK:
        return (
          <NotificationContainer
            url={`${links.web.department}/collaborators/${notification.common.collaborator_id}`}
            notification={notificationItem}
          >
            <NotificationContentText notification={notification}>
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

export default OrganizationalEngineeringDropdownNotificationFactory;
