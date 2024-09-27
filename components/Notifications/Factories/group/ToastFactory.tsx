import React, { useEffect } from 'react';
import { INotificationProps } from '@/safira-app/interfaces/Notification';
import { reduceString } from '@/safira-app/utils/reduceString';

import {
  NotificationContainer,
  NotificationContentText,
  NotificationHighlight,
} from '../_abstract/ToastNotificationAbstract';
import { getGroupType } from '@/safira-app/utils/getGroupType';

interface IProps {
  notificationItem: INotificationProps;
}

const notificationType = {
  USER_GRANT_ADMIN_TO_GROUP: 'USER_GRANT_ADMIN_TO_GROUP',
  GROUP_INVITE: 'GROUP_INVITE',
  GROUP_COMMUNICATION: 'GROUP_COMMUNICATION',
  USER_ADDED_TO_GROUP: 'USER_ADDED_TO_GROUP',
  USER_REQUEST_ENTRY_TO_GROUP: 'USER_REQUEST_ENTRY_TO_GROUP',
  BECAME_GROUP_MEMBER: 'BECAME_GROUP_MEMBER',
  USER_KICKED_FROM_GROUP: 'USER_KICKED_FROM_GROUP',
  USER_REVOKE_ADMIN_ON_GROUP: 'USER_REVOKE_ADMIN_ON_GROUP',
  GROUP_PUBLICATION_TYPE_COMMENT: 'GROUP_PUBLICATION_TYPE_COMMENT',
  GROUP_PUBLICATION_TYPE_SHARE: 'GROUP_PUBLICATION_TYPE_SHARE',
  GROUP_PUBLICATION_TYPE_COMMENT_OF_COMMENT: 'GROUP_PUBLICATION_TYPE_COMMENT_OF_COMMENT',
  GROUP_TYPE_CHANGED: 'GROUP_TYPE_CHANGED',
  GROUP_DELETED: 'GROUP_DELETED',
};

// @ts-ignore
const GroupToastNotificationFactory: React.FC<React.PropsWithChildren<IProps>> = ({ notificationItem }) => {
  const renderActions = () => {
    switch (notificationItem.type) {
      case notificationType.USER_GRANT_ADMIN_TO_GROUP:
        return (
          <NotificationContainer>
            <NotificationContentText>
              Você agora é administrador do grupo{' '}
              <NotificationHighlight>{reduceString(notificationItem.common.group_name, 30)}</NotificationHighlight>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.GROUP_INVITE:
        return (
          <NotificationContainer>
            <NotificationContentText>
              <NotificationHighlight>{notificationItem.sender.name}</NotificationHighlight> convidou você para
              participar do grupo{' '}
              <NotificationHighlight>{reduceString(notificationItem.common.group_name, 30)}</NotificationHighlight>.
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.GROUP_COMMUNICATION:
        return (
          <NotificationContainer>
            <NotificationContentText>
              <NotificationHighlight>{notificationItem.sender.name}</NotificationHighlight> criou um comunicado no grupo{' '}
              <NotificationHighlight>{reduceString(notificationItem.common.group_name, 30)}</NotificationHighlight>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.USER_ADDED_TO_GROUP:
        return (
          <NotificationContainer>
            <NotificationContentText>
              <NotificationHighlight>{notificationItem.sender.name}</NotificationHighlight> incluiu você no grupo{' '}
              <NotificationHighlight>{reduceString(notificationItem.common.group_name, 30)}</NotificationHighlight>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.USER_REQUEST_ENTRY_TO_GROUP:
        return (
          <NotificationContainer>
            <NotificationContentText>
              <NotificationHighlight>{notificationItem.sender.name} </NotificationHighlight>
              solicitou para entrar no grupo{' '}
              <NotificationHighlight>{reduceString(notificationItem.common.group_name, 30)}</NotificationHighlight>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.BECAME_GROUP_MEMBER:
        return (
          <NotificationContainer>
            {notificationItem.sender.type === 'company' && notificationItem.common.member_type === 'ADMIN' ? (
              <NotificationContentText>
                <NotificationHighlight>{notificationItem.sender.name} </NotificationHighlight>
                te nomeou administrador do grupo{' '}
                <NotificationHighlight>{reduceString(notificationItem.common.group_name, 30)}</NotificationHighlight>
              </NotificationContentText>
            ) : (
              <NotificationContentText>
                Você foi aceito para ser membro do grupo{' '}
                <NotificationHighlight>{reduceString(notificationItem.common.group_name, 30)}</NotificationHighlight>
              </NotificationContentText>
            )}
          </NotificationContainer>
        );

      case notificationType.USER_KICKED_FROM_GROUP:
        return (
          <NotificationContainer>
            <NotificationContentText>
              Você foi removido do grupo{' '}
              <NotificationHighlight>{reduceString(notificationItem.common.group_name, 30)}</NotificationHighlight>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.USER_REVOKE_ADMIN_ON_GROUP:
        return (
          <NotificationContainer>
            <NotificationContentText>
              Você não é mais administrador do grupo{' '}
              <NotificationHighlight>{reduceString(notificationItem.common.group_name, 30)}</NotificationHighlight>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.GROUP_PUBLICATION_TYPE_COMMENT:
        return (
          <NotificationContainer>
            <NotificationContentText>
              <NotificationHighlight>{notificationItem.sender.name}</NotificationHighlight> comentou uma publicação no
              grupo{' '}
              <NotificationHighlight>{reduceString(notificationItem.common.group_name, 30)}</NotificationHighlight>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.GROUP_PUBLICATION_TYPE_SHARE:
        return (
          <NotificationContainer>
            <NotificationContentText>
              <NotificationHighlight>{notificationItem.sender.name}</NotificationHighlight> compartilhou uma publicação
              no grupo{' '}
              <NotificationHighlight>{reduceString(notificationItem.common.group_name, 30)}</NotificationHighlight>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.GROUP_PUBLICATION_TYPE_COMMENT_OF_COMMENT:
        return (
          <NotificationContainer>
            <NotificationContentText>
              <NotificationHighlight>{notificationItem.sender.name}</NotificationHighlight> comentou em um comentário do
              grupo{' '}
              <NotificationHighlight>{reduceString(notificationItem.common.group_name, 30)}</NotificationHighlight>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.GROUP_TYPE_CHANGED:
        return (
          <NotificationContainer>
            <NotificationContentText>
              O grupo{' '}
              <NotificationHighlight>{reduceString(notificationItem.common.group_name, 30)}</NotificationHighlight> que
              você participa mudou seu tipo de{' '}
              <NotificationHighlight>{getGroupType(notificationItem.common.old_type)}</NotificationHighlight> para{' '}
              <NotificationHighlight>{getGroupType(notificationItem.common.new_type)}</NotificationHighlight>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.GROUP_DELETED:
        return (
          <NotificationContainer>
            <NotificationContentText>
              O grupo{' '}
              <NotificationHighlight>{reduceString(notificationItem.common.group_name, 30)}</NotificationHighlight> que
              você participava foi excluído
            </NotificationContentText>
          </NotificationContainer>
        );

      default:
        return <></>;
    }
  };

  useEffect(() => {
    renderActions();
  }, [notificationItem]); // eslint-disable-line

  return <React.Fragment>{renderActions()}</React.Fragment>;
};

export default GroupToastNotificationFactory;
