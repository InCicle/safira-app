import React, { useEffect, useState } from 'react';
import moment from 'moment';

import { INotificationProps } from 'safira-app/interfaces/Notification';
import { useHeaderProvider } from 'safira-app/contexts/HeaderContext';
import { links } from 'safira-app/config/links';

import {
  dateFormat,
  NotificationContainer,
  NotificationContentText,
  NotificationHighlight,
} from '../_abstract/NotificationAbstract';

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
const EvaluationDropdownNotificationFactory: React.FC<
  React.PropsWithChildren<IProps>
> = ({ notificationItem }) => {
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
          <NotificationContainer
            url={links.web.evaluation}
            notification={notificationItem}
          >
            <NotificationContentText notification={notification}>
              Você foi incluído em uma avaliação{' '}
              <NotificationHighlight>
                {notification.common.name_research}
              </NotificationHighlight>
              {'. '}Gerencie seus avaliadores até{' '}
              <NotificationHighlight>
                {dateFormat(notification.common.max_date, 'DD/MM')}
              </NotificationHighlight>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.LINK_TO_OWN_RESEARCH:
        /* Essas linhas estão comentadas devido a task LP#2525, que prevê o retorno ao texto antigo, mas com a validação se exite autoavaliação ou não
         const maxDateAsArray = new Date(notification.common.max_date)
           .toLocaleString(user.config.default_language, {
             timeZone: user.config.default_timezone,
           })
           .split(' ');

         const [dateString, timeString] = maxDateAsArray;
         const timeFormat = timeString.slice(0, 5);
         */

        return (
          <NotificationContainer
            url={`${links.web.evaluation}/questionnaire/${notification.common.research_id}/${notification.common.company_id}/auto`}
            notification={notificationItem}
          >
            <NotificationContentText notification={notification}>
              Você foi incluído em uma avaliação{' '}
              <NotificationHighlight>
                {notification.common.name_research}.
              </NotificationHighlight>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.SEARCH_EXPIRATION_OWN_EVALUATION:
        const dateNotificationMaxDate =
          moment(formatDateNotification(notification?.common?.max_date)).diff(
            moment(),
            'day',
          ) + 1;
        return (
          <NotificationContainer
            url={`${links.web.evaluation}/questionnaire/${notification.common.research_id}/${notification.common.company_id}/auto`}
            notification={notificationItem}
          >
            <NotificationContentText notification={notification}>
              A empresa{' '}
              <NotificationHighlight>
                "{notification.sender.name}"
              </NotificationHighlight>{' '}
              aguarda sua autoavaliação da pesquisa{' '}
              <NotificationHighlight>
                "{notification.common.name_research}"
              </NotificationHighlight>{' '}
              que vencerá em{' '}
              {dateNotificationMaxDate > 1
                ? `${dateNotificationMaxDate} dias`
                : `${dateNotificationMaxDate} dia`}
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.SEARCH_EXPIRATION_OTHER_EVALUATION:
        return (
          <NotificationContainer
            url={`${links.web.evaluation}`}
            notification={notificationItem}
          >
            <NotificationContentText notification={notification}>
              Você ainda não respondeu a pesquisa{' '}
              <NotificationHighlight>
                "{notification.common.name_research}"
              </NotificationHighlight>{' '}
              sobre{' '}
              <NotificationHighlight>
                "{notification.common.name_evaluated}"
              </NotificationHighlight>{' '}
              que vence amanhã.
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.PENDING_RESEARCH:
        return (
          <NotificationContainer
            url={`${links.web.evaluation}`}
            notification={notificationItem}
          >
            <NotificationContentText notification={notification}>
              <NotificationHighlight>
                {notification.sender.name.split(' ')[0]}:{' '}
              </NotificationHighlight>
              "{notification.common.content}"
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.USER_PENDING_RESEARCH:
        return (
          <NotificationContainer
            url={`${links.web.evaluation}/questionnaire/${notification.common.research_id}/${notification.common.company_id}/${notification.common.evaluated_id}`}
            notification={notificationItem}
          >
            <NotificationContentText notification={notification}>
              <NotificationHighlight>
                {notification.sender.name.split(' ')[0]}:{' '}
              </NotificationHighlight>
              "{notification.common.content}"
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.USER_PDI:
        return (
          <NotificationContainer
            url={
              notification.common.project_id
                ? `${links.web.project}/kanban/${notification.common.project_id}`
                : `${links.web.evaluation}`
            }
            notification={notificationItem}
          >
            <NotificationContentText notification={notification}>
              <NotificationHighlight>
                {notification.sender.name.split(' ')[0]}:{' '}
              </NotificationHighlight>
              "{notification.common.content}"
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.EVALUATOR_OF_SURVEY_BY_COMPANY:
        return (
          <NotificationContainer
            url={`${links.web.evaluation}/questionnaire/${notification.common.research_id}/${notification.common.company_id}/${notification.common.evaluated_id}`}
            notification={notification}
          >
            <NotificationContentText notification={notification}>
              Você foi adicionado(a) como avaliador na avaliação{' '}
              <NotificationHighlight>
                {notification.common.name_research}
              </NotificationHighlight>{' '}
              sobre{' '}
              <NotificationHighlight>
                {notification.common.name_evaluated}
              </NotificationHighlight>{' '}
              {notification.common.count > 1 &&
                ` e outras ${notification.common.count} pessoas`}
              .
              {notification.common.count === 1 &&
                ` e outra ${notification.common.count} pessoa`}
              .
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.EVALUATOR_OF_SURVEY_BY_PERSON:
        return (
          <NotificationContainer
            url={`${links.web.evaluation}/questionnaire/${notification.common.research_id}/${notification.common.company_id}/${notification.common.evaluated_id}`}
            notification={notification}
          >
            <NotificationContentText notification={notification}>
              <NotificationHighlight>
                {notification.sender.name}
              </NotificationHighlight>{' '}
              adicionou você como avaliador na pesquisa{' '}
              <NotificationHighlight>
                "{notification.common.name_research}"
              </NotificationHighlight>
              .
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.END_RESEARCH:
        return (
          <NotificationContainer
            url={links.web.evaluation}
            notification={notificationItem}
          >
            <NotificationContentText notification={notification}>
              Pesquisa{' '}
              <NotificationHighlight>
                "{notification.common.name_research}"
              </NotificationHighlight>{' '}
              finalizada
              {notification.common?.participant_status === 'answered'
                ? ', entre e verifique seu resultado.'
                : '.'}
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.RESEARCH_WITHOUT_MIN:
        return (
          <NotificationContainer
            url={links.web.evaluation}
            notification={notificationItem}
          >
            <NotificationContentText notification={notification}>
              Você ainda não alcançou o mínimo de avaliações na pesquisa{' '}
              <NotificationHighlight>
                "{notification.common.name_research}"
              </NotificationHighlight>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.PARTICIPANT_SELF_ANSWER_PENDING:
        return (
          <NotificationContainer
            url={`${links.web.evaluation}/questionnaire/${notification.common.research_id}/${notification.common.company_id}/auto`}
            notification={notificationItem}
          >
            <NotificationContentText notification={notification}>
              <NotificationHighlight>
                {notification.sender.name.split(' ')[0]}:{' '}
              </NotificationHighlight>
              "{notification.common.content}"
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

export default EvaluationDropdownNotificationFactory;
