import moment from 'moment';

import { reduceString } from '@/safira-app/utils/reduceString';
import { INotificationProps } from '@/safira-app/interfaces/Notification';

const notificationType = {
  RECEIVED_FEEDBACK: 'RECEIVED_FEEDBACK',
  REQUEST_FEEDBACK: 'REQUEST_FEEDBACK',
  FEEDBACK_EVENT_INVITATION: 'FEEDBACK_EVENT_INVITATION',
  FEEDBACK_EVENT_WINNER: 'FEEDBACK_EVENT_WINNER',
  CANCELED_FEEDBACK_EVENT: 'CANCELED_FEEDBACK_EVENT',
  ANSWERED_REQUEST_FEEDBACK: 'ANSWERED_REQUEST_FEEDBACK',
  FEEDBACK_NEAR_END: 'FEEDBACK_NEAR_END',
};

export function createFeedbackBrowserFactory(notification: INotificationProps) {
  const { sender, common } = notification;

  switch (notification.type) {
    case notificationType.RECEIVED_FEEDBACK:
      return `${sender.name} enviou um feedback para você ${
        common.competence_name ? `sobre "${common.competence_name}"` : ''
      }: ${common.content ? `${reduceString(common.content, common.competence_name ? 35 : 50)}` : ''}`;

    case notificationType.REQUEST_FEEDBACK:
      return `${sender.name} te solicitou um feedback${
        common.competence_name ? ` sobre "${common.competence_name}"` : ''
      }.`;

    case notificationType.FEEDBACK_EVENT_INVITATION:
      return `${sender.name} convidou você para o evento de feedback "${common.event_name}"`;

    case notificationType.FEEDBACK_EVENT_WINNER:
      return `Parabéns!, você venceu o evento "${common.event_name}" da empresa ${sender.name}`;

    case notificationType.CANCELED_FEEDBACK_EVENT:
      return `O evento "${common.event_name}" foi cancelado.`;

    case notificationType.ANSWERED_REQUEST_FEEDBACK:
      return `${sender.name} respondeu sua solicitação de feedback.`;

    case notificationType.FEEDBACK_NEAR_END:
      const dateNotificationMaxDate = moment(common?.max_date).diff(moment(), 'day') + 1;

      return `O evento de feedback "${common.event_name}" vencerá ${
        dateNotificationMaxDate > 1 ? `em ${dateNotificationMaxDate}` : 'amanhã'
      }.`;

    default:
      return '';
  }
}
