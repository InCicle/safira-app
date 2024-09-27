import React, { useEffect } from 'react';

import { INotificationProps } from '@/safira-app/interfaces/Notification';
import { useHeaderProvider } from '@/safira-app/contexts/HeaderContext';
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
  PUBLICATION_TYPE_LIKE: 'PUBLICATION_TYPE_LIKE',
  PUBLICATION_TYPE_COMMENT: 'PUBLICATION_TYPE_COMMENT',
  PUBLICATION_TYPE_COMMENT_OF_COMMENT: 'PUBLICATION_TYPE_COMMENT_OF_COMMENT',
  PUBLICATION_TYPE_LIKE_COMMENT: 'PUBLICATION_TYPE_LIKE_COMMENT',
  PUBLICATION_TYPE_SHARE: 'PUBLICATION_TYPE_SHARE',
  NEW_FRIEND_REQUEST: 'NEW_FRIEND_REQUEST',
  NEW_FRIEND_RESPONSE: 'NEW_FRIEND_RESPONSE',
  NEW_RECOMMENDATION_REQUEST: 'NEW_RECOMMENDATION_REQUEST',
  NEW_RECOMMENDATION_RECEIVED: 'NEW_RECOMMENDATION_RECEIVED',
  ANSWERED_REQUEST_RECOMMENDATION: 'ANSWERED_REQUEST_RECOMMENDATION',
  BIRTHDAYS_TODAY: 'BIRTHDAYS_TODAY',
  GROUP_PUBLICATION_TYPE_LIKE: 'GROUP_PUBLICATION_TYPE_LIKE',
  GROUP_PUBLICATION_TYPE_LIKE_COMMENT: 'GROUP_PUBLICATION_TYPE_LIKE_COMMENT',
  GROUP_PUBLICATION_REMOVED: 'GROUP_PUBLICATION_REMOVED',
  GROUP_PUBLICATION_COMMENT_REMOVED: 'GROUP_PUBLICATION_COMMENT_REMOVED',
};

// @ts-ignore
const SocialNetworkToastNotificationFactory: React.FC<React.PropsWithChildren<IProps>> = ({ notificationItem }) => {
  const { profiles: profile } = useHeaderProvider();

  const renderActions = () => {
    switch (notificationItem.type) {
      case notificationType.NEW_FRIEND_REQUEST:
        return (
          <NotificationContainer>
            <NotificationContentText>
              <label>
                <label style={{ textTransform: 'capitalize' }}>{notificationItem.sender.name}</label> te enviou uma
                solicitação de amizade.
              </label>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.PUBLICATION_TYPE_LIKE:
      case notificationType.PUBLICATION_TYPE_COMMENT:
      case notificationType.PUBLICATION_TYPE_SHARE:
        return (
          <NotificationContainer>
            <NotificationContentText>
              <label>
                <NotificationHighlight>{notificationItem.sender.name}</NotificationHighlight>
                {notificationItem.type === notificationType.PUBLICATION_TYPE_LIKE && ' gostou da '}
                {notificationItem.type === notificationType.PUBLICATION_TYPE_COMMENT && ' comentou na '}
                {notificationItem.type === notificationType.PUBLICATION_TYPE_SHARE && ' compartilhou '}
                sua publicação
                {notificationItem.common.content && (
                  <>
                    : "
                    <NotificationHighlight>{reduceString(notificationItem.common.content, 60)}</NotificationHighlight>"
                  </>
                )}
              </label>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.NEW_RECOMMENDATION_REQUEST:
      case notificationType.NEW_RECOMMENDATION_RECEIVED:
      case notificationType.ANSWERED_REQUEST_RECOMMENDATION:
        return (
          <NotificationContainer>
            <NotificationContentText>
              <label>
                <NotificationHighlight>{notificationItem.sender.name}</NotificationHighlight>
                {notificationItem.type === notificationType.NEW_RECOMMENDATION_REQUEST &&
                  ' solicitou para você uma recomendação'}
                {notificationItem.type === notificationType.NEW_RECOMMENDATION_RECEIVED && (
                  <>
                    {' '}
                    fez uma recomendação sobre você:{' '}
                    <NotificationHighlight>"{reduceString(notificationItem.common.content, 55)}"</NotificationHighlight>
                  </>
                )}
                {notificationItem.type === notificationType.ANSWERED_REQUEST_RECOMMENDATION && (
                  <>
                    {' '}
                    respondeu um pedido de recomendação sobre você:{' '}
                    <NotificationHighlight>"{reduceString(notificationItem.common.content, 55)}"</NotificationHighlight>
                  </>
                )}
              </label>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.PUBLICATION_TYPE_LIKE_COMMENT:
        return (
          <NotificationContainer>
            <NotificationContentText>
              <NotificationHighlight>{notificationItem.sender.name}</NotificationHighlight>
              {' gostou do seu comentário'}{' '}
              {notificationItem.common.publication_owner_id === profile?.profile_id ? (
                ' na sua publicação '
              ) : (
                <>
                  na publicação de{' '}
                  <NotificationHighlight>{notificationItem.common.publication_owner_name}, </NotificationHighlight>
                </>
              )}
              <NotificationHighlight>"{reduceString(notificationItem.common.content, 35)}"</NotificationHighlight>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.PUBLICATION_TYPE_COMMENT_OF_COMMENT:
        return (
          <NotificationContainer>
            <NotificationContentText>
              <NotificationHighlight>{notificationItem.sender.name} </NotificationHighlight>
              respondeu seu comentário{' '}
              {notificationItem.common.publication_owner_id === profile?.profile_id ? (
                'na sua publicação'
              ) : (
                <>
                  na publicação de{' '}
                  <NotificationHighlight>{notificationItem.common.publication_owner_name}</NotificationHighlight>:{' '}
                  <NotificationHighlight>"{reduceString(notificationItem.common.content, 35)}"</NotificationHighlight>
                </>
              )}
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.NEW_FRIEND_RESPONSE:
        return (
          <NotificationContainer>
            <NotificationContentText>
              <label>
                <label style={{ textTransform: 'capitalize' }}>{notificationItem.sender.name}</label>
                {' aceitou seu pedido de amizade'}
              </label>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.BIRTHDAYS_TODAY:
        return (
          <NotificationContainer>
            <NotificationContentText>
              <NotificationHighlight>{notificationItem.sender.name}</NotificationHighlight> está fazendo aniversário
              hoje!
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.GROUP_PUBLICATION_TYPE_LIKE:
        return (
          <NotificationContainer>
            <NotificationContentText>
              <NotificationHighlight>{notificationItem.sender.name}</NotificationHighlight> curtiu uma publicação no
              grupo{' '}
              <NotificationHighlight>{reduceString(notificationItem.common.group_name, 30)}</NotificationHighlight>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.GROUP_PUBLICATION_TYPE_LIKE_COMMENT:
        return (
          <NotificationContainer>
            <NotificationContentText>
              <NotificationHighlight>{notificationItem.sender.name}</NotificationHighlight> curtiu um comentário no
              grupo{' '}
              <NotificationHighlight>{reduceString(notificationItem.common.group_name, 30)}</NotificationHighlight>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.GROUP_PUBLICATION_REMOVED:
        return (
          <NotificationContainer>
            <NotificationContentText>
              Um administrador do grupo removeu sua publicação:{' '}
              <NotificationHighlight>{reduceString(notificationItem.common.content, 60)}</NotificationHighlight>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.GROUP_PUBLICATION_COMMENT_REMOVED:
        return (
          <NotificationContainer>
            <NotificationContentText>
              Um administrador do grupo removeu seu comentário:{' '}
              <NotificationHighlight>{reduceString(notificationItem.common.content, 60)}</NotificationHighlight>
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

export default SocialNetworkToastNotificationFactory;
