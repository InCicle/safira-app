import React, { useEffect } from 'react';

import { INotificationProps } from '@/safira-app/interfaces/Notification';
import { useHeaderProvider } from '@/safira-app/contexts/HeaderContext';
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
const SocialNetworkDropdownNotificationFactory: React.FC<React.PropsWithChildren<IProps>> = ({
  notificationItem: notification,
}) => {
  const { profiles: profile } = useHeaderProvider();

  const renderActions = () => {
    switch (notification.type) {
      case notificationType.NEW_FRIEND_REQUEST:
        return (
          <NotificationContainer
            url={`${links.web.social}/p/${notification.sender.username}`}
            notification={notification}
          >
            <NotificationContentText notification={notification}>
              <label>
                <label style={{ textTransform: 'capitalize' }}>{notification.sender.name}</label> te enviou uma
                solicitação de amizade.
              </label>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.PUBLICATION_TYPE_LIKE:
      case notificationType.PUBLICATION_TYPE_SHARE:
        return (
          <NotificationContainer
            url={`${links.web.social}/publication/${notification.common.publication_id}`}
            notification={notification}
          >
            <NotificationContentText notification={notification}>
              <label>
                <NotificationHighlight>{notification.sender.name}</NotificationHighlight>
                {notification.type === notificationType.PUBLICATION_TYPE_LIKE && ' gostou da '}
                {notification.type === notificationType.PUBLICATION_TYPE_SHARE && ' compartilhou '}
                sua publicação
                {notification.common.content && (
                  <>
                    : "<NotificationHighlight>{reduceString(notification.common.content, 60)}</NotificationHighlight>"
                  </>
                )}
              </label>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.PUBLICATION_TYPE_COMMENT:
        return (
          <NotificationContainer
            url={`${links.web.social}/publication/${notification.common.publication_id}/comment/${notification.common.comment_id}`}
            notification={notification}
          >
            <NotificationContentText notification={notification}>
              <label>
                <NotificationHighlight>{notification.sender.name}</NotificationHighlight> comentou na sua publicação
                {notification.common.content && (
                  <>
                    : <NotificationHighlight>"{reduceString(notification.common.content, 60)}"</NotificationHighlight>
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
          <NotificationContainer
            url={`${links.web.social}/p/${
              notification.type !== notificationType.NEW_RECOMMENDATION_RECEIVED
                ? profile?.username
                : notification.sender.username
            }?request_id=${notification.common.request_recommendation_id}&action=open_recommendation_modal`}
            notification={notification}
          >
            <NotificationContentText notification={notification}>
              <label>
                <NotificationHighlight>{notification.sender.name}</NotificationHighlight>
                {notification.type === notificationType.NEW_RECOMMENDATION_REQUEST &&
                  ' solicitou para você uma recomendação'}
                {notification.type === notificationType.NEW_RECOMMENDATION_RECEIVED && (
                  <>
                    {' '}
                    fez uma recomendação sobre você:{' '}
                    <NotificationHighlight>"{reduceString(notification.common.content, 55)}"</NotificationHighlight>
                  </>
                )}
                {notification.type === notificationType.ANSWERED_REQUEST_RECOMMENDATION && (
                  <>
                    {' '}
                    respondeu um pedido de recomendação sobre você:{' '}
                    <NotificationHighlight>"{reduceString(notification.common.content, 55)}"</NotificationHighlight>
                  </>
                )}
              </label>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.PUBLICATION_TYPE_LIKE_COMMENT:
        return (
          <NotificationContainer
            url={`${links.web.social}/publication/${notification.common.publication_id}/comment/${notification.common.comment_id}`}
            notification={notification}
          >
            <NotificationContentText notification={notification}>
              <NotificationHighlight>{notification.sender.name}</NotificationHighlight>
              {' gostou do seu comentário'}{' '}
              {notification.common.publication_owner_id === profile?.profile_id ? (
                ' na sua publicação '
              ) : (
                <>
                  na publicação de{' '}
                  <NotificationHighlight>{notification.common.publication_owner_name}, </NotificationHighlight>
                </>
              )}
              <NotificationHighlight>"{reduceString(notification.common.content, 35)}"</NotificationHighlight>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.PUBLICATION_TYPE_COMMENT_OF_COMMENT:
        return (
          <NotificationContainer
            url={`${links.web.social}/publication/${notification.common.publication_id}/comment_of_comment/${notification.common.comment_id}`}
            notification={notification}
          >
            <NotificationContentText notification={notification}>
              <NotificationHighlight>{notification.sender.name} </NotificationHighlight>
              respondeu seu comentário{' '}
              {notification.common.publication_owner_id === profile?.profile_id ? (
                'na sua publicação'
              ) : (
                <>
                  na publicação de{' '}
                  <NotificationHighlight>{notification.common.publication_owner_name}</NotificationHighlight>:{' '}
                  <NotificationHighlight>"{reduceString(notification.common.content, 35)}"</NotificationHighlight>
                </>
              )}
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.NEW_FRIEND_RESPONSE:
        return (
          <NotificationContainer
            url={`${links.web.social}/p/${notification.sender.username}`}
            notification={notification}
          >
            <NotificationContentText notification={notification}>
              <label>
                <label style={{ textTransform: 'capitalize' }}>{notification.sender.name}</label>
                {' aceitou seu pedido de amizade'}
              </label>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.BIRTHDAYS_TODAY:
        return (
          <NotificationContainer
            url={`${links.web.social}/p/${notification.sender.username}`}
            notification={notification}
          >
            <NotificationContentText notification={notification}>
              <NotificationHighlight>{notification.sender.name}</NotificationHighlight> está fazendo aniversário hoje!
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.GROUP_PUBLICATION_TYPE_LIKE:
        return (
          <NotificationContainer
            url={`${links.web.social}/group/${notification.common.group_id}/publication/${notification.common.publication_id}`}
            notification={notification}
          >
            <NotificationContentText notification={notification}>
              <NotificationHighlight>{notification.sender.name}</NotificationHighlight> curtiu uma publicação no grupo{' '}
              <NotificationHighlight>{reduceString(notification.common.group_name, 30)}</NotificationHighlight>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.GROUP_PUBLICATION_TYPE_LIKE_COMMENT:
        return (
          <NotificationContainer
            url={`${links.web.social}/group/${notification.common.group_id}/publication/${notification.common.publication_id}`}
            notification={notification}
          >
            <NotificationContentText notification={notification}>
              <NotificationHighlight>{notification.sender.name}</NotificationHighlight> curtiu um comentário no grupo{' '}
              <NotificationHighlight>{reduceString(notification.common.group_name, 30)}</NotificationHighlight>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.GROUP_PUBLICATION_REMOVED:
        return (
          <NotificationContainer
            url={`${links.web.social}/group/${notification.common.group_id}/home`}
            notification={notification}
          >
            <NotificationContentText notification={notification}>
              Um administrador do grupo removeu sua publicação:{' '}
              <NotificationHighlight>{reduceString(notification.common.content, 60)}</NotificationHighlight>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.GROUP_PUBLICATION_COMMENT_REMOVED:
        return (
          <NotificationContainer
            url={`${links.web.social}/group/${notification.common.group_id}/publication/${notification.common.publication_id}`}
            notification={notification}
          >
            <NotificationContentText notification={notification}>
              Um administrador do grupo removeu seu comentário:{' '}
              <NotificationHighlight>{reduceString(notification.common.content, 60)}</NotificationHighlight>
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

export default SocialNetworkDropdownNotificationFactory;
