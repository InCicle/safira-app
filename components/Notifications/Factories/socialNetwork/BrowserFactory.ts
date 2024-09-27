import Cookies from 'js-cookie';
import { IUser } from '@/safira-app/interfaces/User';
import { INotificationProps } from '@/safira-app/interfaces/Notification';
import { decode } from '@/safira-app/utils/crypto';
import { reduceString } from '@/safira-app/utils/reduceString';

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

export function createSocialNetworkBrowserNotificationFactory(notification: INotificationProps) {
  const { sender, common } = notification;
  const encodedUser = Cookies.get('user');
  const user: IUser = JSON.parse(decode(encodedUser || ''));

  switch (notification.type) {
    case notificationType.NEW_FRIEND_REQUEST:
      return `${sender.name} te enviou uma solicitação de amizade.`;

    case notificationType.PUBLICATION_TYPE_LIKE:
      return `${sender.name} gostou da sua publicação${common?.content ? `: "${common?.content}"` : ''}`;

    case notificationType.PUBLICATION_TYPE_COMMENT:
      return `${sender.name} comentou na sua publicação.`;

    case notificationType.PUBLICATION_TYPE_SHARE:
      return `${sender.name} compartilhou sua publicação.`;

    case notificationType.NEW_RECOMMENDATION_REQUEST:
      return `${sender.name} solicitou para você uma recomendação.`;

    case notificationType.NEW_RECOMMENDATION_RECEIVED:
      return `${sender.name} fez uma recomendação sobre você: "${common.content}"`;

    case notificationType.ANSWERED_REQUEST_RECOMMENDATION:
      return `${sender.name} respondeu um pedido de recomendação sobre você: "${common.content}"`;

    case notificationType.PUBLICATION_TYPE_LIKE_COMMENT:
      return `${sender.name} gostou do seu comentário ${
        common.publication_owner_id === user?.profile_id
          ? 'na sua publicação'
          : `na publicação de ${common.publication_owner_name}: "${reduceString(common.content, 35)}"`
      }.`;

    case notificationType.PUBLICATION_TYPE_COMMENT_OF_COMMENT:
      return `${sender.name} respondeu seu comentário ${
        notification.common.publication_owner_id === user.profile_id
          ? 'na sua publicação'
          : `na publicação de ${notification.common.publication_owner_name}: "${reduceString(
              notification.common.content,
              35,
            )}"`
      }`;

    case notificationType.NEW_FRIEND_RESPONSE:
      return `${sender.name} aceitou seu pedido de amizade.`;

    case notificationType.BIRTHDAYS_TODAY:
      return `${sender.name} está fazendo aniversário hoje!`;

    case notificationType.GROUP_PUBLICATION_TYPE_LIKE:
      return `${sender.name} curtiu uma publicação no grupo "${reduceString(common.group_name, 30)}"`;

    case notificationType.GROUP_PUBLICATION_TYPE_LIKE_COMMENT:
      return `${sender.name} curtiu um comentário no grupo "${reduceString(common.group_name, 30)}"`;

    case notificationType.GROUP_PUBLICATION_REMOVED:
      return `Um administrador do grupo removeu sua publicação: "${reduceString(common.content, 60)}"`;

    case notificationType.GROUP_PUBLICATION_COMMENT_REMOVED:
      return `Um administrador do grupo removeu seu comentário: "${reduceString(common.content, 60)}"`;

    default:
      return '';
  }
}
