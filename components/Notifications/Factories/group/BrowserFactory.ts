import { INotificationProps } from '@/safira-app/interfaces/Notification';
import { getGroupType } from '@/safira-app/utils/getGroupType';
import { reduceString } from '@/safira-app/utils/reduceString';

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

export function createGroupBrowserNotificationFactory(notification: INotificationProps) {
  const { sender, common } = notification;

  switch (notification.type) {
    case notificationType.USER_GRANT_ADMIN_TO_GROUP:
      return `Você agora é administrador do grupo "${reduceString(common.group_name, 30)}"`;

    case notificationType.GROUP_INVITE:
      return `${notification.sender.name} convidou você para
      participar do grupo "${reduceString(notification.common.group_name, 30)}"`;

    case notificationType.GROUP_COMMUNICATION:
      return `${sender.name} criou um comunicado no grupo "${reduceString(common.group_name, 30)}"`;

    case notificationType.USER_ADDED_TO_GROUP:
      return `${sender.name} incluiu você no grupo "${reduceString(common.group_name, 30)}"`;

    case notificationType.USER_REQUEST_ENTRY_TO_GROUP:
      return `${sender.name} solicitou para entrar no grupo "${reduceString(common.group_name, 30)}"`;

    case notificationType.BECAME_GROUP_MEMBER:
      return `${
        sender.type === 'company' && common.member_type === 'ADMIN'
          ? `${sender.name} te nomeou administrador `
          : `Você foi aceito para ser membro`
      } do grupo "${reduceString(common.group_name, 30)}"`;

    case notificationType.USER_KICKED_FROM_GROUP:
      return `Você foi removido do grupo "${reduceString(common.group_name, 30)}"`;

    case notificationType.USER_REVOKE_ADMIN_ON_GROUP:
      return `Você não é mais administrador do grupo "${reduceString(common.group_name, 30)}"`;

    case notificationType.GROUP_PUBLICATION_TYPE_COMMENT:
      return `${sender.name} comentou uma publicação no grupo "${reduceString(common.group_name, 30)}"`;

    case notificationType.GROUP_PUBLICATION_TYPE_SHARE:
      return `${sender.name} compartilhou uma publicação no grupo "${reduceString(common.group_name, 30)}"`;

    case notificationType.GROUP_PUBLICATION_TYPE_COMMENT_OF_COMMENT:
      return `${sender.name} comentou em um comentário do grupo "${reduceString(common.group_name, 30)}"`;

    case notificationType.GROUP_TYPE_CHANGED:
      return `O grupo ${reduceString(common.group_name, 30)} que você participa mudou seu tipo de ${getGroupType(
        common.old_type,
      )} para ${getGroupType(common.new_type)}`;

    case notificationType.GROUP_DELETED:
      return `O grupo ${reduceString(common.group_name, 30)} que você participava foi excluído`;

    default:
      return '';
  }
}
