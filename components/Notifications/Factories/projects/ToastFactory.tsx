import React from 'react';

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
  ADDED_IN_ACTIVITY: 'ADDED_IN_ACTIVITY',
  ADDED_IN_PROJECT: 'ADDED_IN_PROJECT',
  REMOVED_FROM_PROJECT: 'REMOVED_FROM_PROJECT',
  ACTIVITY_EXPIRATION: 'ACTIVITY_EXPIRATION',
  COMPLETED_ACTIVITY: 'COMPLETED_ACTIVITY',
  ACTIVITY_COMMENT_QUOTE: 'ACTIVITY_COMMENT_QUOTE',
  ACTIVITY_LATE: 'ACTIVITY_LATE',
  ADDED_IN_WORKSPACE: 'ADDED_IN_WORKSPACE',
  ADDED_ADMIN_IN_WORKSPACE: 'ADDED_ADMIN_IN_WORKSPACE',
  REMOVED_ADMIN_FROM_WORKSPACE: 'REMOVED_ADMIN_FROM_WORKSPACE',
  REMOVED_FROM_WORKSPACE: 'REMOVED_FROM_WORKSPACE',
};

const messageGroup = {
  ONE_WEEK: '1 semana',
  ONE_DAY: '1 dia',
  TWO_HOURS: '2 horas',
  ONE_HOUR: '1 hora',
  THIRTY_MINUTES: '30 minutos',
  FIFTEEN_MINUTES: '15 minutos',
};

const ProjectsToastNotificationFactory: React.FC<React.PropsWithChildren<Props>> = ({ notificationItem }) => {
  const { sender, common } = notificationItem;

  const renderActions = () => {
    switch (notificationItem.type) {
      case notificationType.ADDED_IN_ACTIVITY:
        return (
          <NotificationContainer>
            <NotificationContentText>
              <NotificationHighlight>{notificationItem.sender.name}</NotificationHighlight> adicionou você na atividade{' '}
              <NotificationHighlight>"{notificationItem.common.title_activity}"</NotificationHighlight> no projeto{' '}
              <NotificationHighlight>"{notificationItem.common.title_project}"</NotificationHighlight>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.ADDED_IN_PROJECT:
        return (
          <NotificationContainer>
            <NotificationContentText>
              <label>
                <NotificationHighlight>{notificationItem.sender.name}</NotificationHighlight> te adicionou no projeto{' '}
                <NotificationHighlight>"{notificationItem.common.title_project}"</NotificationHighlight>.
              </label>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.ACTIVITY_EXPIRATION:
        return (
          <NotificationContainer>
            <NotificationContentText>
              Sua atividade <NotificationHighlight>"{notificationItem.common.title_activity}"</NotificationHighlight> no
              projeto <NotificationHighlight>"{notificationItem.common.title_project}"</NotificationHighlight> vencerá
              em {messageGroup[notificationItem.common.activity_deadline]}.
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.REMOVED_FROM_PROJECT:
        return (
          <NotificationContainer>
            <NotificationContentText>
              <label>
                Você foi removido(a) do projeto{' '}
                <NotificationHighlight>{notificationItem.common.title_project}</NotificationHighlight>.
              </label>
            </NotificationContentText>
          </NotificationContainer>
        );
      case notificationType.COMPLETED_ACTIVITY:
        return (
          <NotificationContainer>
            <NotificationContentText>
              A atividade "<NotificationHighlight>{notificationItem.common?.title_activity}</NotificationHighlight>" foi
              marcada como concluída por <NotificationHighlight>{notificationItem.sender.name}</NotificationHighlight>
            </NotificationContentText>
          </NotificationContainer>
        );
      case notificationType.ACTIVITY_COMMENT_QUOTE:
        return (
          <NotificationContainer>
            <NotificationContentText>
              <NotificationHighlight>{notificationItem.sender.name}</NotificationHighlight> te marcou na atividade "
              <NotificationHighlight>{notificationItem.common?.title_activity}</NotificationHighlight>"
            </NotificationContentText>
          </NotificationContainer>
        );
      case notificationType.ACTIVITY_LATE:
        return (
          <NotificationContainer>
            <NotificationContentText>
              A atividade <NotificationHighlight>"{notificationItem.common?.title_activity}"</NotificationHighlight> do
              projeto <NotificationHighlight>"{notificationItem.common?.title_project}"</NotificationHighlight> está
              <NotificationHighlight sx={{ color: '#df4c4c' }}>atrasada</NotificationHighlight>
            </NotificationContentText>
          </NotificationContainer>
        );
      case notificationType.ADDED_IN_WORKSPACE:
        return (
          <NotificationContainer>
            <NotificationContentText>
              <NotificationHighlight>"{sender?.name}"</NotificationHighlight> te adicionou como membro da área de
              trabalho <NotificationHighlight>"{common?.title_workspace}"</NotificationHighlight>.
            </NotificationContentText>
          </NotificationContainer>
        );
      case notificationType.ADDED_ADMIN_IN_WORKSPACE:
        return (
          <NotificationContainer>
            <NotificationContentText>
              <NotificationHighlight>"{sender?.name}"</NotificationHighlight> te adicionou como administrador da área de
              trabalho <NotificationHighlight>"{common?.title_workspace}"</NotificationHighlight>.
            </NotificationContentText>
          </NotificationContainer>
        );
      case notificationType.REMOVED_FROM_WORKSPACE:
        return (
          <NotificationContainer>
            <NotificationContentText>
              Você foi removido da área de trabalho{' '}
              <NotificationHighlight>"{common?.title_workspace}"</NotificationHighlight>.
            </NotificationContentText>
          </NotificationContainer>
        );
      case notificationType.REMOVED_ADMIN_FROM_WORKSPACE:
        return (
          <NotificationContainer>
            <NotificationContentText>
              Você não é mais administrador da área de trabalho{' '}
              <NotificationHighlight>"{common?.title_workspace}"</NotificationHighlight>.
            </NotificationContentText>
          </NotificationContainer>
        );
      default:
        return <></>;
    }
  };

  return <React.Fragment>{renderActions()}</React.Fragment>;
};

export default ProjectsToastNotificationFactory;
