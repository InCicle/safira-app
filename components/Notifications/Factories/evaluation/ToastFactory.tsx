import React, { useEffect, useState } from 'react';
import moment from 'moment';

import { INotificationProps } from '@/safira-app/interfaces/Notification';
import { useHeaderProvider } from '@/safira-app/contexts/HeaderContext';

import {
  dateFormat,
  NotificationContainer,
  NotificationContentText,
  NotificationHighlight,
} from '../_abstract/ToastNotificationAbstract';

interface IProps {
  notificationItem: INotificationProps;
}

const notificationType = {
  LINK_TO_RESEARCH: 'LINK_TO_RESEARCH',
  LINK_TO_OWN_RESEARCH: 'LINK_TO_OWN_RESEARCH',
  SEARCH_EXPIRATION_OWN_EVALUATION: 'SEARCH_EXPIRATION_OWN_EVALUATION',
  SEARCH_EXPIRATION_OTHER_EVALUATION: 'SEARCH_EXPIRATION_OTHER_EVALUATION',
  PENDING_RESEARCH: 'PENDING_RESEARCH',
  USER_PENDING_RESEARCH: 'USER_PENDING_RESEARCH',
  USER_PDI: 'USER_PDI',
  EVALUATOR_OF_SURVEY_BY_COMPANY: 'EVALUATOR_OF_SURVEY_BY_COMPANY',
  EVALUATOR_OF_SURVEY_BY_PERSON: 'EVALUATOR_OF_SURVEY_BY_PERSON',
  END_RESEARCH: 'END_RESEARCH',
  RESEARCH_WITHOUT_MIN: 'RESEARCH_WITHOUT_MIN',
  PARTICIPANT_SELF_ANSWER_PENDING: 'PARTICIPANT_SELF_ANSWER_PENDING',
};

// @ts-ignore
const EvaluationToastNotificationFactory: React.FC<React.PropsWithChildren<IProps>> = ({ notificationItem }) => {
  const { user } = useHeaderProvider();
  // @ts-ignore
  const [notification] = useState(notificationItem);

  function formatDateNotification(date: string) {
    return moment(date).format('yyyy-MM-DD');
  }

  const renderActions = () => {
    switch (notificationItem.type) {
      case notificationType.LINK_TO_RESEARCH:
        return (
          <NotificationContainer>
            <NotificationContentText>
              Você foi convidado para a pesquisa{' '}
              <NotificationHighlight>{notification.common.name_research}</NotificationHighlight>, responda sua auto
              avaliação e gerencie seus avaliadores até{' '}
              <NotificationHighlight>{dateFormat(notification.common.max_date, 'DD MMM')}</NotificationHighlight>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.LINK_TO_OWN_RESEARCH:
        const maxDateAsArray = new Date(notification.common.max_date)
          .toLocaleString(user.config.default_language, {
            timeZone: user.config.default_timezone,
          })
          .split(' ');

        const [dateString, timeString] = maxDateAsArray;
        const timeFormat = timeString.slice(0, 5);

        return (
          <NotificationContainer>
            <NotificationContentText>
              Você foi convidado para a pesquisa{' '}
              <NotificationHighlight>{notification.common.name_research}</NotificationHighlight>, responda sua auto
              avaliação até <NotificationHighlight>{dateString}</NotificationHighlight> às{' '}
              <NotificationHighlight>{timeFormat}</NotificationHighlight>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.SEARCH_EXPIRATION_OWN_EVALUATION:
        const dateNotificationMaxDate =
          moment(formatDateNotification(notification?.common?.max_date)).diff(moment(), 'day') + 1;
        return (
          <NotificationContainer>
            <NotificationContentText>
              A empresa <NotificationHighlight>"{notification.sender.name}"</NotificationHighlight> aguarda sua
              auto-avaliação da pesquisa{' '}
              <NotificationHighlight>"{notification.common.name_research}"</NotificationHighlight> que vencerá em{' '}
              {dateNotificationMaxDate > 1 ? `${dateNotificationMaxDate} dias` : `${dateNotificationMaxDate} dia`}
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.SEARCH_EXPIRATION_OTHER_EVALUATION:
        return (
          <NotificationContainer>
            <NotificationContentText>
              Você ainda não respondeu a pesquisa{' '}
              <NotificationHighlight>"{notification.common.name_research}"</NotificationHighlight> sobre{' '}
              <NotificationHighlight>"{notification.common.name_evaluated}"</NotificationHighlight> que vence amanhã.
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.PENDING_RESEARCH:
        return (
          <NotificationContainer>
            <NotificationContentText>
              <NotificationHighlight>{notification.sender.name.split(' ')[0]}: </NotificationHighlight>"
              {notification.common.content}"
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.USER_PENDING_RESEARCH:
        return (
          <NotificationContainer>
            <NotificationContentText>
              <NotificationHighlight>{notification.sender.name.split(' ')[0]}: </NotificationHighlight>"
              {notification.common.content}"
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.USER_PDI:
        return (
          <NotificationContainer>
            <NotificationContentText>
              <NotificationHighlight>{notification.sender.name.split(' ')[0]}: </NotificationHighlight>"
              {notification.common.content}"
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.EVALUATOR_OF_SURVEY_BY_COMPANY:
        return (
          <NotificationContainer>
            <NotificationContentText>
              Você foi adicionado como avaliador na pesquisa de{' '}
              <NotificationHighlight>{notification.common.name_evaluated}</NotificationHighlight>{' '}
              {notification.common.count !== 0 && ` e outras ${notification.common.count} pessoas`} na pesquisa{' '}
              <NotificationHighlight>{notification.common.name_research}</NotificationHighlight>.
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.EVALUATOR_OF_SURVEY_BY_PERSON:
        return (
          <NotificationContainer>
            <NotificationContentText>
              <NotificationHighlight>{notification.sender.name}</NotificationHighlight> adicionou você como avaliador na
              pesquisa <NotificationHighlight>"{notification.common.name_research}"</NotificationHighlight>.
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.END_RESEARCH:
        return (
          <NotificationContainer>
            <NotificationContentText>
              Pesquisa <NotificationHighlight>"{notification.common.name_research}"</NotificationHighlight> finalizada
              {notification.common?.participant_status === 'answered' ? ', entre e verifique seu resultado.' : '.'}
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.RESEARCH_WITHOUT_MIN:
        return (
          <NotificationContainer>
            <NotificationContentText>
              Você ainda não alcançou o mínimo de avaliações na pesquisa{' '}
              <NotificationHighlight>"{notification.common.name_research}"</NotificationHighlight>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.PARTICIPANT_SELF_ANSWER_PENDING:
        return (
          <NotificationContainer>
            <NotificationContentText>
              <NotificationHighlight>{notification.sender.name.split(' ')[0]}: </NotificationHighlight>"
              {notification.common.content}"
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

export default EvaluationToastNotificationFactory;
