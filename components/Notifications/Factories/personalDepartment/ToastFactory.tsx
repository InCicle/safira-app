import React, { useEffect, useState } from 'react';

import { reduceString } from '@/safira-app/utils/reduceString';
import { INotificationProps } from '@/safira-app/interfaces/Notification';

import {
  NotificationContainer,
  NotificationContentText,
  NotificationHighlight,
} from '../_abstract/ToastNotificationAbstract';

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

const PersonalDepartmentToastNotificationFactory: React.FC<React.PropsWithChildren<IProps>> = ({
  notificationItem,
}) => {
  // @ts-ignore
  const [notification] = useState(notificationItem);

  const renderActions = () => {
    switch (notificationItem.type) {
      case notificationType.HIRING_PENDING:
        return (
          <NotificationContainer>
            <NotificationContentText>
              <NotificationHighlight>{notification.sender.name}</NotificationHighlight> precisa que você envie
              documentos faltantes para a continuidade da sua contratação.
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.HIRING_UPDATED:
        return (
          <NotificationContainer>
            <NotificationContentText>
              <NotificationHighlight>{notification.sender.name}</NotificationHighlight> modificou os dados de sua
              contratação. <NotificationHighlight>Clique para visualizar</NotificationHighlight>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.HIRING_APPROVED:
        return (
          <NotificationContainer>
            <NotificationContentText>
              <NotificationHighlight>{notification.sender.name}</NotificationHighlight> concluiu seu processo de
              contratação.{' '}
              <NotificationHighlight>"{reduceString(notification.common.content, 60)}"</NotificationHighlight>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.HIRING_CANCELED:
        return (
          <NotificationContainer>
            <NotificationContentText>
              <NotificationHighlight>{notification.sender.name}: </NotificationHighlight> "
              {reduceString(notification.common.content, 80)}"
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.HIRING_CANCELED_BY_CANDIDATE:
        return (
          <NotificationContainer>
            <NotificationContentText>
              <NotificationHighlight>{notification.sender.name}: </NotificationHighlight> "
              {reduceString(notification.common.content, 80)}"
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.HIRING_ACCEPTED_BY_CANDIDATE:
        return (
          <NotificationContainer>
            <NotificationContentText>
              <NotificationHighlight>{notification.sender.name}: </NotificationHighlight> Aceitou iniciar o processo de
              contratação como{' '}
              <NotificationHighlight>{reduceString(notification.common.content, 80)}</NotificationHighlight>{' '}
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.HIRING_PENDING_DEADLINE:
        return (
          <NotificationContainer>
            <NotificationContentText>
              O prazo limite para o cadastro de suas informações se encerra amanhã
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.NEW_HIRING:
        return (
          <NotificationContainer>
            <NotificationContentText>
              <NotificationHighlight>{notification.sender.name}</NotificationHighlight> deseja te contratar como
              colaborador.
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.DOCUMENT_REJECTED:
        return (
          <NotificationContainer>
            <NotificationContentText>
              <NotificationHighlight>{notification.sender.name}</NotificationHighlight> rejeitou o documento "
              <NotificationHighlight>{notification.common.document}</NotificationHighlight>
              ".
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.FREE_NOTIFICATION:
        return (
          <NotificationContainer>
            <NotificationContentText>
              <NotificationHighlight>{notification.sender.name}: </NotificationHighlight> "
              {reduceString(notification.common.content, 120)}"
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.NEW_DOCUMENT:
        return (
          <NotificationContainer>
            <NotificationContentText>
              <NotificationHighlight>{notification.sender.name}</NotificationHighlight> te enviou um documento referente
              à sua contratação
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.CANCELED_SOLICITATION_DOCUMENT:
        return (
          <NotificationContainer>
            <NotificationContentText>
              <NotificationHighlight>{notification.sender.name} </NotificationHighlight> cancelou a solicitação de um
              documento referente à sua contratação
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.NEW_SOLICITATION_DOCUMENT:
        return (
          <NotificationContainer>
            <NotificationContentText>
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

export default PersonalDepartmentToastNotificationFactory;
