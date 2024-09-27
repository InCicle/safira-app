import moment from 'moment';

import { INotificationProps } from '@/safira-app/interfaces/Notification';
import { DateZoneHandler } from '@/safira-app/utils/datezone';

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

export function createEvaluationBrowserNotificationFactory(notification: INotificationProps) {
  // eslint-disable-next-line
  const { sender, common } = notification;

  function formatDateNotification(date: string) {
    return moment(date).format('yyyy-MM-DD');
  }

  switch (notification.type) {
    case notificationType.LINK_TO_RESEARCH:
      const maxDateHandler = DateZoneHandler(common.max_date);

      return `Você foi convidado para a pesquisa "${common.name_research}", responda sua auto avaliação e gerencie seus 
      avaliadores até ${maxDateHandler.withFormat('DD MM')}`;

    case notificationType.LINK_TO_OWN_RESEARCH:
      const maxDateHandlerToLinkToOwnResearch = DateZoneHandler(common.max_date);
      const dateTimeLocal = maxDateHandlerToLinkToOwnResearch.getDateTimeLocal();
      const [dateString, timeString] = dateTimeLocal.split(' ');
      const timeFormat = timeString.slice(0, 5);

      return `Você foi convidado para a pesquisa "${common.name_research}", responda sua auto avaliação até 
      ${dateString} às ${timeFormat}`;

    case notificationType.SEARCH_EXPIRATION_OWN_EVALUATION:
      const maxDateHandlerToSearchExpirationOwnEvaluation = DateZoneHandler(formatDateNotification(common?.max_date));
      const dateNotificationMaxDate =
        moment(maxDateHandlerToSearchExpirationOwnEvaluation.getDateTime()).diff(moment(), 'day') + 1;

      return `A empresa ${sender.name} aguarda sua auto-avaliação da pesquisa "${
        common.name_research
      }" que vencerá em ${dateNotificationMaxDate} ${dateNotificationMaxDate > 1 ? 'dias' : 'dia'}`;

    case notificationType.SEARCH_EXPIRATION_OTHER_EVALUATION:
      return `Você ainda não respondeu a pesquisa "${common.name_research}" sobre ${common.name_evaluated} que vence amanhã.`;

    case notificationType.PENDING_RESEARCH:
      return `${sender.name.split(' ')[0]}: "${common.content}"`;

    case notificationType.USER_PENDING_RESEARCH:
      return `${sender.name.split(' ')[0]}: "${common.content}"`;

    case notificationType.USER_PDI:
      return `${sender.name.split(' ')[0]}: "${common.content}"`;

    case notificationType.EVALUATOR_OF_SURVEY_BY_COMPANY:
      return ` Você foi adicionado(a) como avaliador na pesquisa de ${common.name_evaluated} ${
        common.count > 0 ? `e outras ${common.count} pessoas` : ''
      } na pesquisa "${common.name_research}"`;

    case notificationType.EVALUATOR_OF_SURVEY_BY_PERSON:
      return `${sender.name} adicionou você como avaliador na pesquisa "${common.name_research}"`;

    case notificationType.END_RESEARCH:
      return `Pesquisa ${common.name_research} finalizada ${
        common?.participant_status === 'answered' ? ', entre e verifique seu resultado.' : '.'
      }`;

    case notificationType.RESEARCH_WITHOUT_MIN:
      return `Você ainda não alcançou o mínimo de avaliações na pesquisa "${common.name_research}"`;

    case notificationType.PARTICIPANT_SELF_ANSWER_PENDING:
      return `${sender.name.split(' ')[0]}: "${common.content}"`;

    default:
      return '';
  }
}
