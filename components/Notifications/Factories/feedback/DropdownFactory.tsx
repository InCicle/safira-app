import React, { useEffect, useState } from 'react';
import moment from 'moment';

import { INotificationProps } from '@/safira-app/interfaces/Notification';
import { links } from '@/safira-app/config/links';
import { reduceString } from '@/safira-app/utils/reduceString';

import {
  NotificationContainer,
  NotificationContentText,
  NotificationHighlight,
} from '../_abstract/NotificationAbstract';

interface IProps {
  notificationItem: INotificationProps;
}

const notificationType = {
  RECEIVED_FEEDBACK: 'RECEIVED_FEEDBACK',
  REQUEST_FEEDBACK: 'REQUEST_FEEDBACK',
  FEEDBACK_EVENT_INVITATION: 'FEEDBACK_EVENT_INVITATION',
  FEEDBACK_EVENT_WINNER: 'FEEDBACK_EVENT_WINNER',
  CANCELED_FEEDBACK_EVENT: 'CANCELED_FEEDBACK_EVENT',
  ANSWERED_REQUEST_FEEDBACK: 'ANSWERED_REQUEST_FEEDBACK',
  FEEDBACK_NEAR_END: 'FEEDBACK_NEAR_END',
};

// @ts-ignore
const FeedbackDropdownNotificationFactory: React.FC<React.PropsWithChildren<IProps>> = ({ notificationItem }) => {
  // @ts-ignore
  const [notification] = useState(notificationItem);

  const renderActions = () => {
    switch (notificationItem.type) {
      case notificationType.RECEIVED_FEEDBACK:
        return (
          <NotificationContainer url={`${links.web.social}/feedback`} notification={notificationItem}>
            <NotificationContentText notification={notification}>
              <NotificationHighlight>{notification.sender.name}</NotificationHighlight> enviou um feedback para você{' '}
              {notification.common.competence_name && (
                <>
                  sobre <NotificationHighlight>{notification.common.competence_name}</NotificationHighlight>,{' '}
                </>
              )}
              {notification.common.content && (
                <NotificationHighlight>
                  "{reduceString(notification.common.content, notification.common.competence_name ? 35 : 50)}"
                </NotificationHighlight>
              )}
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.REQUEST_FEEDBACK:
        return (
          <NotificationContainer
            url={`${links.web.social}/feedback?view_request=${notificationItem.common?.request_feedback_id}`}
            notification={notificationItem}
          >
            <NotificationContentText notification={notification}>
              <NotificationHighlight>{notification.sender.name}</NotificationHighlight> te solicitou um feedback
              {notification.common.competence_name && (
                <>
                  {' '}
                  sobre <NotificationHighlight>{notification.common.competence_name}</NotificationHighlight>
                </>
              )}
              .
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.FEEDBACK_EVENT_INVITATION:
        return (
          <NotificationContainer url={`${links.web.social}/feedback`} notification={notificationItem}>
            <NotificationContentText notification={notification}>
              <NotificationHighlight>{notification.sender.name}</NotificationHighlight> convidou você para o evento de
              feedback <NotificationHighlight>"{notification.common.event_name}"</NotificationHighlight>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.FEEDBACK_EVENT_WINNER:
        return (
          <NotificationContainer url={`${links.web.social}/feedback`} notification={notificationItem}>
            <NotificationContentText notification={notification}>
              Parabéns!, você venceu o evento{' '}
              <NotificationHighlight>"{notification.common.event_name}"</NotificationHighlight> da empresa{' '}
              <NotificationHighlight>"{notification.sender.name}"</NotificationHighlight>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.CANCELED_FEEDBACK_EVENT:
        return (
          <NotificationContainer url={`${links.web.social}/feedback`} notification={notificationItem}>
            <NotificationContentText notification={notification}>
              O evento <NotificationHighlight>{notification.common.event_name}</NotificationHighlight> foi cancelado.
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.ANSWERED_REQUEST_FEEDBACK:
        return (
          <NotificationContainer url={`${links.web.social}/feedback`} notification={notificationItem}>
            <NotificationContentText notification={notification}>
              <NotificationHighlight>{notification.sender.name}</NotificationHighlight> respondeu sua solicitação de
              feedback.
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.FEEDBACK_NEAR_END:
        const dateNotificationMaxDate = moment(notification?.common?.max_date).diff(moment(), 'day') + 1;
        return (
          <NotificationContainer url={`${links.web.social}/feedback`} notification={notificationItem}>
            <NotificationContentText notification={notification}>
              O evento de feedback <NotificationHighlight>"{notification.common.event_name}"</NotificationHighlight>{' '}
              vencerá {dateNotificationMaxDate > 1 ? `em ${dateNotificationMaxDate} dias` : 'amanhã'}.
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

export default FeedbackDropdownNotificationFactory;
