import React, { useEffect, useState } from 'react';
import { INotificationProps } from '@/safira-app/interfaces/Notification';
import { reduceString } from '@/safira-app/utils/reduceString';
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
  HIRING_PENDING: 'HIRING_PENDING',
  HIRING_UPDATED: 'HIRING_UPDATED',
  HIRING_APPROVED: 'HIRING_APPROVED',
  HIRING_CANCELED: 'HIRING_CANCELED',
  HIRING_CANCELED_BY_CANDIDATE: 'HIRING_CANCELED_BY_CANDIDATE',
  HIRING_ACCEPTED_BY_CANDIDATE: 'HIRING_ACCEPTED_BY_CANDIDATE',
  HIRING_PENDING_DEADLINE: 'HIRING_PENDING_DEADLINE',
  NEW_HIRING: 'NEW_HIRING',
  DOCUMENT_REJECTED: 'DOCUMENT_REJECTED',
  FREE_NOTIFICATION: 'FREE_NOTIFICATION',
  NEW_DOCUMENT: 'NEW_DOCUMENT',
  CANCELED_SOLICITATION_DOCUMENT: 'CANCELED_SOLICITATION_DOCUMENT',
  NEW_SOLICITATION_DOCUMENT: 'NEW_SOLICITATION_DOCUMENT',
};

const PersonalDepartmentDropdownNotificationFactory: React.FC<React.PropsWithChildren<IProps>> = ({
  notificationItem,
}) => {
  // @ts-ignore
  const [notification] = useState(notificationItem);

  const renderActions = () => {
    switch (notificationItem.type) {
      case notificationType.HIRING_PENDING:
        return (
          <NotificationContainer
            url={`${links.web.personal_department}/user/received_documents/${notificationItem.common.hiring_id}`}
            notification={notificationItem}
          >
            <NotificationContentText notification={notification}>
              <NotificationHighlight>{notification.sender.name}</NotificationHighlight> precisa que você envie
              documentos faltantes para a continuidade da sua contratação.
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.HIRING_UPDATED:
        return (
          <NotificationContainer
            url={`${links.web.personal_department}/user/job_details/${notificationItem.common.hiring_id}`}
            notification={notificationItem}
          >
            <NotificationContentText notification={notification}>
              <NotificationHighlight>{notification.sender.name}</NotificationHighlight> modificou os dados de sua
              contratação. <NotificationHighlight>Clique para visualizar</NotificationHighlight>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.HIRING_APPROVED:
        return (
          <NotificationContainer
            url={`${links.web.personal_department}/user/job_details/${notificationItem.common.hiring_id}`}
            notification={notificationItem}
          >
            <NotificationContentText notification={notification}>
              <NotificationHighlight>{notification.sender.name}</NotificationHighlight> concluiu seu processo de
              contratação.{' '}
              <NotificationHighlight>"{reduceString(notification.common.content, 60)}"</NotificationHighlight>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.HIRING_CANCELED:
        return (
          <NotificationContainer
            url={`${links.web.personal_department}/user/job_details/${notificationItem.common.hiring_id}`}
            notification={notificationItem}
          >
            <NotificationContentText notification={notification}>
              <NotificationHighlight>{notification.sender.name}: </NotificationHighlight> "
              {reduceString(notification.common.content, 80)}"
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.HIRING_CANCELED_BY_CANDIDATE:
        return (
          <NotificationContainer
            url={`${links.web.personal_department}/hire/${notificationItem.common.hiring_id}`}
            notification={notificationItem}
          >
            <NotificationContentText notification={notification}>
              <NotificationHighlight>{notification.sender.name}: </NotificationHighlight> "
              {reduceString(notification.common.content, 80)}"
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.HIRING_ACCEPTED_BY_CANDIDATE:
        return (
          <NotificationContainer url={`${links.web.personal_department}/dashboard`} notification={notificationItem}>
            <NotificationContentText notification={notification}>
              <NotificationHighlight>{notification.sender.name}: </NotificationHighlight> Aceitou iniciar o processo de
              contratação como{' '}
              <NotificationHighlight>{reduceString(notification.common.content, 80)}</NotificationHighlight>{' '}
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.HIRING_PENDING_DEADLINE:
        return (
          <NotificationContainer
            url={`${links.web.personal_department}/user/job_details/${notificationItem.common.hiring_id}`}
            notification={notificationItem}
          >
            <NotificationContentText notification={notification}>
              O prazo limite para o cadastro de suas informações se encerra amanhã
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.NEW_HIRING:
        return (
          <NotificationContainer
            url={`${links.web.personal_department}/user/job_details/${notificationItem.common.hiring_id}`}
            notification={notificationItem}
          >
            <NotificationContentText notification={notification}>
              <NotificationHighlight>{notification.sender.name}</NotificationHighlight> deseja te contratar como
              colaborador. <NotificationHighlight>Clique aqui e verifique</NotificationHighlight>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.DOCUMENT_REJECTED:
        return (
          <NotificationContainer
            url={`${links.web.personal_department}/user/received_documents/${notificationItem.common.hiring_id}`}
            notification={notificationItem}
          >
            <NotificationContentText notification={notification}>
              <NotificationHighlight>{notification.sender.name}</NotificationHighlight> rejeitou o documento "
              <NotificationHighlight>{notification.common.document}</NotificationHighlight>
              ". <NotificationHighlight>Entre e cadastre novamente</NotificationHighlight>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.FREE_NOTIFICATION:
        return (
          <NotificationContainer url={links.web.personal_department} notification={notificationItem}>
            <NotificationContentText notification={notification}>
              <NotificationHighlight>{notification.sender.name}: </NotificationHighlight> "
              {reduceString(notification.common.content, 120)}"
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.NEW_DOCUMENT:
        return (
          <NotificationContainer url={links.web.personal_department} notification={notificationItem}>
            <NotificationContentText notification={notification}>
              <NotificationHighlight>{notification.sender.name} </NotificationHighlight> te enviou um documento
              referente à sua contratação
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.CANCELED_SOLICITATION_DOCUMENT:
        return (
          <NotificationContainer url={links.web.personal_department} notification={notificationItem}>
            <NotificationContentText notification={notification}>
              <NotificationHighlight>{notification.sender.name} </NotificationHighlight> cancelou a solicitação de um
              documento referente à sua contratação
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.NEW_SOLICITATION_DOCUMENT:
        return (
          <NotificationContainer url={links.web.personal_department} notification={notificationItem}>
            <NotificationContentText notification={notification}>
              <NotificationHighlight>{notification.sender.name} </NotificationHighlight> te solicitou um novo documento
              referente à sua contratação
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

export default PersonalDepartmentDropdownNotificationFactory;
